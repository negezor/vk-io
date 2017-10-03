import fetch from 'node-fetch';
import createDebug from 'debug';
import { URL, URLSearchParams } from 'url';

import Request from './request';
import methods from './methods';
import { APIError, ExecuteError } from '../errors';
import { API_VERSION, apiErrors } from '../util/constants';
import {
	getRandomId,
	getChainReturn,
	getExecuteMethod,
	resolveExecuteTask
} from '../util/helpers';

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
		this.isStarted = false;

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
	 * Adds method to queue
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	enqueue(method, params) {
		const request = new Request(method, params);

		this.queue.push(request);

		this.worker();

		return request.promise;
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
		if (this.isStarted) {
			return;
		}

		this.isStarted = true;

		const { apiLimit, apiMode, apiExecuteCount } = this.vk.options;

		const interval = Math.round(1133 / apiLimit);

		const work = async () => {
			if (this.queue.length === 0) {
				this.isStarted = false;

				return;
			}

			if (apiMode !== 'parallel' || this.queue[0].method === 'execute') {
				this.callMethod(this.queue.shift());

				setTimeout(work, interval);

				return;
			}

			const tasks = [];
			const chain = [];

			for (let i = 0; i < this.queue.length; i += 1) {
				if (this.queue[i].method === 'execute') {
					continue;
				}

				const request = this.queue.splice(i, 1)[0];

				i -= 1;

				tasks.push(request);
				chain.push(String(request));

				if (tasks.length >= apiExecuteCount) {
					break;
				}
			}

			try {
				const request = new Request('execute', {
					code: getChainReturn(chain)
				});

				this.callMethod(request);

				resolveExecuteTask(tasks, await request.promise);
			} catch (error) {
				for (const task of tasks) {
					task.reject(error);
				}
			}

			setTimeout(work, interval);
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

		const url = new URL(request.method, 'https://api.vk.com/method/');

		url.searchParams.append('access_token', token);
		url.searchParams.append('v', API_VERSION);

		if (lang !== null) {
			url.searchParams.append('lang', lang);
		}

		try {
			debug(`http --> ${request.method}`);

			const startTime = Date.now();

			let response = await fetch(url, {
				agent,
				method: 'POST',
				timeout: apiTimeout,
				headers: {
					...apiHeaders,
					connection: 'keep-alive'
				},
				body: new URLSearchParams(request.params)
			});

			response = await response.json();

			const endTime = (Date.now() - startTime).toLocaleString();

			debug(`http <-- ${request.method} ${endTime}ms`);

			if ('error' in response) {
				this.handleError(request, new APIError(response.error));

				return;
			}

			if ('captcha' in request) {
				request.captcha.resolve();
			}

			if (request.method === 'execute') {
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
					debug(`Request ${request.method} restarted ${request.attempts} times`);

					this.requeue(request);
				}, apiWait);

				return;
			}

			/* TODO: Add transform error to RequestError */

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
	handleError(request, error) {
		const { code } = error;

		if (code === TOO_MANY_REQUESTS) {
			this.requeue(request);

			return;
		}

		if ('captcha' in request) {
			request.captcha.reject(error);
		}

		// if (code === USER_VALIDATION_REQUIRED) {
		// 	/* TODO: Add validate handler */
		// }

		const isCaptcha = code === CAPTCHA_REQUIRED;

		if ((isCaptcha && this.vk.captchaHandler === null) || !isCaptcha) {
			request.reject(error);

			return;
		}

		const { captchaSid } = error;

		const payload = {
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
}
