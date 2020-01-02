import { inspect } from 'util';

import VK from '../../vk';

import Attachmentable from './attachmentable';
import { Attachment, ExternalAttachment } from '../attachments';

import { transformAttachments } from '../attachments/helpers';
import { copyParams, applyMixins } from '../../utils/helpers';

const kAttachments = Symbol('attachments');

class MessageReply {
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
		return this.text !== undefined;
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
	public get conversationMessageId(): number | undefined {
		return this.payload.conversation_message_id;
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
	public get text(): string | undefined {
		return this.payload.text;
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

		return `${options.stylize(this.constructor.name, 'special')} ${inspect(payload, { ...options, compact: false })}`;
	}
}

// eslint-disable-next-line
interface MessageReply extends Attachmentable {}
applyMixins(MessageReply, [Attachmentable]);

export default MessageReply;
