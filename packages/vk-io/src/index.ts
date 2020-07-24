export * from './errors';

export * from './api';
export * from './upload';
export * from './updates';
export * from './structures';

export { ICallbackServiceValidate } from './utils/callback-service';

export { getRandomId, applyMixins } from './utils/helpers';

export {
	IResolveResourceOptions,
	IResolvedOwnerResource,
	IResolvedTargetResource,

	resolveResource
} from './utils/resource-resolver';

export {
	CaptchaType,
	UpdateSource,
	ResourceType,
	MessageSource,
	AttachmentType,
	AttachmentTypeString,

	platforms,
	kSerializeData
} from './utils/constants';

// eslint-disable-next-line import/no-default-export
export { VK, VK as default } from './vk';
