// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { API } from '../../api';
// @ts-ignore
import { IAttachmentOptions, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { kSerializeData, AttachmentType } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type IExternalAttachmentOptions<P, Type extends string = string> =
// @ts-ignore
IAttachmentOptions<P, Type>;
// @ts-ignore

// @ts-ignore
export type ExternalAttachmentFactoryOptions<P> = AttachmentFactoryOptions<P>;
// @ts-ignore

// @ts-ignore
export class ExternalAttachment<P = {}, Type extends string | AttachmentType = string> {
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
	protected payload: P;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: IExternalAttachmentOptions<P, Type>) {
// @ts-ignore
		this.api = options.api;
// @ts-ignore

// @ts-ignore
		this.type = options.type;
// @ts-ignore

// @ts-ignore
		this.payload = options.payload;
// @ts-ignore

// @ts-ignore
		this.$filled = false;
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
		return false;
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
		return this[kSerializeData]();
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
inspectable(ExternalAttachment, {
// @ts-ignore
	serialize: instance => instance.toJSON(),
// @ts-ignore
	stringify: (instance, payload, context): string => (
// @ts-ignore
		`${context.stylize(instance.constructor.name, 'special')} ${context.inspect(payload)}`
// @ts-ignore
	)
// @ts-ignore
});
