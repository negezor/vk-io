import { Attachment, AttachmentFactoryOptions } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

export interface IVideoAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	repeat?: number;
	can_add?: number;
	can_edit?: number;
	processing?: number;
	live?: number;
	upcoming?: number;
	is_favorite?: number;
	title?: string;
	description?: string;
	duration?: number;
	date?: number;
	adding_date?: number;
	views?: number;
	comments?: number;
	player?: string;
	platform?: string;
}

export type VideoAttachmentOptions =
	AttachmentFactoryOptions<IVideoAttachmentPayload>;

export class VideoAttachment extends Attachment<IVideoAttachmentPayload, AttachmentType.VIDEO | 'video'> {
	/**
	 * Constructor
	 */
	public constructor(options: VideoAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.VIDEO
		});

		this.$filled = this.payload.date !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const { items } = await this.api.video.get({
			videos: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		const [video] = items;

		this.payload = video as IVideoAttachmentPayload;

		this.$filled = true;
	}

	/**
	 * Checks whether the video is repeatable
	 */
	public get isRepeat(): boolean | undefined {
		return this.checkBooleanInProperty('repeat');
	}

	/**
	 * Checks that the user can add a video to himself
	 */
	public get isCanAdd(): boolean | undefined {
		return this.checkBooleanInProperty('can_add');
	}

	/**
	 * Checks if the user can edit the video
	 */
	public get isCanEdit(): boolean | undefined {
		return this.checkBooleanInProperty('can_edit');
	}

	/**
	 * Checks whether the video is being processed
	 */
	public get isProcessing(): boolean | undefined {
		return this.checkBooleanInProperty('processing');
	}

	/**
	 * Checks whether the video is a broadcast
	 */
	public get isBroadcast(): boolean | undefined {
		return this.checkBooleanInProperty('live');
	}

	/**
	 * Checks whether the video is a broadcast
	 */
	public get isUpcoming(): boolean | undefined {
		return this.checkBooleanInProperty('upcoming');
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
	 * Returns the title
	 */
	public get title(): string | undefined {
		return this.payload.title;
	}

	/**
	 * Returns the description
	 */
	public get description(): string | undefined {
		return this.payload.description;
	}

	/**
	 * Returns the duration
	 */
	public get duration(): number | undefined {
		return this.payload.duration;
	}

	/**
	 * Returns the date when this video was created
	 */
	public get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns the date when this video was added
	 */
	public get addedAt(): number | undefined {
		return this.payload.adding_date;
	}

	/**
	 * Returns the count views
	 */
	public get viewsCount(): number | undefined {
		return this.payload.views;
	}

	/**
	 * Returns the count comments
	 */
	public get commentsCount(): number | undefined {
		return this.payload.comments;
	}

	/**
	 * Returns the URL of the page with the player
	 */
	public get player(): string | undefined {
		return this.payload.player;
	}

	/**
	 * Returns the name of the platform (for video recordings added from external sites)
	 */
	public get platformName(): string | undefined {
		return this.payload.platform;
	}

	/**
	 * Checks for a boolean value in the property
	 */
	protected checkBooleanInProperty(name: string): boolean | undefined {
		const property = this.payload[name as keyof IVideoAttachmentPayload];

		if (typeof property !== 'number') {
			return undefined;
		}

		return property === 1;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'title',
			'description',
			'duration',
			'createdAt',
			'addedAt',
			'viewsCount',
			'commentsCount',
			'player',
			'platformName'
		]);
	}
}
