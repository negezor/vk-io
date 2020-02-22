import createDebug from 'debug';
import {
	Middleware,

	compose,
	skipMiddleware,

	noopNext
} from 'middleware-io';

import {
	Context,
	VoteContext,
	TypingContext,
	MessageContext,
	WallPostContext,
	GroupUserContext,
	UserOnlineContext,
	GroupUpdateContext,
	DialogFlagsContext,
	GroupMemberContext,
	MessageAllowContext,
	ReadMessagesContext,
	MessageFlagsContext,
	VKAppPayloadContext,
	CommentActionContext,
	NewAttachmentsContext,
	RemovedMessagesContext,
	VKPayTransactionContext,

	CommentActionContextType,
	DialogFlagsContextType,
	GroupMemberContextType,
	GroupUpdateContextType,
	GroupUserContextType,
	MessageAllowContextType,
	MessageFlagsContextType,
	MessageContextType,
	NewAttachmentsContextType,
	ReadMessagesContextType,
	RemovedMessagesContextType,
	TypingContextType,
	UserOnlineContextType,
	VKAppPayloadContextType,
	VKPayTransactionContextType,
	VoteContextType,
	WallPostContextType,

	CommentActionContextSubType,
	DialogFlagsContextSubType,
	GroupMemberContextSubType,
	GroupUpdateContextSubType,
	GroupUserContextSubType,
	MessageAllowContextSubType,
	MessageFlagsContextSubType,
	MessageContextSubType,
	NewAttachmentsContextSubType,
	ReadMessagesContextSubType,
	RemovedMessagesContextSubType,
	TypingContextSubType,
	UserOnlineContextSubType,
	VKAppPayloadContextSubType,
	VKPayTransactionContextSubType,
	VoteContextSubType,
	WallPostContextSubType
} from '../structures/contexts';

import { PollingTransport, WebhookTransport } from './transports';
import { VK } from '../vk';

import {
	unifyCondition,
	getObjectValue,
	splitPath
} from './helpers';
import { APIErrorCode } from '../errors';

import { UpdateSource } from '../utils/constants';
import { AllowArray, Constructor } from '../types';
import { inspectable } from '../utils/inspectable';
import { Composer } from '../structures/shared/composer';

const debug = createDebug('vk-io:updates');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const webhookContextsEvents: [string[], Constructor<any>][] = [
	[
		['message_new', 'message_edit', 'message_reply'],
		MessageContext
	],
	[
		['message_allow', 'message_deny'],
		MessageAllowContext
	],
	[
		['photo_new', 'audio_new', 'video_new'],
		NewAttachmentsContext
	],
	[
		['wall_post_new', 'wall_repost'],
		WallPostContext
	],
	[
		['group_join', 'group_leave'],
		GroupMemberContext
	],
	[
		['user_block', 'user_unblock'],
		GroupUserContext
	],
	[
		[
			'photo_comment_new',
			'photo_comment_edit',
			'photo_comment_delete',
			'photo_comment_restore',
			'video_comment_new',
			'video_comment_edit',
			'video_comment_delete',
			'video_comment_restore',
			'wall_reply_new',
			'wall_reply_edit',
			'wall_reply_delete',
			'wall_reply_restore',
			'board_post_new',
			'board_post_edit',
			'board_post_delete',
			'board_post_restore',
			'market_comment_new',
			'market_comment_edit',
			'market_comment_delete',
			'market_comment_restore'
		],
		CommentActionContext
	],
	[
		['poll_vote_new'],
		VoteContext
	],
	[
		['group_change_photo', 'group_officers_edit', 'group_change_settings'],
		GroupUpdateContext
	],
	[
		['message_typing_state'],
		TypingContext
	],
	[
		['app_payload'],
		VKAppPayloadContext
	],
	[
		['vkpay_transaction'],
		VKPayTransactionContext
	]
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const pollingContextsEvents: [number[], Constructor<any>][] = [
	[
		[1, 2, 3],
		MessageFlagsContext
	],
	[
		[4, 5],
		MessageContext
	],
	[
		[6, 7],
		ReadMessagesContext
	],
	[
		[8, 9],
		UserOnlineContext
	],
	[
		[10, 11, 12],
		DialogFlagsContext
	],
	[
		[13, 14],
		RemovedMessagesContext
	],
	[
		[61, 62],
		TypingContext
	]
];

const makeContexts = (
	groups: [(number | string)[], Constructor<Context>][]
): Record<string, Constructor<Context>> => {
	const contexts: Record<string | number, Constructor<Context>> = {};

	for (const [events, UpdateContext] of groups) {
		for (const event of events) {
			contexts[event] = UpdateContext;
		}
	}

	return contexts;
};

const webhookContexts = makeContexts(webhookContextsEvents);
const pollingContexts = makeContexts(pollingContextsEvents);

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
	[P in keyof T]: AllowArray<HearCondition<T[P], T>>;
};

