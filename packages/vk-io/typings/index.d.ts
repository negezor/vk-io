// Definitions by:
//  Ilya Sinkin (https://github.com/isinkin)

// declare module 'vk-io' {
import Cheerio from 'cheerio';
import { Response } from 'node-fetch';
import { CookieJar } from 'tough-cookie';
import { Middleware } from 'middleware-io';

import { URL } from 'url';
import { Agent } from 'https';
import { Readable } from 'stream';

import * as Params from './params.d';
import * as Methods from './methods.d';

export * from './params.d';
export * from './responses.d';
export * from './objects.d';

export interface IVKOptions {
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
	phone?: string | number;

	/**
	 * User password
	 */
	password?: string;

	/**
	 * List of permissions
	 */
	authScope?: string;

	/**
	 * Wait time for one auth request
	 */
	authTimeout?: number;

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
	 * VK API version
	 */
	apiVersion?: string;

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
	 * Methods for call execute (apiMode=parallel_selected)
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
	public constructor(options?: IVKOptions);

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
	public options: IVKOptions;

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
	private callbackService: CallbackService;

	/**
	 * Sets options
	 */
	public setOptions(options: IVKOptions): this;
}

export default VK;

export class Request {
	public method: string;

	public params: object;

	public attempts: number;

	public promise: Promise<void>;

	/**
	 * Returns custom tag
	 */
	public [Symbol.toStringTag]: string;

	/**
	 * Constructor
	 */
	public constructor(method: string, params: object);

	/**
	 * Adds attempt
	 */
	private addAttempt(): number;

	/**
	 * Returns string to execute
	 */
	public toString(): string;
}

/**
 * Working with API methods
 */
export class API extends Methods.APIMethods {
	/**
	 * Returns the current used API version
	 */
	public API_VERSION: string;

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public execute(params: object): Promise<any>;

	/**
	 * Call execute procedure
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public procedure(name: string, params: object): Promise<any>;

	/**
	 * Call raw method
	 */
	public call(method: string, params: object): Promise<object>;

	/**
	 * Adds request for queue
	 */
	public callWithRequest(request: Request): Promise<object>;

	/**
	 * Adds method to queue
	 */
	private enqueue(method: string, params: object): Promise<object>;

	/**
	 * Adds an element to the beginning of the queue
	 */
	private requeue(request: Request): void;

	/**
	 * Running queue
	 */
	private worker(): void;

	/**
	 * Calls the api method
	 */
	private callMethod(request: Request): Promise<void>;

	/**
	 * Error API handler
	 */
	private handleError(request: Request, error: Error): Promise<void>;
}

export class Auth {
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
	public implicitFlowUser(options: object): ImplicitFlowUser;

	/**
	 * Standalone authorization with login & password for group
	 */
	public implicitFlowGroups(groups: number[], options: object): ImplicitFlowGroups;

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
	public userAuthorizedThroughOpenAPI(params: object): Promise<{
		authorized: boolean;
	}>;
}

export interface IDirectAuthOptions {
	appId?: number;
	appSecret?: number;

	login?: string;
	phone?: string;
	password?: string;

	agent?: Agent;
	scope?: string;
}

export interface IDirectAuthRunResult {
	email: string;
	user: number;
	token: string;
	expires: number;
}

export class DirectAuth {
	/**
	 * Returns custom tag
	 */
	public [Symbol.toStringTag]: string;

	/**
	 * Constructor
	 */
	public constructor(vk: VK, options: IDirectAuthOptions);

	/**
	 * Executes the HTTP request
	 */
	private fetch(url: string, options: object): Promise<Response>;

	/**
	 * Returns permission page
	 */
	private getPermissionsPage(query: object): Promise<Response>;

	/**
	 * Runs authorization
	 */
	public run(): Promise<IDirectAuthRunResult>;

	/**
	 * Process captcha
	 */
	private processCaptcha(payload: object): Promise<Response>;

	/**
	 * Process two-factor
	 */
	private processTwoFactor(payload: object): Promise<Response>;

	/**
	 * Process security form
	 */
	private processSecurityForm(response: Response, $: Cheerio): Promise<Response>;
}

export class ImplicitFlow {
	/**
	 * CookieJar
	 */
	public cookieJar: CookieJar;

	/**
	 * Returns cookie
	 */
	public getCookies(): Promise<{
		'login.vk.com': string;
		'vk.com': string;
	}>;

	/**
	 * Runs authorization
	 */
	public run(): Promise<object>;
}

export interface IImplicitFlowUserRunResult {
	email: string;
	user: number;
	token: string;
	expires: number;
}

export class ImplicitFlowUser extends ImplicitFlow {
	/**
	 * Returns permission page
	 */
	private getPermissionsPage(): Promise<Response>;

	/**
	 * Starts authorization
	 */
	public run(): Promise<IImplicitFlowUserRunResult>;
}

export interface IImplicitFlowGroupRunResult {
	group: number;
	token: string;
	expires: number;
}

export class ImplicitFlowGroups extends ImplicitFlow {
	/**
	 * Returns cookie
	 */
	private getPermissionsPage(): Promise<Response>;

	/**
	 * Executes the HTTP request
	 */
	public run(): Promise<IImplicitFlowGroupRunResult[]>;
}

/**
 * Stream, buffer, url or file path
 */
export type UploadSourceType = Readable | Buffer | string;

export type UploadSourceValue = UploadSourceType | {
	value: UploadSourceType;

	contentType?: string;
	filename?: string;
};

