import { VKError } from '../../errors';

export default class Button {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor({ color = Button.DEFAULT_COLOR, action }) {
		this.color = color;

		const payload = JSON.stringify(action.payload || {});

		if (payload.length > 255) {
			throw new VKError({
				message: 'Maximum length of payload 255 characters'
			});
		}

		this.action = {
			...action,

			payload
		};
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
	 * Returns the default color (#FFFFFF)
	 *
	 * @return {string}
	 */
	static get DEFAULT_COLOR() {
		return 'default';
	}

	/**
	 * Returns the primary color (#5181B8)
	 *
	 * @return {string}
	 */
	static get PRIMARY_COLOR() {
		return 'primary';
	}

	/**
	 * Returns the negative color (#E64646)
	 *
	 * @return {string}
	 */
	static get NEGATIVE_COLOR() {
		return 'negative';
	}

	/**
	 * Returns the positive color (#4BB34B)
	 *
	 * @return {string}
	 */
	static get POSITIVE_COLOR() {
		return 'positive';
	}

	/**
	 * Returns to JSON
	 *
	 * @return {Object}
	 */
	toJSON() {
		return {
			color: this.color,
			action: this.action
		};
	}
}
