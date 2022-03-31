// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore
import { ExternalAttachment } from './external';
// @ts-ignore
import { Attachmentable } from '../shared';
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line import/no-cycle
// @ts-ignore
import { transformAttachments } from './helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore
import { pickProperties, applyMixins } from '../../utils/helpers';
// @ts-ignore

// @ts-ignore
const kAttachments = Symbol('attachments');
// @ts-ignore
const kCopyHistoryAttachments = Symbol('copyHistoryAttachments');
// @ts-ignore

// @ts-ignore
export interface IWallAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	to_id?: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	from_id?: number;
// @ts-ignore
	created_by?: number;
// @ts-ignore
	date?: number;
// @ts-ignore
	text?: string;
// @ts-ignore
	reply_owner_id?: number;
// @ts-ignore
	reply_post_id?: number;
// @ts-ignore
	friends_only?: number;
// @ts-ignore
	comments?: {
// @ts-ignore
		count: number;
// @ts-ignore
		can_post: number;
// @ts-ignore
		groups_can_post: number;
// @ts-ignore
		can_close: number;
// @ts-ignore
		can_open: number;
// @ts-ignore
	};
// @ts-ignore
	copyright?: {
// @ts-ignore
		id?: number;
// @ts-ignore
		link: string;
// @ts-ignore
		name: string;
// @ts-ignore
		type: string;
// @ts-ignore
	};
// @ts-ignore
	likes?: {
// @ts-ignore
		count: number;
// @ts-ignore
		user_likes: number;
// @ts-ignore
		can_like: number;
// @ts-ignore
		can_publish: number;
// @ts-ignore
	};
// @ts-ignore
	reposts?: {
// @ts-ignore
		count: number;
// @ts-ignore
		user_reposted: number;
// @ts-ignore
	};
// @ts-ignore
	views?: {
// @ts-ignore
		count: number;
// @ts-ignore
	};
// @ts-ignore
	post_type?: string;
// @ts-ignore
	post_source?: {
// @ts-ignore
		type: string;
// @ts-ignore
		platform: string;
// @ts-ignore
		data: string;
// @ts-ignore
		url: string;
// @ts-ignore
	};
// @ts-ignore
	attachments?: object[];
// @ts-ignore
	geo?: object;
// @ts-ignore
	signer_id?: number;
// @ts-ignore
	copy_history?: IWallAttachmentPayload[];
// @ts-ignore
	can_pin?: number;
// @ts-ignore
	can_delete?: number;
// @ts-ignore
	can_edit?: number;
// @ts-ignore
	is_pinned?: number;
// @ts-ignore
	marked_as_ads?: number;
// @ts-ignore
	is_favorite?: number;
