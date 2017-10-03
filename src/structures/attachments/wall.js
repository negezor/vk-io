import Attachment from './attachment';

export default class WallAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('wall', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.filled = 'date' in payload;
	}

	/**
	 * Get photo info
	 *
	 * @return {Promise}
	 */
	async getAttachmentPayload() {
		const [post] = await this.vk.api.wall.getById({
			posts: `${this.owner}_${this.id}`,
			extended: 0
		});

		this.payload = post;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.filled = true;
	}
}
