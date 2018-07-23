import nodeUtil from 'util';

import { VKError } from '../../errors';

import { parseAttachment } from '../../utils/constants';

const { inspect } = nodeUtil;

export default class Attachment {
	/**
	 * Constructor
	 *
	 * @param {string} type
	 * @param {number} ownerId
	 * @param {number} id
	 * @param {string} accessKey
	 */
	constructor(type, ownerId, id, accessKey = null) {
		this.type = type;

		this.ownerId = Number(ownerId);
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
			throw new VKError({
				message: 'Incorrect attachment'
			});
		}

		const [, type, ownerId, id, accessKey] = attachment.match(parseAttachment);

		return new Attachment(type, ownerId, id, accessKey);
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

		if (this.type !== attachment.type) {
			return false;
		}

		if (this.ownerId !== attachment.ownerId) {
			return false;
		}

		if (this.id !== attachment.id) {
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

		return `${this.type}${this.ownerId}_${this.id}${accessKey}`;
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
