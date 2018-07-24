import Attachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

const { AUDIO } = attachmentTypes;

export default class AudioAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(AUDIO, payload.owner_id, payload.id, payload.access_key);

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
			audios: `${this.ownerId}_${this.id}`
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
	get isHq() {
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
	get artist() {
		return this.payload.artist || null;
	}

	/**
	 * Returns the title
	 *
	 * @return {?string}
	 */
	get title() {
		return this.payload.title || null;
	}

	/**
	 * Returns the duration
	 *
	 * @return {?number}
	 */
	get duration() {
		return this.payload.duration || null;
	}

	/**
	 * Returns the date object when this audio was created
	 *
	 * @return {?number}
	 */
	get date() {
		return this.payload.date || null;
	}

	/**
	 * Returns the URL of the audio
	 *
	 * @return {?string}
	 */
	get url() {
		return this.payload.url || null;
	}

	/**
	 * Returns the ID of the lyric
	 *
	 * @return {?number}
	 */
	get lyricsId() {
		return this.payload.lyrics_id || null;
	}

	/**
	 * Returns the ID of the album
	 *
	 * @return {?number}
	 */
	get albumId() {
		return this.payload.album_id || null;
	}

	/**
	 * Returns the ID of the genre
	 *
	 * @return {?number}
	 */
	get genreId() {
		return this.payload.album_id || null;
	}
}
