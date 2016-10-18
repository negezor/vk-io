'use strict';

const
request = require('request'),
stream = require('stream'),
fs = require('fs');

/* Проверяет строку на ссылку */
const isLink = /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.?)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

/* Обработчики upload */
exports._uploadHandlers = [];

/**
 * Добавляет обработчик в vk.upload
 *
 * @param string   way     Путь
 * @param function handler Обработчик
 */
var add = (way,handler) => {
	exports._uploadHandlers.push({
		way: way,
		handler: handler
	});
};

/**
 * Возвращает stream
 *
 * @param mixed data
 *
 * @return ReadStream|mixed
 */
exports._uploadGetStream = (file) => {
	if (typeof file === 'object' && (file.hasOwnProperty('httpModule') || file instanceof stream)) {
		return file;
	}

	if (isLink.test(file)) {
		return request(file);
	}

	return fs.createReadStream(file);
};

/**
 * Собирает форму для отправки
 *
 * @param string name
 * @param mixed  file
 * @param object options
 *
 * @return promise
 */
exports._uploadBuildForm = function(name,file){
	return new this.promise((resolve) => {
		var form = {};

		if (!Array.isArray(file)) {
			form[name] = this._uploadGetStream(file);

			return resolve(form);
		}

		var index = 0;

		this.async.each(
			file,
			(item,next) => {
				form[name+(++index)] =  this._uploadGetStream(item);

				next();
			},
			() => {
				resolve(form);
			}
		);
	});
};

/**
 * Возвращает объект с опции запроса
 *
 * @param object params
 *
 * @return object
 */
exports._optionsUpload = (params) => {
	var options = {};

	options.file = params.file;
	delete params.file;

	if ('timeout' in params) {
		options.timeout = params.timeout;
		delete params.timeout;
	}

	if ('qs' in params) {
		options.qs = params.qs;
		delete params.qs;
	}

	return options;
};

/**
 * Отправляет файл(ы) на сервер
 *
 * @param object server  Адрес сервера
 * @param object options Формы для отправки
 * @param string form    Название формы
 *
 * @return promise
 */
exports._uploadSend = function(server,options,form){
	return new this.promise((resolve,reject) => {
		this._uploadBuildForm(form,options.file,options)
		.then((formData) => {
			var params = {
				uri: server.upload_url,
				method: 'POST',
				json: true,
				formData: formData,
				timeout: (options.timeout || 15) * 1000
			};

			if ('qs' in options) {
				params.qs = options.qs;
			}

			this.logger.log('Start upload');

			return this.request(params)
			.catch((error) => {
				++this.status.error;

				this.logger.error('Failed upload');

				reject(new this.RequestError(error));
			});
		})
		.then((result) => {
			if ('error' in result) {
				this.logger.error('Failed upload');

				return reject(new this.UnknownError(result.error));
			}

			this.logger.log('Success upload');

			if ('response' in result) {
				return resolve(result.response);
			}

			return resolve(result);
		})
		.catch(reject);
	});
};

/**
 * Загрузка фотографий в альбом пользователя
 *
 * Пример загрузки
 *
 * vk.upload.album({
 * 	file: <String|Stream|Array>,
 *  album_id: <Integer>
 *  <остальные параметры>
 * }) -> Promise
 */
add('album',function(params){
	var options = this._optionsUpload(params);

	if (!Array.isArray(options.file)) {
		options.file = [options.file];
	}

	return this.api.photos.getUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'file');
	})
	.then((save) => {
		['album_id','group_id','latitude','longitude','caption']
		.forEach((name) => {
			if (name in params) {
				save[name] = params[name];
			}
		});

		return this.api.photos.save(save);
	});
});

/**
 * Загрузка изображения на стену
 *
 * Пример загрузки
 *
 * vk.upload.wall({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('wall',function(params){
	var options = this._optionsUpload(params);

	return this.api.photos.getWallUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'photo');
	})
	.then((save) => {
		['user_id','group_id']
		.forEach((name) => {
			if (name in params) {
				save[name] = params[name];
			}
		});

		return this.api.photos.saveWallPhoto(save);
	})
	.then((photos) => photos[0]);
});

/**
 * Загрузка фотографии на главную профиля
 *
 * Пример загрузки
 *
 * vk.upload.owner({
 * 	file: <String|Stream>,
 *  crop: <String>
 *  <остальные параметры>
 * }) -> promise
 */
