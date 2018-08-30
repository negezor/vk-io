import ExternalAttachment from './external';

import PhotoAttachment from './photo';
import { attachmentTypes } from '../../utils/constants';

const { LINK } = attachmentTypes;

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

		this.attachments = payload.photo
			? [new PhotoAttachment(payload.photo, vk)]
			: [];
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
	 * Returns the URL of the link
	 *
	 * @return {string}
	 */
	get url() {
		return this.payload.url;
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
	 * Returns the photo
	 *
	 * @return {?PhotoAttachment}
	 */
	get photo() {
		return this.attachments[0] || null;
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
}
