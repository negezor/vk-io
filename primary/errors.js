'use strict';

var errorNames = ['StatusCodeError','ETIMEDOUT'];

/**
 * Проверяет можно ли перезапустить соединение
 *
 * @param object error Объект ошибки
 *
 * @return boolean
 */
exports._checkConnectReject = (error) => {
	if (errorNames.indexOf(error.name) === -1) {
		return true;
	}

	if ('statusCode' in error && error.statusCode !== 504) {
		return true;
	}

	return false;
};

/**
 * Обработка ошибок VK API
 */
exports.ApiError = class ApiError extends Error {
	/**
	 * Конструктор
	 *
	 * @param object error Объект ошибки
	 */
	constructor (error) {
		super(error.error_msg);
		this.name = this.constructor.name;

		this.code = parseInt(error.error_code);
		this.message = error.error_msg;
		this.params = error.request_params;

		Error.captureStackTrace(this,this.constructor.name);
	}
};

/**
 * Обаботка ошибок запроса
 */
exports.RequestError = class RequestError extends Error {
	/**
	 * Конструктор
	 *
	 * @param ErrorStatusCode error Объект ошибки
	 */
	constructor (error) {
		super(error.error_msg);
		this.name = this.constructor.name;

		if ('statusCode' in error) {
			this.statusCode = error.statusCode;
		}

		this.message = error.message;

		Error.captureStackTrace(this,this.constructor.name);
	}
}
