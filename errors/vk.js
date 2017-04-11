'use strict';

/**
 * Класс общих ошибок ВКонтакте
 *
 * @public
 */
class VKError extends Error {
	/**
	 * Конструктор
	 *
	 * @param {mixed} error
	 */
	constructor (error) {
		super(error);

		this.name = this.constructor.name;

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}
}

module.exports = VKError;
