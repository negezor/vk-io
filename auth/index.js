'use strict';

const DirectAuth = require('./direct');
const StandaloneAuth = require('./standalone');

const AuthError = require('../errors/auth');
const RequestError = require('../errors/request');

const { API_VERSION, AUTH_ERRORS } = require('../util/constants');

/**
 * Содержит в себе методы для работы с авторизацией
 *
 * @public
 */
class Auth {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;
	}

	/**
	 * Возвращает константы ошибок авторизации
	 *
	 * @return {Object}
	 */
	get AUTH_ERRORS () {
		return AUTH_ERRORS;
	}

	/**
	 * Автономная авторизация
	 *
	 * @return {StandaloneAuth}
	 */
	standalone () {
		return new StandaloneAuth(this.vk);
	}

	/**
	 * Официальное приложение android
	 *
	 * @return {DirectAuth}
	 */
	android () {
		return new DirectAuth(this.vk, {
			app: 2274003,
			key: 'hHbZxrka2uZ6jB1inYsH'
		});
	}

	/**
	 * Официальное приложение windows
	 *
	 * @return {DirectAuth}
	 */
	windows () {
		return new DirectAuth(this.vk, {
			app: 3697615,
			key: 'AlVXZFMUqyrnABp8ncuU'
		});
	}

	/**
	 * Официальное приложение windowsPhone
	 *
	 * @return {DirectAuth}
	 */
	windowsPhone () {
		return new DirectAuth(this.vk, {
			app: 3502557,
			key: 'PEObAuQi6KloPM4T30DV'
		});
	}

	/**
	 * Официальное приложение iPhone
	 *
	 * @return {DirectAuth}
	 */
	iphone () {
		return new DirectAuth(this.vk, {
			app: 3140623,
			key: 'VeWdmVclDCtn6ihuP1nt'
		});
	}

	/**
	 * Официальное приложение iPad
	 *
	 * @return {DirectAuth}
	 */
	ipad () {
		return new DirectAuth(this.vk, {
			app: 3682744,
			key: 'mY6CDUswIVdJLCD3j15n'
		});
	}

	/**
	 * Серверная авторизация
	 *
	 * @return {Promise}
	 */
	server () {
		const { key, app } = this.vk.options;

		return this.vk.request({
			uri: 'https://oauth.vk.com/access_token',
			qs: {
				grant_type: 'client_credentials',
				client_secret: key,
				client_id: app,
				v: API_VERSION
			},
			simple: false
		})
		.catch((error) => {
			throw new RequestError(error);
		})
		.then((response) => {
			if ('error' in response) {
				throw new AuthError({
					message: response.error + ', ' + response.error_description
				});
			}

			return response.access_token;
		});
	}
}

module.exports = Auth;
