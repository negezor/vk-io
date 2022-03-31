// @ts-ignore
/**
// @ts-ignore
 * Blank html redirect
// @ts-ignore
 */
// @ts-ignore
export const CALLBACK_BLANK = 'https://oauth.vk.com/blank.html';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * User-Agent for standalone auth
// @ts-ignore
 */
// @ts-ignore
export const DESKTOP_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Auth error codes
// @ts-ignore
 */
// @ts-ignore
export enum AuthErrorCode {
// @ts-ignore
	PAGE_BLOCKED = 'PAGE_BLOCKED',
// @ts-ignore
	INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER',
// @ts-ignore
	AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
// @ts-ignore
	FAILED_PASSED_CAPTCHA = 'FAILED_PASSED_CAPTCHA',
// @ts-ignore
	FAILED_PASSED_TWO_FACTOR = 'FAILED_PASSED_TWO_FACTOR',
// @ts-ignore
	USERNAME_OR_PASSWORD_IS_INCORRECT = 'USERNAME_OR_PASSWORD_IS_INCORRECT',
// @ts-ignore
	TOO_MUCH_TRIES = 'TOO_MUCH_TRIES',
// @ts-ignore
	WRONG_OTP = 'WRONG_OTP',
// @ts-ignore
	OTP_FORMAT_IS_INCORRECT = 'OTP_FORMAT_IS_INCORRECT'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * List of user permissions and their bit mask
// @ts-ignore
 */
// @ts-ignore
export const userScopes = new Map<string, number>([
// @ts-ignore
	['notify', 1],
// @ts-ignore
	['friends', 2],
// @ts-ignore
	['photos', 4],
// @ts-ignore
	['audio', 8],
// @ts-ignore
	['video', 16],
// @ts-ignore
	['pages', 128],
// @ts-ignore
	['link', 256],
// @ts-ignore
	['status', 1024],
// @ts-ignore
	['notes', 2048],
// @ts-ignore
	['messages', 4096],
// @ts-ignore
	['wall', 8192],
// @ts-ignore
	['ads', 32768],
// @ts-ignore
	['offline', 65536],
// @ts-ignore
	['docs', 131072],
// @ts-ignore
	['groups', 262144],
// @ts-ignore
	['notifications', 524288],
// @ts-ignore
	['stats', 1048576],
// @ts-ignore
	['email', 4194304],
// @ts-ignore
	['market', 134217728]
// @ts-ignore
]);
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * List of group permissions and their bit mask
// @ts-ignore
 */
// @ts-ignore
export const groupScopes = new Map<string, number>([
// @ts-ignore
	['stories', 1],
// @ts-ignore
	['photos', 4],
// @ts-ignore
	// ['app_widget', 64],
// @ts-ignore
	['messages', 4096],
// @ts-ignore
	['docs', 131072],
// @ts-ignore
	['manage', 262144]
// @ts-ignore
]);
// @ts-ignore

// @ts-ignore
export const officialAppCredentials = {
// @ts-ignore
	android: {
// @ts-ignore
		clientId: '2274003',
// @ts-ignore
		clientSecret: 'hHbZxrka2uZ6jB1inYsH'
// @ts-ignore
	},
// @ts-ignore
	windows: {
// @ts-ignore
		clientId: '3697615',
// @ts-ignore
		clientSecret: 'AlVXZFMUqyrnABp8ncuU'
// @ts-ignore
	},
// @ts-ignore
	windowsPhone: {
// @ts-ignore
		clientId: '3502557',
// @ts-ignore
		clientSecret: 'PEObAuQi6KloPM4T30DV'
// @ts-ignore
	},
// @ts-ignore
	iphone: {
// @ts-ignore
		clientId: '3140623',
// @ts-ignore
		clientSecret: 'VeWdmVclDCtn6ihuP1nt'
// @ts-ignore
	},
// @ts-ignore
	ipad: {
// @ts-ignore
		clientId: '3682744',
// @ts-ignore
		clientSecret: 'mY6CDUswIVdJLCD3j15n'
// @ts-ignore
	},
// @ts-ignore
	vkMe: {
// @ts-ignore
		clientId: '6146827',
// @ts-ignore
		clientSecret: 'qVxWRF1CwHERuIrKBnqe'
// @ts-ignore
	}
// @ts-ignore
};
