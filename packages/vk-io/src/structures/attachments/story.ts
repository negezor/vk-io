import { Attachment, AttachmentFactoryOptions } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';
import { PhotoAttachment, IPhotoAttachmentPayload } from './photo';
import { VideoAttachment, IVideoAttachmentPayload } from './video';

export interface IStoryAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	type?: 'photo' | 'video';

	photo?: IPhotoAttachmentPayload;
	video?: IVideoAttachmentPayload;

	date?: number;
	expires_at?: number;

	views?: number;

	link?: {
		text: string;
		url: string;
	};

	replies?: {
		count: number;
		new: number;
	};

	parent_story_owner_id?: number;
	parent_story_id?: number;

	parent_story?: IStoryAttachmentPayload;

	clickable_stickers?: {
		original_width: number;
		original_height: number;
		style: string;
		mention?: string;
		hashtag?: string;
		clickable_stickers: {
			type: 'mention' | 'hashtag';
			clickable_area: {
				x: number;
				y: number;
			}[];
		}[];
	};

	is_expired?: boolean;
	is_deleted?: boolean;

	seen?: number;

	can_reply?: number;
	can_share?: number;
	can_comment?: number;
}

const kVideo = Symbol('video');
const kPhoto = Symbol('photo');

const kParentStory = Symbol('parentStory');

export type StoryAttachmentOptions =
	AttachmentFactoryOptions<IStoryAttachmentPayload>;

export class StoryAttachment extends Attachment<IStoryAttachmentPayload, AttachmentType.STORY | 'story'> {
	protected [kPhoto]: PhotoAttachment | undefined;

	protected [kVideo]: VideoAttachment | undefined;

	protected [kParentStory]: StoryAttachment | undefined;

	/**
	 * Constructor
	 */
	public constructor(options: StoryAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.STORY
		});

		this.applyPayload(options.payload);

		this.$filled = this.payload.is_deleted !== undefined || this.payload.is_expired !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const { items: [story] } = await this.api.stories.getById({
			stories: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		this.applyPayload(story as IStoryAttachmentPayload);

		this.$filled = true;
	}

	/**
	 * Checks is story expired
	 */
	public get isExpired(): boolean | undefined {
		return this.payload.is_expired;
	}

	/**
	 * Checks is story deleted
	 */
	public get isDeleted(): boolean | undefined {
		return this.payload.is_deleted;
	}

	/**
	 * Checks is story viewed by current user
	 */
	public get isSeen(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.payload.seen === 1;
	}

	/**
	 * Checks can story reply
	 */
	public get isCanReply(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.payload.can_reply === 1;
	}

	/**
	 * Checks can story share
	 */
	public get isCanShare(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.payload.can_share === 1;
	}

	/**
	 * Checks can story comment
	 */
	public get isCanComment(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.payload.can_comment === 1;
	}

	/**
	 * Returns the type of story
	 */
	public get storyType(): IStoryAttachmentPayload['type'] | undefined {
		return this.payload.type;
	}

	/**
	 * Returns the story photo
	 */
	public get photo(): PhotoAttachment | undefined {
		return this[kPhoto];
	}

	/**
	 * Returns the story video
	 */
	public get video(): VideoAttachment | undefined {
		return this[kVideo];
	}

	/**
	 * Returns the date when this story was created
	 */
	public get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns the date when this story was expires
	 */
	public get expiresAt(): number | undefined {
		return this.payload.expires_at;
	}

	/**
	 * Returns the story views count
	 */
	public get viewsCount(): number | undefined {
		return this.payload.views;
	}

	/**
	 * Returns the story link
	 */
	public get link(): IStoryAttachmentPayload['link'] | undefined {
		return this.payload.link;
	}

	/**
	 * Returns the story replies
	 */
	public get replies(): IStoryAttachmentPayload['replies'] | undefined {
		return this.payload.replies;
	}

	/**
	 * Returns the parent story id
	 */
	public get parentStoryId(): number | undefined {
		return this.payload.parent_story_id;
	}

	/**
	 * Returns the parent story owner id
	 */
	public get parentStoryOwnerId(): number | undefined {
		return this.payload.parent_story_owner_id;
	}

	/**
	 * Returns the parent story
	 */
	public get parentStory(): StoryAttachment | undefined {
		return this[kParentStory];
	}

	/**
	 * Returns the parent story clickable stickers
	 */
	public get clickableStickers(): IStoryAttachmentPayload['clickable_stickers'] | undefined {
		return this.payload.clickable_stickers;
	}

	/**
	 * Applies the payload
	 */
	private applyPayload(payload: IStoryAttachmentPayload): void {
		this.payload = payload;

		if (payload.photo) {
			this[kPhoto] = new PhotoAttachment({
				api: this.api,
				payload: payload.photo
			});
		}

		if (payload.video) {
			this[kVideo] = new VideoAttachment({
				api: this.api,
				payload: payload.video
			});
		}

		if (payload.parent_story) {
			this[kParentStory] = new StoryAttachment({
				api: this.api,
				payload: payload.parent_story
			});
		}
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		if (this.isDeleted) {
			return pickProperties(this, [
				'isDeleted'
			]);
		}

		if (this.isExpired) {
			return pickProperties(this, [
				'isExpired',
				'expiresAt'
			]);
		}

		return pickProperties(this, [
			'isExpired',
			'isDeleted',
			'isSeen',
			'isCanReply',
			'isCanShare',
			'isCanComment',
			'storyType',
			'photo',
			'video',
			'createdAt',
			'expiresAt',
			'viewsCount',
			'link',
			'replies',
			'parentStoryId',
			'parentStoryOwnerId',
			'parentStory',
			'clickableStickers'
		]);
	}
}
