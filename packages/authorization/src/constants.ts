/**
 * Blank html redirect
 */
export const CALLBACK_BLANK = 'https://oauth.vk.com/blank.html';

/**
 * User-Agent for standalone auth
 */
export const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36';

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
