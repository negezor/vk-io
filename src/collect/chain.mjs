import nodeUtil from 'util';

import { VKError } from '../errors';

import Request from '../api/request';
import { getChainReturn, resolveExecuteTask } from '../utils/helpers';

const { inspect } = nodeUtil;

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
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'Chain';
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
			return Promise.reject(new VKError({
				message: 'Chain already started'
			}));
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
	 * @return {Promise<Object[]>}
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
			throw new VKError({
				message: 'Chain already started'
			});
		}

		this.started = true;

		const { queue } = this;

		if (queue.length === 0) {
			return [];
		}

		let out = {
			response: [],
			errors: []
		};

		while (queue.length > 0) {
			const tasks = queue.splice(0, 25);
			const code = getChainReturn(tasks.map(String));

			try {
				const response = await this.vk.api.execute({ code });

				resolveExecuteTask(tasks, response);

				out = {
					response: [...out.response, ...response.response],
					errors: [...out.errors, ...response.errors]
				};
			} catch (error) {
				for (const task of tasks) {
					task.reject(error);
				}

				throw error;
			}
		}

		return out;
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
