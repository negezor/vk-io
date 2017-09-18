'use strict';

import Attachment from './attachment';

import {
	getSmallPhoto,
	getLargePhoto,
	getMediumPhoto
} from '../../util/helpers';

export default class PhotoAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor (payload, vk) {
		super('photo', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this._isFilled = 'album_id' in payload && 'date' in payload;
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
	 * Get photo info
	 *
	 * @return {Promise}
	 */
	async getAttachmentPayload () {
		const photos = await this.vk.api.photos.getById({
			photos: `${this.owner}_${this.id}`,
			extended: 0
		});

		this.payload = photos[0];

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this._isFilled = true;
	}

	/**
	 * Returns the ID of the user who uploaded the image
	 *
	 * @return {?number}
	 */
	getUserId () {
		return this.payload.user_id || null;
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
	 * Returns the photo text
	 *
	 * @return {?string}
	 */
	getText () {
		return this.payload.text || null;
	}

	/**
	 * Returns the photo upload date (timestamp)
	 *
	 * @return {?number}
	 */
	getDate () {
		return this.payload.date || null;
	}

	/**
	 * Returns the photo height
	 *
	 * @return {?number}
	 */
	getHeight () {
		return this.payload.height || null;
	}

	/**
	 * Returns the photo width
	 *
	 * @return {?number}
	 */
	getWidth () {
		return this.payload.width || null;
	}

	/**
	 * Returns the URL of a small photo
	 * (130 or 75)
	 *
	 * @return {?string}
	 */
	getSmallPhoto () {
		if (!this._isFilled) {
			return null;
		}

		return getSmallPhoto(this.payload);
	}

	/**
	 * Returns the URL of a medium photo
	 * (807 or 604 or less)
	 *
	 * @return {?string}
	 */
	getMediumPhoto () {
		if (!this._isFilled) {
			return null;
		}

		return getMediumPhoto(this.payload);
	}

	/**
	 * Returns the URL of a large photo
	 * (2560 or 1280 or less)
	 *
	 * @return {?string}
	 */
	getLargePhoto () {
		if (!this._isFilled) {
			return null;
		}

		return getLargePhoto(this.payload);
	}
};
