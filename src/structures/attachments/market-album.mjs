import Attachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

const { MARKET_ALBUM } = attachmentTypes;

export default class MarketAlbumAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(MARKET_ALBUM, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'title' in payload && 'updated_time' in payload;
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

		const [album] = await this.vk.api.market.getAlbumById({
			owner_id: this.ownerId,
			album_ids: this.id
		});

		this.payload = album;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}
}
