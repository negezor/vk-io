// @ts-ignore
import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { PhotoAttachment, IPhotoAttachmentPayload } from './photo';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
const kPhoto = Symbol('kPhoto');
// @ts-ignore

// @ts-ignore
export interface ILinkAttachmentPayload {
// @ts-ignore
	title: string;
// @ts-ignore
	caption?: string;
// @ts-ignore
	description?: string;
// @ts-ignore
	url: string;
// @ts-ignore
	product?: {
// @ts-ignore
		price: object;
// @ts-ignore
	};
// @ts-ignore
	button?: {
// @ts-ignore
		title: string;
// @ts-ignore
		action: {
// @ts-ignore
			type: string;
// @ts-ignore
			url: string;
// @ts-ignore
		};
// @ts-ignore
	};
// @ts-ignore
	photo?: IPhotoAttachmentPayload;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type LinkAttachmentOptions =
// @ts-ignore
	ExternalAttachmentFactoryOptions<ILinkAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class LinkAttachment
// @ts-ignore
	extends ExternalAttachment<ILinkAttachmentPayload, AttachmentType.LINK | 'link'> {
// @ts-ignore
	protected [kPhoto]: PhotoAttachment | undefined;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: LinkAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.LINK
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		if (this.payload.photo) {
// @ts-ignore
			this[kPhoto] = new PhotoAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: this.payload.photo
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for the presence of a photo in a link
// @ts-ignore
	 */
// @ts-ignore
	public get hasPhoto(): boolean {
// @ts-ignore
		return Boolean(this[kPhoto]);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the title
// @ts-ignore
	 */
// @ts-ignore
	public get title(): string {
// @ts-ignore
		return this.payload.title;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the title
// @ts-ignore
	 */
// @ts-ignore
	public get caption(): string | undefined {
// @ts-ignore
		return this.payload.caption;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the description
// @ts-ignore
	 */
// @ts-ignore
	public get description(): string | undefined {
// @ts-ignore
		return this.payload.description;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the URL of the link
// @ts-ignore
	 */
// @ts-ignore
	public get url(): string {
// @ts-ignore
		return this.payload.url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the product
// @ts-ignore
	 */
// @ts-ignore
	public get product(): ILinkAttachmentPayload['product'] | undefined {
// @ts-ignore
		return this.payload.product;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the button
// @ts-ignore
	 */
// @ts-ignore
	public get button(): ILinkAttachmentPayload['button'] | undefined {
// @ts-ignore
		return this.payload.button;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the photo
// @ts-ignore
	 */
// @ts-ignore
	public get photo(): PhotoAttachment | undefined {
// @ts-ignore
		return this[kPhoto];
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
			'title',
// @ts-ignore
			'caption',
// @ts-ignore
			'description',
// @ts-ignore
			'url',
// @ts-ignore
			'product',
// @ts-ignore
			'button',
// @ts-ignore
			'photo'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
