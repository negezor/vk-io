// @ts-ignore
import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IStickerImage {
// @ts-ignore
	url: string;
// @ts-ignore
	width: number;
// @ts-ignore
	height: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IStickerAttachmentPayload {
// @ts-ignore
	sticker_id: number;
// @ts-ignore
	product_id: number;
// @ts-ignore
	images: IStickerImage[];
// @ts-ignore
	images_with_background: IStickerImage[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type StickerAttachmentOptions =
// @ts-ignore
	ExternalAttachmentFactoryOptions<IStickerAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class StickerAttachment
// @ts-ignore
	extends ExternalAttachment<IStickerAttachmentPayload, AttachmentType.STICKER | 'sticker'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: StickerAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.STICKER
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier sticker
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.sticker_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier product
// @ts-ignore
	 */
// @ts-ignore
	public get productId(): number {
// @ts-ignore
		return this.payload.product_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the images sizes
// @ts-ignore
	 */
// @ts-ignore
	public get images(): IStickerImage[] {
// @ts-ignore
		return this.payload.images || [];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the images sizes with backgrounds
// @ts-ignore
	 */
// @ts-ignore
	public get imagesWithBackground(): IStickerImage[] {
// @ts-ignore
		return this.payload.images_with_background || [];
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
		return pickProperties(this, [
// @ts-ignore
			'id',
// @ts-ignore
			'productId',
// @ts-ignore
			'images',
// @ts-ignore
			'imagesWithBackground'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
