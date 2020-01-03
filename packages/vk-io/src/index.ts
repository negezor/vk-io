import { VK } from './vk';
import { APIRequest } from './api/request';

export * from './errors';
export * from './structures/keyboard';
export * from './structures/contexts';
export * from './structures/attachments';

export * from './api/schemas/params';
export * from './api/schemas/objects';
export * from './api/schemas/responses';

export {
	CaptchaType,
	UpdateSource,
	ResourceType,
	MessageSource,
	AttachmentType,
	AttachmentTypeString,

	captchaTypes,
	resourceTypes,
	messageSources,
	attachmentTypes,

	platforms,
	inspectCustomData
} from './utils/constants';

export { Composer } from './structures/shared/composer';
export { ICallbackServiceValidate } from './utils/callback-service';

export { applyMixins } from './utils/helpers';
export { Attachmentable, IAllAttachmentable } from './structures/shared/attachmentable';

export { VK, APIRequest, APIRequest as Request };

// eslint-disable-next-line import/no-default-export
export default VK;
