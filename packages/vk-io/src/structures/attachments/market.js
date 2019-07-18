import Attachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

const { MARKET } = attachmentTypes;

export default class MarketAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(MARKET, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'title' in payload && 'date' in payload;
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

		const [market] = await this.vk.api.market.getById({
			item_ids: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		this.payload = market;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks is bookmarked current user
	 *
	 * @return {?boolean}
	 */
	get isFavorited() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.is_favorite);
	}
}
