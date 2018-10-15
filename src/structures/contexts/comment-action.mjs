import Context from './context';

import { VKError } from '../../errors';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';
import { transformAttachments } from '../attachments/helpers';

/**
 * Find types
 *
 * @example wall_reply_new
 *
 * @type {RegExp}
 */
const findTypes = /([^_]+)_([^_]+)_([^_]+)/;

export default class CommentActionContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 * @param {Object} options
	 */
	constructor(vk, payload, { updateType, groupId }) {
		super(vk);

		this.payload = payload;
		this.$groupId = groupId;

		this.attachments = transformAttachments(payload.attachments, vk);

		const { 1: initiator, 3: action } = updateType.match(findTypes);

		this.type = 'comment';
		this.subTypes = [
			`${initiator}_comment`,
			`${action}_${initiator}_comment`,
		];
	}

	/**
	 * Checks for the presence of attachments
	 *
	 * @param {?string} type
	 *
	 * @return {boolean}
	 */
	hasAttachments(type = null) {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Checks is new comment
	 *
	 * @return {boolean}
	 */
	get isNew() {
		return this.includesFromSubType('new');
	}

	/**
	 * Checks is edit comment
	 *
	 * @return {boolean}
	 */
	get isEdit() {
		return this.includesFromSubType('edit');
	}

	/**
	 * Checks is delete comment
	 *
	 * @return {boolean}
	 */
	get isDelete() {
		return this.includesFromSubType('delete');
	}

	/**
	 * Checks is restore comment
	 *
	 * @return {boolean}
	 */
	get isRestore() {
		return this.includesFromSubType('restore');
	}

	/**
	 * Checks is photo comment
	 *
	 * @return {boolean}
	 */
	get isPhotoComment() {
		return this.includesFromSubType('photo');
	}

	/**
	 * Checks is wall comment
	 *
	 * @return {boolean}
	 */
	get isWallComment() {
		return this.includesFromSubType('wall');
	}

	/**
	 * Checks is video comment
	 *
	 * @return {boolean}
	 */
	get isVideoComment() {
		return this.includesFromSubType('video');
	}

	/**
	 * Checks is board comment
	 *
	 * @return {boolean}
	 */
	get isBoardComment() {
		return this.includesFromSubType('board');
	}

	/**
	 * Checks is board comment
	 *
	 * @return {boolean}
	 */
	get isMarketComment() {
		return this.includesFromSubType('market');
	}

	/**
	 * Checks is reply comment
	 *
	 * @return {boolean}
	 */
	get isReply() {
		return 'reply_to_comment' in this.payload;
	}

	/**
	 * Returns the identifier comment
	 *
	 * @return {number}
	 */
	get id() {
		return this.payload.id;
	}

	/**
	 * Returns the identifier reply comment
	 *
	 * @return {?number}
	 */
	get replyId() {
		return this.payload.reply_to_comment || null;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {?number}
	 */
	get userId() {
		return (
			this.payload.from_id
			|| this.payload.user_id
			|| null
		);
	}

	/**
	 * Returns the identifier reply user
	 *
	 * @return {?number}
	 */
	get replyUserId() {
		return this.payload.reply_to_user || null;
	}

	/**
	 * Returns the identifier of the user who deleted the comment
	 *
	 * @return {?number}
	 */
	get removerUserId() {
		return this.payload.deleter_id || null;
	}

	/**
	 * Returns the identifier of object
	 *
	 * @return {?number}
	 */
	get objectId() {
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
	 *
	 * @return {?number}
	 */
	get ownerId() {
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
	 *
	 * @return {?number}
	 */
	get createdAt() {
		return this.payload.date || null;
	}

	/**
	 * Returns the text comment
	 *
	 * @return {?string}
	 */
	get text() {
		return this.payload.text || null;
	}

	/**
	 * Returns the likes
	 *
	 * @return {?Object}
	 */
	get likes() {
		return this.payload.likes || null;
	}

	/**
	 * Returns the attachments
	 *
	 * @param {?string} type
	 *
	 * @return {Array}
	 */
	getAttachments(type = null) {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Includes from subtype
	 *
	 * @param {string} type
	 *
	 * @return {string}
	 */
	includesFromSubType(type) {
		return this.subTypes[1].includes(type);
	}

	/**
	 * Edits a comment
	 *
	 * @param {Object} options
	 *
	 * @return {Promise}
	 */
	editComment(options) {
		if (this.isDelete) {
			return Promise.reject(new VKError({
				message: 'Comment is deleted'
			}));
		}

		if (this.isBoardComment) {
			return this.vk.api.board.editComment({
				...options,

				comment_id: this.id,
				topic_id: this.objectId,
				group_id: this.$groupId
			});
		}

		const params = {
			...options,

			comment_id: this.id,
			owner_id: this.ownerId
		};

		if (this.isPhotoComment) {
			return this.vk.api.photos.editComment(params);
		}

		if (this.isVideoComment) {
			return this.vk.api.video.editComment(params);
		}

		if (this.isWallComment) {
			return this.vk.api.wall.editComment(params);
		}

		if (this.isMarketComment) {
			return this.vk.api.market.editComment(params);
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for editing comment'
		}));
	}

	/**
	 * Removes comment
	 *
	 * @return {Promise}
	 */
	deleteComment() {
		if (this.isDelete) {
			return Promise.reject(new VKError({
				message: 'Comment is deleted'
			}));
		}

		if (this.isBoardComment) {
			return this.vk.api.board.deleteComment({
				comment_id: this.id,
				topic_id: this.objectId,
				group_id: this.$groupId
			});
		}

		const params = {
			comment_id: this.id,
			owner_id: this.ownerId
		};

		if (this.isPhotoComment) {
			return this.vk.api.photos.deleteComment(params);
		}

		if (this.isVideoComment) {
			return this.vk.api.video.deleteComment(params);
		}

		if (this.isWallComment) {
			return this.vk.api.wall.deleteComment(params);
		}

		if (this.isMarketComment) {
			return this.vk.api.market.deleteComment(params);
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for deleting comment'
		}));
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
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
			this[property] !== null
		));

		return copyParams(this, filtredEmptyProperties);
	}
}
