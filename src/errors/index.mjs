import VKError from './vk';
import APIError from './api';
import AuthError from './auth';
import UploadError from './upload';
import CollectError from './collect';
import UpdatesError from './updates';
import ExecuteError from './execute';
import SnippetsError from './snippets';
import StreamingRuleError from './streaming-rule';

export {
	apiErrors,
	authErrors,
	uploadErrors,
	updatesErrors,
	collectErrors,
	snippetsErrors
} from '../util/constants';

export {
	VKError,
	APIError,
	AuthError,
	UploadError,
	CollectError,
	UpdatesError,
	ExecuteError,
	SnippetsError,
	StreamingRuleError
};

export default VKError;
