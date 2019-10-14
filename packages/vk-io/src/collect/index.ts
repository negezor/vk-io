import { inspect } from 'util';

import CollectStream from './stream';
import LIMITS_METHODS from './limits';

import VK from '../vk';
import Chain from './chain';
import { getChainReturn, getExecuteMethod } from '../utils/helpers';

export default class Collect {
	protected vk: VK;

	/**
	 * constructor
	 */
	constructor(vk: VK) {
		this.vk = vk;

		for (const [method, limit, max] of LIMITS_METHODS) {
			const [group, name] = method.split('.');

			if (!(group in this)) {
				this[group] = {};
			}

			this[group][name] = (options = {}): CollectStream => (
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
	 */
	get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Returns new Chain instance
	 */
	chain(): Chain {
		return new Chain(this.vk);
	}

	/**
	 * Call multiple executors
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async executes(method: string, queue: Record<string, any>[]): Promise<{
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		response: any[];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		errors: any[];
	}> {
		const queueMethods = queue.map(params => (
			getExecuteMethod(method, params)
		));

		const promises = [];

		while (queueMethods.length !== 0) {
			const code = getChainReturn(queueMethods.splice(0, 25));

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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} {}`;
	}
}
