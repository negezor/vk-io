'use strict';

export default class GiftAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor (payload, vk) {
		this.payload = payload;

		this.type = 'gift';
	}
}
