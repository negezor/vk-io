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

	public attempts = 0;

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
	 * Adds attempt
	 */
	public addAttempt(): number {
		this.attempts += 1;

		return this.attempts;
	}

	/**
	 * Returns string to execute
	 */
	public toString(): string {
		return getExecuteMethod(this.method, this.params);
	}
}

inspectable(APIRequest, {
	serialize: ({ method, params }) => ({
		method,
		params
	})
});
