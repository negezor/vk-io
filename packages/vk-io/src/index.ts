// TODO: In TypeScript 3.8 make exports * as Name
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

	platforms,
	kSerializeData
} from './utils/constants';

export { Composer } from './structures/shared/composer';
export { ICallbackServiceValidate } from './utils/callback-service';

export { inspectable } from './utils/inspectable';
export { getRandomId, applyMixins } from './utils/helpers';
export { Attachmentable, IAllAttachmentable } from './structures/shared/attachmentable';

export { APIRequest, APIRequest as Request } from './api/request';

export { Params, Responses, Objects };

// eslint-disable-next-line import/no-default-export
export { VK, VK as default } from './vk';
