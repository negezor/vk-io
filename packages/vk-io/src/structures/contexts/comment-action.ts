import Context, { IContextOptions } from './context';

import { VKError } from '../../errors';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData, AttachmentType } from '../../utils/constants';
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
import { transformAttachments } from '../attachments/helpers';

/**
 * Find types
 *
 * ```
 * wall_reply_new
 * ```
 */
const findTypes = /([^_]+)_([^_]+)_([^_]+)/;

export interface ICommentActionContextPayload {
	id: number;
	owner_id: number;
	from_id?: number;
	user_id?: number;
	reply_to_user?: number;
	reply_to_comment?: number;
	deleter_id?: number;
	photo_id?: number;
	video_id?: number;
	post_id?: number;
	item_id?: number;
	topic_id?: number;
	photo_owner_id?: number;
	video_owner_id?: number;
	post_owner_id?: number;
	topic_owner_id?: number;
	market_owner_id?: number;
	date?: number;
	text?: string;
	attachments?: object[];
	likes?: {};
}

export type CommentActionContextOptions<S> =
	Omit<IContextOptions<ICommentActionContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class CommentActionContext<S = Record<string, any>>
	extends Context<ICommentActionContextPayload, S> {
	attachments: Attachment[];

	public constructor(options: CommentActionContextOptions<S>) {
		const { 1: initiator, 3: action } = options.updateType.match(findTypes);

		super({
			...options,

			type: 'comment',
			subTypes: [
				`${initiator}_comment`,
				`${action}_${initiator}_comment`
			]
		});

		this.attachments = transformAttachments(this.payload.attachments, this.vk);
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
	 * Checks is new comment
	 */
	public get isNew(): boolean {
		return this.includesFromSubType('new');
	}

	/**
	 * Checks is edit comment
	 */
	public get isEdit(): boolean {
		return this.includesFromSubType('edit');
	}

	/**
	 * Checks is delete comment
	 */
	public get isDelete(): boolean {
		return this.includesFromSubType('delete');
	}

	/**
	 * Checks is restore comment
	 */
	public get isRestore(): boolean {
		return this.includesFromSubType('restore');
	}

	/**
	 * Checks is photo comment
	 */
	public get isPhotoComment(): boolean {
		return this.includesFromSubType('photo');
	}

	/**
	 * Checks is wall comment
	 */
	public get isWallComment(): boolean {
		return this.includesFromSubType('wall');
	}

	/**
	 * Checks is video comment
	 */
	public get isVideoComment(): boolean {
		return this.includesFromSubType('video');
	}

	/**
	 * Checks is board comment
	 */
	public get isBoardComment(): boolean {
		return this.includesFromSubType('board');
	}

	/**
	 * Checks is board comment
	 */
	public get isMarketComment(): boolean {
		return this.includesFromSubType('market');
	}

	/**
	 * Checks is reply comment
	 */
	public get isReply(): boolean {
		return 'reply_to_comment' in this.payload;
	}

	/**
	 * Returns the identifier comment
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the identifier reply comment
	 */
	public get replyId(): number | null {
		return this.payload.reply_to_comment || null;
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number | null {
		return (
			this.payload.from_id
			|| this.payload.user_id
			|| null
		);
	}

	/**
	 * Returns the identifier reply user
	 */
	public get replyUserId(): number | null {
		return this.payload.reply_to_user || null;
	}

	/**
	 * Returns the identifier of the user who deleted the comment
	 */
	public get removerUserId(): number | null {
		return this.payload.deleter_id || null;
	}

	/**
	 * Returns the identifier of object
	 */
	public get objectId(): number | null {
		const { payload } = this;

		return (
			payload.photo_id
			|| payload.video_id
			|| payload.post_id
			|| payload.topic_id
			|| payload.item_id
			|| null
		);
	}

	/**
	 * Returns the identifier of owner
	 */
	public get ownerId(): number | null {
		const { payload } = this;

		return (
			payload.owner_id
			|| payload.photo_owner_id
			|| payload.video_owner_id
			|| payload.post_owner_id
			|| payload.topic_owner_id
			|| payload.market_owner_id
			|| null
		);
	}

	/**
	 * Returns the date creation action comment
	 */
	public get createdAt(): number | null {
		return this.payload.date || null;
	}

	/**
	 * Returns the text comment
	 */
	public get text(): string | null {
		return this.payload.text || null;
	}

	/**
	 * Returns the likes
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get likes(): Record<string, any> | null {
		return this.payload.likes || null;
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
	 * Includes from subtype
	 */
	public includesFromSubType(type: string): boolean {
		return this.subTypes[1].includes(type);
	}

	/**
	 * Edits a comment
	 */
	editComment(options: object): Promise<number> {
		if (this.isDelete) {
			return Promise.reject(new VKError({
				message: 'Comment is deleted',
				code: 'ALREADY_DELETED'
			}));
		}

		if (this.isBoardComment) {
			// @ts-ignore
			return this.vk.api.board.editComment({
				...options,

				comment_id: this.id,
				topic_id: this.objectId!,
				group_id: this.$groupId!
			});
		}

		const params = {
			...options,

			comment_id: this.id,
			owner_id: this.ownerId
		};

		if (this.isPhotoComment) {
			// @ts-ignore
			return this.vk.api.photos.editComment(params);
		}

		if (this.isVideoComment) {
			// @ts-ignore
			return this.vk.api.video.editComment(params);
		}

		if (this.isWallComment) {
			// @ts-ignore
			return this.vk.api.wall.editComment(params);
		}

		if (this.isMarketComment) {
			// @ts-ignore
			return this.vk.api.market.editComment(params);
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for editing comment',
			code: 'UNSUPPORTED_EVENT'
		}));
	}

	/**
	 * Removes comment
	 */
	deleteComment(): Promise<number> {
		if (this.isDelete) {
			return Promise.reject(new VKError({
				message: 'Comment is deleted',
				code: 'ALREADY_DELETED'
			}));
		}

		if (this.isBoardComment) {
			// @ts-ignore
			return this.vk.api.board.deleteComment({
				comment_id: this.id,
				topic_id: this.objectId!,
				group_id: this.$groupId!
			});
		}

		const params = {
			comment_id: this.id,
			owner_id: this.ownerId
		};

		if (this.isPhotoComment) {
			// @ts-ignore
			return this.vk.api.photos.deleteComment(params);
		}

		if (this.isVideoComment) {
			// @ts-ignore
			return this.vk.api.video.deleteComment(params);
		}

		if (this.isWallComment) {
			// @ts-ignore
			return this.vk.api.wall.deleteComment(params);
		}

		if (this.isMarketComment) {
			// @ts-ignore
			return this.vk.api.market.deleteComment(params);
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for deleting comment',
			code: 'UNSUPPORTED_EVENT'
		}));
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		const properties = [
			'id',
			'replyId',
			'userId',
			'replyUserId',
			'removerUserId',
			'objectId',
			'ownerId',
			'createdAt',
			'text',
			'likes',
			'attachments',
			'isReply'
		];

		const filtredEmptyProperties = properties.filter(property => (
			// @ts-ignore
			this[property] !== null
		));

		// @ts-ignore
		return copyParams(this, filtredEmptyProperties);
	}
}
