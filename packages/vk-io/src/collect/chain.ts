import { inspectable } from 'inspectable';

import { VKError } from '../errors';

import { API } from '../api';
import { APIRequest } from '../api/request';
import { IExecutesPayload } from './types';
import { getChainReturn, resolveExecuteTask } from '../utils/helpers';

export interface IChainOptions {
	api: API;
}

export class Chain {
	public started = false;

	protected api: API;

	protected queue: APIRequest[] = [];

	/**
	 * Constructor
	 */
	public constructor({ api }: IChainOptions) {
		this.api = api;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Adds method to queue
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public append<T = any>(method: string, params: object): Promise<T> {
		if (this.started) {
			return Promise.reject(new VKError({
				message: 'Chain already started',
				code: 'ALREADY_STARTED'
			}));
		}

		const request = new APIRequest({
			api: this.api,
			method,
			params
		});

		this.queue.push(request);

		return request.promise;
	}

	/**
	 * Promise based
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public then(thenFn: Function, catchFn: Function): Promise<any[]> {
		// @ts-expect-error
		return this.run().then(thenFn, catchFn);
	}

	/**
	 * Starts the chain
	 */
	public async run(): Promise<IExecutesPayload> {
		if (this.started) {
			throw new VKError({
				message: 'Chain already started',
				code: 'ALREADY_STARTED'
			});
		}

		this.started = true;

		const { queue } = this;

		const out: IExecutesPayload = {
			response: [],
			errors: []
		};

		if (queue.length === 0) {
			return out;
		}

		while (queue.length > 0) {
			const tasks = queue.splice(0, 25);
			const code = getChainReturn(tasks.map(String));

			try {
				const response = await this.api.execute({ code });

				resolveExecuteTask(tasks, response);

				out.response.push(...response.response);
				out.errors.push(...response.errors);
			} catch (error) {
				for (const task of tasks) {
					task.reject(error);
				}

				throw error;
			}
		}

		return out;
	}
}

inspectable(Chain, {
	// @ts-expect-error
	serialize: ({ started, queue }) => ({
		started,
		queue
	})
});
