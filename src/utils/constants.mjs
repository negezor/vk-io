import { version } from '../../package.json';

import { keyMirror } from './helpers';

/**
 * VK API version
 *
 * @type {string}
 */
export const API_VERSION = '5.92';

/**
 * Chat peer ID
 *
 * @type {number}
 */
export const CHAT_PEER = 2e9;

/**
 * Blank html redirect
 *
 * @type {string}
 */
export const CALLBACK_BLANK = 'https://oauth.vk.com/blank.html';

/**
 * User-Agent for standalone auth
 *
 * @type {string}
 */
export const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36';

/**
 * Minimum time interval api with error
 *
 * @type {number}
 */
export const MINIMUM_TIME_INTERVAL_API = 1133;

/**
 * Default options
 *
 * @type {Object}
 *
 * @property {?string} [token]               Access token
 * @property {Agent}   [agent]               HTTPS agent
 * @property {?string} [language]            The return data language
 *
 * @property {?number} [appId]               Application ID
 * @property {?number} [appSecret]           Secret application key
 *
 * @property {?string} [login]               User login (phone number or email)
 * @property {?string} [phone]               User phone number
 * @property {?string} [password]            User password
 *
 * @property {?number} [authScope]           List of permissions
 *
 * @property {string}  [apiMode]             Query mode (sequential|parallel|parallel_selected)
 * @property {number}  [apiWait]             Time to wait before re-querying
 * @property {number}  [apiLimit]            Requests per second
 * @property {string}  [apiBaseUrl]          Base API URL
 * @property {number}  [apiTimeout]          Wait time for one request
 * @property {number}  [apiHeaders]          Headers sent to the API
 * @property {number}  [apiAttempts]         The number of retries at calling
 * @property {number}  [apiExecuteCount]     Number of requests per execute
 * @property {Array}   [apiExecuteMethods]   Methods for call execute (apiMode=parallel_selected)
 *
 * @property {number}  [uploadTimeout]       Wait time for one request
 *
 * @property {number}  [pollingWait]         Time to wait before re-querying
 * @property {number}  [pollingGroupId]      Group ID for polling
 * @property {number}  [pollingAttempts]     The number of retries at calling
 *
 * @property {?string} [webhookPath]         Webhook path
 * @property {?string} [webhookSecret]       Webhook secret key
 * @property {?string} [webhookConfirmation] Webhook confirmation key
 *
 * @property {number}  [collectAttempts]     The number of retries at calling
 */
export const defaultOptions = {
	token: null,
	agent: null,
	language: null,

	appId: null,
	appSecret: null,

	login: null,
	phone: null,
	password: null,

	authScope: 'all',

	apiMode: 'sequential',
	apiWait: 3e3,
	apiLimit: 3,
	apiBaseUrl: 'https://api.vk.com/method',
	apiAttempts: 3,
	apiTimeout: 10e3,
	apiHeaders: {
		'User-Agent': `vk-io/${version} (+https://github.com/negezor/vk-io)`
	},
	apiExecuteCount: 25,
	apiExecuteMethods: ['messages.send'],

	uploadTimeout: 20e3,

	pollingWait: 3e3,
	pollingAttempts: 3,
	pollingGroupId: null,

	webhookPath: null,
	webhookSecret: null,
	webhookConfirmation: null,

	collectAttempts: 3
};

/**
 * The attachment types
 *
 * @type {Object}
 */
export const attachmentTypes = {
	AUDIO: 'audio',
	AUDIO_MESSAGE: 'audio_message',
	GRAFFITI: 'graffiti',
	DOCUMENT: 'doc',
	GIFT: 'gift',
	LINK: 'link',
	MARKET_ALBUM: 'market_album',
	MARKET: 'market',
	PHOTO: 'photo',
	STICKER: 'sticker',
	VIDEO: 'video',
	WALL_REPLY: 'wall_reply',
	WALL: 'wall',
	POLL: 'poll'
};

/**
 * Default extensions for attachments
 *
 * @type {Object}
 */
export const defaultExtensions = {
	photo: 'jpg',
	video: 'mp4',
	audio: 'mp3',
	voice: 'ogg',
	graffiti: 'png'
};

/**
 * Default content type for attachments
 *
 * @type {Object}
 */
export const defaultContentTypes = {
	photo: 'image/jpeg',
	video: 'video/mp4',
	audio: 'audio/mp3',
	graffiti: 'image/png',
	audioMessage: 'audio/ogg'
};

/**
 * Sources of captcha
 *
 * @type {Object}
 */
export const captchaTypes = keyMirror([
	'API',
	'DIRECT_AUTH',
	'IMPLICIT_FLOW_AUTH',
	'ACCOUNT_VERIFICATION'
]);

/**
 * Message source
 *
 * @type {Object}
 */
export const messageSources = {
	USER: 'user',
	CHAT: 'chat',
	GROUP: 'group',
	EMAIL: 'email'
};

/**
 * Resource types
 *
 * @type {Object}
 */
export const resourceTypes = {
	USER: 'user',
	GROUP: 'group',
	APPLICATION: 'application'
};

