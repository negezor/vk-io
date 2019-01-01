import Attachment from './attachment';
// eslint-disable-next-line import/no-cycle
import { transformAttachments } from './helpers';
import { copyParams } from '../../utils/helpers';
import { attachmentTypes, inspectCustomData } from '../../utils/constants';

const { WALL } = attachmentTypes;

const kAttachments = Symbol('attachments');
const kCopyHistoryAttachments = Symbol('copyHistoryAttachments');

export default class WallAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(WALL, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'date' in payload;
	}

	/**
	 * Load attachment payload
	 *
	 * @return {Promise}
	 */
	async loadAttachmentPayload() {
		if (this.$filled) {
			return;
		}

		const [post] = await this.vk.api.wall.getById({
			posts: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		this.payload = post;

		this[kAttachments] = null;
		this[kCopyHistoryAttachments] = null;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks has comments
	 *
	 * @return {?boolean}
	 */
	get hasComments() {
		if (!this.$filled) {
			return null;
		}

		const { commentsCount } = this;

		return commentsCount !== null
			? commentsCount > 0
			: null;
	}

	/**
	 * Checks has ads in post
	 *
	 * @return {?boolean}
	 */
	get hasAds() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.marked_as_ads);
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
	 * Checks has this user reposted
	 *
	 * @return {?boolean}
	 */
	get hasUserReposted() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.reposts.user_reposted);
	}

	/**
	 * Checks has this user likes
	 *
	 * @return {?boolean}
	 */
	get hasUserLike() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.user_likes);
	}

	/**
	 * Checks can the current user comment on the entry
	 *
	 * @return {?boolean}
	 */
	get isCanUserCommented() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments.can_post);
	}

	/**
	 * Checks if a community can comment on a post
	 *
	 * @return {?boolean}
	 */
	get isCanGroupsCommented() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments.groups_can_post);
	}

	/**
	 * Checks if you can comment on a post
	 *
	 * @return {?boolean}
	 */
	get isCanCommented() {
		return this.isCanUserCommented() || this.isCanGroupsCommented();
	}

	/**
	 * Checks if a user can close on a comments
	 *
	 * @return {?boolean}
	 */
	isCanCloseComments() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments.can_close);
	}

	/**
	 * Checks if a user can open on a comments
	 *
	 * @return {?boolean}
	 */
	isCanOpenComments() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments.can_open);
	}

	/**
	 * Checks whether the current user can like the record
	 *
	 * @return {?boolean}
	 */
	get isCanLike() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.likes.can_like);
	}

	/**
	 * hecks whether the current user can repost the record
	 *
	 * @return {?boolean}
	 */
	get isCanReposted() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.likes.can_publish);
	}

	/**
	 * Checks is can this user pin post
	 *
	 * @return {?boolean}
	 */
	get isCanPin() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_pin);
	}

	/**
	 * Checks is can this user delete post
	 *
	 * @return {?boolean}
	 */
	get isCanDelete() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_delete);
	}

	/**
	 * Checks is can this user edit post
	 *
	 * @return {?boolean}
	 */
	get isCanEdit() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_edit);
	}

	/**
	 * Checks is can this user edit post
	 *
	 * @return {?boolean}
	 */
	get isPinned() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.is_pinned);
	}

	/**
	 * Checks is post created only by friends
	 *
	 * @return {?boolean}
	 */
	get isFriendsOnly() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.friends_only);
	}

	/**
	 * Checks is bookmarked current user
	 *
	 * @return {?boolean}
	 */
	isFavorited() {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.is_favorite);
	}

	/**
	 * Returns the identifier author
	 *
	 * @return {?number}
	 */
	get authorId() {
		return this.payload.from_id || null;
	}

	/**
	 * Returns the administrator identifier that posted the entry
	 *
	 * @return {?number}
	 */
	get createdUserId() {
		return this.payload.created_by || null;
	}

	/**
	 * The identifier of the record owner, in response to which the current
	 *
	 * @return {?number}
	 */
	get replyOwnerId() {
		return this.payload.reply_owner_id || null;
	}

	/**
	 * The identifier of the record in response to which the current one was left.
	 *
	 * @return {?number}
	 */
	get replyPostId() {
		return this.payload.reply_post_id || null;
	}

	/**
	 * Returns author identifier if the entry was published
	 * on behalf of the community and signed by the user
	 *
	 * @return {?number}
	 */
	get signerId() {
		return this.payload.signer_id || null;
	}

	/**
	 * Returns the date when this post was created
	 *
	 * @return {?number}
	 */
	get createdAt() {
		return this.payload.date || null;
	}

	/**
	 * Returns the post type
	 *
	 * @return {?string}
	 */
	get postType() {
		return this.payload.post_type || null;
	}

	/**
	 * Returns the post text
	 *
	 * @return {?string}
	 */
	get text() {
		return this.payload.text || null;
	}

	/**
	 * Returns the number of record views
	 *
	 * @return {?number}
	 */
	get viewsCount() {
		if (!this.$filled) {
			return null;
		}

		return 'views' in this.payload
			? this.payload.views.count
			: null;
	}

	/**
	 * Returns the likes count
	 *
	 * @return {?number}
	 */
	get likesCount() {
		if (!this.$filled) {
			return null;
		}

		return 'likes' in this.payload
			? this.payload.likes.count
			: null;
	}

	/**
	 * Returns the reposts count
	 *
	 * @return {?number}
	 */
	get repostsCount() {
		if (!this.$filled) {
			return null;
		}

		return 'reposts' in this.payload
			? this.payload.reposts.count
			: null;
	}

	/**
	 * Returns the comments count
	 *
	 * @return {?number}
	 */
	get commentsCount() {
		if (!this.$filled) {
			return null;
		}

		return 'comments' in this.payload
			? this.payload.comments.count
			: null;
	}

	/**
	 * Returns the likes info
	 *
	 * @return {?Object}
	 */
	get likes() {
		return this.payload.likes || null;
	}

	/**
	 * Returns the post source
	 *
	 * @return {?Object}
	 */
	get postSource() {
		return this.payload.post_source || null;
	}

	/**
	 * Returns the geo location
	 *
	 * @return {?Object}
	 */
	get geo() {
		return this.payload.geo || null;
	}

	/**
	 * Returns the history of reposts for post
	 *
	 * @return {WallAttachment[]}
	 */
	get copyHistory() {
		if (!this[kCopyHistoryAttachments]) {
			this[kCopyHistoryAttachments] = this.payload.copy_history
				? this.payload.copy_history.map(history => new WallAttachment(history, this.vk))
				: [];
		}

		return this[kCopyHistoryAttachments];
	}

	/**
	 * Returns the attachments
	 */
	get attachments() {
		if (!this[kAttachments]) {
			this[kAttachments] = transformAttachments(this.payload.attachments || [], this.vk);
		}

		return this[kAttachments];
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
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'authorId',
			'createdUserId',
			'replyOwnerId',
			'replyPostId',
			'signerId',
			'createdAt',
			'postType',
			'text',
			'viewsCount',
			'likesCount',
			'repostsCount',
			'commentsCount',
			'likes',
			'postSource',
			'geo',
			'copyHistory',
			'attachments'
		]);
	}
}
