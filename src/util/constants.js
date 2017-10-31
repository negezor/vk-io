import { version } from '../../package.json';

/**
 * VK API version
 *
 * @type {string}
 */
export const API_VERSION = '5.68';

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
export const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';

/**
 * Default options
 *
 * @type {Object}
 *
 * @property {?string} [token]               Access token
 * @property {Agent}   [agent]               HTTPS agent
 * @property {?string} [lang]                The return data language
 *
 * @property {?string} [login]               User login (phone number or email)
 * @property {?string} [phone]               User phone number
 * @property {?string} [password]            User password
 *
 * @property {?number} [app]                 Application ID
 * @property {?number} [key]                 Secret application key
 * @property {?number} [scope]               List of permissions
 *
 * @property {string}  [apiMode]             Query mode (sequential|parallel|parallel_selected)
 * @property {number}  [apiWait]             Time to wait before re-querying
 * @property {number}  [apiLimit]            Requests per second
 * @property {number}  [apiTimeout]          Wait time for one request
 * @property {number}  [apiHeaders]          Headers sent to the API
 * @property {number}  [apiAttempts]         The number of retries at calling
 * @property {number}  [apiExecuteCount]     Number of requests per execute
 * @property {Array}   [apiExecuteMethods]   Methods for call execute (apiMode=parallel-selected)
 *
 * @property {number}  [uploadTimeout]       Wait time for one request
 *
 * @property {number}  [pollingWait]         Time to wait before re-querying
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
	lang: null,

	login: null,
	phone: null,
	password: null,

	app: null,
	key: null,
	scope: 'all',

	apiMode: 'sequential',
	apiWait: 3e3,
	apiLimit: 3,
	apiAttempts: 3,
	apiTimeout: 6e3,
	apiHeaders: {
		'User-Agent': `vk-io/${version} (+https://github.com/negezor/vk-io)`
	},
	apiExecuteCount: 25,
	apiExecuteMethods: ['messages.send'],

	uploadTimeout: 15e3,

	pollingWait: 3e3,
	pollingAttempts: 3,

	webhookPath: null,
	webhookSecret: null,
	webhookConfirmation: null,

	collectAttempts: 3
};

export const defaultExtensions = {
	photo: 'jpg',
	video: 'mp4',
	audio: 'mp3',
	voice: 'ogg',
	graffiti: 'png'
};

/**
 * API error codes
 *
 * @type {Object}
 */
export const apiErrors = {
	UKNOWN_ERROR: 1,
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
 * Updates error codes
 *
 * @type {Object}
 */
export const updatesErrors = {
	NEED_RESTART: 'NEED_RESTART'
};

/**
 * Auth error codes
 *
 * @type {Object}
 */
export const authErrors = {
	PAGE_BLOCKED: 'PAGE_BLOCKED',
	INVALID_PHONE_NUMBER: 'INVALID_PHONE_NUMBER',
	AUTHORIZATION_FAILED: 'AUTHORIZATION_FAILED',
	FAILED_PASSED_CAPTCHA: 'FAILED_PASSED_CAPTCHA',
	MISSING_CAPTCHA_HANDLER: 'MISSING_CAPTCHA_HANDLER',
	FAILED_PASSED_TWO_FACTOR: 'FAILED_PASSED_TWO_FACTOR',
	MISSING_TWO_FACTOR_HANDLER: 'MISSING_TWO_FACTOR_HANDLER'
};

/**
 * Collect error codes
 *
 * @type {Object}
 */
export const collectErrors = {
	EXECUTE_ERROR: 'EXECUTE_ERROR'
};

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
	['photos', 4],
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
