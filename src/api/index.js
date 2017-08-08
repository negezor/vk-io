'use strict';

import fetch from 'node-fetch';
import createDebug from 'debug';
import { URL, URLSearchParams } from 'url';

import { API_VERSION } from '../util/constants';
import {
	getChainReturn,
	getExecuteMethod,
	resolveExecuteTask
} from '../util/helpers';

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
	_enqueue (method, params = {}) {
		return new Promise((resolve, reject) => {
			this._queue.push({
				method,
				params,

				resolve,
				reject
			});

			this._worker();
		});
	}

	/**
	 * Adds an element to the beginning of the queue
	 *
	 * @param {Object} task
	 */
	_requeue (task) {
		this._queue.unshift(task);

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

		const interval = Math.round(1133 / this.vk.options.apiLimit);

		const worker = async () => {
			if (this._queue.length === 0) {
				this._isStarted = false;

				return;
			}

			if (this.vk.options.apiMode !== 'execute' || this._queue[0].method === 'execute') {
				this._callMethod(
					this._queue.shift()
				);

				return setTimeout(worker, interval);
			}

			const tasks = [];
			const chain = [];

			const { apiCount } = this.vk.options;

			for (let i = 0; i < this._queue.length; ++i) {
				if (this._queue[i].method === 'execute') {
					continue;
				}

				const task = this._queue.splice(i--, 1)[0];

				tasks.push(task);
				chain.push(getMethodApi(task.method, task.params));

				if (tasks.length >= apiCount) {
					break;
				}
			}

			try {
				const response = await (new Promise((resolve, reject) => {
					this._callMethod({
						method: 'execute',
						params: {
							code: getChainReturn(chain)
						},

						resolve,
						reject
					});
				}));
			} catch (error) {
				for (const task of tasks) {
					task.reject(error);
				}
			}
		};

		worker();
	}

	/**
	 * Calls the api method
	 *
	 * @param {Object} task
	 */
	async _callMethod (task) {
		const { token, lang, agent, apiTimeout, apiHeaders } = this.vk.options;

		const url = new URL(task.method, 'https://api.vk.com/method/');

		url.searchParams.append('access_token', token);
		url.searchParams.append('v', API_VERSION);

		if (lang !== null) {
			url.searchParams.append('lang', lang);
		}

		let response;
		try {
			debug(`http --> ${task.method}`);

			const startTime = Date.now();

			let response = await fetch(url, {
				agent,
				method: 'POST',
				headers: apiHeaders,
				timeout: apiTimeout,
				body: new URLSearchParams(task.params)
			});

			response = await response.json();

			const endTime = (Date.now() - startTime).toLocaleString();

			debug(`http <-- ${task.method} ${endTime}ms`);

			task.resolve(('response' in response) ? response.response : response);
		} catch (error) {
			task.reject(error);
		}
	}
}
