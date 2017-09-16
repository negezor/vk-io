'use strict';

import { inspect } from 'util';

export default class Attachment {
	/**
	 * Constructor
	 *
	 * @param {string} type
	 * @param {string} owner
	 * @param {string} id
	 */
	constructor (type, owner, id) {
		this.type = type;

		this.owner = Number(owner);
		this.id = Number(id);
	}

	/**
	 * Returns type attachment
	 *
	 * @return {string}
	 */
	getType () {
		return this.type;
	}

	/**
	 * Returns owner id
	 *
	 * @return {number}
	 */
	getOwner () {
		return this.owner;
	}

	/**
	 * Returns attachment id
	 *
	 * @return {number}
	 */
	getId () {
		return this.id;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag] () {
		return this.constructor.name;
	}

	/**
	 * Returns a string to attach a VK
	 *
	 * @return {string}
	 */
	toString () {
		return `${this.type}${this.owner}_${this.id}`;
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom] (depth, options) {
		return options.stylize(this.constructor.name, 'special') + ' { '
		+ options.stylize(this, 'string') + ' | '
		+ (
			('_isFilled' in this && this._isFilled)
				? inspect(this.payload, options)
				: options.stylize('empty', 'undefined')
		)
		+ ' }';
	}
}
