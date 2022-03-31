// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { VKError } from '../../errors';
// @ts-ignore

// @ts-ignore
import { Attachmentable } from '../shared/attachmentable';
// @ts-ignore

// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore
import { transformAttachments } from '../attachments/helpers';
// @ts-ignore
import { pickProperties, applyMixins } from '../../utils/helpers';
// @ts-ignore

// @ts-ignore
export interface ICommentContextPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	from_id?: number;
// @ts-ignore
	user_id?: number;
// @ts-ignore
	reply_to_user?: number;
// @ts-ignore
	reply_to_comment?: number;
// @ts-ignore
	deleter_id?: number;
// @ts-ignore
	photo_id?: number;
// @ts-ignore
	video_id?: number;
// @ts-ignore
	post_id?: number;
// @ts-ignore
	item_id?: number;
// @ts-ignore
	topic_id?: number;
// @ts-ignore
	photo_owner_id?: number;
// @ts-ignore
	video_owner_id?: number;
// @ts-ignore
	post_owner_id?: number;
// @ts-ignore
	topic_owner_id?: number;
// @ts-ignore
	market_owner_id?: number;
// @ts-ignore
	date?: number;
// @ts-ignore
	text?: string;
// @ts-ignore
	attachments?: object[];
// @ts-ignore
	likes?: {};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CommentContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<ICommentContextPayload, S>;
// @ts-ignore

// @ts-ignore
export type CommentContextType = 'comment';
// @ts-ignore

// @ts-ignore
export type CommentContextSubType =
// @ts-ignore
'photo_comment'
// @ts-ignore
| 'video_comment'
// @ts-ignore
| 'wall_reply'
// @ts-ignore
| 'board_comment'
// @ts-ignore
| 'market_comment'
// @ts-ignore
| 'photo_comment_new'
// @ts-ignore
| 'photo_comment_edit'
// @ts-ignore
| 'photo_comment_delete'
// @ts-ignore
| 'photo_comment_restore'
// @ts-ignore
| 'video_comment_new'
// @ts-ignore
| 'video_comment_edit'
// @ts-ignore
| 'video_comment_delete'
// @ts-ignore
| 'video_comment_restore'
// @ts-ignore
| 'wall_reply_new'
// @ts-ignore
| 'wall_reply_edit'
// @ts-ignore
| 'wall_reply_restore'
// @ts-ignore
| 'wall_reply_delete'
// @ts-ignore
| 'board_comment_new'
// @ts-ignore
| 'board_comment_edit'
// @ts-ignore
| 'board_comment_delete'
// @ts-ignore
| 'board_comment_restore'
// @ts-ignore
| 'market_comment_new'
// @ts-ignore
| 'market_comment_edit'
// @ts-ignore
| 'market_comment_delete'
// @ts-ignore
| 'market_comment_restore';
// @ts-ignore

