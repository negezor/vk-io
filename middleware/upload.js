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
exports._uploadGetSteam = (file) => {
	if (typeof file === 'object' && (file.hasOwnProperty('httpModule') || file instanceof stream)) {
		return file;
	}

	if (isLink.test(file)) {
		return request(file);
	}

	return fs.createReadStream(file);
};

/**
 * Отправляет файл(ы) на сервер
 *
 * @param string server Адрес сервера
 * @param object forms  Формы для отправки
 *
 * @return promise
 */
exports._uploadSend = function(server,forms){
	return new this.promise((resolve,reject) => {
		var formData = {};

		this.async.each(
			Object.keys(forms),
			(key,nextKey) => {
				if (!Array.isArray(forms[key])) {
					formData[key] = this._uploadGetSteam(forms[key]);

					return nextKey();
				}

				var index = 1;

				this.async.each(
					forms[key],
					(form,nextFile) => {
						formData[key+index] = this._uploadGetSteam(form);

						++index;

						nextFile();
					},
					nextKey
				);
			},
			() => {
				this.request({
					uri: server.upload_url,
					method: 'POST',
					formData: formData,
					json: true,
					timeout: 15000
				})
				.then(resolve)
				.catch((error) => {
					++this.status.error;

					reject(new this.RequestError(error));
				});
			}
		);

		return null;
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
	return new this.promise((resolve,reject) => {
		var files = params.file;
		delete params.file;

		this.api.photos.getUploadServer(params)
		.then((server) => {
			if (!Array.isArray(files)) {
				files = [files];
			}

			return this._uploadSend(server,{
				file: files.slice(0,5)
			});
		})
		.then((save) => {
			save.album_id = params.album_id;

			return this.api.photos.save(save);
		})
		.then(resolve)
		.catch(reject);
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.photos.getWallUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				photo: file
			});
		})
		.then((save) => {
			if ('group_id' in params) {
				save.group_id = params.group_id;
			}

			return this.api.photos.saveWallPhoto(save);
		})
		.then((photo) => {
			return photo[0];
		})
		.then(resolve)
		.catch(reject);
	});
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		if ('crop' in params) {
			var crop = params.crop;
			delete params.crop;
		}

		this.api.photos.getOwnerPhotoUploadServer(params)
		.then((server) => {
			var send = {
				uri: server.upload_url,
				method: 'POST',
				json: true,
				formData: {
					photo: this._uploadGetSteam(file)
				}
			};

			if (crop) {
				send.qs = {
					_square_crop: crop
				};
			}

			return this.request(send);
		})
		.then((save) => {
			if ('owner_id' in params) {
				save.owner_id = params.owner_id;
			}

			return this.api.photos.saveOwnerPhoto(save);
		})
		.then(resolve)
		.catch(reject);
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.photos.getMessagesUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				photo: file
			});
		})
		.then(this.api.photos.saveMessagesPhoto)
		.then((photo) => {
			return photo[0];
		})
		.then(resolve)
		.catch(reject);
	});
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.photos.getChatUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: file
			});
		})
		.then(this.api.messages.setChatPhoto)
		.then(resolve)
		.catch(reject);
	});
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.photos.getMarketUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: file
			});
		})
		.then((save) => {
			if ('group_id' in params) {
				save.group_id = params.group_id;
			}

			return this.api.photos.saveMarketPhoto(save);
		})
		.then(resolve)
		.catch(reject);
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.photos.getMarketAlbumUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: file
			});
		})
		.then((save) => {
			if ('group_id' in params) {
				save.group_id = params.group_id;
			}

			return this.api.photos.saveMarketAlbumPhoto(save);
		})
		.then(resolve)
		.catch(reject);
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.audio.getUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: file
			});
		})
		.then(this.api.audio.save)
		.then((audio) => {
			return audio[0];
		})
		.then(resolve)
		.catch(reject);
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.video.save(params)
		.then((server) => {
			return this._uploadSend(server,{
				video_file: file
			});
		})
		.then(resolve)
		.catch(reject);
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
	return new this.promise((resolve,reject) => {
		var file = params.file;
		delete params.file;

		this.api.docs.getUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: file
			});
		})
		.then((save) => {
			if ('group_id' in params) {
				save.group_id = params.group_id;
			}

			return this.api.docs.save(save);
		})
		.then((docs) => {
			return docs[0];
		})
		.then(resolve)
		.catch(reject);
	});
});