export interface IUploadSourceParams {
	values: UploadSourceValue[] | UploadSourceValue;

	uploadUrl?: string;
	timeout?: number;
}

export type UploadSource = IUploadSourceParams | UploadSourceValue[] | UploadSourceValue;

export interface IUploadParams {
	source: UploadSource;
}

export interface IStoryObject {
	id: number;
	owner_id: number;
	date: number;
	is_expired: boolean;
	is_deleted: boolean;
	can_see: number;
	seen: number;
	type: number;
	photo: object;
	video: object;
	link: object;
	parent_story_owner_id: number;
	parent_story_id: number;
	parent_story: IStoryObject;
	replies: object;
	can_reply: number;
	can_share: number;
	can_comment: number;
	views: number;
	access_key: string;
}

export class Upload {
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
	public photoAlbum(
		params: IUploadParams & {
			album_id: number;
			group_id?: number;

			caption?: string;
			latitude?: number;
			longitude?: number;
		}
	): Promise<PhotoAttachment[]>;

	/**
	 * Uploading photos to the wall
	 */
	public wallPhoto(
		params: IUploadParams & {
			user_id?: number;
			group_id?: number;

			caption?: string;
			latitude?: number;
			longitude?: number;
		}
	): Promise<PhotoAttachment>;

	/**
	 * Uploading the main photo of a user or community
	 */
	public ownerPhoto(
		params: IUploadParams & {
			owner_id?: number;
		}
	): Promise<{
		photo_hash: string;
		photo_src: string;
		photo_src_big: string;
		photo_src_small: string;
		saved: number;
		post_id: number;
	}>;

	/**
	 * Uploading a photo to a message */
	public messagePhoto(
		params: IUploadParams & {
			peer_id?: number;
		}
	): Promise<PhotoAttachment>;

	/**
	 * Uploading the main photo for a chat
	 */
	public chatPhoto(
		params: IUploadParams & {
			chat_id: number;

			crop_x?: number;
			crop_y?: number;
			crop_width?: number;
		}
	): Promise<{
		message_id: number;
		chat: object;
	}>;

	/**
	 * Uploading a photo for a product
	 */
	public marketPhoto(
		params: IUploadParams & {
			group_id: number;

			main_photo?: number;

			crop_x?: number;
			crop_y?: number;
			crop_width?: number;
		}
	): Promise<PhotoAttachment>;

	/**
	 * Uploads a photo for the selection of goods
	 */
	public marketAlbumPhoto(
		params: IUploadParams & {
			group_id: number;
		}
	): Promise<PhotoAttachment>;

	/**
	 * Uploads audio
	 */
	public audio(
		params: IUploadParams & {
			title?: string;
			artist?: string;
		}
	): Promise<AudioAttachment>;

	/**
	 * Uploads video
	 */
	public video(
		params: IUploadParams & {
			album_id?: number;
			group_id?: number;

			link?: string;
			name?: string;
			description?: string;
			is_private?: number;
			wallpost?: number;
			privacy_view?: string;
			privacy_comment?: string;
			no_comments?: number;
			repeat?: number;
			compression?: number;
		}
	): Promise<VideoAttachment>;

	/**
	 * Uploads document
	 */
	private conductDocument(params: IUploadParams, options?: object): Promise<object>;

	/**
	 * Uploads document
	 */
	public document(
		params: IUploadParams & {
			group_id?: number;

			title?: string;
			tags?: string;
		},
		options?: object
	): Promise<DocumentAttachment>;

	/**
	 * Uploads wall document
	 */
	private conductWallDocument(params: IUploadParams, options?: object): Promise<object>;

	/**
	 * Uploads wall document
	 */
	public wallDocument(
		params: IUploadParams & {
			group_id?: number;
			// type?: string;

			title?: string;
			tags?: string;
		},
		options?: object
	): Promise<DocumentAttachment>;

	/**
	 * Uploads wall document
	 */
	private conductMessageDocument(params: IUploadParams, options?: object): Promise<object>;

	/**
	 * Uploads message document
	 */
	public messageDocument(
		params: IUploadParams & {
			peer_id?: number;

			title?: string;
			tags?: string;
		},
		options?: object
	): Promise<DocumentAttachment>;

	/**
	 * Uploads audio message
	 */
	public audioMessage(
		params: IUploadParams & {
			peer_id?: number;

			title?: string;
			tags?: string;
		}
	): Promise<AudioMessageAttachment>;


	/**
	 * Uploads graffiti in documents
	 */
	public documentGraffiti(
		params: IUploadParams & {
			group_id?: number;
		}
	): Promise<GraffitiAttachment>;

	/**
	 * Uploads graffiti in messages
	 */
	public messageGraffiti(
		params: IUploadParams & {
			peer_id?: number;
		}
	): Promise<GraffitiAttachment>;

	/**
	 * Uploads graffiti in messages
	 *
	 * @deprecated
	 */
	public graffiti(
		params: IUploadParams & {
			peer_id?: number;
		}
	): Promise<GraffitiAttachment>;

	/**
	 * Uploads community cover
	 */
	public groupCover(
		params: IUploadParams & {
			group_id: number;

			crop_x?: number;
			crop_y?: number;
			crop_x2?: number;
			crop_y2?: number;
		}
	): Promise<{
		images: {
			url: string;
			width: number;
			height: number;
		}[];
	}>;

