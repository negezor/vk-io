// @ts-ignore
import { AbortController } from 'abort-controller';
// @ts-ignore

// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { API } from './api';
// @ts-ignore
import { fetch } from '../utils/fetch';
// @ts-ignore
import { getExecuteMethod } from '../utils/helpers';
// @ts-ignore
import { ICallbackServiceValidate } from '../utils/callback-service';
// @ts-ignore

// @ts-ignore
export interface IAPIRequestOptions {
// @ts-ignore
	api: API;
// @ts-ignore

// @ts-ignore
	method: string;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	params: Record<string, any>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class APIRequest {
// @ts-ignore
	public method: string;
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public params: Record<string, any>;
// @ts-ignore

// @ts-ignore
	public retries = 0;
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public promise: Promise<any>;
// @ts-ignore

// @ts-ignore
	public resolve!: Function;
// @ts-ignore

// @ts-ignore
	public reject!: Function;
// @ts-ignore

// @ts-ignore
	public captchaValidate?: ICallbackServiceValidate;
// @ts-ignore

// @ts-ignore
	protected api: API;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({ api, method, params = {} }: IAPIRequestOptions) {
// @ts-ignore
		this.api = api;
// @ts-ignore

// @ts-ignore
		this.method = method;
// @ts-ignore
		this.params = { ...params };
// @ts-ignore

// @ts-ignore
		this.promise = new Promise((resolve, reject): void => {
// @ts-ignore
			this.resolve = resolve;
// @ts-ignore
			this.reject = reject;
// @ts-ignore
		});
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
	 * Returns string to execute
// @ts-ignore
	 */
// @ts-ignore
	public toString(): string {
// @ts-ignore
		return getExecuteMethod(this.method, this.params);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sends a request to the server
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public async make(): Promise<any> {
// @ts-ignore
		const { options } = this.api;
// @ts-ignore

// @ts-ignore
		const params: APIRequest['params'] = {
// @ts-ignore
			access_token: options.token,
// @ts-ignore
			v: options.apiVersion,
// @ts-ignore

// @ts-ignore
			...this.params
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		if (options.language !== undefined) {
// @ts-ignore
			params.lang = options.language;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const controller = new AbortController();
// @ts-ignore

// @ts-ignore
		const timeout = setTimeout(() => controller.abort(), options.apiTimeout);
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const response = await fetch(`${options.apiBaseUrl}/${this.method}`, {
// @ts-ignore
				method: 'POST',
// @ts-ignore
				compress: false,
// @ts-ignore
				agent: options.agent,
// @ts-ignore
				signal: controller.signal,
// @ts-ignore
				headers: {
// @ts-ignore
					...options.apiHeaders,
// @ts-ignore

// @ts-ignore
					connection: 'keep-alive'
// @ts-ignore
				},
// @ts-ignore
				body: new URLSearchParams(
// @ts-ignore
					Object.entries(params)
// @ts-ignore
						.filter(({ 1: value }) => value !== undefined)
// @ts-ignore
				)
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			const result = await response.json();
// @ts-ignore

// @ts-ignore
			return result;
// @ts-ignore
		} finally {
// @ts-ignore
			clearTimeout(timeout);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
inspectable(APIRequest, {
// @ts-ignore
	serialize: ({ method, params }) => ({
// @ts-ignore
		method,
// @ts-ignore
		params
// @ts-ignore
	})
// @ts-ignore
});
