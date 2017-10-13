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
 *
 * @return {Array}
 */
// eslint-disable-next-line import/prefer-default-export
export const transformAttachments = (attachments = []) => (
	attachments
		.map((item) => {
			const { type } = item;
			const attachment = item[type];

			switch (type) {
			case 'gift':
				return new GiftAttachment(attachment, this.vk);
			case 'wall':
				return new WallAttachment(attachment, this.vk);
			case 'link':
				return new LinkAttachment(attachment, this.vk);
			case 'photo':
				return new PhotoAttachment(attachment, this.vk);
			case 'audio':
				return new AudioAttachment(attachment, this.vk);
			case 'video':
				return new VideoAttachment(attachment, this.vk);
			case 'market':
				return new MarketAttachment(attachment, this.vk);
			case 'sticker':
				return new StickerAttachment(attachment, this.vk);
			case 'doc':
				return new DocumentAttachment(attachment, this.vk);
			case 'wall_reply':
				return new WallReplyAttachment(attachment, this.vk);
			case 'market_album':
				return new MarketAlbumAttachment(attachment, this.vk);
			default:
				return false;
			}
		})
		.filter(Boolean)
);
