'use strict';

const VKError = require('./vk');

/**
 * Обработка ошибок execute
 *
 * @public
 */
class UploadError extends VKError {
	/**
	 * Конструктор
	 *
	 * @param {Object} error
	 */
	constructor ({ error }) {
		super(error);

		this.message = error;

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}
}

module.exports = UploadError;
