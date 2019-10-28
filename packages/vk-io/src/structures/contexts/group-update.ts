import Context, { IContextOptions } from './context';

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
import { copyParams } from '../../utils/helpers';
import { inspectCustomData, AttachmentType } from '../../utils/constants';

const subTypes: Record<string, string> = {
	group_change_photo: 'group_update_photo',
	group_update_officers: 'group_update_officers',
	group_change_settings: 'group_update_settings'
};

export interface IGroupUpdateContextPayload {
	user_id: number;
	admin_id: number;
	level_old?: number;
	level_new?: number;
	changes?: Record<string, { old_value: string; new_value: string }>;
	photo?: object;
}

export type GroupUpdateContextOptions<S> =
	Omit<IContextOptions<IGroupUpdateContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class GroupUpdateContext<S = Record<string, any>>
	extends Context<IGroupUpdateContextPayload, S> {
	public attachments: Attachment[];

	public constructor(options: GroupUpdateContextOptions<S>) {
		super({
			...options,

			type: 'group_update',
			subTypes: [
				subTypes[options.updateType]
			]
		});

		this.attachments = options.updateType === 'group_change_photo'
			// @ts-ignore
			? [new PhotoAttachment(this.payload.photo, this.vk)]
			: [];
	}

	/**
	 * Checks is change photo
	 */
	public get isChangePhoto(): boolean {
		return this.subTypes.includes('group_update_photo');
	}

	/**
	 * Checks is change officers
	 */
	public get isChangeOfficers(): boolean {
		return this.subTypes.includes('group_update_officers');
	}

	/**
	 * Checks is change settings
	 */
	public get isChangeSettings(): boolean {
		return this.subTypes.includes('group_update_settings');
	}

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type: AttachmentType | string | null = null): boolean {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the identifier admin
	 */
	public get adminId(): number | null {
		return this.payload.admin_id || null;
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the old level permission
	 */
	public get oldLevel(): number | null {
		return this.payload.level_old || null;
	}

	/**
	 * Returns the new level permission
	 */
	public get newLevel(): number | null {
		return this.payload.level_new || null;
	}

	/**
	 * Returns the changes settings
	 */
	public get changes(): Record<string, { old_value: string; new_value: string }> | null {
		return this.payload.changes || null;
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: AttachmentType.AUDIO | 'audio'): AudioAttachment[];

	public getAttachments(type: AttachmentType.AUDIO_MESSAGE | 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: AttachmentType.GRAFFITI | 'graffiti'): GraffitiAttachment[];

	// @ts-ignore
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

	public getAttachments(type: string | null = null): (Attachment | ExternalAttachment)[] {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'adminId',
			'userId',
			'oldLevel',
			'newLevel',
			'changes',
			'attachments'
		]);
	}
}
