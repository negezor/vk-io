// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IVideoAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	repeat?: number;
// @ts-ignore
	can_add?: number;
// @ts-ignore
	can_edit?: number;
// @ts-ignore
	processing?: number;
// @ts-ignore
	live?: number;
// @ts-ignore
	upcoming?: number;
// @ts-ignore
	is_favorite?: number;
// @ts-ignore
	title?: string;
// @ts-ignore
	description?: string;
// @ts-ignore
	duration?: number;
// @ts-ignore
	date?: number;
// @ts-ignore
	adding_date?: number;
// @ts-ignore
	views?: number;
// @ts-ignore
	comments?: number;
// @ts-ignore
	player?: string;
// @ts-ignore
	platform?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VideoAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IVideoAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class VideoAttachment extends Attachment<IVideoAttachmentPayload, AttachmentType.VIDEO | 'video'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: VideoAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.VIDEO
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.date !== undefined;
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
		const { items } = await this.api.video.get({
// @ts-ignore
			videos: `${this.ownerId}_${this.id}`,
// @ts-ignore
			extended: 0
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const [video] = items;
// @ts-ignore

// @ts-ignore
		this.payload = video as IVideoAttachmentPayload;
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the video is repeatable
// @ts-ignore
	 */
// @ts-ignore
	public get isRepeat(): boolean | undefined {
// @ts-ignore
		return this.checkBooleanInProperty('repeat');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user can add a video to himself
// @ts-ignore
	 */
// @ts-ignore
	public get isCanAdd(): boolean | undefined {
// @ts-ignore
		return this.checkBooleanInProperty('can_add');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the user can edit the video
// @ts-ignore
	 */
// @ts-ignore
	public get isCanEdit(): boolean | undefined {
// @ts-ignore
		return this.checkBooleanInProperty('can_edit');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the video is being processed
// @ts-ignore
	 */
// @ts-ignore
	public get isProcessing(): boolean | undefined {
// @ts-ignore
		return this.checkBooleanInProperty('processing');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the video is a broadcast
// @ts-ignore
	 */
// @ts-ignore
	public get isBroadcast(): boolean | undefined {
// @ts-ignore
		return this.checkBooleanInProperty('live');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the video is a broadcast
// @ts-ignore
	 */
// @ts-ignore
	public get isUpcoming(): boolean | undefined {
// @ts-ignore
		return this.checkBooleanInProperty('upcoming');
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
	/**
// @ts-ignore
	 * Returns the title
// @ts-ignore
	 */
// @ts-ignore
	public get title(): string | undefined {
// @ts-ignore
		return this.payload.title;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the description
// @ts-ignore
	 */
// @ts-ignore
	public get description(): string | undefined {
// @ts-ignore
		return this.payload.description;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the duration
// @ts-ignore
	 */
// @ts-ignore
	public get duration(): number | undefined {
// @ts-ignore
		return this.payload.duration;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this video was created
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
	 * Returns the date when this video was added
// @ts-ignore
	 */
// @ts-ignore
	public get addedAt(): number | undefined {
// @ts-ignore
		return this.payload.adding_date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the count views
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
	 * Returns the count comments
// @ts-ignore
	 */
// @ts-ignore
	public get commentsCount(): number | undefined {
// @ts-ignore
		return this.payload.comments;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the URL of the page with the player
// @ts-ignore
	 */
// @ts-ignore
	public get player(): string | undefined {
// @ts-ignore
		return this.payload.player;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the name of the platform (for video recordings added from external sites)
// @ts-ignore
	 */
// @ts-ignore
	public get platformName(): string | undefined {
// @ts-ignore
		return this.payload.platform;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for a boolean value in the property
// @ts-ignore
	 */
// @ts-ignore
	protected checkBooleanInProperty(name: string): boolean | undefined {
// @ts-ignore
		const property = this.payload[name as keyof IVideoAttachmentPayload];
// @ts-ignore

// @ts-ignore
		if (typeof property !== 'number') {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return property === 1;
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
			'title',
// @ts-ignore
			'description',
// @ts-ignore
			'duration',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'addedAt',
// @ts-ignore
			'viewsCount',
// @ts-ignore
			'commentsCount',
// @ts-ignore
			'player',
// @ts-ignore
			'platformName'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
