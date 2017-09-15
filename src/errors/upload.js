'use strict';

import VKError from './vk';

export default class UploadError extends VKError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor (payload = {}) {
		super(payload);
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag] () {
		return 'UploadError';
	}
}
