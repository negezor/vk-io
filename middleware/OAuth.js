'use strict';

const promise = require('bluebird');
const request = require('request-promise');
const cheerio = require('cheerio').load;
const queryString = require('querystring');

/* Список разрешений */
const fullScopes = [
	'ads',
	'wall',
	'docs',
	'audio',
	'video',
	'notes',
	'pages',
	'email',
	'stats',
	'status',
	'photos',
	'groups',
	'offers',
	'notify',
	'market',
	'offline',
	'friends',
	'messages',
	'questions',
	'notifications',
];

exports.AuthError = class AuthError extends Error {
	/**
	 * Конструктор
	 *
	 * @param object error Объект ошибки
	 */
	constructor (error) {
		super(error);
		this.name = this.constructor.name;

		this.message = error;

		Error.captureStackTrace(this,this.constructor.name);
	}
};

class Auth {
	/**
	 * Конструктор
	 *
	 * @param object setting
	 */
	constructor (setting) {
		this.setCookieJar(request.jar());
		this.setScope(setting.scope || fullScopes);

		for (var key of ['app','key','login','phone','pass','version']) {
			this[key] = setting[key] || null;
		}

		if (this.login === null) {
			this.login = this.phone;
		}
	}

	/**
	 * Устанавливает список разрешений
	 *
	 * @param mixed scope
	 *
	 * @return this
	 */
	setScope (scope) {
		if (Array.isArray(scope)) {
			this.scope = scope.join(',');
		} else {
			this.scope = scope;
		}

		return this;
	}

	/**
	 * Возвращает список разрешений
	 *
	 * @return array
	 */
	getScope () {
		return this.scope.split(',');
	}

	/**
	 * Установаливает хранилише cookie
	 *
	 * @param object cookie Хранилище cookie
	 *
	 * @return this
	 */
	setCookieJar (cookie) {
		this.jar = cookie;

		this.request = request.defaults({
			resolveWithFullResponse: true,
			followAllRedirects: true,
			method: 'POST',
			jar: this.jar,
			timeout: 6000,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36'
			}
		});

		return this;
	}

	/**
	 * Возвращает хранилище cookie
	 *
	 * @return object
	 */
	getCookieJar () {
		return this.jar;
	}
}

