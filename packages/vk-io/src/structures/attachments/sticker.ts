import VK from '../../vk';

import ExternalAttachment from './external';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

const { STICKER } = AttachmentType;

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

export default class StickerAttachment extends ExternalAttachment<IStickerAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IStickerAttachmentPayload, vk?: VK) {
		super(STICKER, payload);

		// @ts-ignore
		this.vk = vk;
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
	public [inspectCustomData](): object {
		return copyParams(this, [
			'id',
			'productId',
			'images',
			'imagesWithBackground'
		]);
	}
}
