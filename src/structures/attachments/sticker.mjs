import ExternalAttachment from './external';

export default class StickerAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('sticker', payload);

		this.vk = vk;
	}

	/**
	 * Returns the identifier sticker
	 *
	 * @return {number}
	 */
	getId() {
		return this.payload.sticker_id;
	}

	/**
	 * Returns the identifier product
	 *
	 * @return {number}
	 */
	getProductId() {
		return this.payload.product_id;
	}
}