	/**
	 * Uploads photo stories
	 */
	public storiesPhoto(
		params: IUploadParams & {
			group_id?: number;
			add_to_news?: number;
			user_ids?: string[] | string;
			reply_to_story?: string;
			link_text: string;
			link_url: string;
		}
	): Promise<IStoryObject>;

	/**
	 * Uploads video stories
	 */
	public storiesVideo(
		params: IUploadParams & {
			group_id?: number;
			add_to_news?: number;
			user_ids?: string[] | string;
			reply_to_story?: string;
			link_text: string;
			link_url: string;
		}
	): Promise<IStoryObject>;

	/**
	 * Uploads poll photo
	 */
	public pollPhoto(
		params: IUploadParams & {
			owner_id?: number;
		}
	): Promise<number>;

	/**
	 * Behavior for the upload method
	 */
	private conduct(params: object): Promise<object>;

	/**
	 * Building form data
	 */
	private buildPayload(params: object): Promise<object>;

	/**
	 * Upload form data
	 */
	private upload(url: URL | string): Promise<object>;
}

export class Collect extends Methods.APIMethods {
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public executes(method: string, queue: Request[]): Promise<any[]>;
}

export class Chain {
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public append(method: string, params: object): Promise<any>;

	/**
	 * Promise based
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public then(thenFn: Function, catchFn: Function): Promise<any[]>;

	/**
	 * Starts the chain
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public run(): Promise<any[]>;
}

export interface IUpdatesStartWebhookOptions {
	tls?: object;
	path?: string;
	port?: number;
	host?: string;
}

type HearFunctionCondition<T, U> = (value: T, context: U) => boolean;

type HearCondition<T, U> = HearFunctionCondition<T, U> | RegExp | string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type HearObjectCondition<T extends Record<string, any>> = {
	[P in keyof T]: HearCondition<T[P], T> | HearCondition<T[P], T>[];
};

export class Updates {
	/**
	 * Constructor
	 */
	public constructor(vk: VK);

	/**
	 * Checks is started
	 */
	public readonly isStarted: boolean;

	/**
	 * Added middleware
	 */
	public use<T = {}>(middleware: Middleware<Context & T>): this;

	/**
	 * Subscribe to events
	 */

	public on<T = {}>(events: 'message' | 'new_message' | 'edit_message', handler: Middleware<MessageContext & T>): this;

	public on<T = {}>(events: 'message_subscribers' | 'message_subscribe' | 'message_unsubscribe', handler: Middleware<MessageAllowContext & T>): this;

	public on<T = {}>(events: 'new_attachment' | 'new_photo_attachment' | 'new_video_attachment' | 'new_audio_attachment', handler: Middleware<NewAttachmentsContext & T>): this;

	public on<T = {}>(events: 'wall_post' | 'new_wall_post' | 'new_wall_repost', handler: Middleware<WallPostContext & T>): this;

	public on<T = {}>(events: 'group_member' | 'join_group_member' | 'leave_group_member', handler: Middleware<GroupMemberContext & T>): this;

	public on<T = {}>(events: 'group_user' | 'block_group_user' | 'unblock_group_user', handler: Middleware<GroupUserContext & T>): this;

	public on<T = {}>(events: 'comment' | 'photo_comment' | 'video_comment' | 'wall_comment' | 'board_comment' | 'market_comment' | 'new_photo_comment' | 'edit_photo_comment' | 'delete_photo_comment' | 'restore_photo_comment' | 'new_video_comment' | 'edit_video_comment' | 'delete_video_comment' | 'restore_video_comment' | 'new_wall_comment' | 'edit_wall_comment' | 'delete_wall_comment' | 'restore_wall_comment' | 'new_board_comment' | 'edit_board_comment' | 'delete_board_comment' | 'restore_board_comment' | 'new_market_comment' | 'edit_market_comment' | 'delete_market_comment' | 'restore_market_comment', handler: Middleware<CommentActionContext & T>): this;

	public on<T = {}>(events: 'vote' | 'pull_vote', handler: Middleware<VoteContext & T>): this;

	public on<T = {}>(events: 'group_update' | 'group_update_photo' | 'group_update_officers' | 'group_update_settings', handler: Middleware<GroupUpdateContext & T>): this;

	public on<T = {}>(events: 'typing' | 'typing_user' | 'typing_group', handler: Middleware<TypingContext & T>): this;

	public on<T = {}>(
		events: ContextPossibleTypes[] | ContextPossibleTypes,
		handler: Middleware<Context & T>
	): this;

	/**
	 * Listen text
	 */
	public hear<T = {}>(
		conditions: (
			HearCondition<string | null, T & MessageContext>[]
			| HearCondition<string | null, T & MessageContext>
		)
		| (
			HearObjectCondition<T & MessageContext>
			| HearObjectCondition<T & MessageContext>[]
		),
		handler: Middleware<MessageContext & T>
	): this;

	/**
	 * A handler that is called when handlers are not found
	 */
	public setHearFallbackHandler<T = {}>(handler: Middleware<MessageContext & T>): this;

	/**
	 * Handles longpoll event
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public handlePollingUpdate(update: any[]): Promise<void>;

	/**
	 * Handles webhook event
	 */
	public handleWebhookUpdate(update: object): Promise<void>;

	/**
	 * Starts to poll server
	 */
	public startPolling(): Promise<void>;

	/**
	 * Starts the webhook server
	 */
	public startWebhook(options?: IUpdatesStartWebhookOptions, next?: Function): Promise<void>;

