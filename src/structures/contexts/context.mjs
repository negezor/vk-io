import { inspect } from 'util';

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
	 * @param {string[]} types
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
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} ${inspect({ ...this, vk: '<VK>' }, options)}`;
	}
}
