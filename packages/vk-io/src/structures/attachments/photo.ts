// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
const SMALL_SIZES = ['m', 's'];
// @ts-ignore
const MEDIUM_SIZES = ['y', 'r', 'q', 'p', ...SMALL_SIZES];
// @ts-ignore
const LARGE_SIZES = ['w', 'z', ...MEDIUM_SIZES];
// @ts-ignore

// @ts-ignore
export interface IPhotoSize {
// @ts-ignore
	type: string;
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
export interface IPhotoAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	album_id?: number;
// @ts-ignore
	user_id?: number;
// @ts-ignore
	text?: string;
// @ts-ignore
	date?: number;
// @ts-ignore
	sizes?: IPhotoSize[];
// @ts-ignore
	width?: number;
// @ts-ignore
	height?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type PhotoAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IPhotoAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class PhotoAttachment extends Attachment<IPhotoAttachmentPayload, AttachmentType.PHOTO | 'photo'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: PhotoAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.PHOTO
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.album_id !== undefined && this.payload.date !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Load attachment payload
// @ts-ignore
	 */
// @ts-ignore
	public async loadAttachmentPayload(): Promise<void> {
// @ts-ignore
		if (this.$filled) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [photo] = await this.api.photos.getById({
// @ts-ignore
			photos: `${this.ownerId}_${this.id}`,
// @ts-ignore
			extended: 0
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.payload = (photo as unknown) as IPhotoAttachmentPayload;
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the ID of the user who uploaded the image
// @ts-ignore
	 */
// @ts-ignore
	public get userId(): number | undefined {
// @ts-ignore
		return this.payload.user_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the ID of the album
// @ts-ignore
	 */
// @ts-ignore
	public get albumId(): number | undefined {
// @ts-ignore
		return this.payload.album_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the photo text
// @ts-ignore
	 */
// @ts-ignore
	public get text(): string | undefined {
// @ts-ignore
		return this.payload.text;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this photo was created
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number | undefined {
// @ts-ignore
		return this.payload.date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the photo height
// @ts-ignore
	 */
// @ts-ignore
	public get height(): number | undefined {
// @ts-ignore
		return this.payload.height;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the photo width
// @ts-ignore
	 */
// @ts-ignore
	public get width(): number | undefined {
// @ts-ignore
		return this.payload.width;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the URL of a small photo
// @ts-ignore
	 * (130 or 75)
// @ts-ignore
	 */
// @ts-ignore
	public get smallSizeUrl(): string | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [size] = this.getSizes(SMALL_SIZES);
// @ts-ignore

// @ts-ignore
		return size.url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the URL of a medium photo
// @ts-ignore
	 * (807 or 604 or less)
// @ts-ignore
	 */
// @ts-ignore
	public get mediumSizeUrl(): string | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [size] = this.getSizes(MEDIUM_SIZES);
// @ts-ignore

// @ts-ignore
		return size.url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the URL of a large photo
// @ts-ignore
	 * (2560 or 1280 or less)
// @ts-ignore
	 */
// @ts-ignore
	public get largeSizeUrl(): string | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [size] = this.getSizes(LARGE_SIZES);
// @ts-ignore

// @ts-ignore
		return size.url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the sizes
// @ts-ignore
	 */
// @ts-ignore
	public get sizes(): IPhotoSize[] | undefined {
// @ts-ignore
		return this.payload.sizes;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the sizes of the required types
// @ts-ignore
	 */
// @ts-ignore
	public getSizes(sizeTypes: string[]): IPhotoSize[] {
// @ts-ignore
		const { sizes } = this;
// @ts-ignore

// @ts-ignore
		if (!sizes) {
// @ts-ignore
			return [];
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return sizeTypes
// @ts-ignore
			.map((sizeType): IPhotoSize | undefined => (
// @ts-ignore
				sizes.find((size): boolean => size.type === sizeType)
// @ts-ignore
			))
// @ts-ignore
			.filter(Boolean) as IPhotoSize[];
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
			'userId',
// @ts-ignore
			'albumId',
// @ts-ignore
			'text',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'height',
// @ts-ignore
			'width',
// @ts-ignore
			'smallSizeUrl',
// @ts-ignore
			'mediumSizeUrl',
// @ts-ignore
			'largeSizeUrl',
// @ts-ignore
			'sizes'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
