'use strict';

/* Обработчики ошибок VK API */
const errorList = {
	/**
	 * Превышен лимит запросов в секунду
	 */
	6: function(error,request){
		this._apiRestart(request);
	},
	/**
	 * Обработка капчи
	 */
	14: function(error,request){
		if (!this._captchaHandler) {
			request[3](error);

			return this.logger.warn('Captcha needed!');
		}

		const sid = error.captcha_sid;

		this._captchaHandler(error.captcha_img,(code) => {
			return new this.promise((resolve,reject) => {
				request[1].captcha_sid = sid;
				request[1].captcha_key = code;

				request[4] = {
					resolve,
					reject
				};

				this._apiRestart(request);
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
exports._apiError = function(errorVk,request){
	var error = new this.ApiError(errorVk);

	if (!(error.code in errorList)) {
		this.logger.error('Api error №'+error.code,error.message);

		request[3](error);

		return error;
	}

	errorList[error.code].call(this,errorVk,request);

	return error;
};
