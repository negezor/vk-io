import { inspect } from 'util';

import { VKError } from '../errors';

import VK from '../vk';
import Request from '../api/request';
import { getChainReturn, resolveExecuteTask } from '../utils/helpers';

export default class Chain {
	public started = false;

	protected vk: VK;

	protected queue = [];

	/**
	 * Constructor
	 */
	constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	// eslint-disable-next-line class-methods-use-this
	get [Symbol.toStringTag]() {
		return 'Chain';
	}

	/**
	 * Adds method to queue
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<*>}
	 */
	append(method, params) {
		if (this.started) {
			return Promise.reject(new VKError({
				message: 'Chain already started',
				code: 'ALREADY_STARTED'
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
				message: 'Chain already started',
				code: 'ALREADY_STARTED'
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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;
		const { started, queue } = this;

		const payload = { started, queue };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
