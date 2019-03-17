import nodeUrl from 'url';

import { SnippetsError } from '../errors';
import {
	resourceTypes,
	snippetsErrors,

	parseAttachment,

	parseResource,
	parseOwnerResource
} from '../utils/constants';

const { URL } = nodeUrl;

const {
	INVALID_URL,
	INVALID_RESOURCE,
	RESOURCE_NOT_FOUND
} = snippetsErrors;

const numberRe = /^-?\d+$/;

const hasProtocolRe = /https?:\/\//i;
const isVKUrl = /^(?:https?:\/\/)?(?:m\.)?vk\.com/i;

const isUserMentionRe = /\*|@/;
const systemMentionRe = /\[([^|]+)|([^|\]]+)\]/;

/**
 * Switch resource types
 *
 * @type {Object}
 */
const enumResourceTypes = {
	id: resourceTypes.USER,
	club: resourceTypes.GROUP,
	public: resourceTypes.GROUP,
	app: resourceTypes.APPLICATION
};

/**
 * Remove search param
 *
 * @type {RegExp}
 */
const removeSearchParam = /(\?|&)[^=]+=/;

/**
 * Resolve the attachment resource
 *
 * @param {string} resource
 * @param {RegExp} pattern
 *
 * @return {Object}
 */
const resolveOwnerResource = (resource, pattern) => {
	const {
		1: type,
		2: owner,
		3: id
	} = resource.match(pattern);

	return {
		id: Number(id),
		owner: Number(owner),
		type: type.toLowerCase().replace(removeSearchParam, '')
	};
};

export default class ResourceResolver {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;
	}

	/**
	 * Resolve resource
	 *
	 * @return {Promise<Object>}
	 */
	async resolve(resource) {
		if (!resource) {
			throw new SnippetsError({
				code: INVALID_RESOURCE,
				message: 'Resource should must be'
			});
		}

		resource = String(resource).trim();

		if (numberRe.test(resource)) {
			return this.resolveNumber(resource);
		}

		const isMention = (
			isUserMentionRe.test(resource) || systemMentionRe.test(resource)
		);

		if (isMention) {
			return this.resolveMention(resource);
		}

		if (isVKUrl.test(resource)) {
			return this.resolveUrl(resource);
		}

		return this.resolveScreenName(resource);
	}

	/**
	 * Resolve number
	 *
	 * @param {string} resource
	 *
	 * @return {Promise<Object>}
	 */
	resolveNumber(resource) {
		const type = resource < 0
			? 'club'
			: 'id';

		return this.resolveScreenName(type + resource);
	}

	/**
	 * Resolve resource mention
	 *
	 * @param {string} resource
	 *
	 * @return {Promise<Object>}
	 */
	resolveMention(resource) {
		if (isUserMentionRe.test(resource)) {
			return this.resolveScreenName(resource.substring(1));
		}

		const { 1: mentionResource } = resource.match(systemMentionRe);

		return this.resolveScreenName(mentionResource);
	}

	/**
	 * Resolve resource url
	 *
	 * @param {string} resource
	 *
	 * @return {Promise<Object>}
	 */
	async resolveUrl(resourceUrl) {
		if (!hasProtocolRe.test(resourceUrl)) {
			resourceUrl = `https://${resourceUrl}`;
		}

		const { pathname, search } = new URL(resourceUrl);

		if (pathname === '/') {
			throw new SnippetsError({
				code: INVALID_URL,
				message: 'URL should contain path'
			});
		}

		if (parseAttachment.test(search)) {
			return resolveOwnerResource(search, parseAttachment);
		}

		if (parseOwnerResource.test(search)) {
			return resolveOwnerResource(search, parseOwnerResource);
		}

		return this.resolveScreenName(pathname.substring(1));
	}

	/**
	 * Resolve screen name
	 *
	 * @param {string} resource
	 *
	 * @return {Promise<Object>}
	 */
	async resolveScreenName(resource) {
		if (parseAttachment.test(resource)) {
			return resolveOwnerResource(resource, parseAttachment);
		}

		if (parseOwnerResource.test(resource)) {
			return resolveOwnerResource(resource, parseOwnerResource);
		}

		if (parseResource.test(resource)) {
			const { 1: typeResource, 2: id } = resource.match(parseResource);

			let type = typeResource.toLowerCase();

			if (type in enumResourceTypes) {
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
				type: resourceTypes.GROUP
			};
		}

		return { id, type };
	}
}
