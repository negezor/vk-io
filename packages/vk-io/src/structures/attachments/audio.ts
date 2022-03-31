// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IAudioAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	is_hq?: number;
// @ts-ignore
	lyrics_id?: number;
// @ts-ignore
	album_id?: number;
// @ts-ignore
	genre_id?: number;
// @ts-ignore
	title?: string;
// @ts-ignore
	artist?: string;
// @ts-ignore
	duration?: number;
// @ts-ignore
	date?: number;
// @ts-ignore
	url?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AudioAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IAudioAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class AudioAttachment extends Attachment<IAudioAttachmentPayload, AttachmentType.AUDIO | 'audio'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: AudioAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.AUDIO
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.duration !== undefined && this.payload.date !== undefined;
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
		// @ts-expect-error
// @ts-ignore
		const { items: [audio] } = await this.api.audio.getById({
// @ts-ignore
			audios: `${this.ownerId}_${this.id}`
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.payload = audio as IAudioAttachmentPayload;
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether audio is in high quality
// @ts-ignore
	 */
// @ts-ignore
	public get isHq(): boolean | undefined {
// @ts-ignore
		const { is_hq: isHq } = this.payload;
// @ts-ignore

// @ts-ignore
		if (isHq === undefined) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return isHq === 1;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the ID of the lyric
// @ts-ignore
	 */
// @ts-ignore
	public get lyricsId(): number | undefined {
// @ts-ignore
		return this.payload.lyrics_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the ID of the album
// @ts-ignore
	 */
// @ts-ignore
	public get albumId(): number | undefined {
// @ts-ignore
		return this.payload.album_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the ID of the genre
// @ts-ignore
	 */
// @ts-ignore
	public get genreId(): number | undefined {
// @ts-ignore
		return this.payload.genre_id;
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
	 * Returns the artist
// @ts-ignore
	 */
// @ts-ignore
	public get artist(): string | undefined {
// @ts-ignore
		return this.payload.artist;
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
	 * Returns the date object when this audio was created
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
	 * Returns the URL of the audio
// @ts-ignore
	 */
// @ts-ignore
	public get url(): string | undefined {
// @ts-ignore
		return this.payload.url;
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
			'lyricsId',
// @ts-ignore
			'albumId',
// @ts-ignore
			'genreId',
// @ts-ignore
			'title',
// @ts-ignore
			'artist',
// @ts-ignore
			'duration',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'url'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