/**
 * TODO: Divide into contexts and render possible types.
 */
export type ContextTypes =
CommentActionContextType
| DialogFlagsContextType
| GroupMemberContextType
| GroupUpdateContextType
| GroupUserContextType
| MessageAllowContextType
| MessageFlagsContextType
| MessageContextType
| NewAttachmentsContextType
| ReadMessagesContextType
| RemovedMessagesContextType
| TypingContextType
| UserOnlineContextType
| VKAppPayloadContextType
| VKPayTransactionContextType
| VoteContextType
| WallPostContextType;

export type ContextSubTypes =
CommentActionContextSubType
| DialogFlagsContextSubType
| GroupMemberContextSubType
| GroupUpdateContextSubType
| GroupUserContextSubType
| MessageAllowContextSubType
| MessageFlagsContextSubType
| MessageContextSubType
| NewAttachmentsContextSubType
| ReadMessagesContextSubType
| RemovedMessagesContextSubType
| TypingContextSubType
| UserOnlineContextSubType
| VKAppPayloadContextSubType
| VKPayTransactionContextSubType
| VoteContextSubType
| WallPostContextSubType;

export type ContextPossibleTypes = ContextTypes | ContextSubTypes | string;

export class Updates {
	protected vk: VK;

	protected pollingTransport: PollingTransport;

	protected webhookTransport: WebhookTransport;

	protected composer = Composer.builder<Context>();

	protected hearComposer = Composer.builder<MessageContext>();

	protected stackMiddleware!: Middleware<Context>;

	protected hearFallbackHandler: Middleware<MessageContext> = skipMiddleware;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;

		this.reloadMiddleware();

		this.pollingTransport = new PollingTransport(vk);
		this.webhookTransport = new WebhookTransport(vk);

		this.webhookTransport.subscribe(this.handleWebhookUpdate.bind(this));
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Checks is started
	 */
	public get isStarted(): boolean {
		return this.pollingTransport.started || this.webhookTransport.started;
	}

	/**
	 * Added middleware
	 */
	public use<T = {}>(middleware: Middleware<Context & T>): this {
		if (typeof middleware !== 'function') {
			throw new TypeError('Middleware must be a function');
		}

		// @ts-ignore
		this.composer.use(middleware);

		this.reloadMiddleware();

		return this;
	}

