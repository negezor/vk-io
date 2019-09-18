import { inspect } from 'util';

import VK from '../../vk';
import { copyParams } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';

const kForwards = Symbol('forwards');
const kAttachments = Symbol('attachments');

export interface IMessageForwardPayload {
	text?: string;
	attachments: any[];
	fwd_messages: any[];
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

	/**
	 * Constructor
	 */
	public constructor(options: IMessageForwardOptions) {
		this.vk = options.vk;

		this.payload = options.payload;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	// eslint-disable-next-line class-methods-use-this
	public get [Symbol.toStringTag](): string {
		return 'MessageForward';
	}

	/**
	 * Checks if there is text
	 *
	 * @return {boolean}
	 */
	public get hasText(): boolean {
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
	 * Returns the date when this message was created
	 *
	 * @return {number}
	 */
	public get createdAt(): number {
		return this.payload.date;
	}

	/**
	 * Returns the date when this message was updated
	 *
	 * @return {number}
	 */
	public get updatedAt(): number {
		return this.payload.update_time;
	}

	/**
	 * Returns the message text
	 *
	 * @return {number}
	 */
	public get senderId(): number {
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
	 * Returns the forwards
	 *
	 * @return {MessageForward[]}
	 */
	public get forwards() {
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
