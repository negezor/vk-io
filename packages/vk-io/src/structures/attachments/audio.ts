import VK from '../../vk';

import { Attachment } from './attachment';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

const { AUDIO } = AttachmentType;

export interface IAudioAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	is_hq?: number;
	lyrics_id?: number;
	album_id?: number;
	genre_id?: number;
	title?: string;
	artist?: string;
	duration?: number;
	date?: number;
	url?: string;
}

export class AudioAttachment extends Attachment<IAudioAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IAudioAttachmentPayload, vk?: VK) {
		super(AUDIO, payload.owner_id, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = payload.duration !== undefined && payload.date !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
		const [audio] = await this.vk.api.audio.getById({
			audios: `${this.ownerId}_${this.id}`
		});

		this.payload = audio;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks whether audio is in high quality
	 */
	public get isHq(): boolean | undefined {
		const { is_hq: isHq } = this.payload;

		if (isHq === undefined) {
			return undefined;
		}

		return isHq === 1;
	}

	/**
	 * Returns the ID of the lyric
	 */
	public get lyricsId(): number | undefined {
		return this.payload.lyrics_id;
	}

	/**
	 * Returns the ID of the album
	 */
	public get albumId(): number | undefined {
		return this.payload.album_id;
	}

	/**
	 * Returns the ID of the genre
	 */
	public get genreId(): number | undefined {
		return this.payload.genre_id;
	}

	/**
	 * Returns the title
	 */
	public get title(): string | undefined {
		return this.payload.title;
	}

	/**
	 * Returns the artist
	 */
	public get artist(): string | undefined {
		return this.payload.artist;
	}

	/**
	 * Returns the duration
	 */
	public get duration(): number | undefined {
		return this.payload.duration;
	}

	/**
	 * Returns the date object when this audio was created
	 */
	public get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns the URL of the audio
	 */
	public get url(): string | undefined {
		return this.payload.url;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'lyricsId',
			'albumId',
			'genreId',
			'title',
			'artist',
			'duration',
			'createdAt',
			'url'
		]);
	}
}
