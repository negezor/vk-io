import {
	Attachment,
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
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformAttachments = (attachments: any[] = [], api?: API): Attachment[] => (
	attachments
		.map((item): Attachment | boolean => {
			const { type } = item;

			// @ts-expect-error
			const attachment = attachmentsTypes[type];

			return attachment
				? new (attachment())(item[type], api)
				: false;
		})
		.filter(Boolean)
);
