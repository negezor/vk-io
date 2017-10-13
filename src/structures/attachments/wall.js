import Attachment from './attachment';
import { transformAttachments } from './helpers';

export default class WallAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('wall', payload.owner_id, payload.id, payload.access_key);

		this.payload = payload;

		this.attachments = transformAttachments(payload.attachments);

		this.filled = 'date' in payload;
	}

	/**
	 * Get payload
	 *
	 * @return {Promise}
	 */
	async getAttachmentPayload() {
		const [post] = await this.vk.api.wall.getById({
			posts: `${this.owner}_${this.id}`,
			extended: 0
		});

		this.payload = post;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.filled = true;
	}

	/**
	 * Checks has comments
	 *
	 * @return {?boolean}
	 */
	hasComments() {
		if (!this.filled) {
			return null;
		}

		return this.payload.comments.count > 0;
	}

	/**
	 * Checks has ads in post
	 *
	 * @return {?boolean}
	 */
	hasAds() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.marked_as_ads);
	}

	/**
	 * Checks has this user reposted
	 *
	 * @return {?boolean}
	 */
	hasUserReposted() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.reposts.user_reposted);
	}

	/**
	 * Checks has this user likes
	 *
	 * @return {?boolean}
	 */
	hasUserLike() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.user_likes);
	}

	/**
	 * Checks is can this user commented post
	 *
	 * @return {?boolean}
	 */
	isCanUserCommented() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.comments.can_post);
	}

	/**
	 * Checks is can groups commented post
	 *
	 * @return {?boolean}
	 */
	isCanGroupsCommented() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.comments.groups_can_post);
	}

	/**
	 * Checks is can commented post
	 *
	 * @return {?boolean}
	 */
	isCanCommented() {
		if (!this.filled) {
			return null;
		}

		return this.isCanUserCommented() || this.isCanGroupsCommented();
	}

	/**
	 * Checks is can like this post
	 *
	 * @return {?boolean}
	 */
	isCanLike() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.likes.can_like);
	}

	/**
	 * Checks is can commented post
	 *
	 * @return {?boolean}
	 */
	isCanReposted() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.likes.can_publish);
	}

	/**
	 * Checks is can this user pin post
	 *
	 * @return {?boolean}
	 */
	isCanPin() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.can_pin);
	}

	/**
	 * Checks is can this user edit post
	 *
	 * @return {?boolean}
	 */
	isCanPinned() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.can_pinned);
	}

	/**
	 * Checks is can this user delete post
	 *
	 * @return {?boolean}
	 */
	isCanDelete() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.can_delete);
	}

	/**
	 * Checks is can this user edit post
	 *
	 * @return {?boolean}
	 */
	isCanEdit() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.can_edit);
	}

	/**
	 * Checks is post created only by friends
	 *
	 * @return {?boolean}
	 */
	isFriendsOnly() {
		if (!this.filled) {
			return null;
		}

		return Boolean(this.payload.friends_only);
	}

	/**
	 * Returns the date creation post
	 *
	 * @return {?number}
	 */
	getDate() {
		return this.payload.date || null;
	}

	/**
	 * Returns the identifier author
	 *
	 * @return {?number}
	 */
	getAuthorId() {
		return this.payload.from_id || null;
	}

	/**
	 * Returns the post type
	 *
	 * @return {?string}
	 */
	getPostType() {
		return this.payload.post_type || null;
	}

	/**
	 * Returns the post text
	 *
	 * @return {?string}
	 */
	getText() {
		return this.payload.text || null;
	}

	/**
	 * Returns the identifier created user post
	 *
	 * @return {?number}
	 */
	getCreatedUserId() {
		return this.payload.created_by || null;
	}

	/**
	 * Returns the identifier reply owner
	 *
	 * @return {?number}
	 */
	getReplyOwnerId() {
		return this.payload.reply_owner_id || null;
	}

	/**
	 * Returns the identifier reply post
	 *
	 * @return {?number}
	 */
	getReplyPostId() {
		return this.payload.reply_post_id || null;
	}

	/**
	 * Returns the identifier signer user
	 *
	 * @return {?number}
	 */
	getSignerId() {
		return this.payload.signer_id || null;
	}

	/**
	 * Returns the views count
	 *
	 * @return {?number}
	 */
	getViewsCount() {
		if (!this.filled) {
			return null;
		}

		return this.payload.views.count;
	}

	/**
	 * Returns the geo location
	 *
	 * @return {?Object}
	 */
	getGeo() {
		return this.payload.geo || null;
	}

	/**
	 * Returns the likes info
	 *
	 * @return {?Object}
	 */
	getLikes() {
		return this.payload.likes || null;
	}

	/**
	 * Returns the likes count
	 *
	 * @return {?number}
	 */
	getLikesCount() {
		if (!this.filled) {
			return null;
		}

		return this.payload.likes.count;
	}

	/**
	 * Returns the reposts count
	 *
	 * @return {?number}
	 */
	getRepostsCount() {
		if (!this.filled) {
			return null;
		}

		return this.payload.reposts.count;
	}

	/**
	 * Returns the post source
	 *
	 * @return {?Object}
	 */
	getPostSource() {
		return this.payload.post_source || null;
	}
}
