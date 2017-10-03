export default class LinkAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		this.payload = payload;

		this.type = 'link';
	}
}
