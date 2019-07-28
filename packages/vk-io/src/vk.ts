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

	protected callbackService = new CallbackService(this);

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
	set captchaHandler(handler: Function) {
		this.callbackService.captchaHandler = handler;
	}

	/**
	 * Sets two-factor handler
	 *
	 * ```ts
	 * vk.twoFactorHandler = (payload, retry) => {...};
	 * ```
	 */
	set twoFactorHandler(handler: Function) {
		this.callbackService.twoFactorHandler = handler;
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[inspect.custom](depth: number, options: Record<string, any>): string {
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
