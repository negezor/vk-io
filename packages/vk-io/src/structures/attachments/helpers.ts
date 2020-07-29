import {
	Attachment,
	ExternalAttachment,

	PollAttachment,
	GiftAttachment,
	WallAttachment,
	LinkAttachment,
	PhotoAttachment,
	AudioAttachment,
	StoryAttachment,
	VideoAttachment,
	MarketAttachment,
	StickerAttachment,
	GraffitiAttachment,
	DocumentAttachment,
	WallReplyAttachment,
	MarketAlbumAttachment,
	AudioMessageAttachment
} from '.';

import { API } from '../../api';
import { AttachmentType } from '../../utils/constants';

const attachmentsTypes = {
	[AttachmentType.POLL]: (): typeof PollAttachment => PollAttachment,
	[AttachmentType.GIFT]: (): typeof GiftAttachment => GiftAttachment,
	[AttachmentType.WALL]: (): typeof WallAttachment => WallAttachment,
	[AttachmentType.LINK]: (): typeof LinkAttachment => LinkAttachment,
	[AttachmentType.PHOTO]: (): typeof PhotoAttachment => PhotoAttachment,
	[AttachmentType.AUDIO]: (): typeof AudioAttachment => AudioAttachment,
	[AttachmentType.STORY]: (): typeof StoryAttachment => StoryAttachment,
	[AttachmentType.VIDEO]: (): typeof VideoAttachment => VideoAttachment,
	[AttachmentType.DOCUMENT]: (): typeof DocumentAttachment => DocumentAttachment,
	[AttachmentType.MARKET]: (): typeof MarketAttachment => MarketAttachment,
	[AttachmentType.STICKER]: (): typeof StickerAttachment => StickerAttachment,
	[AttachmentType.GRAFFITI]: (): typeof GraffitiAttachment => GraffitiAttachment,
	[AttachmentType.WALL_REPLY]: (): typeof WallReplyAttachment => WallReplyAttachment,
	[AttachmentType.MARKET_ALBUM]: (): typeof MarketAlbumAttachment => MarketAlbumAttachment,
	[AttachmentType.AUDIO_MESSAGE]: (): typeof AudioMessageAttachment => AudioMessageAttachment
};

/**
 * Transform raw attachments to wrapper
 */
export const transformAttachments = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	rawAttachments: any[],
	api: API
// eslint-disable-next-line function-paren-newline
): (Attachment | ExternalAttachment)[] => {
	const attachments: (Attachment | ExternalAttachment)[] = [];

	for (const rawAttachment of rawAttachments) {
		const type = rawAttachment.type as AttachmentType;

		const attachmentFactory = attachmentsTypes[type];

		if (attachmentFactory === undefined) {
			continue;
		}

		const AttachmentConstructor = attachmentFactory();

		attachments.push(
			new AttachmentConstructor({
				api,
				payload: rawAttachment[type]
			})
		);
	}

	return attachments;
};
