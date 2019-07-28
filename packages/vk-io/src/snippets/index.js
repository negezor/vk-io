import ResourceResolver from './resource-resolver';

export default class Snippets {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.resourceResolver = new ResourceResolver(this.vk);
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	// eslint-disable-next-line class-methods-use-this
	get [Symbol.toStringTag]() {
		return 'Snippets';
	}

	/**
	 * Defines the type of object (user, community, application, attachment)
	 *
	 * @param {*} resource
	 *
	 * @return {Promise<Object>}
	 */
	resolveResource(resource) {
		return this.resourceResolver.resolve(resource);
	}
}
