import Context, { IContextOptions } from './context';

import { VKError } from '../../errors';

import { Attachment } from '../attachments';
import Attachmentable from '../shared/attachmentable';

import { inspectCustomData } from '../../utils/constants';
import { transformAttachments } from '../attachments/helpers';
import { copyParams, applyMixins, showDeprecatedMessage } from '../../utils/helpers';

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
class CommentActionContext<S = Record<string, any>>
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
	 * Returns the identifier user
	 */
	public get userId(): number | undefined {
		showDeprecatedMessage('context.userId deperecated, use context.fromId');

		return this.fromId;
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
	public get objectId(): number | undefined {
		const { payload } = this;

		return (
			payload.photo_id
			|| payload.video_id
			|| payload.post_id
			|| payload.topic_id
			|| payload.item_id
		);
	}

	/**
	 * Returns the identifier of owner
	 */
	public get ownerId(): number | undefined {
		const { payload } = this;

		return (
			payload.owner_id
			|| payload.photo_owner_id
			|| payload.video_owner_id
			|| payload.post_owner_id
			|| payload.topic_owner_id
			|| payload.market_owner_id
		);
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
			this[property] !== undefined
		));

		// @ts-ignore
		return copyParams(this, filtredEmptyProperties);
	}
}

// eslint-disable-next-line
interface CommentActionContext extends Attachmentable {}
applyMixins(CommentActionContext, [Attachmentable]);

export default CommentActionContext;
