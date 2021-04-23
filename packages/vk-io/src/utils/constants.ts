/**
 * Chat peer ID
 */
export const PEER_CHAT_ID_OFFSET = 2e9;

/**
 * Minimum time interval api with error
 */
export const MINIMUM_TIME_INTERVAL_API = 1133;

/**
 * The attachment types
 */
export enum AttachmentType {
	ALBUM = 'album',
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

export type AttachmentTypeString =
'album'
| 'audio'
| 'audio_message'
| 'graffiti'
| 'doc'
| 'market_album'
| 'market'
| 'photo'
| 'story'
| 'video'
| 'wall'
| 'poll'
| 'gift'
| 'link'
| 'sticker'
| 'wall_reply';

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

/**
 * Sources of captcha
 */
export enum CaptchaType {
	API = 'API',
	DIRECT_AUTH = 'DIRECT_AUTH',
	IMPLICIT_FLOW_AUTH = 'IMPLICIT_FLOW_AUTH',
	ACCOUNT_VERIFICATION = 'ACCOUNT_VERIFICATION'
}

/**
 * Message source
 */
export enum MessageSource {
	USER = 'user',
	CHAT = 'chat',
	GROUP = 'group',
	EMAIL = 'email'
}

/**
 * Resource types
 */
export enum ResourceType {
	USER = 'user',
	GROUP = 'group',
	APPLICATION = 'application'
}

/**
 * Updates sources
 */
export enum UpdateSource {
	POLLING = 'POLLING',
	WEBHOOK = 'WEBHOOK',
	WEBSOCKET = 'WEBSOCKET'
}

/**
 * Upload error codes
 */
export enum UploadErrorCode {
	MISSING_PARAMETERS = 'MISSING_PARAMETERS',
	NO_FILES_TO_UPLOAD = 'NO_FILES_TO_UPLOAD',
	EXCEEDED_MAX_FILES = 'EXCEEDED_MAX_FILES',
	UNSUPPORTED_SOURCE_TYPE = 'UNSUPPORTED_SOURCE_TYPE'
}

/**
 * Updates error codes
 */
export enum UpdatesErrorCode {
	NEED_RESTART = 'NEED_RESTART',
	POLLING_REQUEST_FAILED = 'POLLING_REQUEST_FAILED'
}

/**
 * Collect error codes
 */
export enum CollectErrorCode {
	EXECUTE_ERROR = 'EXECUTE_ERROR'
}

/**
 * Snippets error codes
 */
export enum ResourceErrorCode {
	INVALID_URL = 'INVALID_URL',
	INVALID_RESOURCE = 'INVALID_RESOURCE',
	RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND'
}

/**
 * Snippets error codes
 */
export enum SharedErrorCode {
	MISSING_CAPTCHA_HANDLER = 'MISSING_CAPTCHA_HANDLER',
	MISSING_TWO_FACTOR_HANDLER = 'MISSING_TWO_FACTOR_HANDLER'
}

/**
 * Symbol of data definition for serialization
 */
export const kSerializeData = Symbol('serializeData');
