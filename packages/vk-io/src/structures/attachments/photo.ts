import VK from '../../vk';

import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

const { PHOTO } = AttachmentType;

const SMALL_SIZES = ['m', 's'];
const MEDIUM_SIZES = ['y', 'r', 'q', 'p', ...SMALL_SIZES];
const LARGE_SIZES = ['w', 'z', ...MEDIUM_SIZES];

export interface IPhotoSize {
	type: string;
	url: string;
	width: number;
	height: number;
}

export interface IPhotoAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	album_id?: number;
	user_id?: number;
	text?: string;
	date?: number;
	sizes?: IPhotoSize[];
	width?: number;
	height?: number;
}

export default class PhotoAttachment extends Attachment<IPhotoAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IPhotoAttachmentPayload, vk?: VK) {
		super(PHOTO, payload.owner_id, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = 'album_id' in payload && 'date' in payload;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
		const [photo] = await this.vk.api.photos.getById({
			photos: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		// @ts-ignore
		this.payload = photo;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Returns the ID of the user who uploaded the image
	 */
	public get userId(): number | null {
		return this.payload.user_id || null;
	}

	/**
	 * Returns the ID of the album
	 */
	public get albumId(): number | null {
		return this.payload.album_id || null;
	}

	/**
	 * Returns the photo text
	 */
	public get text(): string | null {
		return this.payload.text || null;
	}

	/**
	 * Returns the date when this photo was created
	 */
	public get createdAt(): number | null {
		return this.payload.date || null;
	}

	/**
	 * Returns the photo height
	 */
	public get height(): number | null {
		return this.payload.height || null;
	}

	/**
	 * Returns the photo width
	 */
	public get width(): number | null {
		return this.payload.width || null;
	}

	/**
	 * Returns the URL of a small photo
	 * (130 or 75)
	 */
	public get smallPhoto(): string | null {
		if (!this.$filled) {
			return null;
		}

		const [size] = this.getSizes(SMALL_SIZES);

		return size.url;
	}

	/**
	 * Returns the URL of a medium photo
	 * (807 or 604 or less)
	 */
	public get mediumPhoto(): string | null {
		if (!this.$filled) {
			return null;
		}

		const [size] = this.getSizes(MEDIUM_SIZES);

		return size.url;
	}

	/**
	 * Returns the URL of a large photo
	 * (2560 or 1280 or less)
	 */
	public get largePhoto(): string | null {
		if (!this.$filled) {
			return null;
		}

		const [size] = this.getSizes(LARGE_SIZES);

		return size.url;
	}

	/**
	 * Returns the sizes
	 */
	public get sizes(): IPhotoSize[] | null {
		return this.payload.sizes || null;
	}

	/**
	 * Returns the sizes of the required types
	 */
	public getSizes(sizeTypes: string[]): IPhotoSize[] {
		const { sizes } = this;

		if (!sizes) {
			return [];
		}

		// @ts-ignore
		return sizeTypes
			.map((sizeType): IPhotoSize | null => (
				sizes.find((size): boolean => size.type === sizeType) || null
			))
			.filter(Boolean);
	}

	/**
	 * Returns the custom data
	 */
	// @ts-ignore
	public [inspectCustomData](): object | null {
		return copyParams(this, [
			'userId',
			'albumId',
			'text',
			'createdAt',
			'height',
			'width',
			'smallPhoto',
			'mediumPhoto',
			'largePhoto',
			'sizes'
		]);
	}
}
