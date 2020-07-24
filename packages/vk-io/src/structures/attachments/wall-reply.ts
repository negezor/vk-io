import { API } from '../../api';

import { ExternalAttachment } from './external';

import { AttachmentType } from '../../utils/constants';

const { WALL_REPLY } = AttachmentType;

export class WallReplyAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 */
	public constructor(payload: object, api?: API) {
		super(WALL_REPLY, payload);

		// @ts-expect-error
		this.api = api;
	}
}
