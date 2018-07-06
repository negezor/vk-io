import nodeUtil from 'util';

import { parseAttachment } from '../../utils/constants';

const { inspect } = nodeUtil;

export default class Attachment {
	/**
	 * Constructor
	 *
	 * @param {string} type
	 * @param {number} owner
	 * @param {number} id
	 * @param {string} accessKey
	 */
	constructor(type, owner, id, accessKey = null) {
		this.type = type;

		this.owner = Number(owner);
		this.id = Number(id);

		this.accessKey = accessKey;

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
	 * Parse attachment with string
	 *
	 * @param {string} attachment
	 *
	 * @return {Attachment}
	 */
	static fromString(attachment) {
		if (!parseAttachment.test(attachment)) {
			throw new Error('Incorrect attachment');
		}

		const [, type, owner, id, accessKey] = attachment.match(parseAttachment);

		return new Attachment(type, owner, id, accessKey);
	}

	/**
	 * Returns whether the attachment is filled
	 *
	 * @return {boolean}
	 */
	isFilled() {
		return this.$filled;
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
	 * Returns the identifier owner
	 *
	 * @return {number}
	 */
	getOwnerId() {
		return this.owner;
	}

	/**
	 * Returns the identifier attachment
	 *
	 * @return {number}
	 */
	getId() {
		return this.id;
	}

	/**
	 * Checks that the attachment is equivalent with object
	 *
	 * @param {Attachment} attachment
	 *
	 * @return {boolean}
	 */
	equals(attachment) {
		if (!attachment) {
			return false;
		}

		if (this.getType() !== attachment.getType()) {
			return false;
		}

		if (this.getOwnerId() !== attachment.getOwnerId()) {
			return false;
		}

		if (this.getId() !== attachment.getId()) {
			return false;
		}

		return true;
	}

	/**
	 * Checks that the attachment is equivalent with string
	 *
	 * @param {string} attachment
	 *
	 * @return {boolean}
	 */
	equalString(attachment) {
		return this.equals(Attachment.fromString(attachment));
	}

	/**
	 * Returns a string to attach a VK
	 *
	 * @return {string}
	 */
	toString() {
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

		const payload = this.$filled
			? ` ${inspect(this.payload, options)} `
			: '';

		return `${options.stylize(name, 'special')} { ${options.stylize(this, 'string')} ${payload}}`;
	}
}
