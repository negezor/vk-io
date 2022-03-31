// @ts-ignore
import { API } from '../api';
// @ts-ignore
import { ResourceError } from '../errors';
// @ts-ignore

// @ts-ignore
import { ResourceType, ResourceErrorCode } from './constants';
// @ts-ignore

// @ts-ignore
export interface IResolveResourceOptions {
// @ts-ignore
	resource: string | number;
// @ts-ignore
	api?: API;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IResolvedTargetResource {
// @ts-ignore
	id: number;
// @ts-ignore
	type: 'user' | 'group' | 'application' | 'albums' | 'videos' | 'audios';
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IResolvedOwnerResource {
// @ts-ignore
	id: number;
// @ts-ignore
	ownerId: number;
// @ts-ignore
	type: 'photo' | 'audio' | 'video' | 'doc' | 'wall' | 'topic' | 'album';
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
const onlyNumberRe = /^-?\d+$/;
// @ts-ignore
const systemMentionRe = /\[([^|]+)\|[^\]]+\]/;
// @ts-ignore

// @ts-ignore
const isHttpsRe = /^https:\/\//i;
// @ts-ignore
const isVKUrlRe = /^(?:https:\/\/)?(?:m\.)?vk.com\//i;
// @ts-ignore

// @ts-ignore
const parseTargetResourceRe = /^(id|club|public|albums|tag|app)(-?\d+)$/i;
// @ts-ignore
const parseOwnerResourceRe = /^(album|topic|page|photo|video|audio|doc|audio_message|graffiti|wall|market|poll|gift)(-?\d+)_(\d+)/i;
// @ts-ignore

// @ts-ignore
const enumResourceTypes: Record<string, IResolvedTargetResource['type']> = {
// @ts-ignore
	id: ResourceType.USER,
// @ts-ignore
	club: ResourceType.GROUP,
// @ts-ignore
	public: ResourceType.GROUP,
// @ts-ignore
	app: ResourceType.APPLICATION
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const transformNumberResourceToTarget = (resource: number): string => (
// @ts-ignore
	resource < 0
// @ts-ignore
		? `club${-resource}`
// @ts-ignore
		: `id${resource}`
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
const transformMentionResourceToTarget = (resource: string): string => {
// @ts-ignore
	const { 1: mentionResource } = resource.match(systemMentionRe)!;
// @ts-ignore

// @ts-ignore
	return mentionResource;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const resolveTargetResouce = (resource: string): IResolvedTargetResource => {
// @ts-ignore
	const { 1: rawType, 2: rawId } = resource.match(parseTargetResourceRe)! as [
// @ts-ignore
		never,
// @ts-ignore
		IResolvedTargetResource['type'],
// @ts-ignore
		number
// @ts-ignore
	];
// @ts-ignore

// @ts-ignore
	return {
// @ts-ignore
		id: Number(rawId),
// @ts-ignore
		type: enumResourceTypes[rawType] || rawType
// @ts-ignore
	};
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const resolveOwnerResource = (resource: string): IResolvedOwnerResource => {
// @ts-ignore
	const { 1: rawType, 2: rawOwnerId, 3: rawId } = resource.match(parseOwnerResourceRe)!;
// @ts-ignore

// @ts-ignore
	return {
// @ts-ignore
		id: Number(rawId),
// @ts-ignore
		ownerId: Number(rawOwnerId),
// @ts-ignore
		type: rawType as IResolvedOwnerResource['type']
// @ts-ignore
	};
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const resolveSlugResource = async (
// @ts-ignore
	resource: string,
// @ts-ignore
	api?: API
// @ts-ignore
): Promise<IResolvedTargetResource> => {
// @ts-ignore
	if (api === undefined) {
// @ts-ignore
		throw new Error('API object is not passed');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	const response = await api.utils.resolveScreenName({
// @ts-ignore
		screen_name: resource
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	if (Array.isArray(response)) {
// @ts-ignore
		throw new ResourceError({
// @ts-ignore
			code: ResourceErrorCode.RESOURCE_NOT_FOUND,
// @ts-ignore
			message: 'Resource not found'
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return {
// @ts-ignore
		id: response.object_id!,
// @ts-ignore
		type: response.type
// @ts-ignore
	};
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export const resolveResource = async ({
// @ts-ignore
	resource: rawResource,
// @ts-ignore
	api
// @ts-ignore
}: IResolveResourceOptions): Promise<IResolvedTargetResource | IResolvedOwnerResource> => {
// @ts-ignore
	if (!rawResource) {
// @ts-ignore
		throw new TypeError('Resource is required');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	const resource = String(rawResource).trim();
// @ts-ignore

// @ts-ignore
	if (onlyNumberRe.test(resource)) {
// @ts-ignore
		return resolveTargetResouce(
// @ts-ignore
			transformNumberResourceToTarget(
// @ts-ignore
				Number(resource)
// @ts-ignore
			)
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (systemMentionRe.test(resource)) {
// @ts-ignore
		return resolveTargetResouce(
// @ts-ignore
			transformMentionResourceToTarget(
// @ts-ignore
				resource
// @ts-ignore
			)
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (parseOwnerResourceRe.test(resource)) {
// @ts-ignore
		return resolveOwnerResource(resource);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (parseTargetResourceRe.test(resource)) {
// @ts-ignore
		return resolveTargetResouce(resource);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (!isVKUrlRe.test(resource)) {
// @ts-ignore
		return resolveSlugResource(resource, api);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	const resourceUrl = !isHttpsRe.test(resource)
// @ts-ignore
		? `https://${resource}`
// @ts-ignore
		: resource;
// @ts-ignore

// @ts-ignore
	const { pathname: rawPathname, searchParams } = new URL(resourceUrl);
// @ts-ignore

// @ts-ignore
	if (rawPathname === '/') {
// @ts-ignore
		throw new ResourceError({
// @ts-ignore
			code: ResourceErrorCode.INVALID_URL,
// @ts-ignore
			message: 'URL should contain path'
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	const pathname = rawPathname.substring(1);
// @ts-ignore

// @ts-ignore
	const search = searchParams.get('w') || searchParams.get('z');
// @ts-ignore

// @ts-ignore
	if (search && parseOwnerResourceRe.test(search)) {
// @ts-ignore
		return resolveOwnerResource(search);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (parseOwnerResourceRe.test(pathname)) {
// @ts-ignore
		return resolveOwnerResource(pathname);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	if (parseTargetResourceRe.test(pathname)) {
// @ts-ignore
		return resolveTargetResouce(pathname);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return resolveSlugResource(pathname, api);
// @ts-ignore
};
