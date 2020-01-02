import VK from '../../vk';

import { Attachment } from './attachment';
import { ExternalAttachment } from './external';
import Attachmentable from '../shared/attachmentable';

// eslint-disable-next-line import/no-cycle
import { transformAttachments } from './helpers';
import { copyParams, applyMixins } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

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

class WallAttachment extends Attachment<IWallAttachmentPayload> {
	protected [kAttachments]?: (Attachment | ExternalAttachment)[];

	protected [kCopyHistoryAttachments]?: WallAttachment[];

	/**
	 * Constructor
	 */
	public constructor(payload: IWallAttachmentPayload, vk?: VK) {
		super(WALL, payload.owner_id || payload.to_id!, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = payload.date !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const [post] = await this.vk.api.wall.getById({
			posts: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		// @ts-ignore
		this.payload = post;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks has comments
	 */
	public get hasComments(): boolean | undefined {
		const { commentsCount } = this;

		return commentsCount !== undefined
			? commentsCount > 0
			: undefined;
	}

	/**
	 * Checks has ads in post
	 */
	public get hasAds(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.marked_as_ads);
	}

	/**
	 * Checks has this user reposted
	 */
	public get hasUserReposted(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.reposts!.user_reposted);
	}

	/**
	 * Checks has this user likes
	 */
	public get hasUserLike(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.likes!.user_likes);
	}

	/**
	 * Checks can the current user comment on the entry
	 */
	public get isCanUserCommented(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.comments!.can_post);
	}

	/**
	 * Checks if a community can comment on a post
	 */
	public get isCanGroupsCommented(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.comments!.groups_can_post);
	}

	/**
	 * Checks if you can comment on a post
	 */
	public get isCanCommented(): boolean | undefined {
		return this.isCanUserCommented || this.isCanGroupsCommented;
	}

	/**
	 * Checks if a user can close on a comments
	 */
	public get isCanCloseComments(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.comments!.can_close);
	}

	/**
	 * Checks if a user can open on a comments
	 */
	public get isCanOpenComments(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.comments!.can_open);
	}

	/**
	 * Checks whether the current user can like the record
	 */
	public get isCanLike(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.likes!.can_like);
	}

	/**
	 * hecks whether the current user can repost the record
	 */
	public get isCanReposted(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.likes!.can_publish);
	}

	/**
	 * Checks is can this user pin post
	 */
	public get isCanPin(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_pin);
	}

	/**
	 * Checks is can this user delete post
	 */
	public get isCanDelete(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_delete);
	}

	/**
	 * Checks is can this user edit post
	 */
	public get isCanEdit(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.can_edit);
	}

	/**
	 * Checks is can this user edit post
	 */
	public get isPinned(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.is_pinned);
	}

	/**
	 * Checks is post created only by friends
	 */
	public get isFriendsOnly(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.friends_only);
	}

	/**
	 * Checks is bookmarked current user
	 */
	public get isFavorited(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return Boolean(this.payload.is_favorite);
	}

	/**
	 * Returns the identifier author
	 */
	public get authorId(): number | undefined {
		return this.payload.from_id;
	}

	/**
	 * Returns the administrator identifier that posted the entry
	 */
	public get createdUserId(): number | undefined {
		return this.payload.created_by;
	}

	/**
	 * The identifier of the record owner, in response to which the current
	 */
	public get replyOwnerId(): number | undefined {
		return this.payload.reply_owner_id;
	}

	/**
	 * The identifier of the record in response to which the current one was left.
	 */
	public get replyPostId(): number | undefined {
		return this.payload.reply_post_id;
	}

	/**
	 * Returns author identifier if the entry was published
	 * on behalf of the community and signed by the user
	 */
	public get signerId(): number | undefined {
		return this.payload.signer_id;
	}

	/**
	 * Returns the date when this post was created
	 */
	public get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns the post type
	 */
	public get postType(): string | undefined {
		return this.payload.post_type;
	}

	/**
	 * Returns the post text
	 */
	public get text(): string | undefined {
		return this.payload.text;
	}

	/**
	 * Returns the number of record views
	 */
	public get viewsCount(): number | undefined {
		return this.payload.views?.count;
	}

	/**
	 * Returns the likes count
	 */
	public get likesCount(): number | undefined {
		return this.payload.likes?.count;
	}

	/**
	 * Returns the reposts count
	 */
	public get repostsCount(): number | undefined {
		return this.payload.reposts?.count;
	}

	/**
	 * Returns the comments count
	 */
	public get commentsCount(): number | undefined {
		return this.payload.comments?.count;
	}

	/**
	 * Returns the likes info
	 */
	public get likes(): object | undefined {
		return this.payload.likes;
	}

	/**
	 * Returns the post source
	 */
	public get postSource(): object | undefined {
		return this.payload.post_source;
	}

	/**
	 * Returns the geo location
	 */
	public get geo(): object | undefined {
		return this.payload.geo;
	}

	/**
	 * Returns the history of reposts for post
	 */
	public get copyHistory(): WallAttachment[] | undefined {
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
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
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


// eslint-disable-next-line
interface WallAttachment extends Attachmentable {}
applyMixins(WallAttachment, [Attachmentable]);

export { WallAttachment };
