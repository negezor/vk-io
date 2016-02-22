'use strict';

/**
 * Обрабатывает ошибки вконтакте
 * @param {object} error   данные об ошибке
 * @param {object} request данные запроса
 */
exports.error = function(error,request){
	/* Проверяем есть ли индивидуальный обработчик ошибки */
	if (this._errorList[error.error_code]) {
		/* Вызываем */
		this._errorList[error.error_code].call(this,error,request);
	} else {
		/* Изменяем объект */
		error = {
			id: error.error_code,
			msg: error.error_msg,
			params: error.request_params
		};

		/* Отправляем ошибку в reject */
		request[3](error);
	}
};

/* Индивидуальные обработчики ошибок */
exports._errorList = {
	/* Если превышен лимит запроса в секунду */
	6: function(error,request){
		/* Отправляем запрос на повтор */
		this._apiRestart.apply(this,request);
	},
	/* Требуется ввод кода с капчи */
	14: function(error,request){
		/* Вызывает событие капчи */
		this.emit('captha',{
			/* Ссылка на изображение */
			src: error.captcha_img,
			/* ID капчи */
			sid: error.captcha_sid,
			/* Обработчик для рестарта запроса */
			handler: (code) => {
				/* ID капчи */
				request[1].captcha_sid = error.captcha_sid;
				/* Код капчи */
				request[1].captcha_key = code;

				/* Отправляем запрос на повтор */
				this._apiRestart.apply(this,request);
			}
		});
	}
};