// @ts-ignore
/**
// @ts-ignore
 * Chat peer ID
// @ts-ignore
 */
// @ts-ignore
export const PEER_CHAT_ID_OFFSET = 2e9;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Minimum time interval api with error
// @ts-ignore
 */
// @ts-ignore
export const MINIMUM_TIME_INTERVAL_API = 1133;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * The attachment types
// @ts-ignore
 */
// @ts-ignore
export enum AttachmentType {
// @ts-ignore
	ALBUM = 'album',
// @ts-ignore
	AUDIO = 'audio',
// @ts-ignore
	AUDIO_MESSAGE = 'audio_message',
// @ts-ignore
	GRAFFITI = 'graffiti',
// @ts-ignore
	DOCUMENT = 'doc',
// @ts-ignore
	GIFT = 'gift',
// @ts-ignore
	LINK = 'link',
// @ts-ignore
	MARKET_ALBUM = 'market_album',
// @ts-ignore
	MARKET = 'market',
// @ts-ignore
	PHOTO = 'photo',
// @ts-ignore
	STICKER = 'sticker',
// @ts-ignore
	VIDEO = 'video',
// @ts-ignore
	WALL_REPLY = 'wall_reply',
// @ts-ignore
	WALL = 'wall',
// @ts-ignore
	POLL = 'poll',
// @ts-ignore
	STORY = 'story'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AttachmentTypeString =
// @ts-ignore
'album'
// @ts-ignore
| 'audio'
// @ts-ignore
| 'audio_message'
// @ts-ignore
| 'graffiti'
// @ts-ignore
| 'doc'
// @ts-ignore
| 'market_album'
// @ts-ignore
| 'market'
// @ts-ignore
| 'photo'
// @ts-ignore
| 'story'
// @ts-ignore
| 'video'
// @ts-ignore
| 'wall'
// @ts-ignore
| 'poll'
// @ts-ignore
| 'gift'
// @ts-ignore
| 'link'
// @ts-ignore
| 'sticker'
// @ts-ignore
| 'wall_reply';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Default extensions for attachments
// @ts-ignore
 */
// @ts-ignore
export enum DefaultExtension {
// @ts-ignore
	photo = 'jpg',
// @ts-ignore
	video = 'mp4',
// @ts-ignore
	audio = 'mp3',
// @ts-ignore
	graffiti = 'png',
// @ts-ignore
	audioMessage = 'ogg'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Default content type for attachments
// @ts-ignore
 */
// @ts-ignore
export enum DefaultContentType {
// @ts-ignore
	photo = 'image/jpeg',
// @ts-ignore
	video = 'video/mp4',
// @ts-ignore
	audio = 'audio/mp3',
// @ts-ignore
	graffiti = 'image/png',
// @ts-ignore
	audioMessage = 'audio/ogg'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Sources of captcha
// @ts-ignore
 */
// @ts-ignore
export enum CaptchaType {
// @ts-ignore
	API = 'API',
// @ts-ignore
	DIRECT_AUTH = 'DIRECT_AUTH',
// @ts-ignore
	IMPLICIT_FLOW_AUTH = 'IMPLICIT_FLOW_AUTH',
// @ts-ignore
	ACCOUNT_VERIFICATION = 'ACCOUNT_VERIFICATION'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Message source
// @ts-ignore
 */
// @ts-ignore
export enum MessageSource {
// @ts-ignore
	USER = 'user',
// @ts-ignore
	CHAT = 'chat',
// @ts-ignore
	GROUP = 'group',
// @ts-ignore
	EMAIL = 'email'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Resource types
// @ts-ignore
 */
// @ts-ignore
export enum ResourceType {
// @ts-ignore
	USER = 'user',
// @ts-ignore
	GROUP = 'group',
// @ts-ignore
	APPLICATION = 'application'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Updates sources
// @ts-ignore
 */
// @ts-ignore
export enum UpdateSource {
// @ts-ignore
	POLLING = 'POLLING',
// @ts-ignore
	WEBHOOK = 'WEBHOOK',
// @ts-ignore
	WEBSOCKET = 'WEBSOCKET'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Upload error codes
// @ts-ignore
 */
// @ts-ignore
export enum UploadErrorCode {
// @ts-ignore
	MISSING_PARAMETERS = 'MISSING_PARAMETERS',
// @ts-ignore
	NO_FILES_TO_UPLOAD = 'NO_FILES_TO_UPLOAD',
// @ts-ignore
	EXCEEDED_MAX_FILES = 'EXCEEDED_MAX_FILES',
// @ts-ignore
	UNSUPPORTED_SOURCE_TYPE = 'UNSUPPORTED_SOURCE_TYPE'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Updates error codes
// @ts-ignore
 */
// @ts-ignore
export enum UpdatesErrorCode {
// @ts-ignore
	NEED_RESTART = 'NEED_RESTART',
// @ts-ignore
	POLLING_REQUEST_FAILED = 'POLLING_REQUEST_FAILED'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Collect error codes
// @ts-ignore
 */
// @ts-ignore
export enum CollectErrorCode {
// @ts-ignore
	EXECUTE_ERROR = 'EXECUTE_ERROR'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Snippets error codes
// @ts-ignore
 */
// @ts-ignore
export enum ResourceErrorCode {
// @ts-ignore
	INVALID_URL = 'INVALID_URL',
// @ts-ignore
	INVALID_RESOURCE = 'INVALID_RESOURCE',
// @ts-ignore
	RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Snippets error codes
// @ts-ignore
 */
// @ts-ignore
export enum SharedErrorCode {
// @ts-ignore
	MISSING_CAPTCHA_HANDLER = 'MISSING_CAPTCHA_HANDLER',
// @ts-ignore
	MISSING_TWO_FACTOR_HANDLER = 'MISSING_TWO_FACTOR_HANDLER'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Symbol of data definition for serialization
// @ts-ignore
 */
// @ts-ignore
export const kSerializeData = Symbol('serializeData');
