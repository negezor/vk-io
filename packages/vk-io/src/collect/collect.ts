import { inspect } from 'util';

import CollectStream from './stream';
import LIMITS_METHODS from './limits';

import VK from '../vk';
import Chain from './chain';
import { APIMethods } from '../api/schemas/methods';
import { getChainReturn, getExecuteMethod } from '../utils/helpers';
import { ExecuteError } from '../errors';

export default class Collect extends APIMethods {
	protected vk: VK;

	/**
	 * constructor
	 */
	public constructor(vk: VK) {
		super();

		this.vk = vk;

		for (const [method, limit, max] of LIMITS_METHODS) {
			const [group, name] = method.split('.');

			if (!(group in this)) {
				// @ts-ignore
				this[group] = {};
			}

			// @ts-ignore
			this[group][name] = (options = {}): CollectStream => (
				new CollectStream(this.vk, {
					options,
					method,
					limit,
					// @ts-ignore
					max
				})
			);
		}
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Returns new Chain instance
	 */
	public chain(): Chain {
		return new Chain(this.vk);
	}

	/**
	 * Call multiple executors
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async executes(method: string, queue: Record<string, any>[]): Promise<{
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

		let out: {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			response: any[];
			errors: ExecuteError[];
		} = {
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
