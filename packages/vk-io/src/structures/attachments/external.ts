import { inspectable } from 'inspectable';

import { API } from '../../api';
import { IAttachmentOptions, AttachmentFactoryOptions } from './attachment';

import { kSerializeData, AttachmentType } from '../../utils/constants';

export type IExternalAttachmentOptions<P, Type extends string = string> =
IAttachmentOptions<P, Type>;

export type ExternalAttachmentFactoryOptions<P> = AttachmentFactoryOptions<P>;

export class ExternalAttachment<P = {}, Type extends string | AttachmentType = string> {
	public type: Type;

	protected $filled: boolean;

	protected api!: API;

	protected payload: P;

	/**
	 * Constructor
	 */
	public constructor(options: IExternalAttachmentOptions<P, Type>) {
		this.api = options.api;

		this.type = options.type;

		this.payload = options.payload;

		this.$filled = false;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
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
		return false;
	}

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object {
		return this[kSerializeData]();
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

inspectable(ExternalAttachment, {
	serialize: instance => instance.toJSON(),
	stringify: (instance, payload, context): string => (
		`${context.stylize(instance.constructor.name, 'special')} ${context.inspect(payload)}`
	)
});
