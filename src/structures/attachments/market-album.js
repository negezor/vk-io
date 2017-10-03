import Attachment from './attachment';

export default class MarketAlbumAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('market_album', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this._isFilled = 'title' in payload && 'updated_time' in payload;
	}

	/**
	 * Get photo info
	 *
	 * @return {Promise}
	 */
	async getAttachmentPayload() {
		const [album] = await this.vk.api.market.getAlbumById({
			owner_id: this.owner,
			album_ids: this.id
		});

		this.payload = album;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this._isFilled = true;
	}
}
