'use strict';

const Promise = require('bluebird');
const cheerio = require('cheerio').load;
const request = require('request-promise');
const queryString = require('querystring');

/* Удалить */
const write = require('fs').writeFileSync;

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
	'notifications'
];

/**
 * Ошибка авторизации
 */
class AuthError extends Error {
	/**
	 * Конструктор
	 *
	 * @param object error Объект ошибки
	 */
	constructor (error) {
		super(error);
		this.name = this.constructor.name;

		this.message = error;

		if (Error.captureStackTrace) {
			Error.captureStackTrace(this,this.constructor.name);
		}
	}
};

exports.AuthError = AuthError;

/**
 * Основа для методов авторизации
 */
class Auth {
	/**
	 * Конструктор
	 *
	 * @param object setting
	 */
	constructor (setting) {
		this.setCookieJar(request.jar());
		this.setScope(setting.scope || fullScopes);

		for (var key of ['app','key','login','phone','pass','version','proxy']) {
			this[key] = setting[key] || null;
		}

		if (this.login === null) {
			this.login = this.phone;
		}

		this._capthaHandler = null;
		this._twoFactorHandler = null;
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
			proxy: this.proxy,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36'
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

	/**
	 * Устанавливает обработчик двух факторной авторизации
	 *
	 * @param function handler
	 *
	 * @return this
	 */
	setTwoFactorHandler (handler) {
		this._twoFactorHandler = handler;

		return this;
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
}

/**
 * Авторизация standalone приложения
 */
class StandaloneAuth extends Auth {
	/**
	 * Выполняет авторизацию
	 *
	 * @return Promise
	 */
	run () {
		return this._getBlankPermission()
		.then(($) => {
			var script = $('script[type="text/javascript"][language="javascript"]').text();
			var grantAccess = script.match(/location\.href = \"(.+)\";/);

			if (grantAccess === null || !(1 in grantAccess)) {
				throw new AuthError('Не удалось получить ссылку grant access token!');
			}

			return this.request(grantAccess[1].replace('&cancel=1',''));
		})
		.then((response) => {
			var hash = queryString.parse(response.request.uri.hash);

			if ('#access_token' in hash) {
				return hash['#access_token'];
			}

			return new AuthError('Не удалось получить access token!');
		});
	}

	/**
	 * Возвращает данные формы
	 *
	 * @param mixed  $
	 *
	 * @return object
	 */
	_getFormsData ($) {
		if (!('html' in $)) {
			$ = cheerio($);
		}

		var $form = $('form[action][method]');
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
	 * @return Promise
	 */
	_getBlankPermission () {
		return this._getBlank()
		.then(($) => {
			if ($('#login_submit').find('[name="pass"]').length === 0) {
				return $;
			}

			return this._parseAuthForm($)
		});
	}

	/**
	 * Обрабатывает двух-факторную защиту
	 *
	 * @param object $
	 */
	_twoFactor ($) {
		throw new AuthError('Двухфакторная авторизация отсутствует в модуле!');

		if (!this._twoFactorHandler) {
			throw new AuthError('Отсутствует обработчик двухфакторной защиты!');
		}

		var form = this._getFormsData($);

		return new Promise((resolve,reject) => {
			this._twoFactorHandler((code) => {
				form.fileds.code = code;
				form.fileds.remember = 1;

				return this.request({
					uri: 'https://vk.com'+form.action,
					form: form.fileds,
					transform: cheerio
				})
				.then(($) => {
					if ($('.service_msg_box').length !== 0) {
						throw new Error('Присутствует сообщение об ошибке!');
					}

					return this._parseAuthForm($);
				})
				.then(resolve)
				.catch((error) => {
					reject(error);

					throw error;
				});
			});
		})
		.then(() => this._getBlank())
		.catch((error) => {
			console.log(error);

			throw new AuthError('Двухфакторная авторизация провалена!');
		});
	}

	/**
	 * Обход проверки телефона
	 *
	 * @return Promise
	 */
	_setSecurityNumber ($) {
		var phone = this.phone || this.login;

		phone = phone.toString().trim().replace(/^(\+|00)/,'');

		var $field = $('.field_prefix');

		var prefix = parseInt($field.first().text());
		var postfix = parseInt($field.last().text());

		phone = phone.replace(new RegExp('^'+prefix),'');
		phone = phone.replace(new RegExp(postfix+'$'),'');

		var form = this._getFormsData($);

		form.fileds.code = phone;

		return this.request({
			uri: 'https://vk.com'+form.action,
			form: form.fileds
		})
		.then(() => this._getBlank())
		.then(($) => {
			if ($('input[name="code"]').length === 0) {
				return $;
			}

			throw new AuthError('Введён неверный номер телефона!');
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
		var form = this._getFormsData($);

		form.fileds.email = this.login || this.phone;
		form.fileds.pass = this.pass;

		return this.request({
			uri: form.action,
			transform: cheerio,
			form: form.fileds
		})
		.then(($) => {
			if ($('#login_submit.box_error').length !== 0) {
				throw new AuthError('Неверный логин или пароль!');
			}

			if ($('input[name="remember"]').length !== 0) {
				return this._twoFactor($);
			}

			if ($('input[name="code"]').length !== 0) {
				return this._setSecurityNumber($);
			}

			return $;
		});
	}

	/**
	 * Получает бланк авторизации или разрешения
	 *
	 * @return Promise
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

/**
 * Авторизация через официальные приложения
 */
class DirectAuth extends Auth {
	/**
	 * Выполняет прямую авторизацию вк
	 */
	run () {
		return this._getToken()
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

				return out;
			}

			throw new AuthError('Не удалось авторизоваться, ошибка: '+data.error);

			/* TODO: Сделать двухфакторную авторизацию */
			if (data.error === 'need_validation') {
				return this._needValidation(data);
			}
		});
	}

	/**
	 * Двухфакторная авторизация
	 *
	 * @param object data
	 *
	 * @return Promise
	 */
	_needValidation (data) {
		return this.request({
			uri: data.redirect_uri,
			transform: cheerio,
			method: 'GET'
		})
		.then(($) => {

		});
	}

	/**
	 * Получает данные авторизации
	 *
	 * @param object qs Параметры запроса
	 *
	 * @return Promise
	 */
	_getToken (qs = {}) {
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
 * @return StandaloneAuth
 */
exports.standaloneAuth = function(){
	var params = Object.assign({},this.settings);

	params.version = this.API_VERSION;

	return new StandaloneAuth(params);
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
