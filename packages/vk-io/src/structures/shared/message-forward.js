import nodeUtil from 'util';

import { copyParams } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';

const { inspect } = nodeUtil;

const kForwards = Symbol('forwards');
const kAttachments = Symbol('attachments');

export default class MessageForward {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {Object} vk
	 */
	constructor(payload, vk) {
		this.vk = vk;

		this.payload = payload;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	// eslint-disable-next-line class-methods-use-this
	get [Symbol.toStringTag]() {
		return 'MessageForward';
	}

	/**
	 * Checks if there is text
	 *
	 * @return {boolean}
	 */
	get hasText() {
		return this.text !== null;
	}

	/**
	 * Checks for the presence of attachments
	 *
	 * @param {?string} type
	 *
	 * @return {boolean}
	 */
	hasAttachments(type = null) {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the date when this message was created
	 *
	 * @return {number}
	 */
	get createdAt() {
		return this.payload.date;
	}

	/**
	 * Returns the date when this message was updated
	 *
	 * @return {number}
	 */
	get updatedAt() {
		return this.payload.update_time;
	}

	/**
	 * Returns the message text
	 *
	 * @return {number}
	 */
	get senderId() {
		return this.payload.from_id;
	}

	/**
	 * Returns the message text
	 *
	 * @return {string}
	 */
	get text() {
		return this.payload.text || null;
	}

	/**
	 * Returns the forwards
	 *
	 * @return {MessageForward[]}
	 */
	get forwards() {
		if (!this[kForwards]) {
			this[kForwards] = this.payload.fwd_messages
				? this.payload.fwd_messages.map(forward => (
					new MessageForward(forward, this.vk)
				))
				: [];
		}

		return this[kForwards];
	}

	/**
	 * Returns the attachments
	 *
	 * @return {Attachment[]}
	 */
	get attachments() {
		if (!this[kAttachments]) {
			this[kAttachments] = transformAttachments(this.payload.attachments, this.vk);
		}

		return this[kAttachments];
	}

	/**
	 * Returns the attachments
	 *
	 * @param {?string} type
	 *
	 * @return {Array}
	 */
	getAttachments(type = null) {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns data for JSON
	 *
	 * @return {Object}
	 */
	toJSON() {
		return copyParams(this, [
			'senderId',
			'createdAt',
			'updatedAt',
			'text',
			'attachments',
			'forwards'
		]);
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

		const payload = copyParams(this, [
			'senderId',
			'createdAt',
			'updatedAt',
			'text',
			'attachments',
			'forwards'
		]);

		return `${options.stylize(name, 'special')} ${inspect(payload, { ...options, compact: false })}`;
	}
}
