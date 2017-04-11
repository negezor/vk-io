'use strict';

const VKError = require('./vk');

const { AUTH_ERRORS } = require('../util/constants');

const { AUTHORIZATION_FAILED } = AUTH_ERRORS;

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
	constructor ({ message, code = AUTHORIZATION_FAILED }) {
		super(message);

		this.message = message;
		this.code = code;

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}
}

module.exports = AuthError;
