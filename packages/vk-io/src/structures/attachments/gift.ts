import VK from '../../vk';

import ExternalAttachment from './external';

import { attachmentTypes, inspectCustomData } from '../../utils/constants';

const { GIFT } = attachmentTypes;

export interface IGiftAttachmentPayload {
	id: number;
}

export default class GiftAttachment extends ExternalAttachment {
	protected vk: VK;

	protected payload: IGiftAttachmentPayload;

	/**
	 * Constructor
	 */
	public constructor(payload: IGiftAttachmentPayload, vk: VK) {
		super(GIFT, payload);

		this.vk = vk;
	}

	/**
	 * Returns the identifier gift
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return {
			id: this.id
		};
	}
}
