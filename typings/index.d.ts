// Definitions by:
//  Ilya Sinkin (https://github.com/isinkin)

declare module 'vk-io' {
	import WebSocket from 'ws';
	import Cheerio from 'cheerio';
	import { Response } from 'node-fetch';
	import { CookieJar } from 'tough-cookie';

	import { URL } from 'url';
	import { Agent } from 'https';

	export interface VKOptions {
		/**
		 * Access token
		 */
		token?: string;

		/**
		 * HTTPS agent
		 */
		agent?: Agent;

		/**
		 * The return data language
		 */
		language?: 'ru' | 'uk' | 'be' | 'en' | 'es' | 'fi' | 'de' | 'it';

		/**
		 * Application ID
		 */
		appId?: number;

		/**
		 * Secret application key
		 */
		appSecret?: string;

		/**
		 * User login (phone number or email)
		 */
		login?: string;

		/**
		 * User phone number
		 */
		phone?: string;

		/**
		 * User password
		 */
		password?: string;

		/**
		 * List of permissions
		 */
		authScope?: string;

		/**
		 * Query mode (sequential|parallel|parallel_selected)
		 */
		apiMode?: 'sequential' | 'parallel' | 'parallel_selected';

		/**
		 * Time to wait before re-querying
		 */
		apiWait?: number;

		/**
		 * Requests per second
		 */
		apiLimit?: number;

		/**
		 * Base API URL
		 */
		apiBaseUrl?: string;

		/**
		 * Wait time for one request
		 */
		apiTimeout?: number;

		/**
		 * Headers sent to the API
		 */
		apiHeaders?: { [key: string]: string };

		/**
		 * The number of retries at calling
		 */
		apiAttempts?: number;

		/**
		 * Number of requests per execute
		 */
		apiExecuteCount?: number;

		/**
		 * 	Methods for call execute (apiMode=parallel_selected)
		 */
		apiExecuteMethods?: string[];

		/**
		 * Wait time for one request
		 */
		uploadTimeout?: number;

		/**
		 * Time to wait before re-querying
		 */
		pollingWait?: number;

		/**
		 * Group ID for polling
		 */
		pollingGroupId?: number;

		/**
		 * The number of retries at calling
		 */
		pollingAttempts?: number;

		/**
		 * Webhook path
		 */
		webhookPath?: string;

		/**
		 * Webhook secret key
		 */
		webhookSecret?: string;

		/**
		 * Webhook confirmation key
		 */
		webhookConfirmation?: string;

		/**
		 * The number of retries at calling
		 */
		collectAttempts?: number;
	}

	/**
	 * Main class
	 */
	export class VK {
		/**
		* Constructor
		*/
		constructor(options?: VKOptions);

		/**
		 * Access token
		 */
		public token: string;

		/**
		 * Captcha handler
		 */
		public captchaHandler?: Function;

		/**
		 * Two-factor handler
		 */
		public twoFactorHandler?: Function;

		/**
		 * Options
		 */
		public options: VKOptions;

		/**
		 * API
		 */
		public api: API;

		/**
		 * Auth
		 */
		public auth: Auth;

		/**
		 * Upload
		 */
		public upload: Upload;

		/**
		 * Collect
		 */
		public collect: Collect;

		/**
		 * Updates
		 */
		public updates: Updates;

		/**
		 * Snippets
		 */
		public snippets: Snippets;

		/**
		 * Streaming API
		 */
		public streaming: StreamingAPI;

		/**
		 * Callback service
		 */
		public callbackService: CallbackService;

		/**
		 * Sets options
		 */
		public setOptions(options: VKOptions): this;
	}

	export default VK;

	export class Request {
		public method: string;
		public params: Object;
		public attempts: number;
		public promise: Promise<void>;

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(method: string, params: Object);

		/**
		 * Adds attempt
		 */
		public addAttempt(): number;

		/**
		 * Returns string to execute
		 */
		public toString(): string;
	}

	/**
	 * Working with API methods
	 */
	class API extends Methods {
		/**
		 * Returns the current used API version
		 */
		public API_VERSION: number;

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(vk: VK);

		/**
		 * Call execute method
		 */
		public execute(params: Object): Promise<Object>;

		/**
		 * Call execute procedure
		 */
		public procedure(name: string, params: Object): Promise<Object>;

		/**
		 * Call raw method
		 */
		public call(method: string, params: Object): Promise<Object>;

		/**
		 * Adds request for queue
		 */
		public callWithRequest(request: Request): Promise<Object>;

		/**
		 * Adds method to queue
		 */
		public enqueue(method: string, params: Object): Promise<Object>;

		/**
		 * Adds an element to the beginning of the queue
		 */
		public requeue(request: Request): void;

		/**
		 * Running queue
		 */
		public worker(): void;

		/**
		 * Calls the api method
		 */
		public callMethod(request: Request): Promise<void>;

		/**
		 * Error API handler
		 */
		public handleError(request: Request, error: Object): Promise<void>;
	}

	export interface AccountMethods {
		/**
		 * Добавляет пользователя или группу в черный список.
		 */
		ban(params: {
		/**
		 * Идентификатор пользователя или сообщества, которое будет добавлено в черный список.
		 */
			owner_id: number;
		}): Promise<number>;
	}

	class Methods {
		/**
		 * Методы для работы с аккаунтом.
		 */
		public account: AccountMethods;
	}

	class Auth {
		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(vk: VK);

		/**
		 * Standalone authorization with login & password
		 */
		public implicitFlowUser(options: Object): ImplicitFlowUser;

		/**
		 * Standalone authorization with login & password for group
		 */
		public implicitFlowGroups(groups: number[], options: Object): ImplicitFlowGroups;

		/**
		 * Direct authorization with login & login in user application
		 */
		public direct(): DirectAuth;

		/**
		 * Direct authorization with login & login in android application
		 */
		public androidApp(): DirectAuth;

		/**
		 * Direct authorization with login & login in windows application
		 */
		public windowsApp(): DirectAuth;

		/**
		 * Direct authorization with login & login in windows phone application
		 */
		public windowsPhoneApp(): DirectAuth;

		/**
		 * Direct authorization with login & login in iphone application
		 */
		public iphoneApp(): DirectAuth;

		/**
		 * Direct authorization with login & login in ipad application
		 */
		public ipadApp(): DirectAuth;

		/**
		 * Verifies that the user is authorized through the Open API
		 */
		public userAuthorizedThroughOpenAPI(params: Object): Promise<Object>;
	}

	export interface DirectAuthOptions {
		appId?: number;
		appSecret?: number;

		login?: string;
		phone?: string;
		password?: string;

		agent?: Agent;
		scope?: string;
	}

	export interface DirectAuthRunResult {
		email: string;
		user: number;
		token: string;
		expires: number;
	}

	class DirectAuth {
		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(vk: VK, options: DirectAuthOptions);

		/**
		 * Executes the HTTP request
		 */
		public fetch(url: string, options: Object): Promise<Response>;

		/**
		 * Returns permission page
		 */
		public getPermissionsPage(query: Object): Promise<Response>;

		/**
		 * Runs authorization
		 */
		public run(): Promise<DirectAuthRunResult>;

		/**
		 * Process captcha
		 */
		public processCaptcha(payload: Object): Promise<Response>;

		/**
		 * Process two-factor
		 */
		public processTwoFactor(payload: Object): Promise<Response>;

