import { inspect } from 'util';

import VK from '../../vk';
import { copyParams } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';
import { Attachment, ExternalAttachment } from '../attachments';

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

export default class MessageForward {
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
