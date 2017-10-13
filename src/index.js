import { Agent } from 'https';
import { inspect } from 'util';

import API from './api';
import Auth from './auth';
import Upload from './upload';
import Collect from './collect';
import Updates from './updates';
import StreamingAPI from './streaming';
import { defaultOptions } from './util/constants';

export * from './errors';

/**
 * Main class
 *
 * @public
 */
export class VK {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options = {}) {
		this.options = {
			...defaultOptions,

			agent: new Agent({
				keepAlive: true,
				keepAliveMsecs: 10000
			})
		};

		this.setOptions(options);

		this.api = new API(this);
		this.auth = new Auth(this);
		this.upload = new Upload(this);
		this.collect = new Collect(this);
		this.updates = new Updates(this);
		this.streaming = new StreamingAPI(this);

		this.captchaHandler = null;
		this.twoFactorHandler = null;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'VK';
	}

	/**
	 * Sets options
	 *
	 * @param {Object} options
	 *
	 * @return {this}
	 */
	setOptions(options) {
		Object.assign(this.options, options);

		return this;
	}

	/**
	 * Sets token
	 *
	 * @param {string} token
	 *
	 * @return {this}
	 */
	setToken(token) {
		this.options.token = token;

		return this;
	}

	/**
	 * Returns token
	 *
	 * @return {?string}
	 */
	getToken() {
		return this.options.token;
	}

	/**
	 * Sets captcha handler
	 *
	 * @param {?Function} handler
	 *
	 * @return {this}
	 */
	setCaptchaHandler(handler) {
		this.captchaHandler = handler;

		return this;
	}

	/**
	 * Sets two-factor handler
	 *
	 * @param {?Function} handler
	 *
	 * @return {this}
	 */
	setTwoFactorHandler(handler) {
		this.twoFactorHandler = handler;

		return this;
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		const {
			api,
			updates,
			streaming,
			captchaHandler,
			twoFactorHandler
		} = this;

		const {
			app,
			token,
			login,
			phone
		} = this.options;

		const payload = {
			options: {
				app,
				login,
				phone,
				token
			},
			captchaHandler,
			twoFactorHandler,
			api,
			updates,
			streaming
		};

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