	/**
	 * Automatically determines the settings to run
	 */
	public start(options?: { webhook?: IUpdatesStartWebhookOptions }): Promise<void>;

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
	 * Starts forever fetch updates loop
	 */
	public startFetchLoop(): Promise<void>;

	/**
	 * Gets updates
	 */
	private fetchUpdates(): Promise<void>;

	/**
	 * Calls up the middleware chain
	 */
	private dispatchMiddleware(context: Context): Promise<void>;

	/**
	 * Reloads middleware
	 */
	private reloadMiddleware(): void;
}

interface IResolvedResource {
	id: number;
	owner?: number;
	type: 'user' | 'group' | 'application' | 'albums' | 'album' | 'wall' | 'club' | 'photo' | 'video' | 'audio' | string;
}

export class Snippets {
	private resourceResolver: ResourceResolver;

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
	public resolveResource(resource: string | number): Promise<IResolvedResource>;
}

export class ResourceResolver {
	/**
	 * Constructor
	 */
	public constructor(vk: VK);

	/**
	 * Resolve resource
	 */
	public resolve(resource: string | number): Promise<IResolvedResource>;

	/**
	 * Resolve number
	 */
	public resolveNumber(resource: string): Promise<IResolvedResource>;

	/**
	 * Resolve resource mention
	 */
	public resolveMention(resource: string): Promise<IResolvedResource>;

	/**
	 * Resolve resource url
	 */
	public resolveUrl(resourceUrl: string): Promise<IResolvedResource>;

	/**
	 * Resolve screen name
	 */
	public resolveScreenName(resource: string): Promise<IResolvedResource>;
}

interface IStreamingRule {
	value: string;
	tag: string;
}

interface IStreamingResponse {
	code: number;
	error?: {
		message: string;
		error_code: number;
	};
}

export class StreamingAPI {
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
	private handleServiceMessage(options: object): Promise<void>;

	/**
	 * Handles events
	 */
	private handleEvent(event: object): Promise<void>;

	/**
	 * Executes the HTTP request for rules
	 */
	public fetchRules(method: string, options: object): Promise<object>;

	/**
	 * Returns a list of rules
	 */
	public getRules(): Promise<IStreamingRule[]>;

	/**
	 * Adds a rule
	 */
	public addRule(rule: IStreamingRule): Promise<IStreamingResponse>;

	/**
	 * Removes the rule
	 */
	public deleteRule(tag: string): Promise<IStreamingResponse>;

	/**
	 * Adds a list of rules
	 */
	public addRules(rules: IStreamingRule[]): Promise<IStreamingResponse[]>;

	/**
	 * Removes all rules
	 */
	public deleteRules(): Promise<IStreamingResponse>;
}

export type AttachmentTypes = 'audio' | 'audio_message' | 'graffiti' | 'doc' | 'gift' | 'link' | 'market_album' | 'market' | 'photo' | 'sticker' | 'video' | 'wall_reply' | 'wall' | 'poll';

export type AttachmentPossibleTypes = AttachmentTypes | string;

export class Attachment {
	public type: AttachmentTypes;

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
	public static fromString(attachment: string): Attachment;

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
	public toJSON(): object;
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
	public constructor(type: string, payload: object);

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object;
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
	public constructor(payload: object, vk?: VK);

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
	public constructor(payload: object, vk?: VK);

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
	public readonly preview?: {
		photo: {
			sizes: IPhotoSize[];
		};

		graffiti: {
			src: string;
			width: number;
			height: number;
		};

		audio_message: {
			duration: number;
			waveform: number[];
			link_ogg: string;
			link_mp3: string;
		};
	};

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

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
	public constructor(payload: object, vk?: VK);
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
	public constructor(payload: object, vk?: VK);

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
	public readonly product?: {
		price: object;
	};

	/**
	 * Returns the button
	 */
	public readonly button?: {
		title: string;
		action: {
			type: string;
			url: string;
		};
	};

	/**
	 * Returns the photo
	 */
	public readonly photo?: PhotoAttachment;

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);
}

export class MarketAlbumAttachment extends Attachment {
	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

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
	public constructor(payload: object, vk?: VK);

	/**
	 * Load attachment payload
	 */
	public loadAttachmentPayload(): Promise<void>;
}

interface IPhotoSize {
	type: string;
	url: string;
	width: number;
	height: number;
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
	public readonly sizes?: IPhotoSize[];

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

	/**
	 * Load attachment payload
	 */
	public loadAttachmentPayload(): Promise<void>;

	/**
	 * Returns the sizes of the required types
	 */
	public getSizes(sizeTypes: string[]): IPhotoSize[];
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
	public readonly friends: number[] | null;

	/**
	 * Returns the information about the options for the answer
	 */
	public readonly answers: {
		id: number;
		text: string;
		votes: number;
		rate: number;
	}[] | null;

	/**
	 * Returns the poll snippet background
	 */
	public readonly background: object | null;

	/**
	 * Returns a photo - the poll snippet background
	 */
	public readonly photo: object | null;

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

	/**
	 * Load attachment payload
	 */
	public loadAttachmentPayload(): Promise<void>;
}

interface IStickerImage {
	url: string;
	width: number;
	height: number;
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
	public readonly images: IStickerImage[];

	/**
	 * Returns the images sizes with backgrounds
	 */
	public readonly imagesWithBackground: IStickerImage[];

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

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
	 * Checks that the user can add a video to himself */
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
	public constructor(payload: object, vk?: VK);

	/**
	 * Load attachment payload
	 */
	public loadAttachmentPayload(): Promise<void>;

