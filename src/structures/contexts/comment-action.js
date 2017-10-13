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
	constructor(vk, { type, object: update }) {
		super(vk);

		this.payload = update;
		this.attachments = transformAttachments(update.attachments);

		const [, initsiator, commentType, action] = type.match(findTypes);

		this.type = 'comment';
		this.subTypes = [
			`${initsiator}_comment`,
			`${action}_${initsiator}_comment`,
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
}
