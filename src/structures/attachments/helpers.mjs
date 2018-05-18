import {
	GiftAttachment,
	WallAttachment,
	LinkAttachment,
	PhotoAttachment,
	AudioAttachment,
	VideoAttachment,
	MarketAttachment,
	StickerAttachment,
	DocumentAttachment,
	WallReplyAttachment,
	MarketAlbumAttachment
} from './';

const attachmentsTypes = {
	gift: () => GiftAttachment,
	wall: () => WallAttachment,
	link: () => LinkAttachment,
	photo: () => PhotoAttachment,
	audio: () => AudioAttachment,
	video: () => VideoAttachment,
	doc: () => DocumentAttachment,
	market: () => MarketAttachment,
	sticker: () => StickerAttachment,
	wall_reply: () => WallReplyAttachment,
	market_album: () => MarketAlbumAttachment
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
