'use strict';

const Promise = require('bluebird');

/**
 * Обработка ошибок VK API
 */
class ApiError extends Error {
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

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
}

exports.ApiError = ApiError;

/* Обработчики ошибок VK API */
const errorList = {
	/**
	 * Превышен лимит запросов в секунду
	 */
	6: function(error,task){
		this._apiRestart(task);
	},
	/**
	 * Обработка капчи
	 */
	14: function(error,task){
		if (!this._captchaHandler) {
			task.reject(error);

			return this.logger.warn('Captcha needed!');
		}

		const sid = error.captcha_sid;

		this._captchaHandler(error.captcha_img,(code) => {
			return new Promise((resolve,reject) => {
				task.params.captcha_sid = sid;
				task.params.captcha_key = code;

				task.captcha = {
					resolve,
					reject
				};

				this._apiRestart(task);
			});
		},sid);
	}
};

/**
 * Обработчик ошибок VK API
 *
 * @param object error   Объект ошибки
 * @param object request Данные запроса
 *
 * @return ApiError
 */
exports._apiError = function(error,task){
	if (error.error_code in errorList) {
		errorList[error.error_code].call(this,error,task);

		return error;
	}

	this.logger.error('Api error №'+error.error_code,error.error_msg);

	task.reject(new ApiError(error));

	return error;
};
