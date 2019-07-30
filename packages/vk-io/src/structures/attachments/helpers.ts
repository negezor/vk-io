// eslint-disable-next-line import/no-cycle
import {
	Attachment,
	PollAttachment,
	GiftAttachment,
	WallAttachment,
	LinkAttachment,
	PhotoAttachment,
	AudioAttachment,
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
import { attachmentTypes } from '../../utils/constants';

const attachmentsTypes = {
	[attachmentTypes.POLL]: (): typeof PollAttachment => PollAttachment,
	[attachmentTypes.GIFT]: (): typeof GiftAttachment => GiftAttachment,
	[attachmentTypes.WALL]: (): typeof WallAttachment => WallAttachment,
	[attachmentTypes.LINK]: (): typeof LinkAttachment => LinkAttachment,
	[attachmentTypes.PHOTO]: (): typeof PhotoAttachment => PhotoAttachment,
	[attachmentTypes.AUDIO]: (): typeof AudioAttachment => AudioAttachment,
	[attachmentTypes.VIDEO]: (): typeof VideoAttachment => VideoAttachment,
	[attachmentTypes.DOCUMENT]: (): typeof DocumentAttachment => DocumentAttachment,
	[attachmentTypes.MARKET]: (): typeof MarketAttachment => MarketAttachment,
	[attachmentTypes.STICKER]: (): typeof StickerAttachment => StickerAttachment,
	[attachmentTypes.GRAFFITI]: (): typeof GraffitiAttachment => GraffitiAttachment,
	[attachmentTypes.WALL_REPLY]: (): typeof WallReplyAttachment => WallReplyAttachment,
	[attachmentTypes.MARKET_ALBUM]: (): typeof MarketAlbumAttachment => MarketAlbumAttachment,
	[attachmentTypes.AUDIO_MESSAGE]: (): typeof AudioMessageAttachment => AudioMessageAttachment
};

/**
 * Transform raw attachments to wrapper
 *
 * @param {Object[]} attachments
 * @param {VK}       vk
 *
 * @return {Object[]}
 */
// @ts-ignore
// eslint-disable-next-line import/prefer-default-export, @typescript-eslint/no-explicit-any
export const transformAttachments = (attachments: any[] = [], vk: VK): Attachment[] => (
	attachments
		.map((item): Attachment | boolean => {
			const { type } = item;

			const attachment = attachmentsTypes[type];

			return attachment
				? new (attachment())(item[type], vk)
				: false;
		})
		.filter(Boolean)
);
