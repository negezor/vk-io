import ExternalAttachment from './external';

export default class WallReplyAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('wall_reply', payload);

		this.vk = vk;
	}
}
