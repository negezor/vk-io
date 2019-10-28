import VK from '../../vk';

import Attachment from './attachment';
// eslint-disable-next-line import/no-cycle
import { transformAttachments } from './helpers';
import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';
import ExternalAttachment from './external';

const { WALL } = AttachmentType;

const kAttachments = Symbol('attachments');
const kCopyHistoryAttachments = Symbol('copyHistoryAttachments');

export interface IWallAttachmentPayload {
	id: number;
	to_id?: number;
	owner_id: number;
	access_key?: string;

	from_id?: number;
	created_by?: number;
	date?: number;
	text?: string;
	reply_owner_id?: number;
	reply_post_id?: number;
	friends_only?: number;
	comments?: {
		count: number;
		can_post: number;
		groups_can_post: number;
		can_close: number;
		can_open: number;
	};
	likes?: {
		count: number;
		user_likes: number;
		can_like: number;
		can_publish: number;
	};
	reposts?: {
		count: number;
		user_reposted: number;
	};
	views?: {
		count: number;
	};
	post_type?: string;
	post_source?: {
		type: string;
		platform: string;
		data: string;
		url: string;
	};
	attachments?: object[];
	geo?: object;
	signer_id?: number;
	copy_history?: IWallAttachmentPayload[];
	can_pin?: number;
	can_delete?: number;
	can_edit?: number;
	is_pinned?: number;
	marked_as_ads?: number;
	is_favorite?: number;
}

export default class WallAttachment extends Attachment<IWallAttachmentPayload> {
	protected [kAttachments]: (Attachment | ExternalAttachment)[] | null;

	protected [kCopyHistoryAttachments]: WallAttachment[] | null;

	/**
	 * Constructor
	 */
	public constructor(payload: IWallAttachmentPayload, vk?: VK) {
		super(WALL, payload.owner_id || payload.to_id!, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = 'date' in payload;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
		const [post] = await this.vk.api.wall.getById({
			posts: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		// @ts-ignore
		this.payload = post;

		this[kAttachments] = null;
		this[kCopyHistoryAttachments] = null;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks has comments
	 */
	public get hasComments(): boolean | null {
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
	 */
	public get hasAds(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.marked_as_ads);
	}

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type: string | null = null): boolean {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some((attachment): boolean => (
			attachment.type === type
		));
	}

	/**
	 * Checks has this user reposted
	 */
	public get hasUserReposted(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.reposts!.user_reposted);
	}

	/**
	 * Checks has this user likes
	 */
	public get hasUserLike(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.likes!.user_likes);
	}

	/**
	 * Checks can the current user comment on the entry
	 */
	public get isCanUserCommented(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments!.can_post);
	}

	/**
	 * Checks if a community can comment on a post
	 */
	public get isCanGroupsCommented(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments!.groups_can_post);
	}

	/**
	 * Checks if you can comment on a post
	 */
	public get isCanCommented(): boolean | null {
		return this.isCanUserCommented || this.isCanGroupsCommented;
	}

	/**
	 * Checks if a user can close on a comments
	 */
	public get isCanCloseComments(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments!.can_close);
	}

	/**
	 * Checks if a user can open on a comments
	 */
	public get isCanOpenComments(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.comments!.can_open);
	}

	/**
	 * Checks whether the current user can like the record
	 */
	public get isCanLike(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.likes!.can_like);
	}

	/**
	 * hecks whether the current user can repost the record
	 */
	public get isCanReposted(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.likes!.can_publish);
	}

	/**
	 * Checks is can this user pin post
	 */
	public get isCanPin(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_pin);
	}

	/**
	 * Checks is can this user delete post
	 */
	public get isCanDelete(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_delete);
	}

	/**
	 * Checks is can this user edit post
	 */
	public get isCanEdit(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.can_edit);
	}

	/**
	 * Checks is can this user edit post
	 */
	public get isPinned(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.is_pinned);
	}

	/**
	 * Checks is post created only by friends
	 */
	public get isFriendsOnly(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.friends_only);
	}

	/**
	 * Checks is bookmarked current user
	 */
	public get isFavorited(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return Boolean(this.payload.is_favorite);
	}

	/**
	 * Returns the identifier author
	 */
	public get authorId(): number | null {
		return this.payload.from_id || null;
	}

	/**
	 * Returns the administrator identifier that posted the entry
	 */
	public get createdUserId(): number | null {
		return this.payload.created_by || null;
	}

	/**
	 * The identifier of the record owner, in response to which the current
	 */
	public get replyOwnerId(): number | null {
		return this.payload.reply_owner_id || null;
	}

	/**
	 * The identifier of the record in response to which the current one was left.
	 */
	public get replyPostId(): number | null {
		return this.payload.reply_post_id || null;
	}

	/**
	 * Returns author identifier if the entry was published
	 * on behalf of the community and signed by the user
	 */
	public get signerId(): number | null {
		return this.payload.signer_id || null;
	}

	/**
	 * Returns the date when this post was created
	 */
	public get createdAt(): number | null {
		return this.payload.date || null;
	}

	/**
	 * Returns the post type
	 */
	public get postType(): string | null {
		return this.payload.post_type || null;
	}

	/**
	 * Returns the post text
	 */
	public get text(): string | null {
		return this.payload.text || null;
	}

	/**
	 * Returns the number of record views
	 */
	public get viewsCount(): number | null {
		if (!this.$filled) {
			return null;
		}

		return 'views' in this.payload
			? this.payload.views!.count
			: null;
	}

	/**
	 * Returns the likes count
	 */
	public get likesCount(): number | null {
		if (!this.$filled) {
			return null;
		}

		return 'likes' in this.payload
			? this.payload.likes!.count
			: null;
	}

	/**
	 * Returns the reposts count
	 */
	public get repostsCount(): number | null {
		if (!this.$filled) {
			return null;
		}

		return 'reposts' in this.payload
			? this.payload.reposts!.count
			: null;
	}

	/**
	 * Returns the comments count
	 */
	public get commentsCount(): number | null {
		if (!this.$filled) {
			return null;
		}

		return 'comments' in this.payload
			? this.payload.comments!.count
			: null;
	}

	/**
	 * Returns the likes info
	 */
	public get likes(): object | null {
		return this.payload.likes || null;
	}

	/**
	 * Returns the post source
	 */
	public get postSource(): object | null {
		return this.payload.post_source || null;
	}

	/**
	 * Returns the geo location
	 */
	public get geo(): object | null {
		return this.payload.geo || null;
	}

	/**
	 * Returns the history of reposts for post
	 */
	public get copyHistory(): WallAttachment[] | null {
		if (!this[kCopyHistoryAttachments]) {
			this[kCopyHistoryAttachments] = this.payload.copy_history
				? this.payload.copy_history.map((history): WallAttachment => (
					new WallAttachment(history, this.vk)
				))
				: [];
		}

		return this[kCopyHistoryAttachments];
	}

	/**
	 * Returns the attachments
	 */
	public get attachments(): (Attachment | ExternalAttachment)[] {
		if (!this[kAttachments]) {
			this[kAttachments] = transformAttachments(this.payload.attachments || [], this.vk);
		}

		return this[kAttachments]!;
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: string | null = null): (Attachment | ExternalAttachment)[] {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter((attachment): boolean => (
			attachment.type === type
		));
	}

	/**
	 * Returns the custom data
	 */
	// @ts-ignore
	public [inspectCustomData](): object | null {
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
