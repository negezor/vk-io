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

		this.$filled = payload.url !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

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
	public [inspectCustomData](): object {
		return copyParams(this, [
			'height',
			'width',
			'url'
		]);
	}
}
