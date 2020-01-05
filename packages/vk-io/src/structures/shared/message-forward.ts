import { inspect } from 'util';

import { VK } from '../../vk';
import { Attachmentable } from './attachmentable';
import { Attachment, ExternalAttachment } from '../attachments';

import { transformAttachments } from '../attachments/helpers';
import { pickProperties, applyMixins } from '../../utils/helpers';

const kForwards = Symbol('forwards');
const kAttachments = Symbol('attachments');

export interface IMessageForwardPayload {
	text?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	attachments: any[];
	fwd_messages: IMessageForwardPayload[];
	from_id: number;
	date: number;
	update_time: number;
}

export interface IMessageForwardOptions {
	vk: VK;
	payload: IMessageForwardPayload;
}

class MessageForward {
	protected vk: VK;

	protected payload: IMessageForwardPayload;

	protected [kForwards]: MessageForward[];

	protected [kAttachments]: (Attachment | ExternalAttachment)[];

	/**
	 * Constructor
	 */
	public constructor(options: IMessageForwardOptions) {
		this.vk = options.vk;

		this.payload = options.payload;
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
	 * Returns the forwards
	 */
	public get forwards(): MessageForward[] {
		if (!this[kForwards]) {
			this[kForwards] = this.payload.fwd_messages
				? this.payload.fwd_messages.map(forward => (
					new MessageForward({
						vk: this.vk,
						payload: forward
					})
				))
				: [];
		}

		return this[kForwards];
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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const payload = pickProperties(this, [
			'senderId',
			'createdAt',
			'updatedAt',
			'text',
			'attachments',
			'forwards'
		]);

		return `${options.stylize(this.constructor.name, 'special')} ${inspect(payload, { ...options, compact: false })}`;
	}
}

// eslint-disable-next-line
interface MessageForward extends Attachmentable {}
applyMixins(MessageForward, [Attachmentable]);

export { MessageForward };
