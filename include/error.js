'use strict';

/**
 * Обрабатывает ошибки вконтакте
 * @param {object} error   данные об ошибке
 * @param {object} request данные запроса
 */
exports.error = function(error,request){
	if (this._errorList[error.error_code]) {
		this._errorList[error.error_code].call(this,error,request);
	} else {
		error = {
			id: error.error_code,
			msg: error.error_msg,
			params: error.request_params
		};

		request[3](error);
	}
};

/* Индивидуальные обработчики ошибок */
exports._errorList = {
	6: function(error,request){
		this._apiRestart.apply(this,request);
	},
	14: function(error,request){
		this.emit('captcha',{
			src: error.captcha_img,
			sid: error.captcha_sid,
			handler: (code) => {
				request[1].captcha_sid = error.captcha_sid;
				request[1].captcha_key = code;

				this._apiRestart.apply(this,request);
			}
		});
	}
};
