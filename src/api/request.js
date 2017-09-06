'use strict';

import { getExecuteMethod } from '../util/helpers';

export default class Request {
	/**
	 * Constructor
	 *
	 * @param {string} method
	 * @param {Object} params
	 */
	constructor (method, params = {}) {
		this.method = method;
		this.params = params;

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
	get [Symbol.toStringTag] () {
		return 'Request';
	}

	/**
	 * Returns string to execute
	 *
	 * @return {string}
	 */
	toString () {
		return getExecuteMethod(this.method, this.params);
	}
}
