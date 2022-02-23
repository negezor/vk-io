import { Attachment, AttachmentFactoryOptions } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

export interface IGraffitiAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	height?: number;
	width?: number;
	url?: string;
}

export type GraffitiAttachmentOptions =
	AttachmentFactoryOptions<IGraffitiAttachmentPayload>;

export class GraffitiAttachment
	extends Attachment<IGraffitiAttachmentPayload, AttachmentType.GRAFFITI | 'graffiti'> {
	/**
	 * Constructor
	 */
	public constructor(options: GraffitiAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.GRAFFITI
		});

		this.$filled = this.payload.url !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const [document] = await this.api.docs.getById({
			docs: `${this.ownerId}_${this.id}`
		});

		this.payload = document as unknown as IGraffitiAttachmentPayload;

		this.$filled = true;
	}

	/**
	 * Returns the graffiti height
	 */
	public get height(): number | undefined {
		return this.payload.height;
	}

	/**
	 * Returns the graffiti width
	 */
	public get width(): number | undefined {
		return this.payload.width;
	}

	/**
	 * Returns the URL of the document
	 */
	public get url(): string | undefined {
		return this.payload.url;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'height',
			'width',
			'url'
		]);
	}
}
