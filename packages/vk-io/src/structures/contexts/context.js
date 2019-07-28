import nodeUtil from 'util';

import { inspectCustomData } from '../../utils/constants';

const { inspect } = nodeUtil;

export default class Context {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.type = null;
		this.subTypes = [];

		this.state = {};
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return this.constructor.name;
	}

	/**
	 * Checks whether the context of some of these types
	 *
	 * @param {string|string[]} types
	 *
	 * @return {boolean}
	 */
	is(types) {
		if (!Array.isArray(types)) {
			types = [types];
		}

		return [this.type, ...this.subTypes].some(type => (
			types.includes(type)
		));
	}

	/**
	 * Returns data for JSON
	 *
	 * @return {Object}
	 */
	toJSON() {
		return {
			...this[inspectCustomData](),

			type: this.type,
			subTypes: this.subTypes,
			state: this.state
		};
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { vk, ...payload } = this;

		return payload;
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

		const customData = {
			...this[inspectCustomData](),

			type: this.type,
			subTypes: this.subTypes,
			state: this.state
		};

		const payload = inspect(customData, { ...options, compact: false });

		return `${options.stylize(name, 'special')} ${payload}`;
	}
}
