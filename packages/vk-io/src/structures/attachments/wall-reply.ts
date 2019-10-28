import VK from '../../vk';

import ExternalAttachment from './external';

import { AttachmentType } from '../../utils/constants';

const { WALL_REPLY } = AttachmentType;

export default class WallReplyAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK) {
		super(WALL_REPLY, payload);

		// @ts-ignore
		this.vk = vk;
	}
}
