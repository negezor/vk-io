import { inspectable } from 'inspectable';

import { API } from '../../api';

import { Attachmentable } from './attachmentable';
import { Attachment, ExternalAttachment } from '../attachments';

import { transformAttachments } from '../attachments/helpers';
import { pickProperties, applyMixins } from '../../utils/helpers';

const kAttachments = Symbol('attachments');

export interface IMessageReplyPayload {
	id: number;
	conversation_message_id: number;
	from_id: number;
	peer_id: number;
	text?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attachments: any[];
	date: number;
	update_time?: number;
}

export interface IMessageReplyOptions {
	api: API;
	payload: IMessageReplyPayload;
}

class MessageReply {
	protected api: API;

	protected payload: IMessageReplyPayload;

	protected [kAttachments]: (Attachment | ExternalAttachment)[];

	/**
	 * Constructor
	 */
	public constructor(options: IMessageReplyOptions) {
		this.api = options.api;

		this.payload = options.payload;

		this[kAttachments] = transformAttachments(this.payload.attachments, this.api);
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
}

// eslint-disable-next-line
interface MessageReply extends Attachmentable {}
applyMixins(MessageReply, [Attachmentable]);

inspectable(MessageReply, {
	serialize: instance => instance.toJSON()
});

export { MessageReply };
