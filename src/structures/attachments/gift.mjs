import ExternalAttachment from './external';

export default class GiftAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('gift', payload);

		this.vk = vk;
	}

	/**
	 * Returns the identifier gift
	 *
	 * @return {number}
	 */
	get id() {
		return this.payload.id;
	}
}
