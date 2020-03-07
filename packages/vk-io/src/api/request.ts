import fetch, { Response } from 'node-fetch';
import { AbortController } from 'abort-controller';

import { VK } from '../vk';
import { inspectable } from '../utils/inspectable';
import { getExecuteMethod } from '../utils/helpers';
import { ICallbackServiceValidate } from '../utils/callback-service';

export interface IAPIRequestOptions {
	vk: VK;

	method: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: Record<string, any>;
}

export class APIRequest {
	public method: string;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public params: Record<string, any>;

	public retries = 0;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public promise: Promise<any>;

	public resolve!: Function;

	public reject!: Function;

	public captchaValidate?: ICallbackServiceValidate;

	protected vk: VK;

	/**
	 * Constructor
	 */
	public constructor({ vk, method, params = {} }: IAPIRequestOptions) {
		this.vk = vk;

		this.method = method;
		this.params = { ...params };

		this.promise = new Promise((resolve, reject): void => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Returns string to execute
	 */
	public toString(): string {
		return getExecuteMethod(this.method, this.params);
	}

	/**
	 * Sends a request to the server
	 */
	public make(): Promise<Response> {
		const { options } = this.vk;

		const params: APIRequest['params'] = {
			access_token: options.token,
			v: options.apiVersion,

			...this.params
		};

		if (options.language !== undefined) {
			params.lang = options.language;
		}

		const controller = new AbortController();

		const timeout = setTimeout(() => controller.abort(), options.apiTimeout);

		return fetch(`${options.apiBaseUrl}/${this.method}`, {
			method: 'POST',
			compress: false,
			agent: options.agent,
			signal: controller.signal,
			headers: {
				...options.apiHeaders,

				connection: 'keep-alive'
			},
			body: new URLSearchParams(params)
		})
			.finally(() => clearTimeout(timeout));
	}
}

inspectable(APIRequest, {
	serialize: ({ method, params }) => ({
		method,
		params
	})
});