class StandloneAuth extends Auth {
	/**
	 * Выполняет авторизацию
	 *
	 * @return promise
	 */
	run () {
		return new promise((resolve,reject) => {
			this._getBlankPermission()
			.then(($) => {
				var script = $('script[type="text/javascript"][language="javascript"]').text();
				var grantAccess = script.match(/location\.href = \"(.*)\";/)[1].replace('&cancel=1','');

				return this.request(grantAccess);
			})
			.then((response) => {
				var hash = queryString.parse(response.request.uri.hash);

				if ('#access_token' in hash) {
					return resolve(hash['#access_token']);
				}

				reject(new exports.AuthError('Не удалось получить access token!'));
			})
			.catch(reject);
		});
	}

	/**
	 * Возвращает данные формы
	 *
	 * @param mixed $
	 *
	 * @return object
	 */
	_getFormsData ($) {
		if (!('html' in $)) {
			$ = cheerio($);
		}

		var $form = $('form[action][method="POST"]');
		var fileds = {};

		$form.find('input[name]').each(function(){
			var $elem = $(this);

			fileds[$elem.attr('name')] = $elem.val();
		});

		return {
			action: $form.attr('action'),
			fileds: fileds
		};
	}

	/**
	 * Возвращает бланк разршения
	 *
	 * @return promise
	 */
	_getBlankPermission () {
		return new promise((resolve,reject) => {
			this._getBlank()
			.then(($) => {
				if ($('#box').find('[name="pass"]').length === 0) {
					return resolve($);
				}

				this._parseAuthForm($)
				.then(resolve)
				.catch(reject);
			});
		});
	}

	/**
	 *
	 *
	 * @return promise
	 */
	_setSecurityNumber ($) {
		return new promise((resolve,reject) => {
			var $tr = $('#form_table tr:first-child');

			var prefix = parseInt($tr.find('.ta_r').text());
			var postfix = $tr.find('.phone_postfix').text().replace(/[^\d]/,'');

			var phone = (this.phone || this.login).trim().replace(/^(\+|00)/,'');

			phone = phone.replace(new RegExp('^'+prefix),'');
			phone = phone.replace(new RegExp(postfix+'$'),'');

			var hash = $('script').text().match(/hash: \'([a-z\d]+)\'/)[1];

			this.request({
				uri: 'vk.com/login.php',
				qs: {
					act: 'security_check'
				},
				form: {
					code: phone,
					al_page: 3,
					hash: hash,
					to: ''
				}
			})
			.then(() => {
				return this._getBlank();
			})
			.then(($) => {
				if ($('input[name="code"]').length === 0) {
					return resolve($);
				}

				reject(new exports.AuthError('Введён неверный номер телефона!'));
			})
			.catch(reject);
		});
	}

	/**
	 * Парсирит данные формы авторизации
	 *
	 * @param object $ Cheerio
	 *
	 * @return object
	 */
	_parseAuthForm ($) {
		return new promise((resolve,reject) => {
			var form = this._getFormsData($);

			form.fileds.email = this.login || this.phone;
			form.fileds.pass = this.pass;

			this.request({
				url: form.action,
				transform: cheerio,
				form: form.fileds
			})
			.then(($) => {
				if ($('.oauth_error').length > 0) {
					return reject(new exports.AuthError('Неправильный логин и пароль!'));
				}

				if ($('input[name="code"]').length > 0) {
					return this._setSecurityNumber($)
					.then(resolve)
					.catch(reject);
				}

				resolve($);
			})
			.catch(reject);
		});
	}

	/**
	 * Получает бланк авторизации или разрешения
	 *
	 * @return promise
	 */
	_getBlank () {
		return this.request({
			uri: 'https://oauth.vk.com/authorize',
			method: 'GET',
			qs: {
				redirect_uri: 'https://oauth.vk.com/blank.html',
				response_type: 'token',
				client_id: this.app,
				scope: this.scope,
				v: this.version,
				display: 'page',
				revoke: 1
			},
			transform: cheerio
		});
	}
}


class DirectAuth extends Auth {
	/**
	 * Конструктор
	 *
	 * @param object setting Настройки
	 */
	constructor (setting) {
		super(setting);

		this._capthaHandler = null;
		this._twoFactorHandler = null;
	}

	/**
	 * Выполняет прямую авторизацию вк
	 *
	 * @param
	 */
	run () {
		return new promise((resolve,reject) => {
			this._getToken()
			.then((data) => {
				if (!('error' in data) && 'access_token' in data) {
					var out = {
						user: data.user_id,
						token: data.access_token,
						expires: data.expires_in,
					};

					if ('email' in data) {
						out.email = data.email;
					}

					return resolve(out);
				}

				return reject(new exports.AuthError('Не удалось авторизоваться, ошибка: '+data.error));

				if (data.error === 'need_validation') {
					return this._needValidation(data)
					.then(() => {

					})
					.catch(reject);
				}
			});
		});
	}

	/**
	 * Устаналивает обработчик капчи
	 *
	 * @param function handler
	 *
	 * @return this
	 */
	setCaptchaHandler (handler) {
		this._capthaHandler = handler;

		return this;
	}

	/**
	 * Устанавливает обработчик двух факторной авторизации
	 *
	 * @param function handler
	 *
	 * @return this
	 */
	settwoFactorHandler (handler) {
		this._twoFactorHandler = handler;

		return this;
	}

	/**
	 * Двухфакторная авторизация
	 *
	 * @param
	 */
	_needValidation (data) {
		return new promise((resolve,reject) => {
			this.request({
				uri: data.redirect_uri,
				transform: cheerio,
				method: 'GET'
			})
			.then(($) => {

			});
		});
	}

	/**
	 * Получает данные авторизации
	 *
	 * @param object qs Параметры запроса
	 *
	 * @return promise
	 */
	_getToken (qs) {
		qs = qs || {};

		qs.username = this.login || this.phone;
		qs.client_secret = this.key;
		qs.grant_type = 'password';
		qs.client_id = this.app;
		qs.password = this.pass;
		qs['2fa_supported'] = 0;
		qs.scope = this.scope;
		qs.v = this.version;

		return this.request({
			uri: 'https://oauth.vk.com/token',
			resolveWithFullResponse: false,
			method: 'GET',
			json: true,
			qs: qs
		});
	}
}

/**
 * Авторизация standlone приложения
 *
 * @return StandloneAuth
 */
exports.standloneAuth = function(){
	var params = Object.assign({},this.settings);

	params.version = this.API_VERSION;

	return new StandloneAuth(params);
};

/**
 * Сборщик прямой авторизации
 *
 * @param object app
 *
 * @return DirectAuth
 */
exports._directAuth = function(app){
	var params = Object.assign({},this.settings);

	params.version = this.API_VERSION;

	params.app = app.id;
	params.key = app.key;

	return new DirectAuth(params);
};

/**
 * Прямая авторизация android
 *
 * @return DirectAuth
 */
exports.androidAuth = function(){
	return this._directAuth({
		id: 2274003,
		key: 'hHbZxrka2uZ6jB1inYsH'
	});
};

/**
 * Прямая авторизация windows
 *
 * @return DirectAuth
 */
exports.windowsAuth = function(){
	return this._directAuth({
		id: 3697615,
		key: 'AlVXZFMUqyrnABp8ncuU'
	});
};

/**
 * Прямая авторизация windows phone
 *
 * @return DirectAuth
 */
exports.windowsPhoneAuth = function(){
	return this._directAuth({
		id: 3502557,
		key: 'PEObAuQi6KloPM4T30DV'
	});
};

/**
 * Прямая авторизация iphone
 *
 * @return DirectAuth
 */
exports.iphoneAuth = function(){
	return this._directAuth({
		id: 3140623,
		key: 'VeWdmVclDCtn6ihuP1nt'
	});
};

/**
 * Прямая авторизация ipad
 *
 * @return DirectAuth
 */
exports.ipadAuth = function(){
	return this._directAuth({
		id: 3682744,
		key: 'mY6CDUswIVdJLCD3j15n'
	});
};
