import { Attachment, AttachmentFactoryOptions } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

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

export type AudioAttachmentOptions =
	AttachmentFactoryOptions<IAudioAttachmentPayload>;

export class AudioAttachment extends Attachment<IAudioAttachmentPayload, AttachmentType.AUDIO | 'audio'> {
	/**
	 * Constructor
	 */
	public constructor(options: AudioAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.AUDIO
		});

		this.$filled = this.payload.duration !== undefined && this.payload.date !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-expect-error
		const { items: [audio] } = await this.api.audio.getById({
			audios: `${this.ownerId}_${this.id}`
		});

		this.payload = audio as IAudioAttachmentPayload;

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
	public [kSerializeData](): object {
		return pickProperties(this, [
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
