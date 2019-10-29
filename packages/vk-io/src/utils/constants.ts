import { IVKOptions } from '../types';

// @ts-ignore
import { version } from '../../package.json';

/**
 * Chat peer ID
 */
export const CHAT_PEER = 2e9;

/**
 * Blank html redirect
 */
export const CALLBACK_BLANK = 'https://oauth.vk.com/blank.html';

/**
 * User-Agent for standalone auth
 */
export const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36';

/**
 * Minimum time interval api with error
 */
export const MINIMUM_TIME_INTERVAL_API = 1133;

/**
 * Default options
 */
export const defaultOptions: IVKOptions = {
	// @ts-ignore
	agent: null,
	token: null,
	language: null,

	appId: null,
	appSecret: null,

	login: null,
	phone: null,
	password: null,

	authScope: null,
	authTimeout: 10e3,

	apiMode: 'sequential',
	apiWait: 3e3,
	apiLimit: 3,
	apiVersion: '5.103',
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

	webhookSecret: null,
	webhookConfirmation: null,

	collectAttempts: 3
};

/**
 * The attachment types
 */
export enum AttachmentType {
	AUDIO = 'audio',
	AUDIO_MESSAGE = 'audio_message',
	GRAFFITI = 'graffiti',
	DOCUMENT = 'doc',
	GIFT = 'gift',
	LINK = 'link',
	MARKET_ALBUM = 'market_album',
	MARKET = 'market',
	PHOTO = 'photo',
	STICKER = 'sticker',
	VIDEO = 'video',
	WALL_REPLY = 'wall_reply',
	WALL = 'wall',
	POLL = 'poll',
	STORY = 'story'
}

export const attachmentTypes = AttachmentType;

/**
 * Default extensions for attachments
 */
export enum DefaultExtension {
	photo = 'jpg',
	video = 'mp4',
	audio = 'mp3',
	graffiti = 'png',
	audioMessage = 'ogg'
}

export const defaultExtensions = DefaultExtension;

/**
 * Default content type for attachments
 */
export enum DefaultContentType {
	photo = 'image/jpeg',
	video = 'video/mp4',
	audio = 'audio/mp3',
	graffiti = 'image/png',
	audioMessage = 'audio/ogg'
}

export const defaultContentTypes = DefaultContentType;

/**
 * Sources of captcha
 */
export enum CaptchaType {
	'API',
	'DIRECT_AUTH',
	'IMPLICIT_FLOW_AUTH',
	'ACCOUNT_VERIFICATION'
}

export const captchaTypes = CaptchaType;

/**
 * Message source
 */
export enum MessageSource {
	USER = 'user',
	CHAT = 'chat',
	GROUP = 'group',
	EMAIL = 'email'
}

export const messageSources = MessageSource;

/**
 * Resource types
 */
export enum ResourceType {
	USER = 'user',
	GROUP = 'group',
	APPLICATION = 'application'
}

export const resourceTypes = ResourceType;

/**
 * Updates sources
 */
export enum UpdateSource {
	POLLING = 'POLLING',
	WEBHOOK = 'WEBHOOK'
}

export const updatesSources = UpdateSource;

/**
 * API error codes
 */
