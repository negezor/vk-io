import { VK } from './vk';
import { APIRequest } from './api/request';

import * as Params from './api/schemas/params';
import * as Objects from './api/schemas/objects';
import * as Responses from './api/schemas/responses';

export * from './errors';
export * from './structures/keyboard';
export * from './structures/contexts';
export * from './structures/attachments';

export * from './structures/shared/message-reply';
export * from './structures/shared/message-forward';

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

export { getRandomId, applyMixins } from './utils/helpers';
export { Attachmentable, IAllAttachmentable } from './structures/shared/attachmentable';

export {
	VK,
	APIRequest,
	APIRequest as Request,

	Params,
	Objects,
	Responses
};

// eslint-disable-next-line import/no-default-export
export default VK;
