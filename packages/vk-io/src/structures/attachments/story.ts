// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore
import { PhotoAttachment, IPhotoAttachmentPayload } from './photo';
// @ts-ignore
import { VideoAttachment, IVideoAttachmentPayload } from './video';
// @ts-ignore

// @ts-ignore
export interface IStoryAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	type?: 'photo' | 'video';
// @ts-ignore

// @ts-ignore
	photo?: IPhotoAttachmentPayload;
// @ts-ignore
	video?: IVideoAttachmentPayload;
// @ts-ignore

// @ts-ignore
	date?: number;
// @ts-ignore
	expires_at?: number;
// @ts-ignore

// @ts-ignore
	views?: number;
// @ts-ignore

// @ts-ignore
	link?: {
// @ts-ignore
		text: string;
// @ts-ignore
		url: string;
// @ts-ignore
	};
// @ts-ignore

// @ts-ignore
	replies?: {
// @ts-ignore
		count: number;
// @ts-ignore
		new: number;
// @ts-ignore
	};
// @ts-ignore

// @ts-ignore
	parent_story_owner_id?: number;
// @ts-ignore
	parent_story_id?: number;
// @ts-ignore

// @ts-ignore
	parent_story?: IStoryAttachmentPayload;
// @ts-ignore

// @ts-ignore
	clickable_stickers?: {
// @ts-ignore
		original_width: number;
// @ts-ignore
		original_height: number;
// @ts-ignore
		style: string;
// @ts-ignore
		mention?: string;
// @ts-ignore
		hashtag?: string;
// @ts-ignore
		clickable_stickers: {
// @ts-ignore
			type: 'mention' | 'hashtag';
// @ts-ignore
			clickable_area: {
// @ts-ignore
				x: number;
// @ts-ignore
				y: number;
// @ts-ignore
			}[];
// @ts-ignore
		}[];
// @ts-ignore
	};
// @ts-ignore

// @ts-ignore
	is_expired?: boolean;
// @ts-ignore
	is_deleted?: boolean;
// @ts-ignore

// @ts-ignore
	seen?: number;
// @ts-ignore

// @ts-ignore
	can_reply?: number;
// @ts-ignore
	can_share?: number;
// @ts-ignore
	can_comment?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
const kVideo = Symbol('video');
// @ts-ignore
const kPhoto = Symbol('photo');
// @ts-ignore

// @ts-ignore
const kParentStory = Symbol('parentStory');
// @ts-ignore