export enum APIErrorCode {
	UNKNOWN_ERROR = 1,
	APP_SWITCHED_OFF = 2,
	UNKNOWN_METHOD = 3,
	INVALID_SIGNATURE = 4,
	AUTH_FAILURE = 5,
	TOO_MANY_REQUESTS = 6,
	SCOPE_NEEDED = 7,
	INCORRECT_REQUEST = 8,
	TOO_MANY_SIMILAR_ACTIONS = 9,
	INTERNAL_ERROR = 10,
	RESPONSE_SIZE_TOO_BIG = 13,
	CAPTCHA_REQUIRED = 14,
	ACCESS_DENIED = 15,
	USER_VALIDATION_REQUIRED = 17,
	PAGE_BLOCKED = 18,
	STANDALONE_ONLY = 20,
	STANDALONE_AND_OPEN_API_ONLY = 21,
	METHOD_DISABLED = 23,
	CONFIRMATION_REQUIRED = 24,
	GROUP_TOKEN_NOT_VALID = 27,
	APP_TOKEN_NOT_VALID = 28,
	METHOD_CALL_LIMIT = 29,
	PROFILE_IS_PRIVATE = 30,
	WRONG_PARAMETER = 100,
	INVALID_APPLICATION_ID = 101,
	LIMIT_ENTRY_EXHAUSTED = 103,
	INCORRECT_USER_ID = 113,
	INVALID_TIMESTAMP = 150,
	ALBUM_ACCESS_DENIED = 200,
	AUDIO_ACCESS_DENIED = 201,
	GROUP_ACCESS_DENIED = 203,
	ALBUM_OVERFLOW = 300,
	PAYMENTS_DISABLED = 500,
	COMMERCIAL_ACCESS_DENIED = 600,
	COMMERCIAL_ERROR = 603,
	BLACKLISTED_USER = 900,
	MESSAGE_COMMUNITY_BLOCKED_BY_USER = 901,
	MESSAGE_BLOCKED_BY_USER_PRIVACY = 902,
	UNABLE_TO_EDIT_MESSAGE_AFTER_DAY = 909,
	MESSAGE_CANNOT_EDIT_IS_TOO_LONG = 910,
	KEYBOARD_FORMAT_IS_INVALID = 911,
	CHAT_BOT_FEATURE = 912,
	TOO_MANY_FORWARDED_MESSAGES = 913,
	MESSAGE_TOO_LONG = 914,
	NO_ACCESS_TO_CONVERSATION = 917,
	CANNOT_EDIT_THIS_TYPE_MESSAGE = 920,
	UNABLE_TO_FORWARD_MESSAGES = 921,
	UNABLE_TO_DELETE_MESSAGE_FOR_RECIPIENTS = 924,
	NOT_ADMIN_CHAT = 925,
	COMMUNITY_CANNOT_INTERACT_WITH_THIS_PEER = 932,
	CONTACT_NOT_FOUND = 936
}

export const apiErrors = APIErrorCode;

/**
 * Auth error codes
 */
export enum AuthErrorCode {
	PAGE_BLOCKED = 'PAGE_BLOCKED',
	INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER',
	AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
	FAILED_PASSED_CAPTCHA = 'FAILED_PASSED_CAPTCHA',
	FAILED_PASSED_TWO_FACTOR = 'FAILED_PASSED_TWO_FACTOR'
}

export const authErrors = AuthErrorCode;

/**
 * Upload error codes
 */
export enum UploadErrorCode {
	MISSING_PARAMETERS = 'MISSING_PARAMETERS',
	NO_FILES_TO_UPLOAD = 'NO_FILES_TO_UPLOAD',
	EXCEEDED_MAX_FILES = 'EXCEEDED_MAX_FILES',
	UNSUPPORTED_SOURCE_TYPE = 'UNSUPPORTED_SOURCE_TYPE'
}

export const uploadErrors = UploadErrorCode;

/**
 * Updates error codes
 */
export enum UpdatesErrorCode {
	NEED_RESTART = 'NEED_RESTART',
	POLLING_REQUEST_FAILED = 'POLLING_REQUEST_FAILED'
}

export const updatesErrors = UpdatesErrorCode;

/**
 * Collect error codes
 */
export enum CollectErrorCode {
	EXECUTE_ERROR = 'EXECUTE_ERROR'
}

export const collectErrors = CollectErrorCode;

/**
 * Snippets error codes
 */
export enum SnippetErrorCode {
	INVALID_URL = 'INVALID_URL',
	INVALID_RESOURCE = 'INVALID_RESOURCE',
	RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND'
}

export const snippetsErrors = SnippetErrorCode;

/**
 * Snippets error codes
 */
export enum SharedErrorCode {
	MISSING_CAPTCHA_HANDLER = 'MISSING_CAPTCHA_HANDLER',
	MISSING_TWO_FACTOR_HANDLER = 'MISSING_TWO_FACTOR_HANDLER'
}

export const sharedErrors = SharedErrorCode;

/**
 * List of user permissions and their bit mask
 */
export const userScopes = new Map<string, number>([
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
 */
export const groupScopes = new Map<string, number>([
	['stories', 1],
	['photos', 4],
	// ['app_widget', 64],
	['messages', 4096],
	['docs', 131072],
	['manage', 262144]
]);

/**
 * VK Platforms
 */
export const platforms = new Map<number, string>([
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
 */
export const parseAttachment = /(photo|video|audio|doc|audio_message|graffiti|wall|market|poll|gift)([-\d]+)_(\d+)_?(\w+)?/;

/**
 * Parse resource with RegExp
 */
export const parseResource = /(id|club|public|albums|tag|app(?:lication))([-\d]+)/;

/**
 * Parse owner resource with RegExp
 */
export const parseOwnerResource = /(album|topic|wall|page|videos)([-\d]+)_(\d+)/;

/**
 * Inspect custom data
 */
export const inspectCustomData = Symbol('inspectCustomData');
