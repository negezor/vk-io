import VK from '../../vk';

import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';
import PhotoAttachment, { IPhotoAttachmentPayload } from './photo';
import VideoAttachment, { IVideoAttachmentPayload } from './video';

const { STORY } = AttachmentType;

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

export default class StoryAttachment extends Attachment<IStoryAttachmentPayload> {
	protected [kVideo]?: VideoAttachment;

	protected [kPhoto]?: PhotoAttachment;

	protected [kParentStory]?: StoryAttachment;

	/**
	 * Constructor
	 */
	public constructor(payload: IStoryAttachmentPayload, vk?: VK) {
		super(STORY, payload.owner_id, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = 'is_deleted' in payload || 'is_expired' in payload;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
		const [story] = await this.vk.api.stories.getById({
			stories: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		this.payload = story;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

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
		if (!this.$filled) {
			return undefined;
		}

		if (!this[kPhoto]) {
			this[kPhoto] = new PhotoAttachment(this.payload.photo!, this.vk);
		}

		return this[kPhoto]!;
	}

	/**
	 * Returns the story video
	 */
	public get video(): VideoAttachment | undefined {
		if (!this.$filled) {
			return undefined;
		}

		if (!this[kVideo]) {
			this[kVideo] = new VideoAttachment(this.payload.video!, this.vk);
		}

		return this[kVideo]!;
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
		if (!this.$filled) {
			return undefined;
		}

		if (!this[kParentStory]) {
			this[kParentStory] = new StoryAttachment(this.payload.parent_story!, this.vk);
		}

		return this[kParentStory];
	}

	/**
	 * Returns the parent story clickable stickers
	 */
	public get clickableStickers(): IStoryAttachmentPayload['clickable_stickers'] | undefined {
		return this.payload.clickable_stickers;
	}

	/**
	 * Returns the custom data
	 */
	// @ts-ignore
	public [inspectCustomData](): object | undefined {
		if (this.isDeleted) {
			return copyParams(this, [
				'isDeleted'
			]);
		}

		if (this.isExpired) {
			return copyParams(this, [
				'isExpired',
				'expiresAt'
			]);
		}

		return copyParams(this, [
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
