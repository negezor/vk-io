import VK from '../../vk';

import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

const { GRAFFITI } = AttachmentType;

export interface IGraffitiAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	height?: number;
	width?: number;
	url?: string;
}

export default class GraffitiAttachment extends Attachment<IGraffitiAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IGraffitiAttachmentPayload, vk?: VK) {
		super(GRAFFITI, payload.owner_id, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = 'url' in payload;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
		const [document] = await this.vk.api.docs.getById({
			docs: `${this.ownerId}_${this.id}`
		});

		// @ts-ignore
		this.payload = document;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Returns the graffiti height
	 */
	public get height(): number | null {
		return this.payload.height || null;
	}

	/**
	 * Returns the graffiti width
	 */
	public get width(): number | null {
		return this.payload.width || null;
	}

	/**
	 * Returns the URL of the document
	 */
	public get url(): string | null {
		return this.payload.url || null;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'height',
			'width',
			'url'
		]);
	}
}
