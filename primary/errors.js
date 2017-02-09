'use strict';

/**
 * Проверяет можно ли перезапустить соединение
 *
 * @param object error Объект ошибки
 *
 * @return boolean
 */
exports._checkConnectReject = (error) => {
	if (error.code === 'ETIMEDOUT') {
		return false;
	}

	if (error.code === 'ECONNRESET') {
		return true;
	}

	if (error.code === 'ECONNREFUSED') {
		return true;
	}

	return error.statusCode > 500;
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
		super(error);
		this.name = this.constructor.name;

		if ('statusCode' in error) {
			this.statusCode = error.statusCode;
		}

		if ('message' in error) {
			this.message = error.message;
		}

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
};

/**
 * Обработка неизвестный ошибок
 */
exports.UnknownError = class UnknownError extends Error {
	/**
	 * Конструктор
	 *
	 * @param mixed error
	 */
	constructor (error) {
		super(error);
		this.name = this.constructor.name;

		this.message = error;

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
};
