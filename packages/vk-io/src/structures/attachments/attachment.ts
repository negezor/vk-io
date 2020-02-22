import { VK } from '../../vk';
import { inspectable } from '../../utils/inspectable';
import { parseAttachment, kSerializeData, AttachmentType } from '../../utils/constants';

export class Attachment<P = {}> {
	public type: AttachmentType | string;

	public ownerId: number;

	public id: number;

	public accessKey?: string;

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
		accessKey?: string
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
		const accessKey = this.accessKey !== undefined
			? `_${this.accessKey}`
			: '';

		return `${this.type}${this.ownerId}_${this.id}${accessKey}`;
	}

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object {
		return {
			id: this.id,
			ownerId: this.ownerId,
			accessKey: this.accessKey,

			...this[kSerializeData]()
		};
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return {
			payload: this.payload
		};
	}
}

inspectable(Attachment, {
	serealize: (instance) => instance.toJSON(),
	stringify: (instance, payload, context): string => (
		`${context.stylize(instance.constructor.name, 'special')} <${context.stylize(String(instance), 'string')}> ${context.inspect(payload)}`
	)
});
