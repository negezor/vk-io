// @ts-ignore
/* eslint-disable */
// @ts-ignore
import {
// @ts-ignore
	Attachment,
// @ts-ignore
	ExternalAttachment,
// @ts-ignore

// @ts-ignore
	AudioAttachment,
// @ts-ignore
	AudioMessageAttachment,
// @ts-ignore
	DocumentAttachment,
// @ts-ignore
	GiftAttachment,
// @ts-ignore
	GraffitiAttachment,
// @ts-ignore
	LinkAttachment,
// @ts-ignore
	MarketAlbumAttachment,
// @ts-ignore
	MarketAttachment,
// @ts-ignore
	PhotoAttachment,
// @ts-ignore
	PollAttachment,
// @ts-ignore
	StickerAttachment,
// @ts-ignore
	StoryAttachment,
// @ts-ignore
	VideoAttachment,
// @ts-ignore
	WallReplyAttachment,
// @ts-ignore
	WallAttachment
// @ts-ignore
} from '../attachments';
// @ts-ignore

// @ts-ignore
import { AttachmentType, AttachmentTypeString } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export class Attachmentable {
// @ts-ignore
	public attachments!: (Attachment | ExternalAttachment)[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for the presence of attachments
// @ts-ignore
	 */
// @ts-ignore
	public hasAttachments(type?: AttachmentType | AttachmentTypeString): boolean {
// @ts-ignore
		if (type === undefined) {
// @ts-ignore
			return this.attachments.length > 0;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.attachments.some(attachment => (
// @ts-ignore
			attachment.type === type
// @ts-ignore
		));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the attachments
// @ts-ignore
	 */
// @ts-ignore
	public getAttachments(type: AttachmentType.AUDIO | 'audio'): AudioAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.AUDIO_MESSAGE | 'audio_message'): AudioMessageAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.GRAFFITI | 'graffiti'): GraffitiAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.DOCUMENT | 'doc'): DocumentAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.MARKET_ALBUM | 'market_album'): MarketAlbumAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.MARKET | 'market'): MarketAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.PHOTO | 'photo'): PhotoAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.STORY | 'story'): StoryAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.VIDEO | 'video'): VideoAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.WALL | 'wall'): WallAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.POLL | 'poll'): PollAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.GIFT | 'gift'): GiftAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.LINK | 'link'): LinkAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.STICKER | 'sticker'): StickerAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type: AttachmentType.WALL_REPLY | 'wall_reply'): WallReplyAttachment[];
// @ts-ignore

// @ts-ignore
	public getAttachments(type?: AttachmentType | AttachmentTypeString): (Attachment | ExternalAttachment)[] {
// @ts-ignore
		if (type === undefined) {
// @ts-ignore
			return this.attachments;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.attachments.filter(attachment => (
// @ts-ignore
			attachment.type === type
// @ts-ignore
		));
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IAllAttachmentable {
// @ts-ignore
	hasAllAttachments: Attachmentable['hasAttachments'];
// @ts-ignore
	getAllAttachments: Attachmentable['getAttachments'];
// @ts-ignore
}
