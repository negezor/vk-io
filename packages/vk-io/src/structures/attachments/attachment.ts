// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { API } from '../../api';
// @ts-ignore
import { kSerializeData, AttachmentType } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Parse attachments
// @ts-ignore
 */
// @ts-ignore
export const parseAttachmentRe = /^([a-z]+)(-?\d+)_(\d+)_?(\w+)?$/;
// @ts-ignore

// @ts-ignore
export interface ISharedAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IAttachmentOptions<P, Type extends string = string> {
// @ts-ignore
	api: API;
// @ts-ignore

// @ts-ignore
	type: Type;
// @ts-ignore
	payload: Partial<ISharedAttachmentPayload> & P;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AttachmentFactoryOptions<P> =
// @ts-ignore
	Omit<IAttachmentOptions<P>, 'type'>;
// @ts-ignore

// @ts-ignore
export class Attachment<P = {}, Type extends string | AttachmentType = string> {
// @ts-ignore
	public type: Type;
// @ts-ignore

// @ts-ignore
	protected $filled: boolean;
// @ts-ignore

// @ts-ignore
	protected api!: API;
// @ts-ignore

// @ts-ignore
	protected payload!: ISharedAttachmentPayload & P;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: IAttachmentOptions<P, Type>) {
// @ts-ignore
		this.api = options.api;
// @ts-ignore

// @ts-ignore
		this.type = options.type;
// @ts-ignore

// @ts-ignore
		// @ts-expect-error
// @ts-ignore
		this.payload = options.payload;
// @ts-ignore

// @ts-ignore
		this.$filled = false;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public get ownerId(): number {
// @ts-ignore
		return this.payload.owner_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public get accessKey(): string | undefined {
// @ts-ignore
		return this.payload.access_key;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Parse attachment with string
// @ts-ignore
	 */
// @ts-ignore
	public static fromString(attachment: string, api: API): Attachment {
// @ts-ignore
		if (!parseAttachmentRe.test(attachment)) {
// @ts-ignore
			throw new TypeError('Incorrect attachment');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [, type, ownerId, id, accessKey] = attachment.match(parseAttachmentRe)!;
// @ts-ignore

// @ts-ignore
		return new Attachment({
// @ts-ignore
			api,
// @ts-ignore
			type,
// @ts-ignore
			payload: {
// @ts-ignore
				id: Number(id),
// @ts-ignore
				owner_id: Number(ownerId),
// @ts-ignore
				access_key: accessKey
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns whether the attachment is filled
// @ts-ignore
	 */
// @ts-ignore
	public get isFilled(): boolean {
// @ts-ignore
		return this.$filled;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Can be attached via string representation
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public get canBeAttached(): boolean {
// @ts-ignore
		return true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the attachment is equivalent with object
// @ts-ignore
	 */
// @ts-ignore
	public equals(attachment: Attachment | string): boolean {
// @ts-ignore
		const target = typeof attachment === 'string'
// @ts-ignore
			? Attachment.fromString(attachment, this.api)
// @ts-ignore
			: attachment;
// @ts-ignore

// @ts-ignore
		return (
// @ts-ignore
			this.type === target.type
// @ts-ignore
			&& this.ownerId === target.ownerId
// @ts-ignore
			&& this.id === target.id
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns a string to attach a VK
// @ts-ignore
	 */
// @ts-ignore
	public toString(): string {
// @ts-ignore
		const accessKey = this.accessKey !== undefined
// @ts-ignore
			? `_${this.accessKey}`
// @ts-ignore
			: '';
// @ts-ignore

// @ts-ignore
		return `${this.type}${this.ownerId}_${this.id}${accessKey}`;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns data for JSON
// @ts-ignore
	 */
// @ts-ignore
	public toJSON(): object {
// @ts-ignore
		return {
// @ts-ignore
			id: this.id,
// @ts-ignore
			ownerId: this.ownerId,
// @ts-ignore
			accessKey: this.accessKey,
// @ts-ignore

// @ts-ignore
			...this[kSerializeData]()
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		return {
// @ts-ignore
			payload: this.payload
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
inspectable(Attachment, {
// @ts-ignore
	serialize: (instance) => instance.toJSON(),
// @ts-ignore
	stringify: (instance, payload, context): string => (
// @ts-ignore
		`${context.stylize(instance.constructor.name, 'special')} <${context.stylize(String(instance), 'string')}> ${context.inspect(payload)}`
// @ts-ignore
	)
// @ts-ignore
});
