import Attachment from './attachment';

import {
	getSmallPhoto,
	getLargePhoto,
	getMediumPhoto
} from '../../utils/helpers';

export default class PhotoAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('photo', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.filled = 'album_id' in payload && 'date' in payload;
	}

	/**
	 * Load attachment payload
	 *
	 * @return {Promise}
	 */
	async loadAttachmentPayload() {
		if (this.filled) {
			return;
		}

		const [photo] = await this.vk.api.photos.getById({
			photos: `${this.owner}_${this.id}`,
			extended: 0
		});

		this.payload = photo;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.filled = true;
	}

	/**
	 * Returns the ID of the user who uploaded the image
	 *
	 * @return {?number}
	 */
	getUserId() {
		return this.payload.user_id || null;
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
	 * Returns the photo text
	 *
	 * @return {?string}
	 */
	getText() {
		return this.payload.text || null;
	}

	/**
	 * Returns the timestamp when this photo was created
	 *
	 * @return {number}
	 */
	getTimestamp() {
		return this.payload.date || null;
	}

	/**
	 * Returns the Date object when this photo was created
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
	 * Returns the photo height
	 *
	 * @return {?number}
	 */
	getHeight() {
		return this.payload.height || null;
	}

	/**
	 * Returns the photo width
	 *
	 * @return {?number}
	 */
	getWidth() {
		return this.payload.width || null;
	}

	/**
	 * Returns the URL of a small photo
	 * (130 or 75)
	 *
	 * @return {?string}
	 */
	getSmallPhoto() {
		if (!this.filled) {
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
	getMediumPhoto() {
		if (!this.filled) {
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
	getLargePhoto() {
		if (!this.filled) {
			return null;
		}

		return getLargePhoto(this.payload);
	}
}
