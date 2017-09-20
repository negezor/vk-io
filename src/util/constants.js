'use strict';

import { version } from '../../package';

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
const CHAT_PEER = 2e9;

/**
 * API error codes
 *
 * @type {Object}
 */
export const API_ERRORS = {
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
export const UPDATES_ERRORS = {
	NEED_RESTART: 'NEED_RESTART'
};
