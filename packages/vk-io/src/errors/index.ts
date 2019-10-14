export { default as VKError } from './error';

export { default as APIError } from './api';
export { default as AuthError } from './auth';
export { default as UploadError } from './upload';
export { default as CollectError } from './collect';
export { default as UpdatesError } from './updates';
export { default as ExecuteError } from './execute';
export { default as SnippetsError } from './snippets';
export { default as StreamingRuleError } from './streaming-rule';

export {
	APIErrorCode,
	AuthErrorCode,
	SharedErrorCode,
	UploadErrorCode,
	UpdatesErrorCode,
	CollectErrorCode,
	SnippetErrorCode,

	apiErrors,
	authErrors,
	sharedErrors,
	uploadErrors,
	updatesErrors,
	collectErrors,
	snippetsErrors
} from '../utils/constants';