/**
 * API error codes
 *
 * @type {Object}
 */
export const apiErrors = {
	UNKNOWN_ERROR: 1,
	APP_SWITCHED_OFF: 2,
	UNKNOWN_METHOD: 3,
	AUTH_FAILURE: 5,
	TOO_MANY_REQUESTS: 6,
	SCOPE_NEEDED: 7,
	INCORRECT_REQUEST: 8,
	TOO_MANY_SIMILAR_ACTIONS: 9,
	INTERNAL_ERROR: 10,
	RESPONSE_SIZE_TOO_BIG: 13,
	CAPTCHA_REQUIRED: 14,
	ACCESS_DENIED: 15,
	USER_VALIDATION_REQUIRED: 17,
	PAGE_BLOCKED: 18,
	STANDALONE_ONLY: 20,
	STANDALONE_AND_OPEN_API_ONLY: 21,
	METHOD_DISABLED: 23,
	CONFIRMATION_REQUIRED: 24,
	GROUP_TOKEN_NOT_VALID: 27,
	APP_TOKEN_NOT_VALID: 28,
	WRONG_PARAMETER: 100,
	INCORRECT_USER_ID: 113,
	ALBUM_ACCESS_DENIED: 200,
	AUDIO_ACCESS_DENIED: 201,
	GROUP_ACCESS_DENIED: 203,
	ALBUM_OVERFLOW: 300,
	PAYMENTS_DISABLED: 500,
	COMMERCIAL_ACCESS_DENIED: 600,
	COMMERCIAL_ERROR: 603
};

/**
 * Auth error codes
 *
 * @type {Object}
 */
export const authErrors = keyMirror([
	'PAGE_BLOCKED',
	'INVALID_PHONE_NUMBER',
	'AUTHORIZATION_FAILED',
	'FAILED_PASSED_CAPTCHA',
	'FAILED_PASSED_TWO_FACTOR',
]);

/**
 * Upload error codes
 *
 * @type {Object}
 */
export const uploadErrors = keyMirror([
	'MISSING_PARAMETERS',
	'NO_FILES_TO_UPLOAD',
	'EXCEEDED_MAX_FILES',
	'UNSUPPORTED_SOURCE_TYPE'
]);

/**
 * Updates error codes
 *
 * @type {Object}
 */
export const updatesErrors = keyMirror([
	'NEED_RESTART',
	'POLLING_REQUEST_FAILED'
]);

/**
 * Collect error codes
 *
 * @type {Object}
 */
export const collectErrors = keyMirror([
	'EXECUTE_ERROR'
]);

/**
 * Snippets error codes
 *
 * @type {Object}
 */
export const snippetsErrors = keyMirror([
	'INVALID_URL',
	'INVALID_RESOURCE',
	'RESOURCE_NOT_FOUND'
]);

/**
 * Snippets error codes
 *
 * @type {Object}
 */
export const sharedErrors = keyMirror([
	'MISSING_CAPTCHA_HANDLER',
	'MISSING_TWO_FACTOR_HANDLER'
]);

/**
 * Updates sources
 *
 * @type {Object}
 */
export const updatesSources = keyMirror([
	'POLLING',
	'WEBHOOK'
]);

/**
 * List of user permissions and their bit mask
 *
 * @type {Map}
 */
export const userScopes = new Map([
	['notify', 1],
	['friends', 2],
	['photos', 4],
	['audio', 8],
	['video', 16],
	['pages', 128],
	['link', 256],
	['status', 1024],
	['notes', 2048],
	['messages', 4096],
	['wall', 8192],
	['ads', 32768],
	['offline', 65536],
	['docs', 131072],
	['groups', 262144],
	['notifications', 524288],
	['stats', 1048576],
	['email', 4194304],
	['market', 134217728]
]);

/**
 * List of group permissions and their bit mask
 *
 * @type {Map}
 */
export const groupScopes = new Map([
	['stories', 1],
	['photos', 4],
	// ['app_widget', 64],
	['messages', 4096],
	['docs', 131072],
	['manage', 262144]
]);

/**
 * VK Platforms
 *
 * @type {Map}
 */
export const platforms = new Map([
	[1, 'mobile'],
	[2, 'iphone'],
	[3, 'ipad'],
	[4, 'android'],
	[5, 'wphone'],
	[6, 'windows'],
	[7, 'web'],
	[8, 'standalone']
]);

/**
 * Parse attachments with RegExp
 *
 * @type {RegExp}
 */
export const parseAttachment = /(photo|video|audio|doc|audio_message|graffiti|wall|market|poll|gift)([-\d]+)_(\d+)_?(\w+)?/;

/**
 * Parse resource with RegExp
 *
 * @type {RegExp}
 */
export const parseResource = /(id|club|public|albums|tag|app(?:lication))([-\d]+)/;

/**
 * Parse owner resource with RegExp
 *
 * @type {RegExp}
 */
export const parseOwnerResource = /(album|topic|wall|page|videos)([-\d]+)_(\d+)/;

/**
 * Inspect custom data
 *
 * @type {Symbol}
 */
export const inspectCustomData = Symbol('inspectCustomData');
