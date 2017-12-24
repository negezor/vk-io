import fetch from 'node-fetch';
import createDebug from 'debug';

import { inspect } from 'util';
import { URL, URLSearchParams } from 'url';

import Request from './request';
import methods from './methods';
import { APIError, ExecuteError } from '../errors';
import { getRandomId, delay } from '../util/helpers';
import AccountVerification from '../auth/account-verification';
import { sequential, parallel, parallelSelected } from './workers';
import { API_VERSION, apiErrors, captchaTypes } from '../util/constants';

const {
	CAPTCHA_REQUIRED,
	TOO_MANY_REQUESTS,
	USER_VALIDATION_REQUIRED
} = apiErrors;

const debug = createDebug('vk-io:api');

/**
 * Working with API methods
 *
 * @public
 */
export default class API {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.queue = [];
		this.started = false;
		this.suspended = false;

		for (const method of methods) {
			const [group, name] = method.split('.');

			if (!(group in this)) {
				this[group] = {};
			}

			this[group][name] = params => (
				this.enqueue(method, params)
			);
		}

		this.messages.send = (params = {}) => {
			if (!('random_id' in params)) {
				params.random_id = getRandomId();
			}

			return this.enqueue('messages.send', params);
		};
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'API';
	}

	/**
	 * Returns the current used API version
	 *
	 * @return {string}
	 */
	get API_VERSION() {
		return API_VERSION;
	}

	/**
	 * Checks that this is a API method
	 *
	 * @param {string} method
	 *
	 * @return {boolean}
	 */
	isMethod(method) {
		return methods.includes(method);
	}

	/**
	 * Call execute method
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	execute(params) {
		return this.enqueue('execute', params);
	}

	/**
	 * Call execute procedure
	 *
	 * @param {string} name
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	procedure(name, params) {
		return this.enqueue(`execute.${name}`, params);
	}

	/**
	 * Call raw method
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	call(method, params) {
		return this.enqueue(method, params);
	}

	/**
	 * Adds request for queue
	 *
	 * @param {Request} request
	 *
	 * @return {Promise<Object>}
	 */
	callWithRequest(request) {
		this.queue.push(request);

		this.worker();

		return request.promise;
	}

	/**
	 * Adds method to queue
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	enqueue(method, params) {
		const request = new Request(method, params);

		return this.callWithRequest(request);
	}

	/**
	 * Adds an element to the beginning of the queue
	 *
	 * @param {Request} request
	 */
	requeue(request) {
		this.queue.unshift(request);

		this.worker();
	}

	/**
	 * Running queue
	 */
	worker() {
		if (this.started) {
			return;
		}

		this.started = true;

		const { apiLimit, apiMode, apiExecuteCount } = this.vk.options;

		const interval = Math.round(1133 / apiLimit);
		const handler = this.getRequestHandler(apiMode);

		const work = async () => {
			if (this.queue.length === 0 || this.suspended) {
				this.started = false;

				return;
			}

			handler.call(this, () => {
				setTimeout(work, interval);
			});
		};

		work();
	}

	/**
	 * Calls the api method
	 *
	 * @param {Object} request
	 */
	async callMethod(request) {
		const {
			token, lang, agent, apiTimeout, apiHeaders
		} = this.vk.options;

		const { method } = request;

		try {
			const url = new URL(method, 'https://api.vk.com/method/');

			url.searchParams.set('access_token', token);
			url.searchParams.set('v', API_VERSION);

			if (lang !== null) {
				url.searchParams.append('lang', lang);
			}

			debug(`http --> ${method}`);

			const startTime = Date.now();

			let response = await fetch(url, {
				agent,
				method: 'POST',
				compress: false,
				timeout: apiTimeout,
				headers: {
					...apiHeaders,

					connection: 'keep-alive'
				},
				body: new URLSearchParams(request.params)
			});

			response = await response.json();

			const endTime = (Date.now() - startTime).toLocaleString();

			debug(`http <-- ${method} ${endTime}ms`);

			if ('error' in response) {
				this.handleError(request, new APIError(response.error));

				return;
			}

			if ('captcha' in request) {
				request.captcha.resolve();
			}

			if (method.startsWith('execute')) {
				request.resolve({
					response: response.response,
					errors: (response.execute_errors || []).map(error => (
						new ExecuteError(error)
					))
				});

				return;
			}

			request.resolve(('response' in response) ? response.response : response);
		} catch (error) {
			const { apiWait, apiAttempts } = this.vk.options;

			if (request.addAttempt() <= apiAttempts) {
				setTimeout(() => {
					debug(`Request ${method} restarted ${request.attempts} times`);

					this.requeue(request);
				}, apiWait);

				return;
			}

			if ('captcha' in request) {
				request.captcha.reject(error);
			}

			request.reject(error);
		}
	}

	/**
	 * Error API handler
	 *
	 * @param {Request} request
	 * @param {Object} error
	 */
	async handleError(request, error) {
		const { code } = error;

		if (code === TOO_MANY_REQUESTS) {
			if (this.suspended) {
				this.requeue(request);
			}

			this.suspended = true;

			/* TODO: Refactoring */
			await delay(1133 / 3);

			this.suspended = false;

			this.requeue(request);

			return;
		}

		if ('captcha' in request) {
			request.captcha.reject(error);
		}

		if (code === USER_VALIDATION_REQUIRED) {
			if (this.suspended) {
				this.requeue(request);
			}

			this.suspended = true;

			try {
				const verification = new AccountVerification(this.vk);

				const { token } = await verification.run(error.redirectUri);

				debug('Account verification passed');

				this.vk.setToken(token);

				this.suspended = false;

				this.requeue(request);
			} catch (verificationError) {
				debug('Account verification error', verificationError);

				request.reject(error);

				await delay(15e3);

				this.suspended = false;

				this.worker();
			}

			return;
		}

		const isCaptcha = code === CAPTCHA_REQUIRED;

		if ((isCaptcha && this.vk.captchaHandler === null) || !isCaptcha) {
			request.reject(error);

			return;
		}

		const { captchaSid } = error;

		const payload = {
			type: captchaTypes.API,
			src: error.captchaImg,
			sid: captchaSid,
			request
		};

		this.vk.captchaHandler(payload, key => (
			new Promise((resolve, reject) => {
				request.params.captcha_sid = captchaSid;
				request.params.captcha_key = key;

				request.captcha = { resolve, reject };

				this.requeue(request);
			})
		));
	}

	/**
	 * Returns request handler
	 *
	 * @param {string} mode
	 *
	 * @return {Function}
	 */
	getRequestHandler(mode = 'sequential') {
		switch (mode) {
		case 'sequential': {
			return sequential;
		}

		case 'parallel': {
			return parallel;
		}

		case 'parallel_selected': {
			return parallelSelected;
		}

		default:
			throw new Error('Unsuported api mode');
		}
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
		const { started, queue } = this;

		const payload = { started, queue };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
