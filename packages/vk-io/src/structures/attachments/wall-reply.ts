import { ExternalAttachment, ExternalAttachmentFactoryOptions } from './external';

import { AttachmentType } from '../../utils/constants';

export type WallReplyAttachmentOptions =
	ExternalAttachmentFactoryOptions<object>;

export class WallReplyAttachment extends ExternalAttachment<object, AttachmentType.WALL_REPLY> {
	/**
	 * Constructor
	 */
	public constructor(options: WallReplyAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.WALL_REPLY
		});
	}
}
