'use strict';

export default class VKContext {
	/**
	 * Constructor
	 */
	constructor (update, vk) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag] () {
		return 'VKContext';
	}
}
