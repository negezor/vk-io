import ExternalAttachment from './external';

export default class LinkAttachment extends ExternalAttachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('link', payload);

		this.vk = vk;
	}

	/**
	 * Returns the URL of the link
	 *
	 * @return {string}
	 */
	getUrl() {
		return this.payload.url;
	}

	/**
	 * Returns the title
	 *
	 * @return {string}
	 */
	getTitle() {
		return this.payload.title;
	}

	/**
	 * Returns the description
	 *
	 * @return {string}
	 */
	getDescription() {
		return this.payload.description;
	}
}
