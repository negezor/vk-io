import ExternalAttachment from './external';

import { attachmentTypes } from '../../utils/constants';

const { WALL_REPLY } = attachmentTypes;

export default class WallReplyAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(WALL_REPLY, payload);

		this.vk = vk;
	}
}
