import Attachment from './attachment';

export default class AudioAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('audio', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'duration' in payload && 'date' in payload;
	}

	/**
	 * Load attachment payload
	 *
	 * @return {Promise}
	 */
	async loadAttachmentPayload() {
		if (this.$filled) {
			return;
		}

		const [audio] = await this.vk.api.audio.getById({
			audios: `${this.owner}_${this.id}`
		});

		this.payload = audio;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks whether audio is in high quality
	 *
	 * @return {?boolean}
	 */
	isHq() {
		const { is_hq: isHq } = this.payload;

		if (!isHq) {
			return null;
		}

		return isHq === 1;
	}

	/**
	 * Returns the artist
	 *
	 * @return {?string}
	 */
	getArtist() {
		return this.payload.artist || null;
	}

	/**
	 * Returns the title
	 *
	 * @return {?string}
	 */
	getTitle() {
		return this.payload.title || null;
	}

	/**
	 * Returns the duration
	 *
	 * @return {?number}
	 */
	getDuration() {
		return this.payload.duration || null;
	}

	/**
	 * Returns the timestamp when this audio was created
	 *
	 * @return {?number}
	 */
	getTimestamp() {
		return this.payload.date || null;
	}

	/**
	 * Returns the Date object when this audio was created
	 *
	 * @return {?Date}
	 */
	getDate() {
		const { date } = this.payload;

		return date
			? new Date(date)
			: null;
	}

	/**
	 * Returns the URL of the audio
	 *
	 * @return {?string}
	 */
	getUrl() {
		return this.payload.url || null;
	}

	/**
	 * Returns the ID of the lyric
	 *
	 * @return {?number}
	 */
	getLyricsId() {
		return this.payload.lyrics_id || null;
	}

	/**
	 * Returns the ID of the album
	 *
	 * @return {?number}
	 */
	getAlbumId() {
		return this.payload.album_id || null;
	}

	/**
	 * Returns the ID of the genre
	 *
	 * @return {?number}
	 */
	getGenreId() {
		return this.payload.album_id || null;
	}
}
