// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { VKError } from '../errors';
// @ts-ignore

// @ts-ignore
import { API } from '../api';
// @ts-ignore
import { APIRequest } from '../api/request';
// @ts-ignore
import { IExecutesPayload, executeRequests } from './executes';
// @ts-ignore

// @ts-ignore
export interface IChainOptions {
// @ts-ignore
	api: API;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class Chain {
// @ts-ignore
	public started = false;
// @ts-ignore

// @ts-ignore
	protected api: API;
// @ts-ignore

// @ts-ignore
	protected queue: APIRequest[] = [];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({ api }: IChainOptions) {
// @ts-ignore
		this.api = api;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds method to queue
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public append<T = any>(method: string, params: object): Promise<T> {
// @ts-ignore
		if (this.started) {
// @ts-ignore
			return Promise.reject(new VKError({
// @ts-ignore
				message: 'Chain already started',
// @ts-ignore
				code: 'ALREADY_STARTED'
// @ts-ignore
			}));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const request = new APIRequest({
// @ts-ignore
			api: this.api,
// @ts-ignore
			method,
// @ts-ignore
			params
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.queue.push(request);
// @ts-ignore

// @ts-ignore
		return request.promise;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Promise based
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public then(thenFn: Function, catchFn: Function): Promise<any[]> {
// @ts-ignore
		// @ts-expect-error
// @ts-ignore
		return this.run().then(thenFn, catchFn);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Starts the chain
// @ts-ignore
	 */
// @ts-ignore
	public async run(): Promise<IExecutesPayload> {
// @ts-ignore
		if (this.started) {
// @ts-ignore
			throw new VKError({
// @ts-ignore
				message: 'Chain already started',
// @ts-ignore
				code: 'ALREADY_STARTED'
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.started = true;
// @ts-ignore

// @ts-ignore
		return executeRequests(this.api, this.queue);
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
inspectable(Chain, {
// @ts-ignore
	// @ts-expect-error
// @ts-ignore
	serialize: ({ started, queue }) => ({
// @ts-ignore
		started,
// @ts-ignore
		queue
// @ts-ignore
	})
// @ts-ignore
});
