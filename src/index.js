'use strict';

import Api from './api';

import { defaultOptions } from './util/constants';

/**
 * Main class
 *
 * @public
 */
export class VK {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor (options = {}) {
		this.options = Object.assign({}, defaultOptions);

		this.api = new Api(this);
	}

	/**
	 * Sets options
	 *
	 * @param {Object} options
	 *
	 * @return {this}
	 */
	setOptions (options) {
		Object.assign(this.options, options);

		return this;
	}

	/**
	 * Sets token
	 *
	 * @param {string} token
	 *
	 * @return {this}
	 */
	setToken (token) {
		this.options.token = token;

		return this;
	}

	/**
	 * Returns token
	 *
	 * @return {?string}
	 */
	getToken () {
		return this.options.token;
	}
}
