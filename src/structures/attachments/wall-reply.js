export default class WallReplyAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		this.payload = payload;

		this.type = 'wall_reply';
	}
}
