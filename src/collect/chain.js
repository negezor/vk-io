import { inspect } from 'util';

import Request from '../api/request';
import { getChainReturn, resolveExecuteTask } from '../util/helpers';

export default class Chain {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.queue = [];
		this.started = false;
	}

	/**
	 * Adds method to queue
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<mixed>}
	 */
	append(method, params) {
		if (this.started) {
			throw new Error('Chain already started');
		}

		const request = new Request(method, params);

		this.queue.push(request);

		return request.promise;
	}

	/**
	 * Promise based
	 *
	 * @param {Function} thenFn
	 * @param {Function} catchFn
	 *
	 * @return {Promise<Object>}
	 */
	then(thenFn, catchFn) {
		return Promise.resolve(this.run()).then(thenFn, catchFn);
	}

	/**
	 * Starts the chain
	 *
	 * @return {Promise}
	 */
	async run() {
		if (this.started) {
			throw new Error('Chain already started');
		}

		this.started = true;

		const { queue } = this;

		if (queue.length === 0) {
			return [];
		}

		const results = [];

		while (queue.length > 0) {
			const tasks = queue.splice(0, 25);
			const code = getChainReturn(tasks.map(String));

			try {
				const response = await this.vk.api.execute({ code });

				resolveExecuteTask(tasks, response);

				results.push(response.response);
			} catch (error) {
				for (const task of tasks) {
					task.reject(error);
				}

				throw error;
			}
		}

		return [].concat(...results);
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
