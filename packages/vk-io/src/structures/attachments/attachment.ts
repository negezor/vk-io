import { inspect } from 'util';

import VK from '../../vk';
import { parseAttachment, inspectCustomData, AttachmentType } from '../../utils/constants';

export default class Attachment<P = {}> {
	public type: AttachmentType | string;

	public ownerId: number;

	public id: number;

	public accessKey: string | null;

	protected $filled: boolean;

	protected vk!: VK;

	protected payload!: P;

	/**
	 * Constructor
	 */
	public constructor(
		type: AttachmentType | string,
		ownerId: number | string,
		id: number | string,
		accessKey: string | null = null
	) {
		this.type = type;

		this.ownerId = Number(ownerId);
		this.id = Number(id);

		this.accessKey = accessKey;

		this.$filled = false;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Parse attachment with string
	 */
	public static fromString(attachment: string): Attachment {
		if (!parseAttachment.test(attachment)) {
			throw new TypeError('Incorrect attachment');
		}

		const [, type, ownerId, id, accessKey] = attachment.match(parseAttachment)!;

		return new Attachment(type, ownerId, id, accessKey);
	}

	/**
	 * Returns whether the attachment is filled
	 */
	public get isFilled(): boolean {
		return this.$filled;
	}

	/**
	 * Can be attached via string representation
	 */
	// eslint-disable-next-line class-methods-use-this
	public get canBeAttached(): boolean {
		return true;
	}

	/**
	 * Checks that the attachment is equivalent with object
	 */
	public equals(attachment: Attachment | string): boolean {
		const target = typeof attachment === 'string'
			? Attachment.fromString(attachment)
			: attachment;

		return (
			this.type === target.type
			&& this.ownerId === target.ownerId
			&& this.id === target.id
		);
	}

	/**
	 * Returns a string to attach a VK
	 */
	public toString(): string {
		const accessKey = this.accessKey !== null
			? `_${this.accessKey}`
			: '';

		return `${this.type}${this.ownerId}_${this.id}${accessKey}`;
	}

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object {
		return this[inspectCustomData]();
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return {
			payload: this.payload
		};
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;

		const customData = {
			id: this.id,
			ownerId: this.ownerId,
			accessKey: this.accessKey,

			...this[inspectCustomData]()
		};

		const payload = this.$filled
			? `${inspect(customData, { ...options, compact: false })}`
			: '{}';

		return `${options.stylize(name, 'special')} <${options.stylize(this, 'string')}> ${payload}`;
	}
}
