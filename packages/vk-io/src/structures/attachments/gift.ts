import { API } from '../../api';

import { ExternalAttachment } from './external';

import { AttachmentType, kSerializeData } from '../../utils/constants';

const { GIFT } = AttachmentType;

export interface IGiftAttachmentPayload {
	id: number;
}

export class GiftAttachment extends ExternalAttachment<IGiftAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IGiftAttachmentPayload, api?: API) {
		super(GIFT, payload);

		// @ts-expect-error
		this.api = api;
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
	public [kSerializeData](): object {
		return {
			id: this.id
		};
	}
}
