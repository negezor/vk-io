'use strict';

const VKError = require('./vk');

/**
 * Обработка ошибок execute
 *
 * @public
 */
class ExecuteError extends VKError {
	/**
	 * Конструктор
	 *
	 * @param {Object} error
	 */
	constructor (error) {
		super(`Code №${error.error_code}. ${error.error_msg}`);

		this.method = error.method;
		this.code = +error.error_code;
		this.message = error.error_msg;

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}
}

module.exports = ExecuteError;
