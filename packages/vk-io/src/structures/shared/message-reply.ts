import { inspect } from 'util';

import { VK } from '../../vk';

import { Attachmentable } from './attachmentable';
import { Attachment, ExternalAttachment } from '../attachments';

import { transformAttachments } from '../attachments/helpers';
import { pickProperties, applyMixins } from '../../utils/helpers';

const kAttachments = Symbol('attachments');

export interface IMessageReplyPayload {
	id: number;
	conversation_message_id: number;
	peer_id: number;
	text?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attachments: any[];
	from_id: number;
	date: number;
	update_time?: number;
}

class MessageReply {
	protected vk: VK;

	protected payload: IMessageReplyPayload;

	protected [kAttachments]: (Attachment | ExternalAttachment)[];

	/**
	 * Constructor
	 */
	public constructor(payload: IMessageReplyPayload, vk?: VK) {
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
	public get conversationMessageId(): number {
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
	public get updatedAt(): number | undefined {
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
		return pickProperties(this, [
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
		const payload = pickProperties(this, [
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

export { MessageReply };
