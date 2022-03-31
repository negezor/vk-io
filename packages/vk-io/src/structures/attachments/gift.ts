// @ts-ignore
import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';
// @ts-ignore

// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IGiftAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GiftAttachmentOptions =
// @ts-ignore
	ExternalAttachmentFactoryOptions<IGiftAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class GiftAttachment
// @ts-ignore
	extends ExternalAttachment<IGiftAttachmentPayload, AttachmentType.GIFT | 'gift'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: GiftAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.GIFT
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier gift
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.id;
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
			id: this.id
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
