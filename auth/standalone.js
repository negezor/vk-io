'use strict';

const Promise = require('bluebird');
const cheerio = require('cheerio').load;
const request = require('request-promise');
const debug = require('debug')('vk-io:auth');
const parseQuery = require('querystring').parse;

const AuthError = require('../errors/auth');
const RequestError = require('../errors/request');
const { API_VERSION, USER_AGENT, AUTH_ERRORS } = require('../util/constants');
const {
	parseForm,
	decodeCp1251,
	parseSecurityForm
} = require('./helpers');

const {
	PAGE_BLOCKED,
	MISSING_CAPTCHA,
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED
} = AUTH_ERRORS;

/**
 * Автономное приложение
 *
 * @public
 */
class StandaloneAuth {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;

		this.jar = request.jar();

		this._captchaAttempts = 0;
	}

	/**
	 * Возвращает CookieJar
	 *
	 * @return {CookieJar}
	 */
	getCookieJar () {
		return this.jar;
	}

	/**
	 * Устанавливает CookieJar
	 * Вызывать до авторизации
	 *
	 * @param {CookieJar} jar
	 *
	 * @return {this}
	 */
	setCookieJar (jar) {
		this.jar = jar;

		return this;
	}

	/**
	 * Возвращает Cookie
	 * vk.com - Для основного домена
	 * login.vk.com - Для поддомена с авторизацией
	 *
	 * @return {Object}
	 */
	getCookie () {
		return {
			'login.vk.com': this.jar.getCookieString('https://login.vk.com'),
			'vk.com': this.jar.getCookieString('https://vk.com')
		};
	}

	/**
	 * Выполняет запрос
	 *
	 * @param {Object} options
	 *
	 * @return {Promise}
	 */
	request (options) {
		return this._request(options)
		.catch((error) => {
			const { response } = error;

			if (typeof response === 'object' && 'body' in response) {
				let body;

				try {
					body = JSON.parse(response.body);
				} catch (e) {
					throw new RequestError(error);
				}

				throw new AuthError({
					message: body.error + ', ' + body.error_description,
					code: AUTHORIZATION_FAILED
				});
			}

			throw new RequestError(error);
		});
	}

	/**
	 * Запускает авторизацию
	 *
	 * @return {Promise}
	 */
	run () {
		this._request = this.vk.request.defaults({
			json: false,
			jar: this.jar,
			followAllRedirects: true,
			resolveWithFullResponse: true,
			headers: {
				'User-Agent': USER_AGENT
			}
		});

		return this._getBlank()
		.then((response) => (
			this._route(response)
		))
		.then((response) => {
			const hash = parseQuery((response.request.uri.hash || '').replace(/^#/, ''));

			if ('access_token' in hash) {
				return hash.access_token;
			}

			throw new AuthError({
				message: 'Failed to get token',
				code: AUTHORIZATION_FAILED
			});
		});
	}

	/**
	 * Выбирает нужное действие
	 *
	 * @param {Object} response
	 * @param {Cheeri} $
	 *
	 * @return {Promise}
	 */
	_route (response, $ = cheerio(response.body)) {
		if ($('input[name="pass"]').length !== 0) {
			debug('Parse the authorization form');

			return this._parseAuthForm(response, $);
		}

		if ($('input[name="code"]').length !== 0) {
			const { action, fields } = parseForm($);

			if (action.includes('act=authcheck_code')) {
				debug('Processes the authorization code');

				return this._authCheckCode(action, fields);
			}

			if (action.includes('act=security_check')) {
				debug('Processes the authorization confirm number');

				return this._securityPhoneCheck(response, $);
			}

			return Promise.reject(new AuthError({
				message: 'Unknown type of authorization check',
				code: AUTHORIZATION_FAILED
			}));
		}

		const { path } = response.request.uri;

		if (path && path.includes('act=blocked')) {
			return Promise.reject(new AuthError({
				message: 'Page blocked',
				code: PAGE_BLOCKED
			}));
		}

		debug('Getting an address for proof of rights');

		const script = $('script[type="text/javascript"][language="javascript"]').text();
		const locations = script.match(/location\.href\s+=\s+\"([^\"]+)\"/i);

		if (locations !== null) {
			return this.request({
				uri: locations[1].replace('&cancel=1', '')
			});
		}

		return Promise.reject(new AuthError({
			message: 'Could not log in',
			code: AUTHORIZATION_FAILED
		}));
	}

	/**
	 * Проверка номера телефона при заходе с других мест
	 *
	 * @param {Object} response
	 * @param {Cheeri} $
	 *
	 * @return {Promise}
	 */
	_securityPhoneCheck (response, $) {
		const { action, fields } = parseSecurityForm(response, this.vk.options, $);

		return this.request({
			uri: action,
			form: fields,
			method: 'POST'
		})
		.then((response) => {
			const $ = cheerio(response.body);

			if ($('input[name="code"]').length !== 0) {
				throw new AuthError({
					message: 'Invalid phone number',
					code: INVALID_PHONE_NUMBER
				});
			}

			return this._route(response, $);
		});
	}

	/**
	 * Проверяет код для авторизации через приложение
	 *
	 * @param {string} action
	 * @param {Object} fields
	 *
	 * @return {Promise}
	 */
	_authCheckCode (action, fields) {
		return Promise.reject(
			new AuthError({
				message: 'Verification of authorization code is not supported',
				code: AUTHORIZATION_FAILED
			})
		);
	}

	/**
	 * Обрабатывает форму авторизации
	 *
	 * @param {Object}  response
	 * @param {Cheerio} $
	 *
	 * @return {Promise}
	 */
	_parseAuthForm (response, $) {
		const { action, fields } = parseForm($);

		const { login, phone, pass } = this.vk.options;

		fields.email = login || phone;
		fields.pass = pass;

		if ('captcha_sid' in fields) {
			const src = $('.oauth_captcha').attr('src');

			return this._passageCaptcha(action, fields, src);
		}

		return this._sendAuthForm(action, fields)
		.then((response) => {
			const $ = cheerio(response.body);

			const $error = $('.box_error');

			if ($error.length !== 0) {
				throw new AuthError({
					message: 'Auth form error: ' + decodeCp1251($error.text()),
					code: AUTHORIZATION_FAILED
				});
			}

			return this._route(response, $);
		});
	}

	/**
	 * Отправляет форму авторизации
	 *
	 * @param {string} action
	 * @param {Object} fields
	 *
	 * @return {Promise}
	 */
	_sendAuthForm (action, fields) {
		return this.request({
			uri: action,
			form: fields,
			method: 'POST',
			encoding: 'binary'
		});
	}

	/**
	 * Проходит капчу
	 *
	 * @param {string} action
	 * @param {Object} fields
	 * @param {Object} src
	 *
	 * @return {Promise}
	 */
	_passageCaptcha (action, fields, src) {
		if (this.vk._captchaHandler === null) {
			return Promise.reject(new AuthError({
				message: 'Missing captcha handler',
				code: MISSING_CAPTCHA
			}));
		}

		if (this._captchaAttempts >= this.vk.options.authCaptcha) {
			return Promise.reject(new AuthError({
				message: 'Maximum attempts passage captcha',
				code: AUTHORIZATION_FAILED
			}));
		}

		return new Promise((resolve, reject) => {
			this.vk._captchaHandler(src, fields.captcha_sid, (key) => (
				new Promise((resolveCaptcha, rejectCaptcha) => {
					fields.captcha_key = key;

					this._sendAuthForm(action, fields)
					.then((response) => {
						const $ = cheerio(response.body);

						const $error = $('.box_error');

						if ($error.length === 0) {
							resolveCaptcha();

							this._route(response, $)
							.then(resolve)
							.catch(reject);

							return null;
						}

						rejectCaptcha();

						const text = decodeCp1251($error.text());

						if (!text.includes('Код с картинки введён неверно')) {
							return reject(new AuthError({
								message: 'Auth form error: ' + text,
								code: AUTHORIZATION_FAILED
							}));
						}

						debug('Captcha incorrect');

						this._parseAuthForm(response, $)
						.then(resolve)
						.catch(reject);

						return null;
					})
					.catch((error) => {
						reject(error);
						rejectCaptcha(error);
					});
				})
			));
		});
	}

	/**
	 * Получает бланк авторизации
	 *
	 * @return {Promise}
	 */
	_getBlank () {
		const { app, scope } = this.vk.options;

		return this.request({
			uri: 'https://oauth.vk.com/authorize',
			method: 'GET',
			qs: {
				redirect_uri: 'https://oauth.vk.com/blank.html',
				grant_type: 'client_credentials',
				response_type: 'token',
				display: 'page',
				client_id: app,
				v: API_VERSION,
				scope: scope,
				revoke: 1
			}
		});
	}
}

module.exports = StandaloneAuth;
