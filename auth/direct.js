'use strict';

const Promise = require('bluebird');
const cheerio = require('cheerio').load;
const debug = require('debug')('vk-io:auth');
const parseQuery = require('querystring').parse;

const AuthError = require('../errors/auth');
const RequestError = require('../errors/request');
const { parseForm, parseSecurityForm } = require('./helpers');
const { API_VERSION, USER_AGENT, AUTH_ERRORS } = require('../util/constants');

const {
	PAGE_BLOCKED,
	MISSING_CAPTCHA,
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED
} = AUTH_ERRORS;

/**
 * Прямая авторизация
 *
 * @public
 */
class DirectAuth {
	/**
	 * Конструктор
	 *
	 * @param {VK}     vk
	 * @param {Object} options
	 */
	constructor (vk, { app, key }) {
		this.vk = vk;

		this.app = app;
		this.key = key;

		this._captchaAttempts = 0;
	}

	/**
	 * Делает запрос
	 *
	 * @param {Object} options
	 *
	 * @return {Promise}
	 */
	request (options) {
		return this._request(options)
		.catch((error) => {
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
			followAllRedirects: true,
			resolveWithFullResponse: true,
			headers: {
				'User-Agent': USER_AGENT
			}
		});

		return this._getToken()
		.then((response) => (
			this._route(response)
		));
	}

	/**
	 * Производит действия с авторизаций
	 *
	 * @param {Object} response
	 *
	 * @return {Promise}
	 */
	_route (response) {
		if (!('error' in response)) {
			const params = {
				user: +response.user_id,
				token: response.access_token,
				expires: +response.expires_in
			};

			if ('email' in response) {
				params.email = response.email;
			}

			return Promise.resolve(params);
		}

		if (response.error === 'need_captcha') {
			debug('Captcha processing');

			return this._passageCaptcha(response);
		}

		if (response.error === 'need_validation') {
			debug('Processes the authorization confirm number');

			return this._securityPhoneCheck(response);
		}

		return Promise.reject(new AuthError({
			message: response.error,
			code: AUTHORIZATION_FAILED
		}));
	}

	/**
	 * Прохождение валидации телефона
	 *
	 * @param {Object} response
	 *
	 * @return {Promise}
	 */
	_securityPhoneCheck ({ redirect_uri: redirect }) {
		if (redirect.includes('act=blocked')) {
			return Promise.reject(new AuthError({
				message: 'Page blocked',
				code: PAGE_BLOCKED
			}));
		}

		return this.request({
			uri: redirect,
			method: 'GET',
			json: false
		})
		.then((response) => {
			const { action, fields } = parseSecurityForm(response, this.vk.options);

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

				const hash = parseQuery((response.request.uri.hash || '').replace(/^#/, ''));

				if ('success' in hash && 'access_token' in hash) {
					return {
						user: +hash.user_id,
						token: hash.access_token,
						expires: +response.expires_in || 0
					};
				}

				throw new AuthError({
					message: 'Failed to get token',
					code: AUTHORIZATION_FAILED
				});
			});
		});
	}

	/**
	 * Обработка капчи
	 *
	 * @param {Object} response
	 *
	 * @return {Promise}
	 */
	_passageCaptcha ({ captcha_sid: sid, captcha_img: img }) {
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
			this.vk._captchaHandler(img, sid, (key) => (
				new Promise((resolveCaptcha, rejectCaptcha) => {
					this._getToken({
						captcha_sid: sid,
						captcha_key: key
					})
					.then((response) => {
						if ('error' in response && 'captcha_img' in response) {
							rejectCaptcha();

							this._passageCaptcha(response)
							.then(resolve)
							.catch(reject);

							return null;
						}

						resolveCaptcha();

						this._route(response)
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
	 * Запрашивает данные для токена
	 *
	 * @return {Promise}
	 */
	_getToken (qs = {}) {
		const { login, phone, pass, scope } = this.vk.options;

		return this.vk.request({
			uri: 'https://oauth.vk.com/token',
			method: 'GET',
			qs: Object.assign({}, {
				grant_type: 'password',
				client_secret: this.key,
				client_id: this.app,
				'2fa_supported': 0,
				username: login || phone,
				password: pass,
				v: API_VERSION,
				scope
			}, qs),
			simple: false
		})
		.catch((error) => {
			throw new RequestError(error);
		});
	}
}

module.exports = DirectAuth;