add('owner',function(params){
	if ('crop' in params) {
		params.qs = {
			_square_crop: params.crop
		};

		delete params.crop;
	}

	var options = this._optionsUpload(params);

	return this.api.photos.getOwnerPhotoUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'photo');
	})
	.then((save) => {
		if ('owner_id' in params) {
			save.owner_id = params.owner_id;
		}

		return this.api.photos.saveOwnerPhoto(save);
	});
});

/**
 * Загрузка изображения в личное сообщение
 *
 * Пример загрузки
 *
 * vk.upload.message({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('message',function(params){
	var options = this._optionsUpload(params);

	return this.api.photos.getMessagesUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'photo');
	})
	.then(this.api.photos.saveMessagesPhoto)
	.then((photos) => photos[0]);
});

/**
 * Загрузка фотографии для чата
 *
 * Пример загрузки
 *
 * vk.upload.chat({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('chat',function(params){
	if ('crop' in params) {
		if ('width' in params.crop) {
			params.crop_width = params.crop.width;
		}

		if ('x' in params.crop) {
			params.crop_x = params.crop.x;
		}

		if ('y' in params.crop) {
			params.crop_y = params.crop.y;
		}

		delete params.crop;
	}

	var options = this._optionsUpload(params);

	return this.api.photos.getChatUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'file');
	})
	.then((result) => {
		return {
			file: result
		};
	})
	.then(this.api.messages.setChatPhoto);
});

/**
 * Загрузка фотографии для товара
 *
 * Пример загрузки
 *
 * vk.upload.product({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('product',function(params){
	if ('crop' in params) {
		if ('width' in params.crop) {
			params.crop_width = params.crop.width;
		}

		if ('x' in params.crop) {
			params.crop_x = params.crop.x;
		}

		if ('y' in params.crop) {
			params.crop_y = params.crop.y;
		}

		delete params.crop;
	}

	var options = this._optionsUpload(params);

	return this.api.photos.getMarketUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'file');
	})
	.then((save) => {
		if ('group_id' in params) {
			save.group_id = params.group_id;
		}

		return this.api.photos.saveMarketPhoto(save);
	});
});

/**
 * Загрузка фотографии для подборки товаров
 *
 * Пример загрузки
 *
 * vk.upload.selection({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('selection',function(params){
	var options = this._optionsUpload(params);

	return this.api.photos.getMarketAlbumUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'file');
	})
	.then((save) => {
		if ('group_id' in params) {
			save.group_id = params.group_id;
		}

		return this.api.photos.saveMarketAlbumPhoto(save);
	});
});

/**
 * Загрузка аудиозаписей
 *
 * Пример загрузки
 *
 * vk.upload.audio({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('audio',function(params){
	var options = this._optionsUpload(params);

	return this.api.audio.getUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'file');
	})
	.then((save) => {
		['artist','title']
		.forEach((name) => {
			if (name in params) {
				save[name] = params[name];
			}
		});

		return this.api.audio.save(save);
	});
});

/**
 * Загрузка видеозаписей
 *
 * Пример загрузки
 *
 * vk.upload.video({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('video',function(params){
	var options = this._optionsUpload(params);

	return this.api.video.save(params)
	.then((server) => {
		return this._uploadSend(server,options,'video_file');
	});
});

/**
 * Загрузка документа
 *
 * Пример загрузки
 *
 * vk.upload.doc({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('doc',function(params){
	var options = this._optionsUpload(params);

	return this.api.docs.getUploadServer(params)
	.then((server) => {
		return this._uploadSend(server,options,'file');
	})
	.then((save) => {
		['group_id','title','tags']
		.forEach((name) => {
			if (name in params) {
				save[name] = params[name];
			}
		});

		return this.api.docs.save(save);
	})
	.then((docs) => docs[0]);
});

/**``
 * Загрузка аудиосообщения
 *
 * Пример загрузки
 *
 * vk.upload.voice({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('voice',function(params){
	params.type = 'audio_message';

	return this.upload.doc(params);
});

/**
 * Загрузка граффити в сообщения
 *
 * Пример загрузки
 *
 * vk.upload.graffiti({
 * 	file: <String|Stream>,
 *  <остальные параметры>
 * }) -> promise
 */
add('graffiti',function(params = {}){
	params.type = 'graffiti';

	return this.upload.doc(params);
});
