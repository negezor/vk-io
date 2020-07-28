import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';

import { AttachmentType, kSerializeData } from '../../utils/constants';

export interface IGiftAttachmentPayload {
	id: number;
}

export type GiftAttachmentOptions =
	ExternalAttachmentFactoryOptions<IGiftAttachmentPayload>;

export class GiftAttachment
	extends ExternalAttachment<IGiftAttachmentPayload, AttachmentType.GIFT | 'gift'> {
	/**
	 * Constructor
	 */
	public constructor(options: GiftAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.GIFT
		});
	}

	/**
	 * Returns the identifier gift
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return {
			id: this.id
		};
	}
}
