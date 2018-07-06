import nodeUtil from 'util';

const { inspect } = nodeUtil;

export default class ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {string} type
	 * @param {Object} payload
	 */
	constructor(type, payload) {
		this.type = type;
		this.payload = payload;

		this.$filled = false;
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
	 * Returns whether the attachment is filled
	 *
	 * @return {boolean}
	 */
	get isFilled() {
		return this.$filled;
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

		const payload = this.$filled
			? ` ${inspect(this.payload, options)} `
			: '';

		return `${options.stylize(name, 'special')} { ${options.stylize(this, 'string')} ${payload}}`;
	}
}
