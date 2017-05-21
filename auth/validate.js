'use strict';

const Promise = require('bluebird');
const cheerio = require('cheerio').load;
const request = require('request-promise');
const debug = require('debug')('vk-io:auth');

const AuthError = require('../errors/auth');
const RequestError = require('../errors/request');
const { USER_AGENT, AUTH_ERRORS } = require('../util/constants');

const { parseForm, parseSecurityForm } = require('./helpers');

/**
 * Валидация пользователя
 *
 * @private
 */
class Validate {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;

		this.jar = request.jar();
	}

	/**
	 * Запускает валидацию
	 *
	 * @param {string} redirectUri
	 *
	 * @return {Promise<string>}
	 */
	run (redirectUri) {
		this._request = this.vk.request.defaults({
			json: false,
			jar: this.jar,
			followAllRedirects: true,
			resolveWithFullResponse: true,
			headers: {
				'User-Agent': USER_AGENT
			}
		});

		return this.request({
			uri: redirectUri,
			method: 'GET'
		})
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
	 * Выполняет запрос
	 *
	 * @param {Object} options
	 *
	 * @return {Promise<string>}
	 */
	request (options) {
		return this._request(options)
		.catch((error) => {
			throw new RequestError(error);
		});
	}

	/**
	 * Выбирает нужное действие
	 *
	 * @param {Object}  response
	 * @param {Cheerio} $
	 *
	 * @return {Promise<string>}
	 */
	_route (response, $ = cheerio(response.body)) {
		if (response.request.href.includes('blank.html#')) {
			return response;
		}

		if ($('input[name="code"]').length !== 0) {
			const { action, fields } = parseForm($);

			if (action.includes('act=authcheck_code')) {
				debug('Processes the authorization code');

				return Promise.reject(
					new AuthError({
						message: 'Verification of authorization code is not supported',
						code: AUTHORIZATION_FAILED
					})
				);
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

		return Promise.reject(new AuthError({
			message: 'Unknown verification type',
			code: AUTHORIZATION_FAILED
		}));
	}

	/**
	 * Проверка номера телефона при заходе с других мест
	 *
	 * @param {Object}  response
	 * @param {Cheerio} $
	 *
	 * @return {Promise<string>}
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
}

module.exports = Validate;