		/**
		 * Process security form
		 */
		public processSecurityForm(response: Response, $: Cheerio): Promise<Response>;
	}

	class ImplicitFlow extends DirectAuth {
		/**
		 * CookieJar
		 */
		public cookieJar: CookieJar;

		/**
		 * Returns cookie
		 */
		public getCookies(): Promise<Object>;

		/**
		 * Runs authorization
		 */
		public run(): any;
	}

	export interface ImplicitFlowUserRunResult {
		email: string;
		user: number;
		token: string;
		expires: number;
	}

	class ImplicitFlowUser extends ImplicitFlow {
		/**
		 * Returns permission page
		 */
		public getPermissionsPage(): Promise<Response>;

		/**
		 * Starts authorization
		 */
		public run(): Promise<ImplicitFlowUserRunResult>;
	}

	export interface ImplicitFlowGroupRunResult {
		group: number;
		token: string;
		expires: number;
	}

	class ImplicitFlowGroup extends ImplicitFlow {
		/**
		 * Returns cookie
		 */
		public getPermissionsPage(): Promise<Response>;

		/**
		 * Executes the HTTP request
		 */
		public run(): Promise<ImplicitFlowGroupRunResult[]>;
	}

	class Upload {
		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(vk: VK);

		/**
		 * Uploading photos to an album
		 */
		public photoAlbum(params: Object): Promise<PhotoAttachment[]>;

		/**
		 * Uploading photos to the wall
		 */
		public wallPhoto(params: Object): Promise<PhotoAttachment>;

		/**
		 * Uploading the main photo of a user or community
		 */
		public ownerPhoto(params: Object): Promise<Object>;

		/**
		 * Uploading a photo to a 		 */
		public messagePhoto(params: Object): Promise<PhotoAttachment>;

		/**
		 * Uploading the main photo for a chat
		 */
		public chatPhoto(params: Object): Promise<Object>;

		/**
		 * Uploading a photo for a product
		 */
		public marketPhoto(params: Object): Promise<PhotoAttachment>;

		/**
		 * Uploads a photo for the selection of goods
		 */
		public marketAlbumPhoto(params: Object): Promise<PhotoAttachment>;

		/**
		 * Uploads audio
		 */
		public audio(params: Object): Promise<AudioAttachment>;

		/**
		 * Uploads video
		 */
		public video(params: Object): Promise<VideoAttachment>;

		/**
		 * Uploads document
		 */
		public conductDocument(params: Object, options: Object): Promise<Object>;

		/**
		 * Uploads document
		 */
		public document(params: Object, options: Object): Promise<DocumentAttachment>;

		/**
		 * Uploads wall document
		 */
		public conductWallDocument(params: Object, options: Object): Promise<Object>;

		/**
		 * Uploads wall document
		 */
		public wallDocument(params: Object, options: Object): Promise<DocumentAttachment>;

		/**
		 * Uploads wall document
		 */
		public conductMessageDocument(params: Object, options: Object): Promise<Object>;

		/**
		 * Uploads message document
		 */
		public messageDocument(params: Object, options: Object): Promise<DocumentAttachment>;

		/**
		 * Uploads audio message
		 */
		public audioMessage(params: Object): Promise<AudioMessageAttachment>;

		/**
		 * Uploads graffiti
		 */
		public graffiti(params: Object): Promise<GraffitiAttachment>;

		/**
		 * Uploads community cover
		 */
		public groupCover(params: Object): Promise<Object>;

		/**
		 * Uploads photo stories
		 */
		public storiesPhoto(params: Object): Promise<Object>;

		/**
		 * Uploads video stories
		 */
		public storiesVideo(params: Object): Promise<Object>;

		/**
		 * Uploads poll photo
		 */
		public pollPhoto(params: Object): Promise<Object>;

		/**
		 * Behavior for the upload method
		 */
		public conduct(params: Object): Promise<Object>;

		/**
		 * Building form data
		 */
		public buildPayload(params: Object): Promise<Object>;

		/**
		 * Upload form data
		 */
		public upload(url: URL | string): Promise<Object>;
	}

	class Collect extends Methods {
		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * constructor
		 */
		public constructor(vk: VK);

		/**
		 * Returns new Chain instance
		 */
		public chain(): Chain;

		/**
		 * Call multiple executors
		 */
		public executes(method: string, queue: Request[]): Promise<Object>;
	}

	class Chain {
		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(vk: VK);

		/**
		 * Adds method to queue
		 */
		public append(method: string, params: Object): Promise<Object>;

		/**
		 * Promise based
		 */
		public then(thenFn: Function, catchFn: Function): Promise<Object[]>;

		/**
		 * Starts the chain
		 */
		public run(): Promise<any[]>;
	}

	type nextFunction = () => Promise<any>;
	type DefaultHandler<T> = (ctx: Object & T, next: nextFunction) => any;

	class Updates {
		/**
		 * Constructor
		 */
		constructor(vk: VK);

		/**
		 * Checks is started
		 */
		public readonly isStarted: boolean;

		/**
		 * Added middleware
		 */
		public use<T>(middleware: DefaultHandler<T>): this;

