import { inspect } from 'util';

import { getExecuteMethod } from '../utils/helpers';

export default class Request {
	public method: string;

	public params: Record<string, any>;

	public attempts = 0;

	public promise: Promise<any>;

	public resolve: Function;

	public reject: Function;

	/**
	 * Constructor
	 */
	constructor(method: string, params: Record<string, any> = {}) {
		this.method = method;
		this.params = { ...params };

		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	/**
	 * Returns custom tag
	 */
	// eslint-disable-next-line class-methods-use-this
	get [Symbol.toStringTag](): string {
		return 'Request';
	}

	/**
	 * Adds attempt
	 */
	addAttempt(): number {
		this.attempts += 1;

		return this.attempts;
	}

	/**
	 * Returns string to execute
	 */
	toString(): string {
		return getExecuteMethod(this.method, this.params);
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;
		const { method, params, promise } = this;

		const payload = { method, params, promise };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