	/**
	 * Checks for a boolean value in the property
	 */
	private checkBooleanInProperty(name: string): number | null;
}

export class WallReplyAttachment extends Attachment {
	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);
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
	public readonly likes?: {
		count: number;
		user_likes: number;
		can_publish: number;
	};

	/**
	 * Returns the post source
	 */
	public readonly postSource?: {
		type: string;
		platform: string;
		data: string;
		url: string;
	};

	/**
	 * Returns the geo location
	 */
	public readonly geo?: {
		type: string;
		coordinates: string;
		place: object;
	};

	/**
	 * Returns the history of reposts for post
	 */
	public readonly copyHistory: WallAttachment[];

	/**
	 * Returns the attachments
	 */
	public readonly attachments: Attachment[];

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

	/**
	 * Load attachment payload
	 */
	public loadAttachmentPayload(): Promise<void>;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];
}

/**
 * TODO: Divide into contexts and render possible types.
 */
export type ContextTypes = 'message' | 'message_subscribers' | 'new_attachment' | 'wall_post' | 'group_member' | 'group_user' | 'comment' | 'vote' | 'group_update' | 'typing';
export type ContextSubTypes = 'new_message' | 'edit_message' | 'message_subscribe' | 'message_unsubscribe' | 'new_photo_attachment' | 'new_video_attachment' | 'new_audio_attachment' | 'new_wall_post' | 'new_wall_repost' | 'join_group_member' | 'leave_group_member' | 'block_group_user' | 'unblock_group_user' | 'photo_comment' | 'video_comment' | 'wall_comment' | 'board_comment' | 'market_comment' | 'new_photo_comment' | 'edit_photo_comment' | 'delete_photo_comment' | 'restore_photo_comment' | 'new_video_comment' | 'edit_video_comment' | 'delete_video_comment' | 'restore_video_comment' | 'new_wall_comment' | 'edit_wall_comment' | 'delete_wall_comment' | 'restore_wall_comment' | 'new_board_comment' | 'edit_board_comment' | 'delete_board_comment' | 'restore_board_comment' | 'new_market_comment' | 'edit_market_comment' | 'delete_market_comment' | 'restore_market_comment' | 'pull_vote' | 'group_update_photo' | 'group_update_officers' | 'group_update_settings' | 'typing_user' | 'typing_group';

export type ContextPossibleTypes = ContextTypes | ContextSubTypes | string;

export class Context {
	/**
	 * Constructor
	 */
	public constructor(vk: VK);

	/**
	 * Type context
	 */
	public type: ContextTypes;

	/**
	 * Sub types context
	 */
	public subTypes: ContextSubTypes[];

	/**
	 * Checks whether the context of some of these types
	 */
	public is(types: ContextPossibleTypes[] | ContextPossibleTypes): boolean;

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object;

	/**
	 * IPartial content
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export class CommentActionContext extends Context {
	/**
	 * Constructor
	 */
	public constructor(vk: VK, payload: object, options: object);

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
	public readonly likes?: {
		count: number;
		user_likes: number;
		can_publish: number;
	};

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];

	/**
	 * Includes from subtype
	 */
	private includesFromSubType(type: string): boolean;

	/**
	 * Edits a comment
	 */
	public editComment(options: object): Promise<number>;

	/**
	 * Removes comment
	 */
	public deleteComment(): Promise<number>;
}

export class DialogFlagsContext extends Context {
	/**
	 * Constructor
	 */
	public constructor(vk: VK, payload: number[]);

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
	 * Marks the conversation as answered or unchecked.
	 */
	public markAsAnsweredConversation(params: object): Promise<number>;

	/**
	 * Marks the conversation as important or removes the mark
	 */
	public markAsImportantConversation(params: object): Promise<number>;
}

export class GroupMemberContext extends Context {
	/**
	 * Constructor
	 */
	public constructor(vk: VK, payload: object, options: object);

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
	public constructor(vk: VK, payload: object, options: object);

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
	public readonly changes?: {
		[key: string]: string;
	};

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];
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
	public constructor(vk: VK, payload: object, options: object);

	/**
	 * Adds a user or group to the community blacklist
	 */
	public ban(params: object): Promise<number>;

	/**
	 * Adds a user or group to the community blacklist
	 */
	public unban(): Promise<number>;
}

export class MessageAllowContext extends Context {
	/**
	 * Constructor
	 */
	public constructor(vk: VK, payload: object, options: object);

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
	public constructor(vk: VK, payload: object, options: object);

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
	public readonly geo?: {
		type: string;
		coordinates: string;
		place: object;
	};

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public readonly messagePayload?: any;

	/**
	 * Returns the forwards
	 */
	public readonly forwards: MessageForwardsCollection;

	/**
	 * Returns the reply message
	 */
	public readonly replyMessage?: MessageReply;

	/**
	 * Returns the attachments
	 */
	public readonly attachments: Attachment[];

	/**
	 * Constructor
	 */
	public constructor(vk: VK, payload: object | (number | object)[], options: object);

