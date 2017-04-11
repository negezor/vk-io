'use strict';

const VKError = require('./vk');

/**
 * Обработка HTTP ошибок запросов
 *
 * @public
 */
class RequestError extends VKError {
	/**
	 * Конструктор
	 *
	 * @param {Object} error
	 */
	constructor (error) {
		super(error.message);

		this.message = error.message;

		if ('statusCode' in error) {
			this.statusCode = +error.statusCode;
		}

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}
}

module.exports = RequestError;
