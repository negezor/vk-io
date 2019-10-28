// eslint-disable-next-line import/no-cycle
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

import VK from '../../vk';
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
// @ts-ignore
// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-explicit-any
export const transformAttachments = (attachments: any[] = [], vk: VK): Attachment[] => (
	attachments
		.map((item): Attachment | boolean => {
			const { type } = item;

			// @ts-ignore
			const attachment = attachmentsTypes[type];

			return attachment
				? new (attachment())(item[type], vk)
				: false;
		})
		.filter(Boolean)
);
