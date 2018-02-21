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

/**
 * Transform raw attachments to wrapper
 *
 * @param {Array} attachments
 * @param {VK}    vk
 *
 * @return {Array}
 */
// eslint-disable-next-line import/prefer-default-export
export const transformAttachments = (attachments = [], vk) => (
	attachments
		.map((item) => {
			const { type } = item;
			const attachment = item[type];

			switch (type) {
			case 'gift':
				return new GiftAttachment(attachment, vk);
			case 'wall':
				return new WallAttachment(attachment, vk);
			case 'link':
				return new LinkAttachment(attachment, vk);
			case 'photo':
				return new PhotoAttachment(attachment, vk);
			case 'audio':
				return new AudioAttachment(attachment, vk);
			case 'video':
				return new VideoAttachment(attachment, vk);
			case 'market':
				return new MarketAttachment(attachment, vk);
			case 'sticker':
				return new StickerAttachment(attachment, vk);
			case 'doc':
				return new DocumentAttachment(attachment, vk);
			case 'wall_reply':
				return new WallReplyAttachment(attachment, vk);
			case 'market_album':
				return new MarketAlbumAttachment(attachment, vk);
			default:
				return false;
			}
		})
		.filter(Boolean)
);
