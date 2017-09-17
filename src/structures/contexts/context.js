'use strict';

export default class Context {
	/**
	 * Constructor
	 */
	constructor (vk) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag] () {
		return this.constructor.name;
	}
}
