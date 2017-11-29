import { URL } from 'url';

/**
 * Parse attachments with RegExp
 *
 * @type {RegExp}
 */
const parseAttachment = /([^\d-]+)([-\d]+)_(\d+)_?(\d+)?/;

/**
 * Parse resource with RegExp
 *
 * @type {RegExp}
 */
const parseResource = /([^\d-]+)([-\d]+)/;

/**
 * Remove search param
 *
 * @type {RegExp}
 */
const removeSearchParam = /&[^=]+=/;

/**
 * Switch resource types
 *
 * @type {Object}
 */
const enumResourceTypes = {
	id: 'user',
	club: 'group',
	public: 'group',
	app: 'application'
};

export default class Snippets {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'Snippets';
	}

	/**
	 * Defines the type of object (user, community, application, attachment)
	 *
	 * @param {string} resource
	 *
	 * @return {Promise<Object>}
	 */
	async resolveResource(resource) {
		const numberResource = Number(resource);
		const resourceIsNaN = Number.isNaN(numberResource);

		let resourceWithSearch = resource;
		try {
			let url = resource;

			if (!(url.startsWith('http://') || url.startsWith('https://'))) {
				url = `https://${resource}`;
			}

			const { hostname, pathname, search } = new URL(url);

			if (hostname === resource || !resourceIsNaN) {
				throw new Error('Is not URL');
			}

			if (!['vk.com', 'm.vk.com'].includes(hostname)) {
				throw new Error('URL not allowed');
			}

			if (pathname === '/') {
				throw new Error('URL should contain screen name');
			}

			resource = pathname.substring(1);
			resourceWithSearch = `${resource}?${search}`;
		} catch (error) {
			if (['URL not allowed', 'URL should contain screen name'].includes(error.message)) {
				throw error;
			}
		}

		if (parseAttachment.test(resourceWithSearch)) {
			const [, type, owner, id] = resourceWithSearch.match(parseAttachment);

			return {
				id: Number(id),
				owner: Number(id),
				type: type.toLowerCase().replace(removeSearchParam, '')
			};
		}

		if (parseResource.test(resource)) {
			const [, typeResource, id] = resource.match(parseResource);

			let type = typeResource.toLowerCase();

			if (type in enumResourceTypes) {
				// eslint-disable-next-line prefer-destructuring
				type = enumResourceTypes[type];
			}

			return {
				id: Number(id),
				type
			};
		}

		if (!resourceIsNaN) {
			return {
				id: numberResource,
				type: numberResource > 0
					? 'user'
					: 'group'
			};
		}

		let screenName = resource;
		if (screenName.startsWith('@') || screenName.startsWith('*')) {
			screenName = screenName.substring(1);
		}

		const response = await this.vk.api.utils.resolveScreenName({
			screen_name: screenName
		});

		if (Array.isArray(response)) {
			throw new Error('Resource not found');
		}

		const { type, object_id: id } = response;

		return { id, type };
	}
}
