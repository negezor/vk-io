'use strict';

import Attachment from './attachment';

export default class AudioAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor (payload, vk) {
		super('audio', payload.owner_id, payload.id);

		this.vk = vk;
		this.payload = payload;

		this._isFilled = 'duration' in payload && 'date' in payload;
	}

	/**
	 * Returns whether the attachment is filled
	 *
	 * @return {boolean}
	 */
	isFilled () {
		return this._isFilled;
	}

	/**
	 * Get document info
	 *
	 * @return {Promise}
	 */
	async getAttachmentPayload () {
		const audios = await this.vk.api.docs.getById({
			audios: `${this.owner}_${this.id}`
		});

		this.payload = audios[0];

		this._isFilled = true;
	}

	/**
	 * Checks whether audio is in high quality
	 *
	 * @return {?boolean}
	 */
	isHq () {
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
	getArtist () {
		return this.payload.artist || null;
	}

	/**
	 * Returns the title
	 *
	 * @return {?string}
	 */
	getTitle () {
		return this.payload.title || null;
	}

	/**
	 * Returns the duration
	 *
	 * @return {?number}
	 */
	getDuration () {
		return this.payload.duration || null;
	}

	/**
	 * Returns audio upload date (timestamp)
	 *
	 * @return {?number}
	 */
	getDate () {
		return this.payload.date || null;
	}

	/**
	 * Returns the URL of the audio
	 *
	 * @return {?string}
	 */
	getUrl () {
		return this.payload.url || null;
	}

	/**
	 * Returns the ID of the lyric
	 *
	 * @return {?number}
	 */
	getLyricsId () {
		return this.payload.lyrics_id || null;
	}

	/**
	 * Returns the ID of the album
	 *
	 * @return {?number}
	 */
	getAlbumId () {
		return this.payload.album_id || null;
	}

	/**
	 * Returns the ID of the genre
	 *
	 * @return {?number}
	 */
	getGenreId () {
		return this.payload.album_id || null;
	}
};
