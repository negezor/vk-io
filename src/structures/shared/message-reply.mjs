import nodeUtil from 'util';

import { copyParams } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';

const { inspect } = nodeUtil;

export default class MessageReply {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {Object} vk
	 */
	constructor(payload, vk) {
		this.vk = vk;

		this.payload = payload;

		this.attachments = payload.attachments.length > 0
			? transformAttachments(payload.attachments, vk)
			: [];
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
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
	 * Returns the identifier message
	 *
	 * @return {number}
	 */
	get id() {
		return this.payload.id;
	}

	/**
	 * Returns the conversation message id
	 *
	 * @return {?number}
	 */
	get conversationMessageId() {
		return this.payload.conversation_message_id || null;
	}

	/**
	 * Returns the destination identifier
	 *
	 * @return {number}
	 */
	get peerId() {
		return this.payload.peer_id;
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
			'id',
			'conversationMessageId',
			'peerId',
			'senderId',
			'createdAt',
			'updatedAt',
			'text',
			'attachments'
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
			'id',
			'conversationMessageId',
			'peerId',
			'senderId',
			'createdAt',
			'updatedAt',
			'text',
			'attachments'
		]);

		return `${options.stylize(name, 'special')} ${inspect(payload, { ...options, compact: false })}`;
	}
}
