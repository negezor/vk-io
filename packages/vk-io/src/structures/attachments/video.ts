import VK from '../../vk';

import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

const { VIDEO } = AttachmentType;

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

export default class VideoAttachment extends Attachment<IVideoAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IVideoAttachmentPayload, vk?: VK) {
		super(VIDEO, payload.owner_id, payload.id, payload.access_key);

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
		const { items } = await this.vk.api.video.get({
			videos: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		const [video] = items;

		// @ts-ignore
		this.payload = video;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks whether the video is repeatable
	 */
	public get isRepeat(): boolean | null {
		return this.checkBooleanInProperty('repeat');
	}

	/**
	 * Checks that the user can add a video to himself
	 */
	public get isCanAdd(): boolean | null {
		return this.checkBooleanInProperty('can_add');
	}

	/**
	 * Checks if the user can edit the video
	 */
	public get isCanEdit(): boolean | null {
		return this.checkBooleanInProperty('can_edit');
	}

	/**
	 * Checks whether the video is being processed
	 */
	public get isProcessing(): boolean | null {
		return this.checkBooleanInProperty('processing');
	}

	/**
	 * Checks whether the video is a broadcast
	 */
	public get isBroadcast(): boolean | null {
		return this.checkBooleanInProperty('live');
	}

	/**
	 * Checks whether the video is a broadcast
	 */
	public get isUpcoming(): boolean | null {
		return this.checkBooleanInProperty('upcoming');
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
	 * Returns the title
	 */
	public get title(): string | null {
		return this.payload.title || null;
	}

	/**
	 * Returns the description
	 */
	public get description(): string | null {
		return this.payload.description || null;
	}

	/**
	 * Returns the duration
	 */
	public get duration(): number | null {
		if (!this.$filled) {
			return null;
		}

		return this.payload.duration!;
	}

	/**
	 * Returns the date when this video was created
	 */
	public get createdAt(): number | null {
		return this.payload.date || null;
	}

	/**
	 * Returns the date when this video was added
	 */
	public get addedAt(): number | null {
		return this.payload.adding_date || null;
	}

	/**
	 * Returns the count views
	 */
	public get viewsCount(): number | null {
		return this.payload.views || null;
	}

	/**
	 * Returns the count comments
	 */
	public get commentsCount(): number | null {
		return this.payload.comments || null;
	}

	/**
	 * Returns the URL of the page with the player
	 */
	public get player(): string | null {
		return this.payload.player || null;
	}


	/**
	 * Returns the name of the platform (for video recordings added from external sites)
	 */
	public get platformName(): string | null {
		return this.payload.platform || null;
	}

	/**
	 * Checks for a boolean value in the property
	 */
	protected checkBooleanInProperty(name: string): boolean | null {
		// @ts-ignore
		const property = this.payload[name];

		if (typeof property !== 'number') {
			return null;
		}

		return property === 1;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
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
