import { inspect } from 'util';

import CollectStream from './stream';
import LIMITS_METHODS from './limits';

import Chain from './chain';
import { getChainReturn, getExecuteMethod } from '../utils/helpers';

export default class Collect {
	/**
	 * constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		for (const [method, limit, max] of LIMITS_METHODS) {
			const [group, name] = method.split('.');

			if (!(group in this)) {
				this[group] = {};
			}

			this[group][name] = (options = {}) => (
				new CollectStream(this.vk, {
					options,
					method,
					limit,
					max
				})
			);
		}
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'Collect';
	}

	/**
	 * Returns new Chain instance
	 *
	 * @return {Chain}
	 */
	chain() {
		return new Chain(this.vk);
	}

	/**
	 * Call multiple executors
	 *
	 * @param {string} method
	 * @param {Array}  queue
	 *
	 * @return {Promise<Array>}
	 */
	async executes(method, queue) {
		queue = queue.map(params => (
			getExecuteMethod(method, params)
		));

		const promises = [];

		while (queue.length !== 0) {
			const code = getChainReturn(queue.splice(0, 25));

			promises.push(this.vk.api.execute({ code }));
		}

		let out = {
			response: [],
			errors: []
		};

		for (const { response, errors } of await Promise.all(promises)) {
			out = {
				response: [...out.response, ...response],
				errors: [...out.errors, ...errors]
			};
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

		return `${options.stylize(name, 'special')} {}`;
	}
}
