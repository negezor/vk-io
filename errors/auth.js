'use strict';

const VKError = require('./vk');

/**
 * Обработка ошибок execute
 *
 * @public
 */
class AuthError extends VKError {
	/**
	 * Конструктор
	 *
	 * @param {string} message
	 */
	constructor (error) {
		super(error.message);

		this.message = error.message;

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
}

module.exports = AuthError;
