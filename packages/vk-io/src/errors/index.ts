export { default as VKError } from './error';

export { default as APIError } from './api';
export { default as UploadError } from './upload';
export { default as CollectError } from './collect';
export { default as UpdatesError } from './updates';
export { default as ExecuteError } from './execute';
export { default as SnippetsError } from './snippets';

export {
	APIErrorCode,
	SharedErrorCode,
	UploadErrorCode,
	UpdatesErrorCode,
	CollectErrorCode,
	SnippetErrorCode,

	apiErrors,
	sharedErrors,
	uploadErrors,
	updatesErrors,
	collectErrors,
	snippetsErrors
} from '../utils/constants';
