import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { VKError } from '../../errors';

import { Attachmentable } from '../shared/attachmentable';

import { kSerializeData } from '../../utils/constants';
import { transformAttachments } from '../attachments/helpers';
import { pickProperties, applyMixins } from '../../utils/helpers';

export interface ICommentContextPayload {
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

export type CommentContextOptions<S> =
	ContextFactoryOptions<ICommentContextPayload, S>;

export type CommentContextType = 'comment';

export type CommentContextSubType =
'photo_comment'
| 'video_comment'
| 'wall_reply'
| 'board_comment'
| 'market_comment'
| 'photo_comment_new'
| 'photo_comment_edit'
| 'photo_comment_delete'
| 'photo_comment_restore'
| 'video_comment_new'
| 'video_comment_edit'
| 'video_comment_delete'
| 'video_comment_restore'
| 'wall_reply_new'
| 'wall_reply_edit'
| 'wall_reply_restore'
| 'wall_reply_delete'
| 'board_comment_new'
| 'board_comment_edit'
| 'board_comment_delete'
| 'board_comment_restore'
| 'market_comment_new'
| 'market_comment_edit'
| 'market_comment_delete'
| 'market_comment_restore';

class CommentContext<S = ContextDefaultState>
	extends Context<
	ICommentContextPayload,
	S,
	CommentContextType,
	CommentContextSubType
	> {
	public constructor(options: CommentContextOptions<S>) {
		const initiator = (options.updateType as string).substring(
			0,
			(options.updateType as string).lastIndexOf('_')
		);

		super({
			...options,

			type: 'comment',
			subTypes: [
				initiator as CommentContextSubType,
				options.updateType as CommentContextSubType
			]
		});

		this.attachments = transformAttachments(this.payload.attachments || [], this.api);
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
		return this.payload.reply_to_comment !== undefined;
	}

	/**
	 * Checks if the user wrote a message
	 */
	public get isUser(): boolean {
		return this.fromId! > 0;
	}

	/**
	 * Checks if the group wrote a message
	 */
	public get isGroup(): boolean {
		return this.fromId! < 0;
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
	public get replyId(): number | undefined {
		return this.payload.reply_to_comment;
	}

	/**
	 * identifier of who wrote the comment
	 */
	public get fromId(): number | undefined {
		return (
			this.payload.from_id
			|| this.payload.user_id
		);
	}

	/**
	 * Returns the identifier reply user
	 */
	public get replyUserId(): number | undefined {
		return this.payload.reply_to_user;
	}

	/**
	 * Returns the identifier of the user who deleted the comment
	 */
	public get deleterUserId(): number | undefined {
		return this.payload.deleter_id;
	}

	/**
	 * Returns the identifier of object
	 */
	public get objectId(): number {
		const { payload } = this;

		return (
			payload.photo_id
			|| payload.video_id
			|| payload.post_id
			|| payload.topic_id
			|| payload.item_id
		)!;
	}

	/**
	 * Returns the identifier of owner
	 */
	public get ownerId(): number {
		const { payload } = this;

		return (
			payload.owner_id
			|| payload.photo_owner_id
			|| payload.video_owner_id
			|| payload.post_owner_id
			|| payload.topic_owner_id
			|| payload.market_owner_id
		)!;
	}

	/**
	 * Returns the date creation action comment
	 */
	public get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns the text comment
	 */
	public get text(): string | undefined {
		return this.payload.text;
	}

	/**
	 * Returns the likes
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get likes(): Record<string, any> | undefined {
		return this.payload.likes;
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	editComment(options: { message?: string; attachments?: any }): Promise<number> {
		if (this.isDelete) {
			return Promise.reject(new VKError({
				message: 'Comment is deleted',
				code: 'ALREADY_DELETED'
			}));
		}

		if (this.isBoardComment) {
			return this.api.board.editComment({
				...options,

				comment_id: this.id,
				topic_id: this.objectId,
				group_id: this.$groupId!
			});
		}

		const params = {
			...options,

			comment_id: this.id,
			owner_id: this.ownerId
		};

		if (this.isPhotoComment) {
			return this.api.photos.editComment(params);
		}

		if (this.isVideoComment) {
			return this.api.video.editComment(params);
		}

		if (this.isWallComment) {
			return this.api.wall.editComment(params);
		}

		if (this.isMarketComment) {
			return this.api.market.editComment(params);
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
			return this.api.board.deleteComment({
				comment_id: this.id,
				topic_id: this.objectId,
				group_id: this.$groupId!
			});
		}

		const params = {
			comment_id: this.id,
			owner_id: this.ownerId
		};

		if (this.isPhotoComment) {
			return this.api.photos.deleteComment(params);
		}

		if (this.isVideoComment) {
			return this.api.video.deleteComment(params);
		}

		if (this.isWallComment) {
			return this.api.wall.deleteComment(params);
		}

		if (this.isMarketComment) {
			return this.api.market.deleteComment(params);
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for deleting comment',
			code: 'UNSUPPORTED_EVENT'
		}));
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		const properties = [
			'id',
			'replyId',
			'fromId',
			'replyUserId',
			'deleterUserId',
			'objectId',
			'ownerId',
			'createdAt',
			'text',
			'isNew',
			'isEdit',
			'isDelete',
			'isRestore',
			'isPhotoComment',
			'isWallComment',
			'isVideoComment',
			'isBoardComment',
			'isMarketComment',
			'isReply',
			'isUser',
			'isGroup',
			'likes'
		];

		const filtredEmptyProperties = properties.filter(property => (
			this[property] !== undefined
		));

		return pickProperties(this, filtredEmptyProperties);
	}
}

// eslint-disable-next-line
interface CommentContext extends Attachmentable {}
applyMixins(CommentContext, [Attachmentable]);

export { CommentContext };
