// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IGraffitiAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	height?: number;
// @ts-ignore
	width?: number;
// @ts-ignore
	url?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GraffitiAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IGraffitiAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class GraffitiAttachment
// @ts-ignore
	extends Attachment<IGraffitiAttachmentPayload, AttachmentType.GRAFFITI | 'graffiti'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: GraffitiAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.GRAFFITI
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.url !== undefined;
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
		const [document] = await this.api.docs.getById({
// @ts-ignore
			docs: `${this.ownerId}_${this.id}`
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.payload = document as unknown as IGraffitiAttachmentPayload;
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the graffiti height
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
	 * Returns the graffiti width
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
	 * Returns the URL of the document
// @ts-ignore
	 */
// @ts-ignore
	public get url(): string | undefined {
// @ts-ignore
		return this.payload.url;
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
			'height',
// @ts-ignore
			'width',
// @ts-ignore
			'url'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