	/**
	 * Load message payload
	 */
	public loadMessagePayload(): Promise<void>;

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];

	/**
	 * Gets a link to invite the user to a conversation
	 */
	public getInviteLink(params: object): Promise<{
		link: string;
	}>;

	/**
	 * Edits a message
	 */
	public editMessage(params: Params.MessagesSendParams): Promise<number>;

	/**
	 * Edits a message text
	 */
	public editMessageText(message: string): Promise<number>;

	/**
	 * Sends a message to the current dialog
	 */
	public send(text: string, params?: Params.MessagesSendParams): Promise<number>;

	public send(text: Params.MessagesSendParams): Promise<number>;

	/**
	 * Responds to the current message
	 */
	public reply(text: string, params?: Params.MessagesSendParams): Promise<number>;

	public reply(text: Params.MessagesSendParams): Promise<number>;

	/**
	 * Sends a sticker to the current dialog
	 */
	public sendSticker(id: number): Promise<number>;

	/**
	 * Sends a photo to the current dialog
	 */

	public sendPhoto(
		sources: UploadSource[] | UploadSource,
		params?: Params.MessagesSendParams
	): Promise<number>;

	/**
	 * Sends a document to the current dialog
	 */

	public sendDocument(
		sources: UploadSource[] | UploadSource,
		params?: Params.MessagesSendParams
	): Promise<number>;

	/**
	 * Sends a audio message to the current dialog
	 */

	public sendAudioMessage(
		sources: UploadSource[] | UploadSource,
		params?: Params.MessagesSendParams
	): Promise<number>;

	/**
	 * Changes the status of typing in the dialog
	 */
	public setActivity(): Promise<boolean>;

	/**
	 * Marks messages as important or removes a mark.
	 */
	public markAsImportant(ids?: number[], options?: object): Promise<number[]>;

	/**
	 * Deletes the message
	 */
	public deleteMessage(ids?: number[], options?: object): Promise<number[]>;

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
	public newChatPhoto(source: UploadSource, params?: object): Promise<{
		message_id: number;
		chat_id: object;
	}>;

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
	public constructor(vk: VK, payload: object, options: object);

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
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];

	/**
	 * Removes the attachment
	 */
	public deleteAttachment(): Promise<number>;
}

export class ReadMessagesContext extends Context {
	/**
	 * Constructor
	 */
	public constructor(vk: VK, payload: object, options: object);

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
	public constructor(vk: VK, payload: object, options: object);

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
	public attachments: Attachment[];

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
	public readonly geo?: {
		type: string;
		coordinates: string;
		place: object;
	};

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
	public readonly author: object;

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
	public constructor(vk: VK, payload: object, options: object);

	/**
	 * Checks for the presence of attachments
	*/
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];
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
	public constructor(vk: VK, payload: number[], options: object);
}

export class UserOnlineContext extends Context {
	/**
	 * Constructor
	 */
	public constructor(vk: VK, payload: number[]);

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
	public constructor(vk: VK, payload?: object, options?: object);

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
	public deletePost(): Promise<number>;
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
	public readonly forwards: MessageForward[];

	/**
	 * Returns the attachments
	 */
	public readonly attachments: Attachment[];

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

	/**
	 * Checks for the presence of attachments
	*/
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];


	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object;
}

export class MessageForwardsCollection extends Array<MessageForward> {
	/**
	 * Returns a flat copy of forwards
	 */
	public readonly flatten: MessageForward[];

	/**
	 * Checks for the presence of attachments
	*/
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];
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
	public readonly attachments: Attachment[];

	/**
	 * Constructor
	 */
	public constructor(payload: object, vk?: VK);

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type?: AttachmentPossibleTypes): boolean;

	/**
	 * Returns the attachments
	 */
	public getAttachments(type?: AttachmentPossibleTypes): Attachment[];

	public getAttachments(type: 'audio'): AudioAttachment[];

	public getAttachments(type: 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: 'graffiti'): GraffitiAttachment[];

	public getAttachments(type: 'doc'): DocumentAttachment[];

	public getAttachments(type: 'gift'): GiftAttachment[];

	public getAttachments(type: 'link'): LinkAttachment[];

	public getAttachments(type: 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: 'market'): MarketAttachment[];

	public getAttachments(type: 'photo'): PhotoAttachment[];

	public getAttachments(type: 'sticker'): StickerAttachment[];

	public getAttachments(type: 'video'): VideoAttachment[];

	public getAttachments(type: 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: 'wall'): WallAttachment[];

	public getAttachments(type: 'poll'): PollAttachment[];

	/**
	 * Returns data for JSON
	 */
	public toJSON(): object;
}

/**
 * Basic button interface
 */
export interface IButton {
	action: {
		type: string;
	};
}

/**
 * Button payload, no more than 255 characters in JSON stringified
 */
export declare type ButtonPayload = object | string;

/**
 * Primary colors used in the text button
 */
export declare enum ButtonColor {
	/**
	 * The white button, indicates secondary action
	 *
	 * Hex color #FFFFFF
	 */
	SECONDARY = 'secondary',

	/**
	 * The blue button, indicates the main action
	 *
	 * Hex color #5181B8
	 */
	PRIMARY = 'primary',

	/**
	 * The red button, indicates a dangerous or a negative action (reject, delete, etc...)
	 *
	 * Hex color #E64646
	 */
	NEGATIVE = 'negative',

	/**
	 * The green button, indicates a agree, confirm, ...etc
	 *
	 * Hex color #4BB34B
	 */
	POSITIVE = 'positive'
}

export declare type ButtonColorUnion = 'secondary' | 'primary' | 'negative' | 'positive';

export interface ITextButton extends IButton {
	/**
	 * Button color, default is secondary
	 */
	color: ButtonColor | ButtonColorUnion;

