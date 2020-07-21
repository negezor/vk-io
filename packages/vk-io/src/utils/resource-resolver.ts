import { API } from '../api';
import { ResourceError } from '../errors';

import { ResourceType, ResourceErrorCode } from './constants';

export interface IResolveResourceOptions {
	resource: string | number;
	api?: API;
}

export interface IResolvedTargetResource {
	id: number;
	type: 'user' | 'group' | 'application' | 'albums' | 'videos' | 'audios';
}

export interface IResolvedOwnerResource {
	id: number;
	ownerId: number;
	type: 'photo' | 'audio' | 'video' | 'doc' | 'wall' | 'topic';
}

const onlyNumberRe = /^-?\d+$/;
const systemMentionRe = /\[([^|]+)\|[^\]]+\]/;

const isVKUrlRe = /^(?:https:\/\/)?(?:m\.)?vk.com\//;

const parseTargetResourceRe = /^([^\d]+)(\d+)$/;
const parseOwnerResourceRe = /(\w+)(-?\d+)_(\d+)/;

const enumResourceTypes: Record<string, IResolvedTargetResource['type']> = {
	id: ResourceType.USER,
	club: ResourceType.GROUP,
	public: ResourceType.GROUP,
	app: ResourceType.APPLICATION
};

const transformNumberResourceToTarget = (resource: number): string => (
	resource < 0
		? `club${-resource}`
		: `id${resource}`
);

const transformMentionResourceToTarget = (resource: string): string => {
	const { 1: mentionResource } = resource.match(systemMentionRe)!;

	return mentionResource;
};

const resolveTargetResouce = (resource: string): IResolvedTargetResource => {
	const { 1: rawType, 2: rawId } = resource.match(parseTargetResourceRe)!;

	return {
		id: Number(rawId),
		type: enumResourceTypes[rawType] || rawType
	};
};

const resolveOwnerResource = (resource: string): IResolvedOwnerResource => {
	const { 1: rawType, 2: rawOwnerId, 3: rawId } = resource.match(parseOwnerResourceRe)!;

	return {
		id: Number(rawId),
		ownerId: Number(rawOwnerId),
		type: rawType as IResolvedOwnerResource['type']
	};
};

const resolveSlugResource = async (
	resource: string,
	api?: API
): Promise<IResolvedTargetResource> => {
	if (api === undefined) {
		throw new Error('API object is not passed');
	}

	const response = await api.utils.resolveScreenName({
		screen_name: resource
	});

	if (Array.isArray(response)) {
		throw new ResourceError({
			code: ResourceErrorCode.RESOURCE_NOT_FOUND,
			message: 'Resource not found'
		});
	}

	return {
		id: response.object_id!,
		type: response.type
	};
};

export const resolveResource = async ({
	resource: rawResource,
	api
}: IResolveResourceOptions): Promise<IResolvedTargetResource | IResolvedOwnerResource> => {
	if (!rawResource) {
		throw new TypeError('Resource is required');
	}

	const resource = String(rawResource).trim();

	if (onlyNumberRe.test(resource)) {
		return resolveTargetResouce(
			transformNumberResourceToTarget(
				Number(resource)
			)
		);
	}

	if (systemMentionRe.test(resource)) {
		return resolveTargetResouce(
			transformMentionResourceToTarget(
				resource
			)
		);
	}

	if (parseOwnerResourceRe.test(resource)) {
		return resolveOwnerResource(resource);
	}

	if (parseTargetResourceRe.test(resource)) {
		return resolveTargetResouce(resource);
	}

	if (!isVKUrlRe.test(resource)) {
		return resolveSlugResource(resource, api);
	}

	const resourceUrl = !resource.startsWith('https://')
		? `https://${resource}`
		: resource;

	const { pathname: rawPathname, search } = new URL(resourceUrl);

	if (rawPathname === '/') {
		throw new ResourceError({
			code: ResourceErrorCode.INVALID_URL,
			message: 'URL should contain path'
		});
	}

	const pathname = rawPathname.substring(1);

	if (parseOwnerResourceRe.test(search)) {
		return resolveOwnerResource(search);
	}

	if (parseOwnerResourceRe.test(pathname)) {
		return resolveOwnerResource(pathname);
	}

	if (parseTargetResourceRe.test(pathname)) {
		return resolveTargetResouce(pathname);
	}

	return resolveSlugResource(pathname, api);
};