		/**
		 * Subscribe to events
		 */
		public on<T>(events: 'message' | 'new_message' | 'edit_message', handler: (ctx: MessageContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'message_subscribers' | 'message_subscribe' | 'message_unsubscribe', handler: (ctx: MessageAllowContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'new_attachment' | 'new_photo_attachment' | 'new_video_attachment' | 'new_audio_attachment', handler: (ctx: NewAttachmentsContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'wall_post' | 'new_wall_post' | 'new_wall_repost', handler: (ctx: WallPostContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'group_member' | 'join_group_member' | 'leave_group_member', handler: (ctx: GroupMemberContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'group_user' | 'block_group_user' | 'unblock_group_user', handler: (ctx: GroupUserContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'comment' | 'photo_comment' | 'video_comment' | 'wall_comment' | 'board_comment' | 'market_comment' | 'new_photo_comment' | 'edit_photo_comment' | 'delete_photo_comment' | 'restore_photo_comment' | 'new_video_comment' | 'edit_video_comment' | 'delete_video_comment' | 'restore_video_comment' | 'new_wall_comment' | 'edit_wall_comment' | 'delete_wall_comment' | 'restore_wall_comment' | 'new_board_comment' | 'edit_board_comment' | 'delete_board_comment' | 'restore_board_comment' | 'new_market_comment' | 'edit_market_comment' | 'delete_market_comment' | 'restore_market_comment', handler: (ctx: CommentActionContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'vote' | 'pull_vote', handler: (ctx: VoteContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'group_update' | 'group_update_photo' | 'group_update_officers' | 'group_update_settings', handler: (ctx: GroupUpdateContext & T, next: nextFunction) => any): this;
		public on<T>(events: 'typing' | 'typing_user' | 'typing_group', handler: (ctx: TypingContext & T, next: nextFunction) => any): this;
		public on<T>(events: string | string[], handler: DefaultHandler<T>): this;

		/**
		 * Listen text
		 */
		public hear<T>(conditions: any, handler: (ctx: MessageContext & T, next: nextFunction) => any): this;

		/**
		 * A handler that is called when handlers are not found
		 */
		public setHearFallbackHandler(handler: Function): this;

		/**
		 * Handles longpoll event
		 */
		public handlePollingUpdate(update: any[]): Promise<void>;

		/**
		 * Handles webhook event
		 */
		public handleWebhookUpdate(update: Object): Promise<void>;

		/**
		 * Starts to poll server
		 */
		public startPolling(): Promise<void>;

		/**
		 * Starts the webhook server
		 */
		public startWebhook(options: Object, next: Number): Promise<void>;

		/**
		 * Stopping gets updates
		 */
		public stop(): Promise<void>;

		/**
		 * Returns webhook callback like http/https or express
		 */
		public getWebhookCallback(path: string): Function;

		/**
		 * Returns the middleware for the webhook under koa
		 */
		public getKoaWebhookMiddleware(): Promise<void>;

		/**
		 * Starts forever fetch updates	loop
		 */
		public startFetchLoop(): Promise<void>;

		/**
		 * Gets updates
		 */
		public fetchUpdates(): Promise<void>;

		/**
		 * Calls up the middleware chain
		 */
		public dispatchMiddleware(context: Context): Promise<void>;

		/**
		 * Reloads middleware
		 */
		public reloadMiddleware(): void;
	}

	class Snippets {
		public resourceResolver: ResourceResolver;

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(vk: VK);

		/**
		 * Defines the type of object (user, community, application, attachment)
		 */
		public resolveResource(resource: any): Promise<Object>;
	}

	class ResourceResolver {
		/**
		 * Constructor
		 */
		public constructor(vk: VK);

		/**
		 * Resolve resource
		 */
		public resolve(resource: any): Promise<Object>;

		/**
		 * Resolve number
		 */
		public resolveNumber(resource: string): Promise<Object>;

		/**
		 * Resolve resource mention
		 */
		public resolveMention(resource: string): Promise<Object>;

		/**
		 * Resolve resource url
		 */
		public resolveUrl(resourceUrl: string): Promise<Object>;

		/**
		 * Resolve screen name
		 */
		public resolveScreenName(resource: string): Promise<Object>;
	}

	class StreamingAPI {
		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Starts websocket
		 */
		public startWebSocket(): Promise<void>;

		/**
		 * Stop all connection
		 */
		public stop(): Promise<void>;

		/**
		 * Processes server messages
		 */
		public handleServiceMessage(options: Object): Promise<void>;

		/**
		 * Handles events
		 */
		public handleEvent(event: Object): Promise<any>;

		/**
		 * Executes the HTTP request for rules
		 */
		public fetchRules(method: string, options: Object): Promise<Object>;

		/**
		 * Returns a list of rules
		 */
		public getRules(): Promise<Object[]>;

		/**
		 * Adds a rule
		 */
		public addRule(rule: Object): Promise<Object>;

		/**
		 * Removes the rule
		 */
		public deleteRule(tag: string): Promise<Object>;

		/**
		 * Adds a list of rules
		 */
		public addRules(rules: Object[]): Promise<Object[]>;

		/**
		 * Removes all rules
		 */
		public deleteRules(): Promise<Object>;
	}

	export class Attachment {
		public type: string;
		public ownerId: number;
		public id: number;
		public accessKey: string | null;

		/**
		 * Returns whether the attachment is filled
		 */
		public readonly isFilled: boolean;

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(type: string, ownerId: number, id: number, accessKey?: string);

		/**
		 * Parse attachment with string
		 */
		public static fromString(): Attachment;

		/**
		 * Checks that the attachment is equivalent with object
		 */
		public equals(attachment: Attachment): boolean;

		/**
		 * Returns a string to attach a VK
		 */
		public toString(): string;

		/**
		 * Returns data for JSON
		 */
		public toJSON(): Object;
	}

	export class ExternalAttachment {
		public type: string;

		/**
		 * Returns whether the attachment is filled
		 */
		public readonly isFilled: boolean;

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(type: string, payload: Object);

		/**
		 * Returns data for JSON
		 */
		public toJSON(): Object;
	}

	export class AudioMessageAttachment extends Attachment {
		/**
		 * Returns the duration of the audio message
		 */
		public readonly duration?: number;

		/**
		 * Returns the waveform of the audio message
		 */
		public readonly waveform?: number[];

		/**
		 * Returns the ogg URL of the audio message
		 */
		public readonly oggUrl?: string;

		/**
		 * Returns the mp3 URL of the audio message
		 */
		public readonly mp3Url?: string;

		/**
		 * Returns the URL of the audio message
		 */
		public readonly url?: string;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;
	}

	export class AudioAttachment extends Attachment {
		/**
		 * Checks whether audio is in high quality
		 */
		public readonly isHq?: boolean;

		/**
		 * Returns the ID of the lyric
		 */
		public readonly lyricsId?: number;

		/**
		 * Returns the ID of the album
		 */
		public readonly albumId?: number;

		/**
		 * Returns the ID of the genre
		 */
		public readonly genreId?: number;

		/**
		 * Returns the title
		 */
		public readonly title?: string;

		/**
		 * Returns the artist
		 */
		public readonly artist?: string;

		/**
		 * Returns the duration
		 */
		public readonly duration?: number;

		/**
		 * Returns the date object when this audio was created
		 */
		public readonly createdAt?: number;

		/**
		 * Returns the URL of the audio
		 */
		public readonly url?: string;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;
	}

	export class DocumentAttachment extends Attachment {
		/**
		 * Checks if the document is a text
		 */
		public readonly isText?: boolean;

		/**
		 * Checks if the document is a archive
		 */
		public readonly isArchive?: boolean;

		/**
		 * Checks if the document is a gif file
		 */
		public readonly isGif?: boolean;

		/**
		 * Checks if the document is a image
		 */
		public readonly isImage?: boolean;

		/**
		 * Checks if the document is a graffiti
		 */
		public readonly isGraffiti?: boolean;

		/**
		 * Checks if the document is a audio
		 */
		public readonly isAudio?: boolean;

		/**
		 * Checks if the document is a voice
		 */
		public readonly isVoice?: boolean;

		/**
		 * Checks if the document is a video
		 */
		public readonly isVideo?: boolean;

		/**
		 * Checks if the document is a book
		 */
		public readonly isBook?: boolean;

		/**
		 * Returns the document title
		 */
		public readonly title?: string;

		/**
		 * Returns the date when this document was created
		 */
		public readonly createdAt?: number;

		/**
		 * Returns the type identifier (1~8)
		 */
		public readonly typeId?: number;

		/**
		 * Returns the type name
		 */
		public readonly typeName?: string;

		/**
		 * Returns the size in bytes
		 */
		public readonly size?: number;

		/**
		 * Returns the extension
		 */
		public readonly extension?: string;

		/**
		 * Returns the URL of the document
		 */
		public readonly url?: string;

		/**
		 * Returns the info to preview
		 */
		public readonly preview?: Object;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;

		/**
		 * Checks for a property in preview
		 */
		public hasPreviewProperty(name: string): boolean;
	}

	export class GiftAttachment extends ExternalAttachment {
		/**
		 * Returns the identifier gift
		 */
		public readonly id: number;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);
	}

	export class GraffitiAttachment extends Attachment {
		/**
		 * Returns the graffiti height
		 */
		public readonly height?: number;

		/**
		 * Returns the graffiti width
		 */
		public readonly width?: number;

		/**
		 * Returns the URL of the document
		 */
		public readonly url?: string;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;
	}

	export class LinkAttachment extends ExternalAttachment {
		/**
		 * Checks for the presence of a photo in a link
		 */
		public readonly hasPhoto: boolean;

		/**
		 * Returns the title
		 */
		public readonly title: string;

		/**
		 * Returns the title
		 */
		public readonly caption?: string;

		/**
		 * Returns the description
		 */
		public readonly description?: string;

		/**
		 * Returns the URL of the link
		 */
		public readonly url: string;

		/**
		 * Returns the product
		 */
		public readonly product?: Object;

		/**
		 * Returns the button
		 */
		public readonly button?: Object;

		/**
		 * Returns the photo
		 */
		public readonly photo?: PhotoAttachment;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);
	}

	export class MarketAlbumAttachment extends Attachment {
		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;
	}

	export class MarketAttachment extends Attachment {
		/**
		 * Checks is bookmarked current user
		 */
		public readonly isFavorited?: boolean;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;
	}

	export class PhotoAttachment extends Attachment {
		/**
		 * Returns the ID of the user who uploaded the image
		 */
		public readonly userId?: number;

		/**
		 * Returns the ID of the album
		 */
		public readonly albumId?: number;

		/**
		 * Returns the photo text
		 */
		public readonly text?: string;

		/**
		 * Returns the date when this photo was created
		 */
		public readonly createdAt?: number;

		/**
		 * Returns the photo height
		 */
		public readonly height?: number;

		/**
		 * Returns the photo width
		 */
		public readonly width?: number;

		/**
		 * Returns the URL of a small photo
		 */
		public readonly smallPhoto?: string;

		/**
		 * Returns the URL of a medium photo
		 */
		public readonly mediumPhoto?: string;

		/**
		 * Returns the URL of a large photo
		 */
		public readonly largePhoto?: string;

		/**
		 * Returns the sizes
		 */
		public readonly sizes?: Object[];

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;

		/**
		 * Returns the sizes of the required types
		 */
		public getSizes(sizeTypes: string[]): Object[];
	}

	export class PollAttachment extends Attachment {
		/**
		 * Checks whether the poll is anonymous
		 */
		public readonly isAnonymous: boolean | null;

		/**
		 * Checks whether the poll allows multiple choice of answers
		 */
		public readonly isMultiple: boolean | null;

		/**
		 * Checks whether the poll is complete
		 */
		public readonly isClosed: boolean | null;

		/**
		 * Check whether questions are attached to the discussion
		 */
		public readonly isBoard: boolean | null;

		/**
		 * Check if can edit the poll
		 */
		public readonly isCanEdit: boolean | null;

		/**
		 * Check if can vote in the survey
		 */
		public readonly isCanVote: boolean | null;

		/**
		 * Check if can complain about the poll
		 */
		public readonly isCanReport: boolean | null;

		/**
		 * Check if can share a survey
		 */
		public readonly isCanShare: boolean | null;

		/**
		 * Returns the ID of the poll author
		 */
		public readonly authorId: number | null;

		/**
		 * Returns the question text
		 */
		public readonly question: string | null;

		/**
		 * Returns the date when this poll was created
		 */
		public readonly createdAt: string | null;

		/**
		 * Returns the end date of the poll in Unixtime. 0, if the poll is unlimited
		 */
		public readonly endedAt: number | null;

		/**
		 * Returns the number of votes
		 */
		public readonly votes: number | null;

		/**
		 * Returns the identifiers of the response options selected by the current user
		 */
		public readonly answerIds: number[] | null;

		/**
		 * Returns the identifiers of 3 friends who voted in the poll
		 */
		public readonly friends: Object[] | null;

		/**
		 * Returns the information about the options for the answer
		 */
		public readonly answers: Object[] | null;

		/**
		 * Returns the poll snippet background
		 */
		public readonly background: Object | null;

		/**
		 * Returns a photo - the poll snippet background
		 */
		public readonly photo: Object | null;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;
	}

	export class StickerAttachment extends ExternalAttachment {
		/**
		 * Returns the identifier sticker
		 */
		public readonly id: number;

		/**
		 * Returns the identifier product
		 */
		public readonly productId: number;

		/**
		 * Returns the images sizes
		 */
		public readonly images: Object[];

		/**
		 * Returns the images sizes with backgrounds
		 */
		public readonly imagesWithBackground: Object[];

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;
	}

	export class VideoAttachment extends Attachment {
		/**
		 * Checks whether the video is repeatable
		 */
		public readonly isRepeat?: boolean;

		/**
		 * Checks that the user can add a video to himself	 */
		public readonly isCanAdd?: boolean;

		/**
		 * Checks if the user can edit the video
		 */
		public readonly isCanEdit?: boolean;

		/**
		 * Checks whether the video is being processed
		 */
		public readonly isProcessing?: boolean;

		/**
		 * Checks whether the video is a broadcast
		 */
		public readonly isBroadcast?: boolean;

		/**
		 * Checks whether the video is a broadcast
		 */
		public readonly isUpcoming?: boolean;

		/**
		 * Checks is bookmarked current user
		 */
		public readonly isFavorited?: boolean;

		/**
		 * Returns the title
		 */
		public readonly title?: string;

		/**
		 * Returns the description
		 */
		public readonly description?: string;

		/**
		 * Returns the duration
		 */
		public readonly duration?: number;

		/**
		 * Returns the date when this video was created
		 */
		public readonly createdAt?: number;

		/**
		 * Returns the date when this video was added
		 */
		public readonly addedAt?: Date;

		/**
		 * Returns the count views
		 */
		public readonly viewsCount?: number;

		/**
		 * Returns the count comments
		 */
		public readonly commentsCount?: number;

		/**
		 * Returns the URL of the page with the player
		 */
		public readonly player?: string;

		/**
		 * Returns the name of the platform (for video recordings added from external sites)
		 */
		public readonly platformName?: string;

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;

		/**
		 * Checks for a boolean value in the property
		 */
		public checkBooleanInProperty(name: String): number | null;
	}

	export class WallReplyAttachment extends Attachment {
		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);
	}

	export class WallAttachment extends Attachment {
		/**
		 * Checks has comments
		 */
		public readonly hasComments?: boolean;

		/**
		 * Checks has ads in post
		 */
		public readonly hasAds?: boolean;

		/**
		 * Checks for the presence of attachments
		 */
		public readonly hasUserReposted?: boolean;

		/**
		 * Checks has this user likes
		 */
		public readonly hasUserLike?: boolean;

		/**
		 * Checks can the current user comment on the entry
		 */
		public readonly isCanUserCommented?: boolean;

		/**
		 * Checks if a community can comment on a post
		 */
		public readonly isCanGroupsCommented?: boolean;

		/**
		 * Checks if you can comment on a post
		 */
		public readonly isCanCommented?: boolean;

		/**
		 * Checks if a user can close on a comments
		 */
		public readonly isCanLike?: boolean;

		/**
		 * hecks whether the current user can repost the record
		 */
		public readonly isCanReposted?: boolean;

		/**
		 * Checks is can this user pin post
		 */
		public readonly isCanPin?: boolean;

		/**
		 * Checks is can this user delete post
		 */
		public readonly isCanDelete?: boolean;

		/**
		 * Checks is can this user edit post
		 */
		public readonly isCanEdit?: boolean;

		/**
		 * Checks is can this user edit post
		 */
		public readonly isPinned?: boolean;

		/**
		 * Checks is post created only by friends
		 */
		public readonly isFriendsOnly?: boolean;

		/**
		 * Checks is bookmarked current user
		 */
		public readonly authorId?: boolean;

		/**
		 * Returns the administrator identifier that posted the entry
		 */
		public readonly createdUserId?: number;

		/**
		 * The identifier of the record owner, in response to which the current
		 */
		public readonly replyOwnerId?: number;

		/**
		 * The identifier of the record in response to which the current one was left.
		 */
		public readonly replyPostId?: number;

		/**
		 * Returns author identifier if the entry was published
		 */
		public readonly signerId?: number;

		/**
		 * Returns the date when this post was created
		 */
		public readonly createdAt?: number;

		/**
		 * Returns the post type
		 */
		public readonly postType?: string;

		/**
		 * Returns the post text
		 */
		public readonly text?: string;

		/**
		 * Returns the number of record views
		 */
		public readonly viewsCount?: number;

		/**
		 * Returns the likes count
		 */
		public readonly likesCount?: number;

		/**
		 * Returns the reposts count
		 */
		public readonly repostsCount?: number;

		/**
		 * Returns the comments count
		 */
		public readonly commentsCount?: number;

		/**
		 * Returns the likes info
		 */
		public readonly likes?: Object;

		/**
		 * Returns the post source
		 */
		public readonly postSource?: Object;

		/**
		 * Returns the geo location
		 */
		public readonly geo?: Object;

		/**
		 * Returns the history of reposts for post
		 */
		public readonly copyHistory: WallAttachment[];

		/**
		 * Returns the attachments
		 */
		public readonly attachments: Object[];

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 * Load attachment payload
		 */
		public loadAttachmentPayload(): Promise<void>;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];
	}

	export class Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK);

		/**
		 * Type context
		 */
		public type?: string;

		/**
		 * Sub types context
		 */
		public subTypes: string[];

		/**
		 * Checks whether the context of some of these types
		 */
		public is(types: string[]): boolean;

		/**
		 * Returns data for JSON
		 */
		public toJSON(): Object;
	}

	export class CommentActionContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		 /**
		 * Checks is new comment
		 */
		public readonly isNew: boolean;

		/**
		 * Checks is edit comment
		 */
		public readonly isEdit: boolean;

		/**
		 * Checks is delete comment
		 */
		public readonly isDelete: boolean;

		/**
		 * Checks is restore comment
		 */
		public readonly isRestore: boolean;

		/**
		 * Checks is photo comment
		 */
		public readonly isPhotoComment: boolean;

		/**
		 * Checks is wall comment
		 */
		public readonly isWallComment: boolean;

		/**
		 * Checks is video comment
		 */
		public readonly isVideoComment: boolean;

		/**
		 * Checks is board comment
		 */
		public readonly isBoardComment: boolean;

		/**
		 * Checks is board comment
		 */
		public readonly isMarketComment: boolean;

		/**
		 * Checks is reply comment
		 */
		public readonly isReply: boolean;

		/**
		 * Returns the identifier comment
		 */
		public readonly id: number;

		/**
		 * Returns the identifier reply comment
		 */
		public readonly replyId?: number;

		/**
		 * Returns the identifier user
		 */
		public readonly userId?: number;

		/**
		 * Returns the identifier reply user
		 */
		public readonly replyUserId?: number;

		/**
		 * Returns the identifier of the user who deleted the comment
		 */
		public readonly removerUserId?: number;

		/**
		 * Returns the identifier of object
		 */
		public readonly objectId?: number;

		/**
		 * Returns the identifier of owner
		 */
		public readonly ownerId?: number;

		/**
		 * Returns the date creation action comment
		 */
		public readonly createdAt?: number;

		/**
		 * Returns the text comment
		 */
		public readonly text?: string;

		/**
		 * Returns the likes
		 */
		public readonly likes?: Object;

		/**
		 * Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];

		/**
		 * Includes from subtype
		 */
		public includesFromSubType(type: string): boolean;

		/**
		 * Edits a comment
		 */
		public editComment(options: Object): Promise<Object>;

		/**
		 * Removes comment
		 */
		public deleteComment(): Promise<Object>;
	}

