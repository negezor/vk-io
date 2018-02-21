import Context from './context';
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
	 */
	constructor(vk, { type, object: update, group_id: groupId }) {
		super(vk);

		this.payload = update;
		this.attachments = transformAttachments(update.attachments, vk);

		const [, initsiator, commentType, action] = type.match(findTypes);

		this.type = 'comment';
		this.subTypes = [
			`${initsiator}_comment`,
			`${action}_${initsiator}_comment`,
		];

		this.$groupId = groupId;
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
	isNew() {
		return this.includesFromSubType('new');
	}

	/**
	 * Checks is edit comment
	 *
	 * @return {boolean}
	 */
	isEdit() {
		return this.includesFromSubType('edit');
	}

	/**
	 * Checks is delete comment
	 *
	 * @return {boolean}
	 */
	isDelete() {
		return this.includesFromSubType('delete');
	}

	/**
	 * Checks is restore comment
	 *
	 * @return {boolean}
	 */
	isRestore() {
		return this.includesFromSubType('restore');
	}

	/**
	 * Checks is photo comment
	 *
	 * @return {boolean}
	 */
	isPhotoComment() {
		return this.includesFromSubType('photo');
	}

	/**
	 * Checks is wall comment
	 *
	 * @return {boolean}
	 */
	isWallComment() {
		return this.includesFromSubType('wall');
	}

	/**
	 * Checks is video comment
	 *
	 * @return {boolean}
	 */
	isVideoComment() {
		return this.includesFromSubType('video');
	}

	/**
	 * Checks is board comment
	 *
	 * @return {boolean}
	 */
	isBoardComment() {
		return this.includesFromSubType('board');
	}

	/**
	 * Checks is board comment
	 *
	 * @return {boolean}
	 */
	isMarketComment() {
		return this.includesFromSubType('market');
	}

	/**
	 * Checks is reply comment
	 *
	 * @return {boolean}
	 */
	isReply() {
		return 'reply_to_comment' in this.payload;
	}

	/**
	 * Returns the identifier comment
	 *
	 * @return {number}
	 */
	getId() {
		return this.payload.id;
	}

	/**
	 * Returns the identifier reply comment
	 *
	 * @return {?number}
	 */
	getReplyId() {
		return this.payload.reply_to_comment || null;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {?number}
	 */
	getUserId() {
		return (
			this.payload.from_id ||
			this.payload.user_id ||
			null
		);
	}

	/**
	 * Returns the identifier reply user
	 *
	 * @return {?number}
	 */
	getReplyUserId() {
		return this.payload.reply_to_user || null;
	}

	/**
	 * Returns the identifier of the user who deleted the comment
	 *
	 * @return {?number}
	 */
	getRemoverUserId() {
		return this.payload.deleter_id || null;
	}

	/**
	 * Returns the identifier of object
	 *
	 * @return {?number}
	 */
	getObjectId() {
		const { payload } = this;

		return (
			this.payload.photo_id ||
			this.payload.video_id ||
			this.payload.post_id ||
			this.payload.topic_id ||
			this.payload.item_id ||
			null
		);
	}

	/**
	 * Returns the identifier of owner
	 *
	 * @return {?number}
	 */
	getOwnerId() {
		const { payload } = this;

		return (
			payload.owner_id ||
			payload.photo_owner_id ||
			payload.video_owner_id ||
			payload.post_owner_id ||
			payload.topic_owner_id ||
			payload.market_owner_id ||
			null
		);
	}

	/**
	 * Returns the date creation action comment
	 *
	 * @return {?number}
	 */
	getDate() {
		return this.payload.date || null;
	}

	/**
	 * Returns the text comment
	 *
	 * @return {?string}
	 */
	getText() {
		return this.payload.text || null;
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
	 * Returns the likes
	 *
	 * @return {?Object}
	 */
	getLikes() {
		return this.payload.likes;
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
		if (this.isDelete()) {
			return Promise.reject(new Error('Comment is deleted'));
		}

		if (this.isBoardComment()) {
			return this.vk.api.board.editComment({
				...options,

				topic_id: this.getObjectId(),
				comment_id: this.getId(),
				group_id: this.$groupId
			});
		}

		const params = {
			...options,

			comment_id: this.getId(),
			owner_id: this.getOwnerId()
		};

		if (this.isPhotoComment()) {
			return this.vk.api.photos.editComment(params);
		}

		if (this.isVideoComment()) {
			return this.vk.api.video.editComment(params);
		}

		if (this.isWallComment()) {
			return this.vk.api.wall.editComment(params);
		}

		if (this.isMarketComment()) {
			return this.vk.api.market.editComment(params);
		}

		return Promise.reject(new Error('Unsupported event for editing comment'));
	}

	/**
	 * Removes comment
	 *
	 * @return {Promise}
	 */
	deleteComment() {
		if (this.isDelete()) {
			return Promise.reject(new Error('Comment is deleted'));
		}

		if (this.isBoardComment()) {
			return this.vk.api.board.deleteComment({
				topic_id: this.getObjectId(),
				comment_id: this.getId(),
				group_id: this.$groupId
			});
		}

		const params = {
			comment_id: this.getId(),
			owner_id: this.getOwnerId()
		};

		if (this.isPhotoComment()) {
			return this.vk.api.photos.deleteComment(params);
		}

		if (this.isVideoComment()) {
			return this.vk.api.video.deleteComment(params);
		}

		if (this.isWallComment()) {
			return this.vk.api.wall.deleteComment(params);
		}

		if (this.isMarketComment()) {
			return this.vk.api.market.deleteComment(params);
		}

		return Promise.reject(new Error('Unsupported event for deleting comment'));
	}
}
