import ExternalAttachment from './external';

import PhotoAttachment from './photo';
import { copyParams } from '../../utils/helpers';
import { attachmentTypes, inspectCustomData } from '../../utils/constants';

const { LINK } = attachmentTypes;

const kPhoto = Symbol('kPhoto');

export default class LinkAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(LINK, payload);

		this.vk = vk;
	}

	/**
	 * Checks for the presence of a photo in a link
	 *
	 * @return {boolean}
	 */
	get hasPhoto() {
		return this.attachments.length > 0;
	}

	/**
	 * Returns the title
	 *
	 * @return {string}
	 */
	get title() {
		return this.payload.title;
	}

	/**
	 * Returns the title
	 *
	 * @return {?string}
	 */
	get caption() {
		return this.payload.caption || null;
	}

	/**
	 * Returns the description
	 *
	 * @return {?string}
	 */
	get description() {
		return this.payload.description || null;
	}

	/**
	 * Returns the URL of the link
	 *
	 * @return {string}
	 */
	get url() {
		return this.payload.url;
	}

	/**
	 * Returns the product
	 *
	 * @return {?Object}
	 */
	get product() {
		return this.payload.product;
	}

	/**
	 * Returns the button
	 *
	 * @return {?Object}
	 */
	get button() {
		return this.payload.button || null;
	}

	/**
	 * Returns the photo
	 *
	 * @return {?PhotoAttachment}
	 */
	get photo() {
		if (!this[kPhoto]) {
			this[kPhoto] = this.payload.photo
				? new PhotoAttachment(this.payload.photo, this.vk)
				: null;
		}

		return this[kPhoto];
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'title',
			'caption',
			'description',
			'url',
			'product',
			'button',
			'photo'
		]);
	}
}
