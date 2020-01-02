/* eslint-disable */
import {
	Attachment,
	ExternalAttachment,

	AudioAttachment,
	AudioMessageAttachment,
	DocumentAttachment,
	GiftAttachment,
	GraffitiAttachment,
	LinkAttachment,
	MarketAlbumAttachment,
	MarketAttachment,
	PhotoAttachment,
	PollAttachment,
	StickerAttachment,
	StoryAttachment,
	VideoAttachment,
	WallReplyAttachment,
	WallAttachment
} from '../attachments';

import { AttachmentType, AttachmentTypeString } from '../../utils/constants';

export class Attachmentable {
	public attachments!: (Attachment | ExternalAttachment)[];

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type?: AttachmentType | AttachmentTypeString): boolean {
		if (type === undefined) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: AttachmentType.AUDIO | 'audio'): AudioAttachment[];

	public getAttachments(type: AttachmentType.AUDIO_MESSAGE | 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: AttachmentType.GRAFFITI | 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: AttachmentType.DOCUMENT | 'doc'): DocumentAttachment[];

	public getAttachments(type: AttachmentType.MARKET_ALBUM | 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: AttachmentType.MARKET | 'market'): MarketAttachment[];

	public getAttachments(type: AttachmentType.PHOTO | 'photo'): PhotoAttachment[];

	public getAttachments(type: AttachmentType.STORY | 'story'): StoryAttachment[];

	public getAttachments(type: AttachmentType.VIDEO | 'video'): VideoAttachment[];

	public getAttachments(type: AttachmentType.WALL | 'wall'): WallAttachment[];

	public getAttachments(type: AttachmentType.POLL | 'poll'): PollAttachment[];

	public getAttachments(type: AttachmentType.GIFT | 'gift'): GiftAttachment[];

	public getAttachments(type: AttachmentType.LINK | 'link'): LinkAttachment[];

	public getAttachments(type: AttachmentType.STICKER | 'sticker'): StickerAttachment[];

	public getAttachments(type: AttachmentType.WALL_REPLY | 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type?: AttachmentType | AttachmentTypeString): (Attachment | ExternalAttachment)[] {
		if (type === undefined) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}
}

export interface IAllAttachmentable {
	hasAllAttachments: Attachmentable['hasAttachments'];
	getAllAttachments: Attachmentable['getAttachments'];
}
