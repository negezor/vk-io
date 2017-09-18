'use strict';

export default class StickerAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor (payload, vk) {
		this.payload = payload;

		this.type = 'sticker';
	}
}