// @ts-ignore
	donut?: {
// @ts-ignore
		is_donut: boolean;
// @ts-ignore
		paid_duration?: number;
// @ts-ignore
		placeholder?: {
// @ts-ignore
			text: string;
// @ts-ignore
		};
// @ts-ignore
		can_publish_free_copy?: boolean;
// @ts-ignore
		edit_mode?: 'all' | 'duration';
// @ts-ignore
		durations?: {
// @ts-ignore
			id: number;
// @ts-ignore
			name: string;
// @ts-ignore
		}[];
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WallAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IWallAttachmentPayload>;
// @ts-ignore

// @ts-ignore
class WallAttachment extends Attachment<IWallAttachmentPayload, AttachmentType.WALL | 'wall'> {
// @ts-ignore
	protected [kAttachments]: (Attachment | ExternalAttachment)[];
// @ts-ignore

// @ts-ignore
	protected [kCopyHistoryAttachments]: WallAttachment[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: WallAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.WALL
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.date !== undefined;
// @ts-ignore

// @ts-ignore
		this.applyPayload(options.payload);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Load attachment payload
// @ts-ignore
	 */
// @ts-ignore
	public async loadAttachmentPayload(): Promise<void> {
// @ts-ignore
		if (this.$filled) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [post] = await this.api.wall.getById({
// @ts-ignore
			posts: `${this.ownerId}_${this.id}`,
// @ts-ignore
			extended: 0
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.applyPayload(post as unknown as IWallAttachmentPayload);
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks has comments
// @ts-ignore
	 */
// @ts-ignore
	public get hasComments(): boolean | undefined {
// @ts-ignore
		const { commentsCount } = this;
// @ts-ignore

// @ts-ignore
		return commentsCount !== undefined
// @ts-ignore
			? commentsCount > 0
// @ts-ignore
			: undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks has ads in post
// @ts-ignore
	 */
// @ts-ignore
	public get hasAds(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.marked_as_ads);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks has this user reposted
// @ts-ignore
	 */
// @ts-ignore
	public get hasUserReposted(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.reposts!.user_reposted);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks has this user likes
// @ts-ignore
	 */
// @ts-ignore
	public get hasUserLike(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.likes!.user_likes);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks can the current user comment on the entry
// @ts-ignore
	 */
// @ts-ignore
	public get isCanUserCommented(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.comments!.can_post);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a community can comment on a post
// @ts-ignore
	 */
// @ts-ignore
	public get isCanGroupsCommented(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.comments!.groups_can_post);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if you can comment on a post
// @ts-ignore
	 */
// @ts-ignore
	public get isCanCommented(): boolean | undefined {
// @ts-ignore
		return this.isCanUserCommented || this.isCanGroupsCommented;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a user can close on a comments
// @ts-ignore
	 */
// @ts-ignore
	public get isCanCloseComments(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.comments!.can_close);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a user can open on a comments
// @ts-ignore
	 */
// @ts-ignore
	public get isCanOpenComments(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.comments!.can_open);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the current user can like the record
// @ts-ignore
	 */
// @ts-ignore
	public get isCanLike(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.likes!.can_like);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * hecks whether the current user can repost the record
// @ts-ignore
	 */
// @ts-ignore
	public get isCanReposted(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.likes!.can_publish);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is can this user pin post
// @ts-ignore
	 */
// @ts-ignore
	public get isCanPin(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_pin);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is can this user delete post
// @ts-ignore
	 */
// @ts-ignore
	public get isCanDelete(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_delete);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is can this user edit post
// @ts-ignore
	 */
// @ts-ignore
	public get isCanEdit(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.can_edit);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is can this user edit post
// @ts-ignore
	 */
// @ts-ignore
	public get isPinned(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.is_pinned);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is post created only by friends
// @ts-ignore
	 */
// @ts-ignore
	public get isFriendsOnly(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.friends_only);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is bookmarked current user
// @ts-ignore
	 */
// @ts-ignore
	public get isFavorited(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.is_favorite);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public get ownerId(): number {
// @ts-ignore
		return this.payload.owner_id || this.payload.to_id!;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier author
// @ts-ignore
	 */
// @ts-ignore
	public get authorId(): number | undefined {
// @ts-ignore
		return this.payload.from_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the administrator identifier that posted the entry
// @ts-ignore
	 */
// @ts-ignore
	public get createdUserId(): number | undefined {
// @ts-ignore
		return this.payload.created_by;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The identifier of the record owner, in response to which the current
// @ts-ignore
	 */
// @ts-ignore
	public get replyOwnerId(): number | undefined {
// @ts-ignore
		return this.payload.reply_owner_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The identifier of the record in response to which the current one was left.
// @ts-ignore
	 */
// @ts-ignore
	public get replyPostId(): number | undefined {
// @ts-ignore
		return this.payload.reply_post_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns author identifier if the entry was published
// @ts-ignore
	 * on behalf of the community and signed by the user
// @ts-ignore
	 */
// @ts-ignore
	public get signerId(): number | undefined {
// @ts-ignore
		return this.payload.signer_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this post was created
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
	 * Returns the post type
// @ts-ignore
	 */
// @ts-ignore
	public get postType(): string | undefined {
// @ts-ignore
		return this.payload.post_type;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the post text
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
	 * Returns the number of record views
// @ts-ignore
	 */
// @ts-ignore
	public get viewsCount(): number | undefined {
// @ts-ignore
		return this.payload.views?.count;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the likes count
// @ts-ignore
	 */
// @ts-ignore
	public get likesCount(): number | undefined {
// @ts-ignore
		return this.payload.likes?.count;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the reposts count
// @ts-ignore
	 */
// @ts-ignore
	public get repostsCount(): number | undefined {
// @ts-ignore
		return this.payload.reposts?.count;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the comments count
// @ts-ignore
	 */
// @ts-ignore
	public get commentsCount(): number | undefined {
// @ts-ignore
		return this.payload.comments?.count;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the likes info
// @ts-ignore
	 */
// @ts-ignore
	public get likes(): IWallAttachmentPayload['likes'] | undefined {
// @ts-ignore
		return this.payload.likes;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the post source
// @ts-ignore
	 */
// @ts-ignore
	public get postSource(): IWallAttachmentPayload['post_source'] | undefined {
// @ts-ignore
		return this.payload.post_source;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the geo location
// @ts-ignore
	 */
// @ts-ignore
	public get geo(): IWallAttachmentPayload['geo'] | undefined {
// @ts-ignore
		return this.payload.geo;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the copyright
// @ts-ignore
	 */
// @ts-ignore
	public get copyright(): IWallAttachmentPayload['copyright'] | undefined {
// @ts-ignore
		return this.payload.copyright;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the attachments
// @ts-ignore
	 */
// @ts-ignore
	public get attachments(): (Attachment | ExternalAttachment)[] {
// @ts-ignore
		return this[kAttachments];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the history of reposts for post
// @ts-ignore
	 */
// @ts-ignore
	public get copyHistory(): WallAttachment[] | undefined {
// @ts-ignore
		return this[kCopyHistoryAttachments];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Applies the payload
// @ts-ignore
	 */
// @ts-ignore
	private applyPayload(payload: IWallAttachmentPayload): void {
// @ts-ignore
		this.payload = payload;
// @ts-ignore

// @ts-ignore
		this[kAttachments] = transformAttachments(payload.attachments || [], this.api);
// @ts-ignore

// @ts-ignore
		this[kCopyHistoryAttachments] = (payload.copy_history || []).map((history): WallAttachment => (
// @ts-ignore
			new WallAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: history
// @ts-ignore
			})
// @ts-ignore
		));
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
		return pickProperties(this, [
// @ts-ignore
			'authorId',
// @ts-ignore
			'createdUserId',
// @ts-ignore
			'replyOwnerId',
// @ts-ignore
			'replyPostId',
// @ts-ignore
			'signerId',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'postType',
// @ts-ignore
			'text',
// @ts-ignore
			'viewsCount',
// @ts-ignore
			'likesCount',
// @ts-ignore
			'repostsCount',
// @ts-ignore
			'commentsCount',
// @ts-ignore
			'likes',
// @ts-ignore
			'postSource',
// @ts-ignore
			'geo',
// @ts-ignore
			'copyright',
// @ts-ignore
			'copyHistory',
// @ts-ignore
			'attachments'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface WallAttachment extends Attachmentable {}
// @ts-ignore
applyMixins(WallAttachment, [Attachmentable]);
// @ts-ignore

// @ts-ignore
export { WallAttachment };