	/**
	 * Subscribe to events
	 */
	public on<T = {}>(
		events: AllowArray<CommentActionContextType | CommentActionContextSubType>,
		handler: AllowArray<Middleware<CommentActionContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<DialogFlagsContextType | DialogFlagsContextSubType>,
		handler: AllowArray<Middleware<DialogFlagsContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<GroupMemberContextType | GroupMemberContextSubType>,
		handler: AllowArray<Middleware<GroupMemberContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<GroupUpdateContextType | GroupUpdateContextSubType>,
		handler: AllowArray<Middleware<GroupUpdateContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<GroupUserContextType | GroupUserContextSubType>,
		handler: AllowArray<Middleware<GroupUserContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<MessageAllowContextType | MessageAllowContextSubType>,
		handler: AllowArray<Middleware<MessageAllowContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<MessageFlagsContextType | MessageFlagsContextSubType>,
		handler: AllowArray<Middleware<MessageFlagsContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<MessageContextType | MessageContextSubType>,
		handler: AllowArray<Middleware<MessageContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<NewAttachmentsContextType | NewAttachmentsContextSubType>,
		handler: AllowArray<Middleware<NewAttachmentsContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<ReadMessagesContextType | ReadMessagesContextSubType>,
		handler: AllowArray<Middleware<ReadMessagesContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<RemovedMessagesContextType | RemovedMessagesContextSubType>,
		handler: AllowArray<Middleware<RemovedMessagesContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<TypingContextType | TypingContextSubType>,
		handler: AllowArray<Middleware<TypingContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<UserOnlineContextType | UserOnlineContextSubType>,
		handler: AllowArray<Middleware<UserOnlineContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<VKAppPayloadContextType | VKAppPayloadContextSubType>,
		handler: AllowArray<Middleware<VKAppPayloadContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<VKPayTransactionContextType | VKPayTransactionContextSubType>,
		handler: AllowArray<Middleware<VKPayTransactionContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<VoteContextType | VoteContextSubType>,
		handler: AllowArray<Middleware<VoteContext & T>>
	): this;

	public on<T = {}>(
		events: AllowArray<WallPostContextType | WallPostContextSubType>,
		handler: AllowArray<Middleware<WallPostContext & T>>
	): this;

	public on<T = {}>(
		rawEvents: AllowArray<ContextPossibleTypes>,
		rawHandlers: AllowArray<Middleware<Context & T>>
	): this {
		const events = !Array.isArray(rawEvents)
			? [rawEvents]
			: rawEvents;

		const hasEvents = events.every(Boolean);

		if (!hasEvents) {
			throw new Error('Events should be not empty');
		}

		const handler = Array.isArray(rawHandlers)
			? compose(rawHandlers)
			: rawHandlers;

		if (typeof handler !== 'function') {
			throw new TypeError('Handler must be a function');
		}

		return this.use((context, next): Promise<void> => (
			context.is(events)
				// @ts-ignore
				? handler(context, next)
				: next()
		));
	}

	/**
	 * Listen by context condition
	 */
	public hear<T = {}>(
		hearConditions: (
			AllowArray<HearCondition<string | undefined, T & MessageContext>>
			| AllowArray<HearObjectCondition<T & MessageContext>>),
		handler: Middleware<MessageContext & T>
	): this {
		const rawConditions = !Array.isArray(hearConditions)
			? [hearConditions]
			: hearConditions;

		const hasConditions = rawConditions.every(Boolean);

		if (!hasConditions) {
			throw new Error('Condition should be not empty');
		}

		if (typeof handler !== 'function') {
			throw new TypeError('Handler must be a function');
		}

		let textCondition = false;
		let functionCondtion = false;
		// @ts-ignore
		const conditions = rawConditions.map((condition): Function => {
			if (typeof condition === 'object' && !(condition instanceof RegExp)) {
				functionCondtion = true;

				const entries = Object.entries(condition).map(([path, value]): [string[], Function] => (
					[splitPath(path), unifyCondition(value)]
				));

				return (text: string | undefined, context: MessageContext): boolean => (
					entries.every(([selectors, callback]): boolean => {
						const value = getObjectValue(context, selectors);

						return callback(value, context);
					})
				);
			}

			if (typeof condition === 'function') {
				functionCondtion = true;

				return condition;
			}

			textCondition = true;

			if (condition instanceof RegExp) {
				return (text: string | undefined, context: MessageContext): boolean => {
					const passed = condition.test(text!);

					if (passed) {
						context.$match = text!.match(condition)!;
					}

					return passed;
				};
			}

			const stringCondition = String(condition);

			return (text: string | undefined): boolean => text === stringCondition;
		});

		const needText = textCondition && functionCondtion === false;

		this.hearComposer.use((context: MessageContext, next: Function): Promise<void> => {
			const { text } = context;

			if (needText && text === undefined) {
				return next();
			}

			const hasSome = conditions.some((condition): boolean => (
				condition(text, context)
			));

			return hasSome
				// @ts-ignore
				? handler(context, next)
				: next();
		});

		this.reloadMiddleware();

		return this;
	}

