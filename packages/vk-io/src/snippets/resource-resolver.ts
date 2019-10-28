import { URL } from 'url';

import VK from '../vk';
import { SnippetsError } from '../errors';
import {
	ResourceType,
	SnippetErrorCode,

	parseAttachment,

	parseResource,
	parseOwnerResource
} from '../utils/constants';

const {
	INVALID_URL,
	INVALID_RESOURCE,
	RESOURCE_NOT_FOUND
} = SnippetErrorCode;

const numberRe = /^-?\d+$/;

const hasProtocolRe = /https?:\/\//i;
const isVKUrl = /^(?:https?:\/\/)?(?:m\.)?vk\.com/i;

const isUserMentionRe = /\*|@/;
const systemMentionRe = /\[([^|]+)|([^|\]]+)\]/;

/**
 * Switch resource types
 */
const enumResourceTypes: Record<string, ResourceType> = {
	id: ResourceType.USER,
	club: ResourceType.GROUP,
	public: ResourceType.GROUP,
	app: ResourceType.APPLICATION
};

/**
 * Remove search param
 */
const removeSearchParam = /(\?|&)[^=]+=/;

/**
 * Resolve the attachment resource
 */
const resolveOwnerResource = (resource: string, pattern: RegExp): {
	id: number;
	owner: number;
	type: string;
} => {
	const {
		1: type,
		2: owner,
		3: id
	} = resource.match(pattern)!;

	return {
		id: Number(id),
		owner: Number(owner),
		type: type.toLowerCase().replace(removeSearchParam, '')
	};
};

export interface IResolvedResource {
	id: number;
	owner?: number;
	type: 'user' | 'group' | 'application' | 'albums' | 'album' | 'wall' | 'club' | 'photo' | 'video' | 'audio' | string;
}

export default class ResourceResolver {
	protected vk: VK;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Resolve resource
	 */
	public async resolve(rawResource: string | number): Promise<IResolvedResource> {
		if (!rawResource) {
			throw new SnippetsError({
				code: INVALID_RESOURCE,
				message: 'Resource is required'
			});
		}

		const resource = String(rawResource).trim();

		if (numberRe.test(resource)) {
			return this.resolveNumber(Number(resource));
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
	 */
	protected resolveNumber(resource: number): Promise<IResolvedResource> {
		const isGroup = resource < 0;

		const type = isGroup
			? 'club'
			: 'id';

		return this.resolveScreenName(type + (
			isGroup
				? -resource
				: resource
		));
	}

	/**
	 * Resolve resource mention
	 */
	protected resolveMention(resource: string): Promise<IResolvedResource> {
		if (isUserMentionRe.test(resource)) {
			return this.resolveScreenName(resource.substring(1));
		}

		const { 1: mentionResource } = resource.match(systemMentionRe)!;

		return this.resolveScreenName(mentionResource);
	}

	/**
	 * Resolve resource url
	 */
	protected async resolveUrl(rawResourceUrl: string): Promise<IResolvedResource> {
		const resourceUrl = !hasProtocolRe.test(rawResourceUrl)
			? `https://${rawResourceUrl}`
			: rawResourceUrl;

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
	 */
	protected async resolveScreenName(resource: string): Promise<IResolvedResource> {
		if (parseAttachment.test(resource)) {
			return resolveOwnerResource(resource, parseAttachment);
		}

		if (parseOwnerResource.test(resource)) {
			return resolveOwnerResource(resource, parseOwnerResource);
		}

		if (parseResource.test(resource)) {
			const { 1: typeResource, 2: id } = resource.match(parseResource)!;

			let type = typeResource.toLowerCase();

			if (type in enumResourceTypes) {
				type = enumResourceTypes[type];
			}

			return {
				id: Number(id),
				type
			};
		}

		// @ts-ignore
		const response = await this.vk.api.utils.resolveScreenName({
			screen_name: resource
		});

		if (Array.isArray(response)) {
			throw new SnippetsError({
				message: 'Resource not found',
				code: RESOURCE_NOT_FOUND
			});
		}

		// @ts-ignore
		const { type, object_id: id }: Required<typeof response> = response;

		if (type === 'page') {
			return {
				id,
				type: ResourceType.GROUP
			};
		}

		return { id, type };
	}
}
