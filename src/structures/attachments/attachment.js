import { inspect } from 'util';

export default class Attachment {
	/**
	 * Constructor
	 *
	 * @param {string} type
	 * @param {string} owner
	 * @param {string} id
	 * @param {string} accessKey
	 */
	constructor(type, owner, id, accessKey = null) {
		this.type = type;

		this.owner = Number(owner);
		this.id = Number(id);

		this.accessKey = accessKey;

		this.filled = false;
	}

	/**
	 * Returns whether the attachment is filled
	 *
	 * @return {boolean}
	 */
	isFilled() {
		return this.filled;
	}

	/**
	 * Returns type attachment
	 *
	 * @return {string}
	 */
	getType() {
		return this.type;
	}

	/**
	 * Returns owner id
	 *
	 * @return {number}
	 */
	getOwner() {
		return this.owner;
	}

	/**
	 * Returns attachment id
	 *
	 * @return {number}
	 */
	getId() {
		return this.id;
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
	 * Returns a string to attach a VK
	 *
	 * @return {string}
	 */
	toString() {
		const hasAccessKey = this.accessKey !== null;

		const accessKey = this.accessKey !== null
			? `_${this.accessKey}`
			: '';

		return `${this.type}${this.owner}_${this.id}${accessKey}`;
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

		const payload = this.filled
			? ` ${inspect(this.payload, options)} `
			: '';

		return `${options.stylize(name, 'special')} { ${options.stylize(this, 'string')} ${payload}}`;
	}
}
