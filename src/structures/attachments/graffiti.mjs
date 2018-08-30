import Attachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

const { GRAFFITI } = attachmentTypes;

export default class GraffitiAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(GRAFFITI, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'url' in payload;
	}

	/**
	 * Load attachment payload
	 *
	 * @return {Promise}
	 */
	async loadAttachmentPayload() {
		if (this.$filled) {
			return;
		}

		const [document] = await this.vk.api.docs.getById({
			docs: `${this.ownerId}_${this.id}`,
		});

		this.payload = document;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Returns the URL of the document
	 *
	 * @return {?string}
	 */
	get url() {
		return this.payload.url || null;
	}

	/**
	 * Returns the graffiti height
	 *
	 * @return {?number}
	 */
	get height() {
		return this.payload.height || null;
	}

	/**
	 * Returns the graffiti width
	 *
	 * @return {?number}
	 */
	get width() {
		return this.payload.width || null;
	}
}
