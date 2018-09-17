import nodeUtil from 'util';

import { VKError } from '../../errors';

import { parseAttachment, inspectCustomData } from '../../utils/constants';

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
		const source = String(this);
		const target = String(attachment);

		if (!parseAttachment.test(target)) {
			throw new VKError({
				message: 'Incorrect attachment'
			});
		}

		return target.startsWith(source);
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
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return this.payload;
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
			id: this.id,
			ownerId: this.ownerId,
			accessKey: this.accessKey,
			...this[inspectCustomData]()
		};

		const payload = this.$filled
			? `${inspect(customData, { ...options, compact: false })}`
			: '{}';

		return `${options.stylize(name, 'special')} <${options.stylize(this, 'string')}> ${payload}`;
	}
}
