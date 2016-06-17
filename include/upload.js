'use strict';

var fs = require('fs');

exports._uploadHandlers = [];

exports._uploadSend = function(server,form){
	return new this.promise((resolve,reject) => {
		var formData = {};

		this.async.forEach(Object.keys(form),(key,next) => {
			if (!Array.isArray(form[key])) {
				formData[key] = fs.createReadStream(form[key]);

				next();
			} else {
				var index = 1;

				this.async.forEach(form[key],(item,each) => {
					formData[key+index]	= fs.createReadStream(item);

					++index;
					each();
				},next);
			}
		},() => {
			this.request({
				uri: server.upload_url,
				method: 'POST',
				json: true,
				formData: formData
			})
			.then(resolve)
			.catch(reject);
		});

	});
};

var add = function(path,handler){
	exports._uploadHandlers.push({
		way: path,
		handler: handler
	});
};

/* Загрузка фотографий в альбом пользователя  */
add('album',function(params){
	return new this.promise((resolve,reject) => {
		this.api.photos.getUploadServer(params)
		.then((server) => {
			var formData = {};

			if (Array.isArray(params.file)) {
				if (params.file.length > 5) {
					params.file.length = 5;
				}

				formData.file = params.file;
			} else {
				formData.file1 = params.file;
			}

			return this._uploadSend(server,formData);
		})
		.then((save) => {
			save.album_id = params.album_id;

			return this.api.photos.save(save);
		})
		.then(resolve)
		.catch(reject);
	});
});

add('wall',function(params){
	return new this.promise((resolve,reject) => {
		this.api.photos.getWallUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				photo: params.file
			});
		})
		.then((save) => {
			if (params.group_id) {
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

add('owner',function(params){
	return new this.promise((resolve,reject) => {
		if (params.crop) {
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
					photo: fs.createReadStream(params.file)
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
			if (params.owner_id) {
				save.owner_id = params.owner_id;
			}

			return this.api.photos.saveOwnerPhoto(save);
		})
		.then(resolve)
		.catch(reject);
	});
});

/* Загрузка в личное сообщение */
add('message',function(params){
	return new this.promise((resolve,reject) => {
		this.api.photos.getMessagesUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				photo: params.file
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

/* Загрузка фотографии для товара */
add('product',function(params){
	return new this.promise((resolve,reject) => {
		this.api.photos.getMarketUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: params.file
			});
		})
		.then((save) => {
			if (params.group_id) {
				save.group_id = params.group_id;
			}

			return this.api.photos.saveMarketPhoto(save);
		})
		.then(resolve)
		.catch(reject);
	});
});

/* Загрузка фотографии для подборки товаров */
add('selection',function(params){
	return new this.promise((resolve,reject) => {
		this.api.photos.getMarketAlbumUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: params.file
			});
		})
		.then((save) => {
			if (params.group_id) {
				save.group_id = params.group_id;
			}

			return this.api.photos.saveMarketAlbumPhoto(save);
		})
		.then(resolve)
		.catch(reject);
	});
});

/* Загрузка аудиозаписей */
add('audio',function(params){
	return new this.promise((resolve,reject) => {
		this.api.audio.getUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: params.file
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

/* Загрузка видеозаписей */
add('video',function(params){
	return new this.promise((resolve,reject) => {
		this.api.video.save(params)
		.then((server) => {
			return this._uploadSend(server,{
				video_file: params.file
			});
		})
		.then(resolve)
		.catch(reject);
	});
});

/* Загрузка документов */
add('docs',function(params){
	return new this.promise((resolve,reject) => {
		this.api.docs.getUploadServer(params)
		.then((server) => {
			return this._uploadSend(server,{
				file: params.file
			});
		})
		.then((save) => {
			if (params.group_id) {
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
