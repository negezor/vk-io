import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { VKError } from '../../errors';

import { Attachment } from '../attachments';
import { Attachmentable } from '../shared/attachmentable';

import { kSerializeData } from '../../utils/constants';
import { transformAttachments } from '../attachments/helpers';
import { pickProperties, applyMixins } from '../../utils/helpers';
import { VK } from '../../vk';

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
	ContextFactoryOptions<ICommentActionContextPayload, S>;

export type CommentActionContextType = 'comment';

export type CommentActionContextSubType =
'photo_comment'
| 'video_comment'
| 'wall_comment'
| 'board_comment'
| 'market_comment'
| 'new_photo_comment'
| 'edit_photo_comment'
| 'delete_photo_comment'
| 'restore_photo_comment'
| 'new_video_comment'
| 'edit_video_comment'
| 'delete_video_comment'
| 'restore_video_comment'
| 'new_wall_comment'
| 'edit_wall_comment'
| 'delete_wall_comment'
| 'restore_wall_comment'
| 'new_board_comment'
| 'edit_board_comment'
| 'delete_board_comment'
| 'restore_board_comment'
| 'new_market_comment'
| 'edit_market_comment'
| 'delete_market_comment'
| 'restore_market_comment';

class CommentActionContext<S = ContextDefaultState>
	extends Context<
	ICommentActionContextPayload,
	S,
	CommentActionContextType,
	CommentActionContextSubType
	> {
	public attachments: Attachment[];

	public constructor(options: CommentActionContextOptions<S>) {
		const { 1: initiator, 3: action } = (options.updateType as string).match(findTypes)!;

		super({
			...options,

			type: 'comment',
			subTypes: [
				`${initiator}_comment` as CommentActionContextSubType,
				`${action}_${initiator}_comment` as CommentActionContextSubType
			]
		});

		this.attachments = transformAttachments(this.payload.attachments, this.vk);
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
	public get removerUserId(): number | undefined {
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
   * 
   * @param {object} options Options to pass to one of commentEdit methods
   * @param {VK | undefined} fromUser VK Instance with user token. Useful if you got comment event from group and can't edit it.
   * 
   * @see https://vk.com/dev/wall.editComment 
	 */
	editComment(options: object, fromUser?: VK): Promise<number> {
		if (this.isDelete) {
			return Promise.reject(new VKError({
				message: 'Comment is deleted',
				code: 'ALREADY_DELETED'
			}));
    }
    
    const instance = fromUser ? fromUser : this.vk;

		if (this.isBoardComment) {
			return instance.api.board.editComment({
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
			return instance.api.photos.editComment(params);
		}

		if (this.isVideoComment) {
			return instance.api.video.editComment(params);
		}

		if (this.isWallComment) {
			return instance.api.wall.editComment(params);
		}

		if (this.isMarketComment) {
			return instance.api.market.editComment(params);
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for editing comment',
			code: 'UNSUPPORTED_EVENT'
		}));
	}

	/**
	 * Removes comment
   * 
   * @param {VK | undefined} fromUser VK Instance with user token. Useful if you got comment event from group and can't edit it.
   * 
   * @see https://vk.com/dev/wall.deleteComment
	 */
	deleteComment(fromUser?: VK): Promise<number> {
		if (this.isDelete) {
			return Promise.reject(new VKError({
				message: 'Comment is deleted',
				code: 'ALREADY_DELETED'
			}));
		}

		if (this.isBoardComment) {
			return this.vk.api.board.deleteComment({
				comment_id: this.id,
				topic_id: this.objectId,
				group_id: this.$groupId!
			});
    }
    
    const instance = fromUser ? fromUser : this.vk;

		const params = {
			comment_id: this.id,
			owner_id: this.ownerId
		};

		if (this.isPhotoComment) {
			return instance.api.photos.deleteComment(params);
		}

		if (this.isVideoComment) {
			return instance.api.video.deleteComment(params);
		}

		if (this.isWallComment) {
			return instance.api.wall.deleteComment(params);
		}

		if (this.isMarketComment) {
			return instance.api.market.deleteComment(params);
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

		const filteredEmptyProperties = properties.filter(property => (
			this[property] !== undefined
		));

		return pickProperties(this, filteredEmptyProperties);
	}
}

// eslint-disable-next-line
interface CommentActionContext extends Attachmentable {}
applyMixins(CommentActionContext, [Attachmentable]);

export { CommentActionContext };