// @ts-ignore
export type StoryAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IStoryAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class StoryAttachment extends Attachment<IStoryAttachmentPayload, AttachmentType.STORY | 'story'> {
// @ts-ignore
	protected [kPhoto]: PhotoAttachment | undefined;
// @ts-ignore

// @ts-ignore
	protected [kVideo]: VideoAttachment | undefined;
// @ts-ignore

// @ts-ignore
	protected [kParentStory]: StoryAttachment | undefined;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: StoryAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.STORY
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.applyPayload(options.payload);
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.is_deleted !== undefined || this.payload.is_expired !== undefined;
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
		const { items: [story] } = await this.api.stories.getById({
// @ts-ignore
			stories: `${this.ownerId}_${this.id}`,
// @ts-ignore
			extended: 0
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.applyPayload(story as IStoryAttachmentPayload);
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is story expired
// @ts-ignore
	 */
// @ts-ignore
	public get isExpired(): boolean | undefined {
// @ts-ignore
		return this.payload.is_expired;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is story deleted
// @ts-ignore
	 */
// @ts-ignore
	public get isDeleted(): boolean | undefined {
// @ts-ignore
		return this.payload.is_deleted;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is story viewed by current user
// @ts-ignore
	 */
// @ts-ignore
	public get isSeen(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.payload.seen === 1;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks can story reply
// @ts-ignore
	 */
// @ts-ignore
	public get isCanReply(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.payload.can_reply === 1;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks can story share
// @ts-ignore
	 */
// @ts-ignore
	public get isCanShare(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.payload.can_share === 1;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks can story comment
// @ts-ignore
	 */
// @ts-ignore
	public get isCanComment(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.payload.can_comment === 1;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the type of story
// @ts-ignore
	 */
// @ts-ignore
	public get storyType(): IStoryAttachmentPayload['type'] | undefined {
// @ts-ignore
		return this.payload.type;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the story photo
// @ts-ignore
	 */
// @ts-ignore
	public get photo(): PhotoAttachment | undefined {
// @ts-ignore
		return this[kPhoto];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the story video
// @ts-ignore
	 */
// @ts-ignore
	public get video(): VideoAttachment | undefined {
// @ts-ignore
		return this[kVideo];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this story was created
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
	 * Returns the date when this story was expires
// @ts-ignore
	 */
// @ts-ignore
	public get expiresAt(): number | undefined {
// @ts-ignore
		return this.payload.expires_at;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the story views count
// @ts-ignore
	 */
// @ts-ignore
	public get viewsCount(): number | undefined {
// @ts-ignore
		return this.payload.views;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the story link
// @ts-ignore
	 */
// @ts-ignore
	public get link(): IStoryAttachmentPayload['link'] | undefined {
// @ts-ignore
		return this.payload.link;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the story replies
// @ts-ignore
	 */
// @ts-ignore
	public get replies(): IStoryAttachmentPayload['replies'] | undefined {
// @ts-ignore
		return this.payload.replies;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the parent story id
// @ts-ignore
	 */
// @ts-ignore
	public get parentStoryId(): number | undefined {
// @ts-ignore
		return this.payload.parent_story_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the parent story owner id
// @ts-ignore
	 */
// @ts-ignore
	public get parentStoryOwnerId(): number | undefined {
// @ts-ignore
		return this.payload.parent_story_owner_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the parent story
// @ts-ignore
	 */
// @ts-ignore
	public get parentStory(): StoryAttachment | undefined {
// @ts-ignore
		return this[kParentStory];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the parent story clickable stickers
// @ts-ignore
	 */
// @ts-ignore
	public get clickableStickers(): IStoryAttachmentPayload['clickable_stickers'] | undefined {
// @ts-ignore
		return this.payload.clickable_stickers;
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
	private applyPayload(payload: IStoryAttachmentPayload): void {
// @ts-ignore
		this.payload = payload;
// @ts-ignore

// @ts-ignore
		if (payload.photo) {
// @ts-ignore
			this[kPhoto] = new PhotoAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: payload.photo
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (payload.video) {
// @ts-ignore
			this[kVideo] = new VideoAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: payload.video
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (payload.parent_story) {
// @ts-ignore
			this[kParentStory] = new StoryAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: payload.parent_story
// @ts-ignore
			});
// @ts-ignore
		}
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
		if (this.isDeleted) {
// @ts-ignore
			return pickProperties(this, [
// @ts-ignore
				'isDeleted'
// @ts-ignore
			]);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.isExpired) {
// @ts-ignore
			return pickProperties(this, [
// @ts-ignore
				'isExpired',
// @ts-ignore
				'expiresAt'
// @ts-ignore
			]);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'isExpired',
// @ts-ignore
			'isDeleted',
// @ts-ignore
			'isSeen',
// @ts-ignore
			'isCanReply',
// @ts-ignore
			'isCanShare',
// @ts-ignore
			'isCanComment',
// @ts-ignore
			'storyType',
// @ts-ignore
			'photo',
// @ts-ignore
			'video',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'expiresAt',
// @ts-ignore
			'viewsCount',
// @ts-ignore
			'link',
// @ts-ignore
			'replies',
// @ts-ignore
			'parentStoryId',
// @ts-ignore
			'parentStoryOwnerId',
// @ts-ignore
			'parentStory',
// @ts-ignore
			'clickableStickers'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
