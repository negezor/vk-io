'use strict';

const Promise = require('bluebird');
const debug = require('debug')('vk-io:upload');

const RequestError = require('../errors/request');
const UploadError = require('../errors/upload');
const { getForm, extractUploadOptions, copyParams } = require('./helpers');

/**
 * Класс для загрузки файлов во ВКонтакте
 *
 * @public
 */
class Upload {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;
	}

	/**
	 * Загрузка фотографий в альбом пользователя
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	album (params) {
		return this._conduct([
			params,
			'file',
			this.vk.api.photos.getUploadServer,
			this.vk.api.photos.save,
			['album_id', 'group_id', 'latitude', 'longitude', 'caption']
		]);
	}

	/**
	 * Загрузка изображения на стену
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	wall (params) {
		return this._conduct([
			params,
			'photo',
			this.vk.api.photos.getWallUploadServer,
			this.vk.api.photos.saveWallPhoto,
			['album_id', 'group_id', 'latitude', 'longitude', 'caption']
		])
		.then((photos) => photos[0]);
	}

	/**
	 * Загрузка главной фотографии пользователя или сообщества
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	owner (params) {
		return this._conduct([
			params,
			'photo',
			this.vk.api.photos.getOwnerPhotoUploadServer,
			this.vk.api.photos.saveOwnerPhoto,
			['owner_id']
		]);
	}

	/**
	 * Загрузка фотографии в личное сообщение
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	message (params) {
		return this._conduct([
			params,
			'photo',
			this.vk.api.photos.getMessagesUploadServer,
			this.vk.api.photos.saveMessagesPhoto,
			['owner_id']
		])
		.then((photos) => photos[0]);
	}

	/**
	 * Загрузка главной фотографии для чата
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	chat (params) {
		return this._conduct([
			params,
			'file',
			this.vk.api.photos.getChatUploadServer,
			(uploaded) => (
				this.vk.api.messages.setChatPhoto({
					file: uploaded
				})
			),

			[]
		]);
	}

	/**
	 * Загрузка главной фотографии для чата
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	product (params) {
		return this._conduct([
			params,
			'file',
			this.vk.api.photos.getMarketUploadServer,
			this.vk.api.photos.saveMarketPhoto,
			['group_id']
		])
		.then((photos) => photos[0]);
	}

	/**
	 * Загрузка фотографии для подборки товаров
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	selection (params) {
		return this._conduct([
			params,
			'file',
			this.vk.api.photos.getMarketAlbumUploadServer,
			this.vk.api.photos.saveMarketAlbumPhoto,
			['group_id']
		])
		.then((photos) => photos[0]);
	}

	/**
	 * Загрузка аудиозаписей
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	audio (params) {
		return this._conduct([
			params,
			'file',
			this.vk.api.audio.getUploadServer,
			this.vk.api.audio.save,
			['artist', 'title']
		]);
	}

	/**
	 * Загрузка видеозаписей
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	video (params) {
		const options = extractUploadOptions(params);

		return this.vk.api.video.save(params)
		.then((server) => this._upload(server, options, 'video_file'));
	}

	/**
	 * Загрузка документов
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	doc (params) {
		return this._conduct([
			params,
			'file',
			this.vk.api.docs.getUploadServer,
			this.vk.api.docs.save,
			['title', 'tags']
		])
		.then((photos) => photos[0]);
	}

	/**
	 * Загрузка документов для последующей отправки документа на стену или личным сообщением
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	wallDoc (params) {
		return this._conduct([
			params,
			'file',
			this.vk.api.docs.getWallUploadServer,
			this.vk.api.docs.save,
			['title', 'tags']
		])
		.then((photos) => photos[0]);
	}

	/**
	 * Загрузка аудиосообщения
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	voice (params) {
		params.type = 'audio_message';

		return this.doc(params);
	}

	/**
	 * Загрузка граффити
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	graffiti (params) {
		params.type = 'graffiti';

		return this.doc(params);
	}

	/**
	 * Загрузка обложки сообщества
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	cover (params) {
		return this._conduct([
			params,
			'photo',
			this.vk.api.photos.getOwnerCoverPhotoUploadServer,
			this.vk.api.photos.saveOwnerCoverPhoto,
			[]
		]);
	}

	/**
	 * Стандартное поведение для метода загрузки
	 *
	 * @param {Object} conduct
	 *
	 * @return {Promise}
	 */
	_conduct ([params, field, getServer, saveServer, saveParams]) {
		const options = extractUploadOptions(params);

		if ('uploadUrl' in options) {
			getServer = () => (
				Promise.resolve({
					upload_url: options.uploadUrl
				})
			);
		}

		debug('Getting upload server');

		return getServer(params)
		.then((server) => {
			debug('Start upload files.');

			return this._upload(server, options, field);
		})
		.then((uploaded) => {
			copyParams(params, uploaded, saveParams);

			debug('Save files');

			return saveServer(uploaded);
		});
	}

	/**
	 * Загружает файл
	 *
	 * @param {Object} server
	 * @param {Object} options
	 * @param {string} field
	 *
	 * @return {Promise}
	 */
	_upload ({ upload_url: url }, options, field) {
		const params = {
			uri: url,
			formData: getForm(field, options.source),
			timeout: (options.timeout || 15e3)
		};

		if ('qs' in params) {
			params.qs = options.qs;
		}

		return this.vk.request(params)
		.catch((error) => new RequestError(error))
		.then((response) => {
			if ('error' in response) {
				throw new UploadError(response);
			}

			if ('response' in response) {
				return response.response;
			}

			return response;
		});
	}
}

module.exports = Upload;
