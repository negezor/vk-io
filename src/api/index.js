'use strict';

import fetch from 'node-fetch';
import createDebug from 'debug';
import { URL, URLSearchParams } from 'url';

import Request from './request';
import { APIError, ExecuteError } from '../errors';
import { API_VERSION, API_ERRORS } from '../util/constants';
import {
	getChainReturn,
	getExecuteMethod,
	resolveExecuteTask
} from '../util/helpers';

const {
	CAPTCHA_REQUIRED,
	TOO_MANY_REQUESTS,
	USER_VALIDATION_REQUIRED
} = API_ERRORS;

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
	constructor (vk) {
		this.vk = vk;

		this._queue = [];
		this._isStarted = false;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag] () {
		return 'API';
	}

	/**
	 * Call execute method
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	execute (params) {
		return this._enqueue('execute', params);
	}

	/**
	 * Call raw method
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	call (method, params) {
		return this._enqueue(method, params);
	}

	/**
	 * Adds method to queue
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	_enqueue (method, params) {
		const request = new Request(method, params);

		this._queue.push(request);

		this._worker();

		return request.promise;
	}

	/**
	 * Adds an element to the beginning of the queue
	 *
	 * @param {Object} request
	 */
	_requeue (request) {
		this._queue.unshift(request);

		this._worker();
	}

	/**
	 * Running queue
	 */
	_worker () {
		if (this._isStarted) {
			return;
		}

		this._isStarted = true;

		const { apiLimit, apiMode, apiExecuteCount } = this.vk.options;

		const interval = Math.round(1133 / apiLimit);

		const work = async () => {
			if (this._queue.length === 0) {
				this._isStarted = false;

				return;
			}

			if (apiMode !== 'parallel' || this._queue[0].method === 'execute') {
				this._callMethod(
					this._queue.shift()
				);

				return setTimeout(work, interval);
			}

			const tasks = [];
			const chain = [];

			for (let i = 0; i < this._queue.length; ++i) {
				if (this._queue[i].method === 'execute') {
					continue;
				}

				const request = this._queue.splice(i--, 1)[0];

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

				this._callMethod(request);

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
	async _callMethod (request) {
		const { token, lang, agent, apiTimeout, apiHeaders } = this.vk.options;

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
				headers: apiHeaders,
				timeout: apiTimeout,
				body: new URLSearchParams(request.params)
			});

			response = await response.json();

			const endTime = (Date.now() - startTime).toLocaleString();

			debug(`http <-- ${request.method} ${endTime}ms`);

			if ('error' in response) {
				return this._handleError(request, new APIError(response.error));
			}

			if (request.method === 'execute') {
				return request.resolve({
					response: response.response,
					errors: (response.execute_errors || []).map((error) => (
						new ExecuteError(error)
					))
				});
			}

			request.resolve(('response' in response) ? response.response : response);
		} catch (error) {
			request.reject(error);
		}
	}

	/**
	 * Error API handler
	 *
	 * @param {Request} request
	 * @param {Object} error
	 */
	_handleError (request, error) {
		const { code } = error;

		if (code === TOO_MANY_REQUESTS) {
			return setTimeout(() => {
				this._requeue(task);
			}, 300);
		}

		if ('captcha' in request) {
			request.captcha.reject(error);
		}

		// if (code === USER_VALIDATION_REQUIRED) {
		// 	/* TODO: Add validate handler */
		// }

		const isCaptcha = code === CAPTCHA_REQUIRED;

		if (isCaptcha && this.vk._captchaHandler === null || !isCaptcha) {
			return request.reject(error);
		}

		const { captchaSid } = error;

		const payload = {
			src: error.captchaImg,
			sid: captchaSid,
			request
		};

		this.vk._captchaHandler(payload, (key) => (
			new Promise((resolve, reject) => {
				request.params.captcha_sid = captchaSid;
				request.params.captcha_key = key;

				request.captcha = { resolve, reject };

				this._requeue(request);
			})
		));
	}
}
