import { inspect } from 'util';

import VK from '../../vk';
import { copyParams } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';

const kAttachments = Symbol('attachments');

export default class MessageReply {
	protected vk: VK;

	protected payload: Record<string, any>;

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk: VK) {
		this.vk = vk;

		this.payload = payload;
	}

	/**
	 * Returns custom tag
	 */
	// eslint-disable-next-line class-methods-use-this
	public get [Symbol.toStringTag]() {
		return 'MessageForward';
	}

	/**
	 * Checks if there is text
	 *
	 * @return {boolean}
	 */
	public get hasText() {
		return this.text !== null;
	}

	/**
	 * Checks for the presence of attachments
	 *
	 * @param {?string} type
	 *
	 * @return {boolean}
	 */
	public hasAttachments(type = null) {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the identifier message
	 *
	 * @return {number}
	 */
	public get id() {
		return this.payload.id;
	}

	/**
	 * Returns the conversation message id
	 *
	 * @return {?number}
	 */
	public get conversationMessageId() {
		return this.payload.conversation_message_id || null;
	}

	/**
	 * Returns the destination identifier
	 *
	 * @return {number}
	 */
	public get peerId() {
		return this.payload.peer_id;
	}

	/**
	 * Returns the date when this message was created
	 *
	 * @return {number}
	 */
	public get createdAt() {
		return this.payload.date;
	}

	/**
	 * Returns the date when this message was updated
	 *
	 * @return {number}
	 */
	public get updatedAt() {
		return this.payload.update_time;
	}

	/**
	 * Returns the message text
	 *
	 * @return {number}
	 */
	public get senderId() {
		return this.payload.from_id;
	}

	/**
	 * Returns the message text
	 *
	 * @return {string}
	 */
	public get text() {
		return this.payload.text || null;
	}

	/**
	 * Returns the attachments
	 *
	 * @return {Attachment[]}
	 */
	public get attachments() {
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
	public getAttachments(type = null) {
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
	public toJSON() {
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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
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