	action: {
		type: 'text';
		/**
		 * Button label, no more than 40 characters
		 */
		label: string;
		/**
		 * Payload, preferably use object
		 */
		payload: ButtonPayload;
	};
}
export interface ILocationButton extends IButton {
	action: {
		type: 'location';

		/**
		 * Payload, preferably use object
		 */
		payload: ButtonPayload;
	};
}
export interface IVKPayButton extends IButton {
	action: {
		type: 'vkpay';

		/**
		 * line containing VK Pay payment parameters
		 * and application ID in the aid parameter, separated by &.
		 * ```
		 * action=transfer-to-group&group_id=1&aid=10
		 * ```
		 */
		hash: string;
	};
}
export interface IVKApplicationButton extends IButton {
	action: {
		type: 'open_app';

		/**
		 * Application label, no more than 40 characters
		 */
		label: string;

		/**
		 * The identifier of the called application with type VK Apps
		 */
		app_id: number;

		/**
		 * ID of the community in which the application is installed,
		 * if you want to open it in the context of the community
		 */
		owner_id?: number;

		/**
		 * The hash for navigation in the application
		 * will be transmitted in the start parameters line after the # character
		 */
		hash?: string;
	};
}

export declare type KeyboardButton =
	ITextButton
	| ILocationButton
	| IVKPayButton
	| IVKApplicationButton;

export interface IKeyboardTextButtonOptions {
	/**
	 * Button color, default is secondary
	 */
	color?: ButtonColor | ButtonColorUnion;

	/**
	 * Button label, no more than 40 characters
	 */
	label: string;

	/**
	 * Payload, preferably use object
	 *
	 * No more than 255 characters in JSON stringified
	 */
	payload?: ButtonPayload;
}

export interface IKeyboardLocationRequestButtonOptions {
	/**
	 * Payload, preferably use object
	 *
	 * No more than 255 characters in JSON stringified
	 */
	payload?: ButtonPayload;
}

/**
 * Payment in favor of the group with a given amount
 */
export interface IVKPayPayToGroup {
	action: 'pay-to-group';

	/**
	 * Group ID to which the payment will be transferred
	 */
	group_id: number;

	/**
	 * Payment amount in rubles. The minimum value is 1
	 */
	amount: number;

	/**
	 * Payment description
	 */
	description?: string;

	/**
	 * Arbitrary payload
	 */
	data?: string;
}

/**
 * Payment in favor of the user with a given amount
 */
export interface IVKPayPayToUser {
	action: 'pay-to-user';

	/**
	 * User ID to which the payment will be transferred
	 */
	user_id: number;

	/**
	 * Payment amount in rubles. The minimum value is 1
	 */
	amount: number;

	/**
	 * Payment description
	 */
	description?: string;
}

/**
 * Transfer to a group of arbitrary amount
 */
export interface IVKPayTransferToGroup {
	action: 'transfer-to-group';

	/**
	 * Group ID to which the payment will be transferred
	 */
	group_id: number;
}

/**
 * Transfer to a user of arbitrary amount
 */
export interface IVKPayTransferToUser {
	action: 'transfer-to-user';

	/**
	 * User ID to which the payment will be transferred
	 */
	user_id: number;
}

export declare type KeyboardVKPayHash =
	(IVKPayPayToGroup
	| IVKPayPayToUser
	| IVKPayTransferToGroup
	| IVKPayTransferToUser) & {
		/**
		 * Application id
		 */
		aid: string | number;
	};

export interface IKeyboardVKPayButtonOptions {
	/**
	 * line containing VK Pay payment parameters
	 * and application ID in the aid parameter, separated by &.
	 *
	 * ```ts
	 * {
	 *  action: 'transfer-to-group',
	 *  group_id: 1,
	 *  aid: 10
	 * }
	 * ```
	 *
	 * Or write the string
	 *
	 * ```
	 * action=transfer-to-group&group_id=1&aid=10
	 * ```
	 */
	hash: KeyboardVKPayHash | string;
}

export interface IKeyboardApplicationButtonOptions {
	/**
	 * Application label, no more than 40 characters
	 */
	label: string;

	/**
	 * The identifier of the called application with type VK Apps
	 */
	appId: number;

	/**
	 * ID of the community in which the application is installed,
	 * if you want to open it in the context of the community
	 */
	ownerId?: number;

	/**
	 * The hash for navigation in the application
	 * will be transmitted in the start parameters line after the # character
	 */
	hash?: string;
}

export interface IKeyboardProxyButton {
	options: (
		IKeyboardTextButtonOptions
		| IKeyboardLocationRequestButtonOptions
		| IKeyboardVKPayButtonOptions
		| IKeyboardApplicationButtonOptions
	);

	kind: 'text' | 'location_request' | 'vk_pay' | 'vk_application';
}

export class KeyboardBuilder {
	/**
	 * Does the keyboard close after pressing the button
	 */
	protected isOneTime: boolean;

	/**
	 * Rows with all buttons
	 */
	protected rows: KeyboardButton[][];

	/**
	 * Current row of buttons
	 */
	protected currentRow: KeyboardButton[];

	/**
	 * Returns custom tag
	 */
	public readonly [Symbol.toStringTag]: string;

	/**
	 * Text button, can be colored
	 *
	 * ```ts
	 * builder.textButton({
	 *  label: 'Buy a coffee',
	 *  payload: {
	 *   command: 'buy',
	 *   item: 'coffee'
	 *  },
	 *  color: Keyboard.POSITIVE_COLOR
	 * });
	 * ```
	 */
	public textButton(
		{ label, payload: rawPayload, color }: IKeyboardTextButtonOptions
	): this;

