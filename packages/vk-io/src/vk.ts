import { Agent } from 'https';
import { inspect } from 'util';

import API from './api';
import Auth from './auth';
import Upload from './upload';
import Collect from './collect';
import Updates from './updates';
import Snippets from './snippets';
import StreamingAPI from './streaming';
import CallbackService from './utils/callback-service';

import { IVKOptions } from './types';

import { defaultOptions } from './utils/constants';

/**
 * Main class
 *
 * @public
 */
export default class VK {
	options: IVKOptions = {
		...defaultOptions,

		agent: new Agent({
			keepAlive: true,

			keepAliveMsecs: 10000
		})
	};

	api = new API(this);

	auth = new Auth(this);

	upload = new Upload(this);

	collect = new Collect(this);

	updates = new Updates(this);

	snippets = new Snippets(this);

	streaming = new StreamingAPI(this);

	callbackService = new CallbackService(this);

	/**
	 * Constructor
	 */
	constructor(options: Partial<IVKOptions> = {}) {
		this.setOptions(options);
	}

	/**
	 * Returns custom tag
	 */
	get [Symbol.toStringTag](): string {
		return 'VK';
	}

	/**
	 * Sets options
	 */
	setOptions(options: Partial<IVKOptions>): this {
		Object.assign(this.options, options);

		return this;
	}

	/**
	 * Sets token
	 */
	set token(token) {
		this.options.token = token;
	}

	/**
	 * Returns token
	 */
	get token(): string | null {
		return this.options.token;
	}

	/**
	 * Sets captcha handler
	 *
	 * ```ts
	 * vk.captchaHandler = (payload, retry) => {...};
	 * ```
	 */
	set captchaHandler(handler) {
		this.callbackService.captchaHandler = handler;
	}

	/**
	 * Sets two-factor handler
	 *
	 * ```ts
	 * vk.twoFactorHandler = (payload, retry) => {...};
	 * ```
	 */
	set twoFactorHandler(handler) {
		this.callbackService.twoFactorHandler = handler;
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options): string {
		const { name } = this.constructor;

		const {
			api,
			updates,
			streaming
		} = this;

		const {
			appId,
			token,
			login,
			phone
		} = this.options;

		const payload = {
			options: {
				appId,
				login,
				phone,
				token
			},
			api,
			updates,
			streaming
		};

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