	export class DialogFlagsContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: any[]);

		 /**
		 * Checks that an important dialogue
		 */
		public readonly isImportant: boolean;

		/**
		 * Checks that the unanswered dialog
		 */
		public readonly isUnanswered: boolean;

		/**
		 * Returns the destination identifier
		 */
		public readonly peerId: number;

		/**
		 * Returns the values of the flags
		 */
		public readonly flags: number;

		/**
		 * Marks the dialog as answered or unchecked.
		 */
		public markAsAnsweredDialog(params: Object): Promise<Object>;

		/**
		 * Marks the dialog as important or removes the mark
		 */
		public markAsImportantDialog(params: Object): Promise<Object>;
	}

	export class GroupMemberContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		/**
		 * Checks is join user
		 */
		public readonly isJoin: boolean;

		/**
		 * Checks is leave user
		 */
		public readonly isLeave: boolean;

		/**
		 * Checks is self leave user
		 */
		public readonly isSelfLeave?: boolean;

		/**
		 * Returns the identifier user
		 */
		public readonly userId: number;

		/**
		 * Returns the join type
		 */
		public readonly joinType?: string;
	}

	export class GroupUpdateContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		/**
		 * Checks is change photo
		 */
		public readonly isChangePhoto: boolean;

		/**
		 * Checks is change officers
		 */
		public readonly isChangeOfficers: boolean;

		/**
		 * Checks is change settings
		 */
		public readonly isChangeSettings: boolean;

		 /**
		 * Returns the identifier admin
		 */
		public readonly adminId?: number;

		/**
		 * Returns the identifier user
		 */
		public readonly userId: number;

		/**
		 * Returns the old level permission
		 */
		public readonly oldLevel?: number;

		/**
		 * Returns the new level permission
		 */
		public readonly newLevel?: number;

		/**
		 * Returns the changes settings
		 */
		public readonly changes?: Object;

		/**
		 * Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];
	}

	export class GroupUserContext extends Context {
		/**
		* Checks is join user
		*/
	   public readonly isBlocked: boolean;

	   /**
		* Checks is leave user
		*/
	   public readonly isUnblocked: boolean;

	   /**
		* Checks that the block has expired
		*/
	   public readonly isExpired?: boolean;

	   /**
		* Returns the identifier admin
		*/
	   public readonly adminId?: number;

	   /**
		* Returns the identifier user
		*/
	   public readonly userId: number;

	   /**
		* Returns the reason for the ban
		*/
	   public readonly reasonId?: number;

	   /**
		* Returns the reason name for the ban
		*/
	   public readonly reasonName?: string;

	   /**
		* Returns the administrator comment to block
		*/
	   public readonly comment?: string;

	   /**
		* Constructror
		*/
	   public constructor(vk: VK, payload: Object, options: Object);

	   /**
		* Adds a user to the community blacklist
		*/
	   public banUser(params: Object): Promise<Object>;

	   /**
		* Adds a user to the community blacklist
		*/
	   public unbanUser(): Promise<Object>;
	}

	export class MessageAllowContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		/**
		 * Checks that the user has subscribed to messages
		 */
		public readonly isSubscribed: boolean;

		/**
		 * Checks that the user has unsubscribed from the messages
		 */
		public readonly isUbsubscribed: boolean;

		/**
		 * Returns the identifier user
		 */
		public readonly userId: number;

		/**
		 * Returns the key
		 */
		public readonly key?: string;
	}

	export class MessageFlagsContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		/**
		 * Verifies that the message is not read
		 */
		public readonly isUnread: boolean;

		/**
		 * Checks that the outgoing message
		 */
		public readonly isOutbox: boolean;

		/**
		 * Verifies that a reply has been created to the message
		 */
		public readonly isReplied: boolean;

		/**
		 * Verifies that the marked message
		 */
		public readonly isImportant: boolean;

		/**
		 * Verifies that the message was sent via chat
		 */
		public readonly isChat: boolean;

		/**
		 * Verifies that the message was sent by a friend
		 */
		public readonly isFriends: boolean;

		/**
		 * Verifies that the message is marked as "Spam"
		 */
		public readonly isSpam: boolean;

		/**
		 * Verifies that the message has been deleted (in
	the Recycle Bin)
		 */
		public readonly isDeleted: boolean;

		/**
		 * Verifies that the message was verified by the user for spam
		 */
		public readonly isFixed: boolean;

		/**
		 * Verifies that the message contains media content
		 */
		public readonly isMedia: boolean;

		/**
		 * Checks that a welcome message from the community
		 */
		public readonly isHidden: boolean;

		/**
		 * Returns the message ID
		 */
		public readonly id: number;

		/**
		 * Returns the destination identifier
		 */
		public readonly peerId: number;

		/**
		 * Returns the values of the flags
		 */
		public readonly flags: number;
	}

	export class MessageContext extends Context {
		/**
		 * Checks if there is text
		 */
		public readonly hasText: boolean;

		/**
		 * Checks for reply message
		 */
		public readonly hasReplyMessage: boolean;

		/**
		 * Checks for forwarded messages
		 */
		public readonly hasForwards: boolean;

		/**
		 * Checks for hast message payload
		 */
		public readonly hasMessagePayload: boolean;

		/**
		 * Checks if there is text
		 */
		public readonly hasGeo: boolean;

		/**
		 * Checks is a chat
		 */
		public readonly isChat: boolean;

		/**
		 * Check is a user
		 */
		public readonly isUser: boolean;

		/**
		 * Checks is a group
		 */
		public readonly isGroup: boolean;

		/**
		 * Checks is from the user
		 */
		public readonly isFromUser: boolean;

		/**
		 * Checks is from the group
		 */
		public readonly isFromGroup: boolean;

		/**
		 * Check is special event
		 */
		public readonly isEvent: boolean;

		/**
		 * Checks whether the message is outbox
		 */
		public readonly isOutbox: boolean;

		/**
		 * Checks whether the message is inbox
		 */
		public readonly isInbox: boolean;

		/**
		 * Checks that the message is important
		 */
		public readonly isImportant: boolean;

		/**
		 * Returns the identifier message
		 */
		public readonly id: number;

		/**
		 * Returns the message text
		 */
		public text: string;

		/**
		 * Returns the conversation message id
		 */
		public readonly conversationMessageId?: number;

		/**
		 * Returns the destination identifier
		 */
		public readonly peerId: number;

		/**
		 * Returns the peer type
		 */
		public readonly peerType: string;

		/**
		 * Returns the sender identifier
		 */
		public readonly senderId: number;

		/**
		 * Returns the sender type
		 */
		public readonly senderType: string;

		/**
		 * Returns the identifier chat
		 */
		public readonly chatId?: number;

		/**
		 * Returns the date when this message was created
		 */
		public readonly createdAt: number;

		/**
		 * Returns geo
		 */
		public readonly geo?: Object;

		/**
		 * Returns the event name
		 */
		public readonly eventType?: string;

		/**
		 * Returns the event member id
		 */
		public readonly eventMemberId?: number;

		/**
		 * Returns the event name
		 */
		public readonly eventText?: string;

		/**
		 * Returns the event email
		 */
		public readonly eventEmail?: string;

		/**
		 * Returns the message payload
		 */
		public readonly messagePayload?: Object;

		/**
		 * Returns the forwards
		 */
		public readonly forwards?: MessageForwardsCollection;

		/**
		 * Returns the reply message
		 */
		public readonly replyMessage?: MessageReply;

		/**
		 * Returns the attachments
		 */
		public readonly attachments: Object[];

		/**
		 * Constructor
		 */
		public constructor(vk: VK, payload: any[], options: Object);

		/**
		 * Load message payload
		 */
		public loadMessagePayload(): Promise<void>;

		/**
		 * Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];

		/**
		 * Gets a link to invite the user to a conversation
		 */
		public getInviteLink(params?: Object): Promise<Object>;

		/**
		 * Edits a message
		 */
		public editMessage(params?: Object): Promise<Object>;

		/**
		 * Edits a message text
		 */
		public editMessageText(message: string): Promise<Object>;

		/**
		 * Sends a message to the current dialog
		 */
		public send(text: string, params: Object): Promise<number>;
		public send(text: Object): Promise<number>;

		/**
		 * Responds to the current message
		 */
		public reply(text: string, params: Object): Promise<number>;
		public reply(text: Object): Promise<number>;

		/**
		 * Sends a sticker to the current dialog
		 */
		public sendSticker(id: number): Promise<number>;

		/**
		 * Sends a photo to the current dialog
		 */
		public sendPhoto(sources: any, params?: Object): Promise<number>;

		/**
		 * Sends a document to the current dialog
		 */
		public sendDocument(sources: any, params?: Object): Promise<number>;

		/**
		 * Sends a audio message to the current dialog
		 */
		public sendAudioMessage(sources: any, params?: Object): Promise<number>;

		/**
		 * Changes the status of typing in the dialog
		 */
		public setActivity(): Promise<boolean>;

		/**
		 * Marks messages as important or removes a mark.
		 */
		public markAsImportant(ids?: number[], options?: Object): Promise<number[]>;

		/**
		 * Deletes the message
		 */
		public deleteMessage(ids?: number[], options?: Object): Promise<number[]>;

		/**
		 * Restores the message
		 */
		public restoreMessage(): Promise<boolean>;

		/**
		 * Rename the chat
		 */
		public renameChat(title: string): Promise<boolean>;

		/**
		 * Sets a new image for the chat
		 */
		public newChatPhoto(sources: any, params?: Object): Promise<Object>;

		/**
		 * Remove the chat photo
		 */
		public deleteChatPhoto(): Promise<boolean>;

		/**
		 * Invites a new user
		 */
		public inviteUser(id?: number): Promise<boolean>;

		/**
		 * Excludes user
		 */
		public kickUser(id?: number): Promise<boolean>;

		/**
		 * Pins a message
		 */
		public pinMessage(): Promise<boolean>;

		/**
		 * Unpins a message
		 */
		public unpinMessage(): Promise<boolean>;
	}

	export class NewAttachmentsContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		/**
		 * Checks is attachment photo
		 */
		public readonly isPhoto: boolean;

		/**
		 * Checks is attachment video
		 */
		public readonly isVideo: boolean;

		/**
		 * Checks is attachment audio
		 */
		public readonly isAudio: boolean;

		/**
		 * Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];

		/**
		 * Removes the attachment
		 */
		public deleteAttachment(): Promise<Object>;
	}

	export class ReadMessagesContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		/**
		 * Checks that inbox messages are read
		 */
		public readonly isInbox: boolean;

		/**
		 * Checks that outbox messages are read
		 */
		public readonly isOutbox: boolean;

		/**
		 * Returns the ID before the message read
		 */
		public readonly id: number;

		/**
		 * Returns the peer ID
		 */
		public readonly peerId: number;
	}

	export class RemovedMessagesContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: Object, options: Object);

		/**
		 * Checks that messages have been deleted
		 */
		public readonly isRemoved: boolean;

		/**
		 * Checks that messages have been restored
		 */
		public readonly isRecovery: boolean;

		/**
		 * Returns the identifier of the message
		 */
		public readonly id: string;

		/**
		 * Returns the peer ID
		 */
		public readonly peerId: number;
	}

	export class StreamingContext extends Context {
		public attachments: Object;

		/**
		 * Checks is new object
		 */
		public readonly isNew: boolean;

		/**
		 * Checks is update object
		 */
		public readonly isUpdate: boolean;

		/**
		 * Checks is delete object
		 */
		public readonly isDelete: boolean;

		/**
		 * Checks is restore object
		 */
		public readonly isRestore: boolean;

		/**
		 * Checks is post event
		 */
		public readonly isPost: boolean;

		/**
		 * Checks is share event
		 */
		public readonly isShare: boolean;

		/**
		 * Checks is comment event
		 */
		public readonly isComment: boolean;

		/**
		 * Returns the event URL
		 */
		public readonly url: string;

		/**
		 * Returns the creation time
		 */
		public readonly createdAt: number;

		/**
		 * Returns the text of the post
		 */
		public readonly text?: string;

		/**
		 * Returns the text of the shared post
		 */
		public readonly sharedText?: string;

		/**
		 * Returns the creation time from original post
		 */
		public readonly sharedAt?: number;

		/**
		 * Returns the action type
		 */
		public readonly actionType: string;

		/**
		 * Returns the event type
		 */
		public readonly eventType: string;

		/**
		 * Returns the creation time from
		 */
		public readonly actionAt: number;

		/**
		 * Returns the geo location
		 */
		public readonly geo: Object;

		/**
		 * Returns the rule tags
		 */
		public readonly tags: string[];

		/**
		 * Returns the identifier signer user
		 */
		public readonly signerId: number;

		/**
		 * Returns the information of author
		 */
		public readonly author: Object;

		/**
		 * Returns the identifier author
		 */
		public readonly authorId: number;

		/**
		 * Returns the author url
		 */
		public readonly authorUrl: string;

		/**
		 * Returns the identifier of the author of the original post
		 */
		public readonly sharedAuthorId?: number;

		/**
		 * Returns the author url of the original post
		 */
		public readonly sharedAuthorUrl?: string;

		/**
		 * Returns the author platform
		 */
		public readonly authorPlatform?: string;

		/**
		 * Constructor
		 */
		public constructor(vk: VK, payload: Object, options: Object);

		/**
		 *	Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];
	}

	export class TypingContext extends Context {
		/**
		 * Checks is typing
		 */
		public readonly isTyping: boolean;

		/**
		 * Checks is record audio message
		 */
		public readonly isAudioMessage: boolean;

		/**
		 * Checks that the message is typed in the dm
		 */
		public readonly isUser: boolean;

		/**
		 * Checks that the message is typed in the chat
		 */
		public readonly isGroup: boolean;

		/**
		 * Checks that the message is typed in the chat
		 */
		public readonly isChat: boolean;

		/**
		 * Returns the identifier sender
		 */
		public readonly fromId: number;

		/**
		 * Returns the identifier destination
		 */
		public readonly toId: number;

		/**
		 * Returns the identifier peer
		 */
		public readonly peerId: number;

		/**
		 * Returns the identifier user
		 */
		public readonly userId: number;

		/**
		 * Returns the identifier chat
		 */
		public readonly chatId?: number;

		/**
		 * Constructor
		 */
		public constructor(vk: VK, payload: any[], options: Object);
	}

	export class UserOnlineContext extends Context {
		/**
		 * Constructor
		 */
		constructor(vk: VK, payload: any[]);

		/**
		 * Checks that the user is online
		 */
		public readonly isUserOnline: boolean;

		/**
		 * Checks that the user is online
		 */
		public readonly isUserOffline: boolean;

		/**
		 * Checks that the user has logged out of the network himself
		 */
		public readonly isSelfExit: boolean;

		/**
		 * Checks that the user logged out a timeout
		 */
		public readonly isTimeoutExit: boolean;

		/**
		 * Returns the user id
		 */
		public readonly userId?: number;

		/**
		 * Returns the date when this event was created
		 */
		public readonly createdAt: number;

		/**
		 * Returns the name of the platform from which the user entered
		 */
		public readonly platformName?: string;
	}

	export class VoteContext extends Context {
		/**
		 * Returns the identifier poll
		 */
		public readonly id: number;

		/**
		 * Returns the identifier user
		 */
		public readonly userId: number;

		/**
		 * Returns the identifier owner
		 */
		public readonly ownerId: number;

		/**
		 * Returns the identifier option
		 */
		public readonly optionId: number;
	}

	export class WallPostContext extends Context {
		/**
		 * constructor
		 */
		constructor(vk: VK, payload?: Object, options?: Object);

		/**
		 * Wall attachment
		 */
		public readonly wall: WallAttachment;

		/**
		 * Checks is repost
		 */
		public readonly isRepost: boolean;

		/**
		 * Removes a record from the wall
		 */
		public deletePost(): Promise<Object>;
	}

	export class MessageForward {
		/**
		 * Checks if there is text
		 */
		public readonly hasText: boolean;

		/**
		 * Returns the date when this message was created
		 */
		public readonly createdAt: number;

		/**
		 * Returns the date when this message was updated
		 */
		public readonly updatedAt: number;

		/**
		 * Returns the message text
		 */
		public readonly senderId: number;

		/**
		 * Returns the message text
		 */
		public readonly text: string;

		/**
		 * Returns the forwards
		 */
		public readonly forwards: MessageForward[] | [];

		/**
		 * Returns the attachments
		 */
		public readonly attachments: Object[];

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 *	Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];

		/**
		 * Returns data for JSON
		 */
		public toJSON(): Object;
	}

	export class MessageForwardsCollection extends Array<MessageForward> {
		/**
		 * Returns a flat copy of forwards
		 */
		public readonly flatten: MessageForward[];

		/**
		 *	Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];
	}

	export class MessageReply {
		/**
		 * Checks if there is text
		 */
		public readonly hasText: boolean;

		/**
		 * Returns the identifier message
		 */
		public readonly id: number;

		/**
		 * Returns the conversation message id
		 */
		public readonly conversationMessageId?: number;

		/**
		 * Returns the destination identifier
		 */
		public readonly peerId: number;

		/**
		 * Returns the date when this message was created
		 */
		public readonly createdAt: number;

		/**
		 * Returns the date when this message was updated
		 */
		public readonly updatedAt: number;

		/**
		 * Returns the message text
		 */
		public readonly senderId: number;

		/**
		 * Returns the message text
		 */
		public readonly text: string;

		/**
		 * Returns the attachments
		 */
		public readonly attachments: Object[];

		/**
		 * Constructor
		 */
		public constructor(payload: Object, vk: VK);

		/**
		 *	Checks for the presence of attachments
		 */
		public hasAttachments(type?: string): boolean;

		/**
		 * Returns the attachments
		 */
		public getAttachments(type?: string): Object[];

		/**
		 * Returns data for JSON
		 */
		public toJSON(): Object;
	}

	export interface ButtonOptions {
		color: string;
		action: Object;
	}

	export interface ButtonToJSONResult {
		color: string;
		action: Object;
	}

	export class Button {
		public color: string;
		public action: Object;

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Returns the default color (#FFFFFF)
		 */
		public static readonly DEFAULT_COLOR: string;

		/**
		 * Returns the primary color (#5181B8)
		 */
		public static readonly PRIMARY_COLOR: string;

		/**
		 * Returns the negative color (#E64646)
		 */
		public static readonly NEGATIVE_COLOR: string;

		/**
		 * Returns the positive color (#4BB34B)
		 */
		public static readonly POSITIVE_COLOR: string;

		/**
		 * Constructor
		 */
		constructor(options?: ButtonOptions);

		/**
		 * Returns to JSON
		 */
		toJSON(): ButtonToJSONResult;
	}

	export interface KeyboardOptions {
		oneTime?: boolean;
	}

	export class Keyboard {
		public buttons: Button[];

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Checks is a one time
		 */
		public readonly isOneTime: boolean;

		/**
		 * Returns the default color
		 */
		public static readonly DEFAULT_COLOR: string;

		/**
		 * Returns the primary color
		 */
		public static readonly PRIMARY_COLOR: string;

		/**
		 * Returns the negative color
		 */
		public static readonly NEGATIVE_COLOR: string;

		/**
		 * Returns the positive color
		 */
		public static readonly POSITIVE_COLOR: string;

		/**
		 * Constructor
		 */
		constructor(options: KeyboardOptions);

		/**
		 * Return keyboard
		 */
		public static keyboard(rows: Button[] | Button[][], options?: KeyboardOptions): Keyboard;

		/**
		 * Returns the text button
		 */
		public static textButton(options: Object): TextButton;

		 /**
		 * The keyboard will open only once
		 */
		public oneTime(enabled: boolean): this;

		 /**
		 * Add buttons row
		 */
		public addButtonsRow(buttons: Button[]): this;

		/**
		 * Returns a string to keyboard a VK
		 */
		public toString(): string;
	}

	export interface TextButtonOptions {
		color: string;
		label: string;
		payload: Object;
	}

	export class TextButton extends Button {
		/**
		 * Constructor
		 */
		constructor(options: TextButtonOptions);
	}

	/**
	 * General error class
	 */
	export class VKError extends Error {
		public code: number;
		public message: string;

		/**
		 * Returns custom tag
		 */
		public [Symbol.toStringTag]: string;

		/**
		 * Constructor
		 */
		public constructor(options: Object);

		/**
		 * Returns property for json
		 */
		public toJSON(): this;
	}

	export class APIError extends VKError {
		public params: Object[];
		public captchaSid: number;
		public captchaImg: string;
		public redirectUri: string;
		public confirmationText: string;

		/**
		 * Constructor
		 */
		public constructor(options: Object);
	}

	export interface AuthErrorOptions {
		code: number;
		message: string;
		pageHtml: string | null;
	}

	export class AuthError extends VKError {
		public pageHtml: string | null;

		public constructor(options: AuthErrorOptions);
	}

	export class CollectError extends VKError {
		public errors: Object[];

		/**
		 * Constructor
		 */
		public constructor(options: Object);
	}

	export class ExecuteError extends VKError {
		public method: string;

		/**
		 * Constructor
		 */
		public constructor(options: Object);
	}

	export class SnippetsError extends VKError {}

	export class StreamingRuleError extends VKError {
		/**
		 * Constructor
		 */
		constructor(options: Object);
	}

	export class UpdatesError extends VKError {}

	export class UploadError extends VKError {}

	class CallbackService {
		/**
		 * Constructor
		 */
		public constructor(vk: VK);

		/**
		 * Processing captcha
		 */
		public processingCaptcha(payload: Object): Promise<void>;

		/**
		 * Processing two-factor
		 */
		public processingTwoFactor(payload: Object): Promise<void>;
	}

	/**
	 * The attachment types
	 */
	export const attachmentTypes: {
		AUDIO: string;
		AUDIO_MESSAGE: string;
		GRAFFITI: string;
		DOCUMENT: string;
		GIFT: string;
		LINK: string;
		MARKET_ALBUM: string;
		MARKET: string;
		PHOTO: string;
		STICKER: string;
		VIDEO: string;
		WALL_REPLY: string;
		WALL: string;
		POLL: string;
	};

	/**
	 * Sources of captcha
	 */
	export const captchaTypes: {
		API: string;
		DIRECT_AUTH: string;
		IMPLICIT_FLOW_AUTH: string;
		ACCOUNT_VERIFICATION: string;
	};

	/**
	 * Message source
	 */
	export const messageSources: {
		USER: string;
		CHAT: string;
		GROUP: string;
		EMAIL: string;
	};

	/**
	 * Resource types
	 */
	export const resourceTypes: {
		USER: string;
		GROUP: string;
		APPLICATION: string;
	};

	/**
	 * API error codes
	 */
	export const apiErrors: {
		UNKNOWN_ERROR: number;
		APP_SWITCHED_OFF: number;
		UNKNOWN_METHOD: number;
		AUTH_FAILURE: number;
		TOO_MANY_REQUESTS: number;
		SCOPE_NEEDED: number;
		INCORRECT_REQUEST: number;
		TOO_MANY_SIMILAR_ACTIONS: number;
		INTERNAL_ERROR: number;
		RESPONSE_SIZE_TOO_BIG: number;
		CAPTCHA_REQUIRED: number;
		ACCESS_DENIED: number;
		USER_VALIDATION_REQUIRED: number;
		PAGE_BLOCKED: number;
		STANDALONE_ONLY: number;
		STANDALONE_AND_OPEN_API_ONLY: number;
		METHOD_DISABLED: number;
		CONFIRMATION_REQUIRED: number;
		GROUP_TOKEN_NOT_VALID: number;
		APP_TOKEN_NOT_VALID: number;
		WRONG_PARAMETER: number;
		INCORRECT_USER_ID: number;
		ALBUM_ACCESS_DENIED: number;
		AUDIO_ACCESS_DENIED: number;
		GROUP_ACCESS_DENIED: number;
		ALBUM_OVERFLOW: number;
		PAYMENTS_DISABLED: number;
		COMMERCIAL_ACCESS_DENIED: number;
		COMMERCIAL_ERROR: number
	};

	/**
	 * Auth error codes
	 */
	export const authErrors: {
		PAGE_BLOCKED: string;
		INVALID_PHONE_NUMBER: string;
		AUTHORIZATION_FAILED: string;
		FAILED_PASSED_CAPTCHA: string;
		FAILED_PASSED_TWO_FACTOR: string;
	};

	/**
	 * Upload error codes
	 */
	export const uploadErrors: {
		MISSING_PARAMETERS: string;
		NO_FILES_TO_UPLOAD: string;
		EXCEEDED_MAX_FILES: string;
		UNSUPPORTED_SOURCE_TYPE: string;
	};

	/**
	 * Updates error codes
	 */
	export const updatesErrors: {
		NEED_RESTART: string;
		POLLING_REQUEST_FAILED: string;
	};

	/**
	 * Collect error codes
	 */
	export const collectErrors: {
		EXECUTE_ERROR: string;
	};

	/**
	 * Snippets error codes
	 */
	export const snippetsErrors: {
		INVALID_URL: string;
		INVALID_RESOURCE: string;
		RESOURCE_NOT_FOUND: string;
	};

	/**
	 * Snippets error codes
	 */
	export const sharedErrors: {
		MISSING_CAPTCHA_HANDLER: string;
		MISSING_TWO_FACTOR_HANDLER: string;
	};
}
