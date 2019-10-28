import { inspect } from 'util';

import VK from '../../vk';
import { copyParams } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';
import { Attachment, ExternalAttachment } from '../attachments';

const kAttachments = Symbol('attachments');

export default class MessageReply {
	protected vk: VK;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected payload: Record<string, any>;

	protected [kAttachments]: (Attachment | ExternalAttachment)[];

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK) {
		// @ts-ignore
		this.vk = vk;

		this.payload = payload;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Checks if there is text
	 */
	public get hasText(): boolean {
		return this.text !== null;
	}

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type: string | null = null): boolean {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the identifier message
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the conversation message id
	 */
	public get conversationMessageId(): number | null {
		return this.payload.conversation_message_id || null;
	}

	/**
	 * Returns the destination identifier
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns the date when this message was created
	 */
	public get createdAt(): number {
		return this.payload.date;
	}

	/**
	 * Returns the date when this message was updated
	 */
	public get updatedAt(): number {
		return this.payload.update_time;
	}

	/**
	 * Returns the message text
	 */
	public get senderId(): number {
		return this.payload.from_id;
	}

	/**
	 * Returns the message text
	 */
	public get text(): string | null {
		return this.payload.text || null;
	}

	/**
	 * Returns the attachments
	 */
	public get attachments(): (Attachment | ExternalAttachment)[] {
		if (!this[kAttachments]) {
			this[kAttachments] = transformAttachments(this.payload.attachments, this.vk);
		}

		return this[kAttachments];
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: string | null = null): (Attachment | ExternalAttachment)[] {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object {
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
