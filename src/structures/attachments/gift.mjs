import ExternalAttachment from './external';

import { attachmentTypes } from '../../utils/constants';

const { GIFT } = attachmentTypes;

export default class GiftAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(GIFT, payload);

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
