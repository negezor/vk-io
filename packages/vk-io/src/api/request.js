import nodeUtil from 'util';

import { getExecuteMethod } from '../utils/helpers';

const { inspect } = nodeUtil;

export default class Request {
	/**
	 * Constructor
	 *
	 * @param {string} method
	 * @param {Object} params
	 */
	constructor(method, params = {}) {
		this.method = method;
		this.params = { ...params };

		this.attempts = 0;

		this.promise = new Promise((resolve, reject) => {
			this.resolve = resolve;
			this.reject = reject;
		});
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	// eslint-disable-next-line class-methods-use-this
	get [Symbol.toStringTag]() {
		return 'Request';
	}

	/**
	 * Adds attempt
	 *
	 * @return {number}
	 */
	addAttempt() {
		this.attempts += 1;

		return this.attempts;
	}

	/**
	 * Returns string to execute
	 *
	 * @return {string}
	 */
	toString() {
		return getExecuteMethod(this.method, this.params);
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
		const { method, params, promise } = this;

		const payload = { method, params, promise };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