	/**
	 * User location request button, occupies the entire keyboard width
	 *
	 * ```ts
	 * builder.locationRequestButton({
	 *  payload: {
	 *   command: 'order_delivery'
	 *  }
	 * })
	 * ```
	 */
	public locationRequestButton(
		{ payload: rawPayload }: IKeyboardLocationRequestButtonOptions
	): this;

	/**
	 * VK Pay button, occupies the entire keyboard width
	 *
	 * ```ts
	 * builder.payButton({
	 *  hash: {
	 *   action: 'transfer-to-group',
	 *   group_id: 1,
	 *   aid: 10
	 *  }
	 * })
	 * ```
	 */
	public payButton({ hash: rawHash }: IKeyboardVKPayButtonOptions): this;

	/**
	 * VK Apps button, occupies the entire keyboard width
	 *
	 * ```ts
	 * builder.applicationButton({
	 *  label: 'LiveWidget',
	 *  appId: 6232540,
	 *  ownerId: -157525928
	 * })
	 * ```
	 */
	public applicationButton({
		label,
		appId,
		ownerId,
		hash
	}: IKeyboardApplicationButtonOptions): this;

	/**
	 * Saves the current row of buttons in the general rows
	 */
	public row(): this;

	/**
	 * Sets the keyboard to close after pressing
	 *
	 * ```ts
	 *  builder.oneTime();
	 *
	 *  builder.oneTime(false);
	 * ```
	 */
	public oneTime(enabled?: boolean): this;

	/**
	 * Clones the builder with all the settings
	 */
	public clone(): KeyboardBuilder;

	/**
	 * Returns a string to keyboard a VK
	 */
	public toString(): string;

	/**
	 * Adds a button to the current row
	 */
	protected addButton(button: KeyboardButton): this;

	/**
	 * Adds a wide button to the new row
	 */
	protected addWideButton(button: KeyboardButton): this;
}

export class Keyboard {
	/**
	 * Returns custom tag
	 */
	public readonly [Symbol.toStringTag]: string;

	/**
	 * @deprecated Use Keyboard.SECONDARY_COLOR instead
	 */
	public static readonly DEFAULT_COLOR: ButtonColor.SECONDARY;

	/**
	 * The white button, indicates secondary action
	 *
	 * Hex color #FFFFFF
	 */
	public static readonly SECONDARY_COLOR: ButtonColor.SECONDARY;

	/**
	 * The blue button, indicates the main action
	 *
	 * Hex color #5181B8
	 */
	public static readonly PRIMARY_COLOR: ButtonColor.PRIMARY;

	/**
	 * The red button, indicates a dangerous or a negative action (reject, delete, etc...)
	 *
	 * Hex color #E64646
	 */
	public static readonly NEGATIVE_COLOR: ButtonColor.NEGATIVE;

	/**
	 * The green button, indicates a agree, confirm, ...etc
	 *
	 * Hex color #4BB34B
	 */
	public static readonly POSITIVE_COLOR: ButtonColor.POSITIVE;

	/**
	 * Returns keyboard builder
	 */
	public static builder(): KeyboardBuilder;

	/**
	 * Assembles a builder of buttons
	 */
	public static keyboard(rows: (IKeyboardProxyButton | IKeyboardProxyButton[])[]): KeyboardBuilder;

	/**
	 * Text button, can be colored
	 */
	public static textButton(options: IKeyboardTextButtonOptions): IKeyboardProxyButton;

	/**
	 * User location request button, occupies the entire keyboard width
	 */
	public static locationRequestButton(
		options: IKeyboardLocationRequestButtonOptions
	): IKeyboardProxyButton;

	/**
	 * VK Pay button, occupies the entire keyboard width
	 */
	public static payButton(options: IKeyboardVKPayButtonOptions): IKeyboardProxyButton;

	/**
	 * VK Apps button, occupies the entire keyboard width
	 */
	public static applicationButton(options: IKeyboardApplicationButtonOptions): IKeyboardProxyButton;
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
	public constructor(options: object);

	/**
	 * Returns property for json
	 */
	public toJSON(): object;
}

export class APIError extends VKError {
	public params: {
		key: string;
		value: string;
	}[];

	public captchaSid: number;

	public captchaImg: string;

	public redirectUri: string;

	public confirmationText: string;

	/**
	 * Constructor
	 */
	public constructor(options: object);
}

export interface IAuthErrorOptions {
	code: number;
	message: string;
	pageHtml: string | null;
}

export class AuthError extends VKError {
	public pageHtml: string | null;

	public constructor(options: IAuthErrorOptions);
}

export class CollectError extends VKError {
	public errors: object[];

	/**
	 * Constructor
	 */
	public constructor(options: object);
}

export class ExecuteError extends VKError {
	public method: string;

	/**
	 * Constructor
	 */
	public constructor(options: object);
}

export class SnippetsError extends VKError {}

export class StreamingRuleError extends VKError {
	/**
	 * Constructor
	 */
	public constructor(options: object);
}

export class UpdatesError extends VKError {}

export class UploadError extends VKError {}

export class CallbackService {
	/**
	 * Constructor
	 */
	public constructor(vk: VK);

	/**
	 * Processing captcha
	 */
	public processingCaptcha(payload: object): Promise<void>;

	/**
	 * Processing two-factor
	 */
	public processingTwoFactor(payload: object): Promise<void>;
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
	COMMERCIAL_ERROR: number;
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
// }