	/**
	 * A handler that is called when handlers are not found
	 */
	public setHearFallbackHandler<T = {}>(handler: Middleware<MessageContext & T>): this {
		// @ts-ignore
		this.hearFallbackHandler = handler;

		this.reloadMiddleware();

		return this;
	}

	/**
	 * Handles longpoll event
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async handlePollingUpdate(update: any[]): Promise<void> {
		debug('longpoll update', update);

		const { 0: type } = update;

		const UpdateContext = pollingContexts[type];

		if (!UpdateContext) {
			debug(`Unsupported polling context type ${type}`);

			return;
		}

		await this.dispatchMiddleware(new UpdateContext({
			vk: this.vk,
			payload: update,
			updateType: type,
			source: UpdateSource.POLLING
		}));
	}

	/**
	 * Handles webhook event
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public async handleWebhookUpdate(update: Record<string, any>): Promise<void> {
		debug('webhook update', update);

		const { type, object: payload, group_id: groupId } = update;

		const UpdateContext = webhookContexts[type];

		if (!UpdateContext) {
			debug(`Unsupported webhook context type ${type}`);

			return;
		}

		await this.dispatchMiddleware(new UpdateContext({
			vk: this.vk,
			payload,
			groupId,
			updateType: type,
			source: UpdateSource.WEBHOOK
		}));
	}

	/**
	 * Starts to poll server
	 */
	public startPolling(): Promise<void> {
		const { pollingGroupId } = this.vk.options;

		const isGroup = pollingGroupId !== undefined;

		this.pollingTransport.subscribe(
			isGroup
				? this.handleWebhookUpdate.bind(this)
				: this.handlePollingUpdate.bind(this)
		);

		return this.pollingTransport.start();
	}

	/**
	 * Starts the webhook server
	 */
	public async startWebhook(
		options: IUpdatesStartWebhookOptions = {},
		next?: Function
	): Promise<void> {
		return this.webhookTransport.start(options, next);
	}

	/**
	 * Automatically determines the settings to run
	 */
	public async start({ webhook }: { webhook?: IUpdatesStartWebhookOptions } = {}): Promise<void> {
		if (webhook) {
			await this.startWebhook(webhook);

			return;
		}

		if (!this.vk.options.pollingGroupId) {
			try {
				const [group] = await this.vk.api.groups.getById({});

				this.vk.options.pollingGroupId = group.id!;
			} catch (error) {
				if (error.code !== APIErrorCode.WRONG_PARAMETER) {
					throw error;
				}

				debug('This is not a group.');
			}
		}

		await this.startPolling();
	}

	/**
	 * Stopping gets updates
	 */
	public async stop(): Promise<void> {
		await Promise.all([
			this.pollingTransport.stop(),
			this.webhookTransport.stop()
		]);
	}

	/**
	 * Returns webhook callback like http[s] or express
	 */
	public getWebhookCallback(path?: string): Function {
		return this.webhookTransport.getWebhookCallback(path);
	}

	/**
	 * Returns the middleware for the webhook under koa
	 */
	public getKoaWebhookMiddleware(): Function {
		return this.webhookTransport.getKoaWebhookMiddleware();
	}

	/**
	 * Calls up the middleware chain
	 */
	public dispatchMiddleware(context: Context): Promise<unknown> {
		return this.stackMiddleware(context, noopNext) as Promise<unknown>;
	}

	/**
	 * Reloads middleware
	 */
	protected reloadMiddleware(): void {
		const composer = this.composer.clone();

		if (this.hearComposer.length !== 0) {
			composer.optional(
				// @ts-ignore
				(context: MessageContext): boolean => (
					context.is('new_message') && !context.isEvent
				),
				this.hearComposer.clone()
					.use(this.hearFallbackHandler)
					.compose()
			);
		}

		this.stackMiddleware = composer.compose();
	}
}

inspectable(Updates, {
	// @ts-ignore
	serialize: ({ isStarted, composer }) => ({
		isStarted,
		composer
	})
});
