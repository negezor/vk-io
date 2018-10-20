import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { attachmentTypes, inspectCustomData } from '../../utils/constants';

const { PHOTO } = attachmentTypes;

const SMALL_SIZES = ['m', 's'];
const MEDIUM_SIZES = ['y', 'r', 'q', 'p', ...SMALL_SIZES];
const LARGE_SIZES = ['w', 'z', ...MEDIUM_SIZES];

const POST_SIZES = new Map([
	['w', 'photo_2560'],
	['z', 'photo_1280'],
	['y', 'photo_807'],
	['x', 'photo_604'],
	['m', 'photo_130'],
	['s', 'photo_75']
]);

export default class PhotoAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(PHOTO, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'album_id' in payload && 'date' in payload;
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

		const [photo] = await this.vk.api.photos.getById({
			photos: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		this.payload = photo;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Returns the ID of the user who uploaded the image
	 *
	 * @return {?number}
	 */
	get userId() {
		return this.payload.user_id || null;
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
	 * Returns the photo text
	 *
	 * @return {?string}
	 */
	get text() {
		return this.payload.text || null;
	}

	/**
	 * Returns the date when this photo was created
	 *
	 * @return {?number}
	 */
	get createdAt() {
		return this.payload.date || null;
	}

	/**
	 * Returns the photo height
	 *
	 * @return {?number}
	 */
	get height() {
		return this.payload.height || null;
	}

	/**
	 * Returns the photo width
	 *
	 * @return {?number}
	 */
	get width() {
		return this.payload.width || null;
	}

	/**
	 * Returns the URL of a small photo
	 * (130 or 75)
	 *
	 * @return {?string}
	 */
	get smallPhoto() {
		if (!this.$filled) {
			return null;
		}

		const [size] = this.getSizes(SMALL_SIZES);

		return size ? size.url : null;
	}

	/**
	 * Returns the URL of a medium photo
	 * (807 or 604 or less)
	 *
	 * @return {?string}
	 */
	get mediumPhoto() {
		if (!this.$filled) {
			return null;
		}

		const [size] = this.getSizes(MEDIUM_SIZES);

		return size ? size.url : null;
	}

	/**
	 * Returns the URL of a large photo
	 * (2560 or 1280 or less)
	 *
	 * @return {?string}
	 */
	get largePhoto() {
		if (!this.$filled) {
			return null;
		}

		const [size] = this.getSizes(LARGE_SIZES);

		return size ? size.url : null;
	}

	/**
	 * Returns the sizes
	 *
	 * @return {?Object[]}
	 */
	get sizes() {
		if (this.payload.sizes) {
			return this.payload.sizes;
		}

		const sizes = [];
		POST_SIZES.forEach((photo, type) => {
			if (photo in this.payload) {
				sizes.push({ type, src: this.payload[photo] });
			}
		});

		return sizes.length > 0 ? sizes : null;
	}

	/**
	 * Returns the sizes of the required types
	 *
	 * @param {string[]} sizeTypes
	 *
	 * @return {Object[]}
	 */
	getSizes(sizeTypes) {
		const { sizes } = this;

		if (!sizes) {
			return [];
		}

		return sizeTypes
			.map(sizeType => (
				sizes.find(size => size.type === sizeType) || null
			))
			.filter(Boolean);
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'userId',
			'albumId',
			'text',
			'createdAt',
			'height',
			'width',
			'smallPhoto',
			'mediumPhoto',
			'largePhoto',
			'sizes'
		]);
	}
}
