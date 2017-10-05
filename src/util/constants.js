import { version } from '../../package.json';

/**
 * VK API version
 *
 * @type {string}
 */
export const API_VERSION = '5.68';

/**
 * Default options
 *
 * @type {Object}
 *
 * @property [token]               Access token
 * @property [lang]                The return data language
 *
 * @property [login]               User login (phone number or email)
 * @property [phone]               User phone number
 * @property [password]            User password
 *
 * @property [app]                 Application ID
 * @property [key]                 Secret application key
 * @property [scope]               List of permissions
 *
 * @property [agent]               HTTPS agent
 *
 * @property [apiMode]             Query mode (sequential|parallel)
 * @property [apiWait]             Time to wait before re-querying
 * @property [apiLimit]            Requests per second
 * @property [apiTimeout]          Wait time for one request
 * @property [apiAttempts]         The number of retries at calling
 * @property [apiExecuteCount]     Number of requests per execute
 *
 * @property [uploadTimeout]       Wait time for one request
 *
 * @property [longpollWait]        Time to wait before re-querying
 * @property [longpollAttempts]    The number of retries at calling
 *
 * @property [webhookPath]         Webhook path
 * @property [webhookSecret]       Webhook secret key
 * @property [webhookConfirmation] Webhook confirmation key
 */
export const defaultOptions = {
	token: null,
	lang: null,

	login: null,
	phone: null,
	password: null,

	app: null,
	key: null,
	scope: 'all',

	agent: null,

	apiMode: 'sequential',
	apiWait: 3e3,
	apiLimit: 3,
	apiAttempts: 3,
	apiTimeout: 6e3,
	apiHeaders: {
		'User-Agent': `vk-io/${version} (+https://github.com/negezor/vk-io)`
	},
	apiExecuteCount: 25,

	uploadTimeout: 15e3,

	longpollWait: 3e3,
	longpollAttempts: 3,

	webhookPath: '/',
	webhookSecret: null,
	webhookConfirmation: null
};

export const defaultExtensions = {
	photo: 'jpg',
	video: 'mp4',
	audio: 'mp3',
	voice: 'ogg',
	graffiti: 'png'
};

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
export const STANDALONE_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
+ ' AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36';

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
