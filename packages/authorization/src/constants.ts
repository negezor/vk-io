/**
 * Blank html redirect
 */
export const CALLBACK_BLANK = 'https://oauth.vk.ru/blank.html';

/**
 * User-Agent for standalone auth
 */
export const DESKTOP_USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.89 Safari/537.36';

/**
 * Auth error codes
 */
export enum AuthErrorCode {
    PAGE_BLOCKED = 'PAGE_BLOCKED',
    INVALID_PHONE_NUMBER = 'INVALID_PHONE_NUMBER',
    AUTHORIZATION_FAILED = 'AUTHORIZATION_FAILED',
    FAILED_PASSED_CAPTCHA = 'FAILED_PASSED_CAPTCHA',
    FAILED_PASSED_TWO_FACTOR = 'FAILED_PASSED_TWO_FACTOR',
    USERNAME_OR_PASSWORD_IS_INCORRECT = 'USERNAME_OR_PASSWORD_IS_INCORRECT',
    TOO_MUCH_TRIES = 'TOO_MUCH_TRIES',
    WRONG_OTP = 'WRONG_OTP',
    OTP_FORMAT_IS_INCORRECT = 'OTP_FORMAT_IS_INCORRECT',
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
    ['market', 134217728],
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
    ['manage', 262144],
]);

export const officialAppCredentials = {
    android: {
        clientId: '2274003',
        clientSecret: 'hHbZxrka2uZ6jB1inYsH',
        headers: {
            'User-Agent': 'VKAndroidApp/7.7-10445 (Android 11; SDK 30; arm64-v8a; Xiaomi M2003J15SC; ru; 2340x1080)',
        },
    },
    windows: {
        clientId: '3697615',
        clientSecret: 'AlVXZFMUqyrnABp8ncuU',
    },
    windowsPhone: {
        clientId: '3502557',
        clientSecret: 'PEObAuQi6KloPM4T30DV',
    },
    iphone: {
        clientId: '3140623',
        clientSecret: 'VeWdmVclDCtn6ihuP1nt',
    },
    ipad: {
        clientId: '3682744',
        clientSecret: 'mY6CDUswIVdJLCD3j15n',
    },
    vkMe: {
        clientId: '6146827',
        clientSecret: 'qVxWRF1CwHERuIrKBnqe',
    },
};