// @ts-ignore
class CommentContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	ICommentContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	CommentContextType,
// @ts-ignore
	CommentContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: CommentContextOptions<S>) {
// @ts-ignore
		const initiator = (options.updateType as string).substring(
// @ts-ignore
			0,
// @ts-ignore
			(options.updateType as string).lastIndexOf('_')
// @ts-ignore
		);
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'comment',
// @ts-ignore
			subTypes: [
// @ts-ignore
				initiator as CommentContextSubType,
// @ts-ignore
				options.updateType as CommentContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.attachments = transformAttachments(this.payload.attachments || [], this.api);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is new comment
// @ts-ignore
	 */
// @ts-ignore
	public get isNew(): boolean {
// @ts-ignore
		return this.includesFromSubType('new');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is edit comment
// @ts-ignore
	 */
// @ts-ignore
	public get isEdit(): boolean {
// @ts-ignore
		return this.includesFromSubType('edit');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is delete comment
// @ts-ignore
	 */
// @ts-ignore
	public get isDelete(): boolean {
// @ts-ignore
		return this.includesFromSubType('delete');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is restore comment
// @ts-ignore
	 */
// @ts-ignore
	public get isRestore(): boolean {
// @ts-ignore
		return this.includesFromSubType('restore');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is photo comment
// @ts-ignore
	 */
// @ts-ignore
	public get isPhotoComment(): boolean {
// @ts-ignore
		return this.includesFromSubType('photo');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is wall comment
// @ts-ignore
	 */
// @ts-ignore
	public get isWallComment(): boolean {
// @ts-ignore
		return this.includesFromSubType('wall');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is video comment
// @ts-ignore
	 */
// @ts-ignore
	public get isVideoComment(): boolean {
// @ts-ignore
		return this.includesFromSubType('video');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is board comment
// @ts-ignore
	 */
// @ts-ignore
	public get isBoardComment(): boolean {
// @ts-ignore
		return this.includesFromSubType('board');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is board comment
// @ts-ignore
	 */
// @ts-ignore
	public get isMarketComment(): boolean {
// @ts-ignore
		return this.includesFromSubType('market');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is reply comment
// @ts-ignore
	 */
// @ts-ignore
	public get isReply(): boolean {
// @ts-ignore
		return this.payload.reply_to_comment !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the user wrote a message
// @ts-ignore
	 */
// @ts-ignore
	public get isUser(): boolean {
// @ts-ignore
		return this.fromId! > 0;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the group wrote a message
// @ts-ignore
	 */
// @ts-ignore
	public get isGroup(): boolean {
// @ts-ignore
		return this.fromId! < 0;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier comment
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier reply comment
// @ts-ignore
	 */
// @ts-ignore
	public get replyId(): number | undefined {
// @ts-ignore
		return this.payload.reply_to_comment;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * identifier of who wrote the comment
// @ts-ignore
	 */
// @ts-ignore
	public get fromId(): number | undefined {
// @ts-ignore
		return (
// @ts-ignore
			this.payload.from_id
// @ts-ignore
			|| this.payload.user_id
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier reply user
// @ts-ignore
	 */
// @ts-ignore
	public get replyUserId(): number | undefined {
// @ts-ignore
		return this.payload.reply_to_user;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the user who deleted the comment
// @ts-ignore
	 */
// @ts-ignore
	public get deleterUserId(): number | undefined {
// @ts-ignore
		return this.payload.deleter_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of object
// @ts-ignore
	 */
// @ts-ignore
	public get objectId(): number {
// @ts-ignore
		const { payload } = this;
// @ts-ignore

// @ts-ignore
		return (
// @ts-ignore
			payload.photo_id
// @ts-ignore
			|| payload.video_id
// @ts-ignore
			|| payload.post_id
// @ts-ignore
			|| payload.topic_id
// @ts-ignore
			|| payload.item_id
// @ts-ignore
		)!;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of owner
// @ts-ignore
	 */
// @ts-ignore
	public get ownerId(): number {
// @ts-ignore
		const { payload } = this;
// @ts-ignore

// @ts-ignore
		return (
// @ts-ignore
			payload.owner_id
// @ts-ignore
			|| payload.photo_owner_id
// @ts-ignore
			|| payload.video_owner_id
// @ts-ignore
			|| payload.post_owner_id
// @ts-ignore
			|| payload.topic_owner_id
// @ts-ignore
			|| payload.market_owner_id
// @ts-ignore
		)!;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date creation action comment
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number | undefined {
// @ts-ignore
		return this.payload.date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the text comment
// @ts-ignore
	 */
// @ts-ignore
	public get text(): string | undefined {
// @ts-ignore
		return this.payload.text;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the likes
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public get likes(): Record<string, any> | undefined {
// @ts-ignore
		return this.payload.likes;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Includes from subtype
// @ts-ignore
	 */
// @ts-ignore
	public includesFromSubType(type: string): boolean {
// @ts-ignore
		return this.subTypes[1].includes(type);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Edits a comment
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	editComment(options: { message?: string; attachments?: any }): Promise<number> {
// @ts-ignore
		if (this.isDelete) {
// @ts-ignore
			return Promise.reject(new VKError({
// @ts-ignore
				message: 'Comment is deleted',
// @ts-ignore
				code: 'ALREADY_DELETED'
// @ts-ignore
			}));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isBoardComment) {
// @ts-ignore
			return this.api.board.editComment({
// @ts-ignore
				...options,
// @ts-ignore

// @ts-ignore
				comment_id: this.id,
// @ts-ignore
				topic_id: this.objectId,
// @ts-ignore
				group_id: this.$groupId!
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const params = {
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			comment_id: this.id,
// @ts-ignore
			owner_id: this.ownerId
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		if (this.isPhotoComment) {
// @ts-ignore
			return this.api.photos.editComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isVideoComment) {
// @ts-ignore
			return this.api.video.editComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isWallComment) {
// @ts-ignore
			return this.api.wall.editComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isMarketComment) {
// @ts-ignore
			return this.api.market.editComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Promise.reject(new VKError({
// @ts-ignore
			message: 'Unsupported event for editing comment',
// @ts-ignore
			code: 'UNSUPPORTED_EVENT'
// @ts-ignore
		}));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Removes comment
// @ts-ignore
	 */
// @ts-ignore
	deleteComment(): Promise<number> {
// @ts-ignore
		if (this.isDelete) {
// @ts-ignore
			return Promise.reject(new VKError({
// @ts-ignore
				message: 'Comment is deleted',
// @ts-ignore
				code: 'ALREADY_DELETED'
// @ts-ignore
			}));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isBoardComment) {
// @ts-ignore
			return this.api.board.deleteComment({
// @ts-ignore
				comment_id: this.id,
// @ts-ignore
				topic_id: this.objectId,
// @ts-ignore
				group_id: this.$groupId!
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const params = {
// @ts-ignore
			comment_id: this.id,
// @ts-ignore
			owner_id: this.ownerId
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		if (this.isPhotoComment) {
// @ts-ignore
			return this.api.photos.deleteComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isVideoComment) {
// @ts-ignore
			return this.api.video.deleteComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isWallComment) {
// @ts-ignore
			return this.api.wall.deleteComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isMarketComment) {
// @ts-ignore
			return this.api.market.deleteComment(params);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Promise.reject(new VKError({
// @ts-ignore
			message: 'Unsupported event for deleting comment',
// @ts-ignore
			code: 'UNSUPPORTED_EVENT'
// @ts-ignore
		}));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		const properties = [
// @ts-ignore
			'id',
// @ts-ignore
			'replyId',
// @ts-ignore
			'fromId',
// @ts-ignore
			'replyUserId',
// @ts-ignore
			'deleterUserId',
// @ts-ignore
			'objectId',
// @ts-ignore
			'ownerId',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'text',
// @ts-ignore
			'isNew',
// @ts-ignore
			'isEdit',
// @ts-ignore
			'isDelete',
// @ts-ignore
			'isRestore',
// @ts-ignore
			'isPhotoComment',
// @ts-ignore
			'isWallComment',
// @ts-ignore
			'isVideoComment',
// @ts-ignore
			'isBoardComment',
// @ts-ignore
			'isMarketComment',
// @ts-ignore
			'isReply',
// @ts-ignore
			'isUser',
// @ts-ignore
			'isGroup',
// @ts-ignore
			'likes'
// @ts-ignore
		];
// @ts-ignore

// @ts-ignore
		const filtredEmptyProperties = properties.filter(property => (
// @ts-ignore
			this[property] !== undefined
// @ts-ignore
		));
// @ts-ignore

// @ts-ignore
		return pickProperties(this, filtredEmptyProperties);
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface CommentContext extends Attachmentable {}
// @ts-ignore
applyMixins(CommentContext, [Attachmentable]);
// @ts-ignore

// @ts-ignore
export { CommentContext };
