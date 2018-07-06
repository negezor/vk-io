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
	 * Returns the description
	 *
	 * @return {string}
	 */
	get description() {
		return this.payload.description;
	}
}
