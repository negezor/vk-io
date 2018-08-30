// eslint-disable-next-line import/no-cycle
import {
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

import { attachmentTypes } from '../../utils/constants';

const attachmentsTypes = {
	[attachmentTypes.GIFT]: () => GiftAttachment,
	[attachmentTypes.WALL]: () => WallAttachment,
	[attachmentTypes.LINK]: () => LinkAttachment,
	[attachmentTypes.PHOTO]: () => PhotoAttachment,
	[attachmentTypes.AUDIO]: () => AudioAttachment,
	[attachmentTypes.VIDEO]: () => VideoAttachment,
	[attachmentTypes.DOCUMENT]: () => DocumentAttachment,
	[attachmentTypes.MARKET]: () => MarketAttachment,
	[attachmentTypes.STICKER]: () => StickerAttachment,
	[attachmentTypes.GRAFFITI]: () => GraffitiAttachment,
	[attachmentTypes.WALL_REPLY]: () => WallReplyAttachment,
	[attachmentTypes.MARKET_ALBUM]: () => MarketAlbumAttachment,
	[attachmentTypes.AUDIO_MESSAGE]: () => AudioMessageAttachment
};

/**
 * Transform raw attachments to wrapper
 *
 * @param {Object[]} attachments
 * @param {VK}       vk
 *
 * @return {Object[]}
 */
// eslint-disable-next-line import/prefer-default-export
export const transformAttachments = (attachments = [], vk) => (
	attachments
		.map((item) => {
			const { type } = item;

			const attachment = attachmentsTypes[type];

			return attachment
				? new (attachment())(item[type], vk)
				: false;
		})
		.filter(Boolean)
);
