'use strict';

const VKError = require('./vk');

/**
 * Обработка ошибок VK API
 *
 * @public
 *
 * @property {number} [code] Код ошибки
 * @property {string} [message] Текст ошибки
 * @property {Array}  [params] Присланные параметры
 *
 * @property {?number} [captchaSid] SID капчи
 * @property {?string} [captchaSid] Ссылшка на изображение капчи
 *
 * @property {?string} [redirectUri] Ссылка для подтверждения
 */
class ApiError extends VKError {
	/**
	 * Конструктор
	 */
	constructor (error) {
		super(`Code №${error.error_code}. ${error.error_msg}`);

		this.code = +error.error_code;
		this.message = error.error_msg;
		this.params = error.request_params;

		if (this.code === 14) {
			this.captchaSid = +error.captcha_sid;
			this.captchaImg = error.captcha_img;
		}

		if (this.code === 17) {
			this.redirectUri = error.redirect_uri;
		}

		if ('captureStackTrace' in Error) {
			Error.captureStackTrace(this, this.constructor.name);
		}
	}
}

module.exports = ApiError;
