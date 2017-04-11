'use strict';

const Promise = require('bluebird');
const request = require('request-promise');
const url = require('url');

const Api = require('./api/index');
const Auth = require('./auth/index');
const Logger = require('./util/logger');
const Chain = require('./execute/chain');
const Upload = require('./upload/index');
const Collect = require('./execute/collect');
const Longpoll = require('./longpoll/index');

const parseLink = require('./snippets/link');
const {
	defaultMainOptions,
	MAX_SCOPE,
	API_VERSION
} = require('./util/constants');
const {
	getAttachment,
	getSmallPhoto,
	getMediumPhoto,
	getLargePhoto
} = require('./snippets/attachments');

/**
 * Класс обёртки ВКонтакте
 *
 * @public
 */
class VK {
	/**
	 * Конструктор
	 *
	 * @param {MainOptions} options
	 */
	constructor (options = {}) {
		this.options = Object.assign({}, defaultMainOptions);
		this.request = request.defaults({
			method: 'POST',
			json: true
		});

		this.api = new Api(this);
		this.logger = new Logger;
		this.auth = new Auth(this);
		this.upload = new Upload(this);
		this.collect = new Collect(this);
		this.longpoll = new Longpoll(this);

		this._captchaHandler = null;

		this.setOptions(options);
	}

	/**
	 * Возвращает текущую версию API
	 *
	 * @return {string}
	 */
	get API_VERSION () {
		return API_VERSION;
	}

	/**
	 * Устанавливает токен
	 *
	 * @param {string} token
	 *
	 * @return {this}
	 */
	setToken (token) {
		this.options.token = token;

		return this;
	}

	/**
	 * Устанавливает опции
	 *
	 * @param {Object} options
	 *
	 * @return {this}
	 */
	setOptions (options) {
		Object.assign(
			this.options,
			this._transformOptions(options)
		);

		return this;
	}

	/**
	 * Устанавливает обработчик капчи
	 *
	 * @param {?function} handler
	 *
	 * @return {this}
	 */
	setCaptchaHandler (handler) {
		this._captchaHandler = handler;

		return this;
	}

	/**
	 * Возвращает класс для работы с цепочками методов
	 *
	 * @return {Chain}
	 */
	chain () {
		return new Chain(this);
	}

	/**
	 * Вызов хранимой процедуры
	 *
	 * @param {string} name
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	procedure (name, params) {
		return this.api.call(`execute.${name}`, params);
	}

	/**
	 * Упрощённый вызов целой цепочки метода
	 *
	 * @param {string} method
	 * @param {Array}  queues
	 *
	 * @return {Promise}
	 */
	executes (method, queues) {
		return Chain.executes(this, method, queues);
	}

	/**
	 * Разбирает ссылку ВКонтакте
	 *
	 * @param {string} uri
	 *
	 * @return {Promise}
	 */
	parseLink (uri) {
		return parseLink(this.api, uri);
	}

	/**
	 * Возвращает токен
	 *
	 * @return {?string}
	 */
	getToken () {
		return this.options.token;
	}

	/**
	 * Собирает прикрипление из переданных значений
	 *
	 * @param {string} type
	 * @param {mixed}  attachments
	 *
	 * @return {mixed}
	 */
	getAttachment (type, attachments) {
		type = type.toLowerCase();

		if (!Array.isArray(attachments)) {
			return getAttachment(type, attachments);
		}

		return attachments.map((attachment) => getAttachment(type, attachment));
	}

	/**
	 * Возвращает ссылку на маленькую фотографию
	 *
	 * @param {Object} photo
	 *
	 * @return {string}
	 */
	getSmallPhoto (photo) {
		return getSmallPhoto(photo);
	}

	/**
	 * Возвращает ссылку на среднюю фотографию
	 *
	 * @param {Object} photo
	 *
	 * @return {string}
	 */
	getMediumPhoto (photo) {
		return getMediumPhoto(photo);
	}

	/**
	 * Возвращает ссылку на большую фотографию
	 *
	 * @param {Object} photo
	 *
	 * @return {string}
	 */
	getLargePhoto (photo) {
		return getLargePhoto(photo);
	}

	/**
	 * Разбирает опции
	 *
	 * @param {Object} options
	 *
	 * @return {Object}
	 */
	_transformOptions (options) {
		options = Object.assign({}, options);

		if ('id' in options) {
			options.id = +options.id;
		}

		if ('scope' in options) {
			if (Array.isArray(options.scope)) {
				options.scope = options.scope.join(',');
			} else if (options.scope === 'all') {
				options.scope = MAX_SCOPE.join(',');
			}
		}

		if ('proxy' in options) {
			let proxy = options.proxy;
			delete options.proxy;

			/* На случай лайфхака :/ */
			if (!proxy.startsWith('http')) {
				proxy = 'http://' + proxy;
			}

			const { protocol, auth, host, path } = url.parse(proxy);

			const params = {};

			if (auth !== null) {
				params.headers = {
					'Proxy-Authorization': 'Basic ' + Buffer.from(auth).toString('base64')
				};
			}

			params.proxy = `${protocol}//${host}${path || ''}`;

			this.request = this.request.defaults(params);
		}

		return options;
	}

	/** Дальше устаревшее */

	setting (settings) {
		this.logger.warn('main', 'vk.setting deprecated, use vk.setOptions');

		return this.setOptions(settings);
	}

	isMethod (method) {
		this.logger.warn('main', 'vk.isMethod deprecated, use vk.api.isMethod');

		return this.api.isMethod(method);
	}

	standaloneAuth () {
		this.logger.warn('main', 'vk.standaloneAuth deprecated, use vk.auth.standalone');

		return this.auth.standalone();
	}

	appAuth () {
		this.logger.warn('main', 'vk.appAuth deprecated, use vk.auth.server');

		return this.auth.server();
	}

	androidAuth () {
		this.logger.warn('main', 'vk.androidAuth deprecated, use vk.auth.android');

		return this.auth.android();
	}

	windowsAuth () {
		this.logger.warn('main', 'vk.windowsAuth deprecated, use vk.auth.windows');

		return this.auth.windows();
	}

	windowsPhoneAuth () {
		this.logger.warn('main', 'vk.windowsPhoneAuth deprecated, use vk.auth.windowsPhone');

		return this.auth.windowsPhone();
	}

	iphoneAuth () {
		this.logger.warn('main', 'vk.iphoneAuth deprecated, use vk.auth.iphone');

		return this.auth.iphone();
	}

	ipadAuth () {
		this.logger.warn('main', 'vk.ipadAuth deprecated, use vk.auth.ipad');

		return this.auth.ipad();
	}

	get stream () {
		this.logger.warn('main', 'vk.stream deprecated, use vk.collect');

		return this.collect;
	}
}

module.exports = VK;
