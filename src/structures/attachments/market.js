'use strict';

import Attachment from './attachment';

export default class MarketAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor (payload, vk) {
		super('market', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this._isFilled = 'title' in payload && 'date' in payload;
	}

	/**
	 * Returns whether the attachment is filled
	 *
	 * @return {boolean}
	 */
	isFilled () {
		return this._isFilled;
	}

	/**
	 * Get photo info
	 *
	 * @return {Promise}
	 */
	async getAttachmentPayload () {
		const markets = await this.vk.api.market.getById({
			item_ids: `${this.owner}_${this.id}`,
			extended: 0
		});

		this.payload = markets[0];

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this._isFilled = true;
	}
}
