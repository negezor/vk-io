import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

export interface IStickerImage {
	url: string;
	width: number;
	height: number;
}

export interface IStickerAttachmentPayload {
	sticker_id: number;
	product_id: number;
	images: IStickerImage[];
	images_with_background: IStickerImage[];
}

export type StickerAttachmentOptions =
	ExternalAttachmentFactoryOptions<IStickerAttachmentPayload>;

export class StickerAttachment
	extends ExternalAttachment<IStickerAttachmentPayload, AttachmentType.STICKER | 'sticker'> {
	/**
	 * Constructor
	 */
	public constructor(options: StickerAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.STICKER
		});
	}

	/**
	 * Returns the identifier sticker
	 */
	public get id(): number {
		return this.payload.sticker_id;
	}

	/**
	 * Returns the identifier product
	 */
	public get productId(): number {
		return this.payload.product_id;
	}

	/**
	 * Returns the images sizes
	 */
	public get images(): IStickerImage[] {
		return this.payload.images || [];
	}

	/**
	 * Returns the images sizes with backgrounds
	 */
	public get imagesWithBackground(): IStickerImage[] {
		return this.payload.images_with_background || [];
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'id',
			'productId',
			'images',
			'imagesWithBackground'
		]);
	}
}
