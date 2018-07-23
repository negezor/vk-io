import nodeUrl from 'url';

import { SnippetsError } from '../errors';
import {
	snippetsErrors,

	parseAttachment,

	parseResource,
	parseOwnerResource
} from '../utils/constants';

const { URL } = nodeUrl;

const {
	INVALID_URL,
	URL_NOT_ALLOWED,
	INVALID_RESOURCE,
	RESOURCE_NOT_FOUND
} = snippetsErrors;

/**
 * Remove search param
 *
 * @type {RegExp}
 */
const removeSearchParam = /(\?|&)[^=]+=/;

/**
 * Search dot
 *
 * @type {RegExp}
 */
const searchDot = /\./g;

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

/**
 * Allowed host names
 *
 * @type {Array}
 */
const allowedHostnames = ['vk.com', 'm.vk.com'];

/**
 * Resolve the attachment resource
 *
 * @param {string} resource
 * @param {RegExp} pattern
 *
 * @return {Object}
 */
const resolveOwnerResource = (resource, pattern) => {
	const [, type, owner, id] = resource.match(pattern);

	return {
		id: Number(id),
		owner: Number(owner),
		type: type.toLowerCase().replace(removeSearchParam, '')
	};
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
		if (!resource) {
			throw new SnippetsError({
				code: INVALID_RESOURCE,
				message: 'Resource should must be'
			});
		}

		resource = String(resource);

		if (resource.startsWith('@') || resource.startsWith('*')) {
			resource = resource.substring(1);
		}

		const numberResource = Number(resource);
		const resourceIsNaN = Number.isNaN(numberResource);

		if (!resourceIsNaN) {
			const isUser = numberResource > 0;

			return {
				id: isUser
					? numberResource
					: -numberResource,
				type: isUser
					? 'user'
					: 'group'
			};
		}

		let resourceSearch;
		try {
			if (!resource.match(searchDot)) {
				throw new SnippetsError({
					code: INVALID_RESOURCE,
					message: 'Is not URL'
				});
			}

			let url = resource;

			if (!(url.startsWith('http://') || url.startsWith('https://'))) {
				url = `https://${resource}`;
			}

			const { hostname, pathname, search } = new URL(url);

			if (!allowedHostnames.includes(hostname)) {
				throw new SnippetsError({
					code: URL_NOT_ALLOWED,
					message: 'URL not allowed'
				});
			}

			if (pathname === '/') {
				throw new SnippetsError({
					code: INVALID_URL,
					message: 'URL should contain path'
				});
			}

			resource = pathname.substring(1);
			resourceSearch = search;
		} catch (error) {
			if ([URL_NOT_ALLOWED, INVALID_URL].includes(error.code)) {
				throw error;
			}
		}

		if (parseAttachment.test(resourceSearch)) {
			return resolveOwnerResource(resourceSearch, parseAttachment);
		}

		if (parseOwnerResource.test(resourceSearch)) {
			return resolveOwnerResource(resourceSearch, parseOwnerResource);
		}

		if (parseAttachment.test(resource)) {
			return resolveOwnerResource(resource, parseAttachment);
		}

		if (parseOwnerResource.test(resource)) {
			return resolveOwnerResource(resource, parseOwnerResource);
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

		const response = await this.vk.api.utils.resolveScreenName({
			screen_name: resource
		});

		if (Array.isArray(response)) {
			throw new SnippetsError({
				message: 'Resource not found',
				code: RESOURCE_NOT_FOUND
			});
		}

		const { type, object_id: id } = response;

		if (type === 'page') {
			return {
				id,
				type: 'group'
			};
		}

		return { id, type };
	}
}
