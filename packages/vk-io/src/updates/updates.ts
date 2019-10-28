// @ts-ignore
import createDebug from 'debug';
import {
	Middleware,

	compose,
	getOptionalMiddleware,

	noopNext
} from 'middleware-io';

import { inspect } from 'util';

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
	VKPayTransactionContext
} from '../structures/contexts';

import { PollingTransport, WebhookTransport } from './transports';
import VK from '../vk';

import {
	unifyCondition,
	getObjectValue,
	splitPath
} from './helpers';
import { APIErrorCode } from '../errors';

import { UpdateSource } from '../utils/constants';

const debug = createDebug('vk-io:updates');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const webhookContextsEvents: [string[], any][] = [
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
const pollingContextsEvents: [number[], any][] = [
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


const makeContexts = (groups: [(number | string)[], Context][]): Record<string, Context> => {
	const contexts: Record<string | number, Context> = {};

	for (const [events, UpdateContext] of groups) {
		for (const event of events) {
			contexts[event] = UpdateContext;
		}
	}

	return contexts;
};

// @ts-ignore
const webhookContexts = makeContexts(webhookContextsEvents);
// @ts-ignore
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
	[P in keyof T]: HearCondition<T[P], T> | HearCondition<T[P], T>[];
};

/**
 * TODO: Divide into contexts and render possible types.
 */
export type ContextTypes = 'message' | 'message_subscribers' | 'new_attachment' | 'wall_post' | 'group_member' | 'group_user' | 'comment' | 'vote' | 'group_update' | 'typing';
export type ContextSubTypes = 'new_message' | 'edit_message' | 'message_subscribe' | 'message_unsubscribe' | 'new_photo_attachment' | 'new_video_attachment' | 'new_audio_attachment' | 'new_wall_post' | 'new_wall_repost' | 'join_group_member' | 'leave_group_member' | 'block_group_user' | 'unblock_group_user' | 'photo_comment' | 'video_comment' | 'wall_comment' | 'board_comment' | 'market_comment' | 'new_photo_comment' | 'edit_photo_comment' | 'delete_photo_comment' | 'restore_photo_comment' | 'new_video_comment' | 'edit_video_comment' | 'delete_video_comment' | 'restore_video_comment' | 'new_wall_comment' | 'edit_wall_comment' | 'delete_wall_comment' | 'restore_wall_comment' | 'new_board_comment' | 'edit_board_comment' | 'delete_board_comment' | 'restore_board_comment' | 'new_market_comment' | 'edit_market_comment' | 'delete_market_comment' | 'restore_market_comment' | 'pull_vote' | 'group_update_photo' | 'group_update_officers' | 'group_update_settings' | 'typing_user' | 'typing_group';

export type ContextPossibleTypes = ContextTypes | ContextSubTypes | string;

export default class Updates {
	protected vk: VK;

	protected pollingTransport: PollingTransport;

	protected webhookTransport: WebhookTransport;

	protected stack: Middleware<Context>[] = [];

	protected hearStack: Middleware<Context>[] = [];

	protected stackMiddleware!: Middleware<Context>;

	protected hearFallbackHandler: Middleware<MessageContext> = (
		context,
		next
	): Promise<void> => next();

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
		this.stack.push(middleware);

		this.reloadMiddleware();

		return this;
	}

	/**
	 * Subscribe to events
	 */

	public on<T = {}>(events: 'message' | 'new_message' | 'edit_message', handler: Middleware<MessageContext & T>): this


	public on<T = {}>(events: 'message_subscribers' | 'message_subscribe' | 'message_unsubscribe', handler: Middleware<MessageAllowContext & T>): this


	public on<T = {}>(events: 'new_attachment' | 'new_photo_attachment' | 'new_video_attachment' | 'new_audio_attachment', handler: Middleware<NewAttachmentsContext & T>): this


	public on<T = {}>(events: 'wall_post' | 'new_wall_post' | 'new_wall_repost', handler: Middleware<WallPostContext & T>): this


	public on<T = {}>(events: 'group_member' | 'join_group_member' | 'leave_group_member', handler: Middleware<GroupMemberContext & T>): this


	public on<T = {}>(events: 'group_user' | 'block_group_user' | 'unblock_group_user', handler: Middleware<GroupUserContext & T>): this


	public on<T = {}>(events: 'comment' | 'photo_comment' | 'video_comment' | 'wall_comment' | 'board_comment' | 'market_comment' | 'new_photo_comment' | 'edit_photo_comment' | 'delete_photo_comment' | 'restore_photo_comment' | 'new_video_comment' | 'edit_video_comment' | 'delete_video_comment' | 'restore_video_comment' | 'new_wall_comment' | 'edit_wall_comment' | 'delete_wall_comment' | 'restore_wall_comment' | 'new_board_comment' | 'edit_board_comment' | 'delete_board_comment' | 'restore_board_comment' | 'new_market_comment' | 'edit_market_comment' | 'delete_market_comment' | 'restore_market_comment', handler: Middleware<CommentActionContext & T>): this


	public on<T = {}>(events: 'vote' | 'pull_vote', handler: Middleware<VoteContext & T>): this


	public on<T = {}>(events: 'group_update' | 'group_update_photo' | 'group_update_officers' | 'group_update_settings', handler: Middleware<GroupUpdateContext & T>): this


	public on<T = {}>(events: 'typing' | 'typing_user' | 'typing_group', handler: Middleware<TypingContext & T>): this;

	public on<T = {}>(
		rawEvents: ContextPossibleTypes[] | ContextPossibleTypes,
		handler: Middleware<Context & T>
	): this {
		const events = !Array.isArray(rawEvents)
			? [rawEvents]
			: rawEvents;

		const hasEvents = events.every(Boolean);

		if (!hasEvents) {
			throw new Error('Events should be not empty');
		}

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
			HearCondition<string | null, T & MessageContext>[]
			| HearCondition<string | null, T & MessageContext>
		)
		| (
			HearObjectCondition<T & MessageContext>
			| HearObjectCondition<T & MessageContext>[]
		),
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

				return (text: string | null, context: MessageContext): boolean => (
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
				return (text: string | null, context: MessageContext): boolean => {
					const passed = condition.test(text!);

					if (passed) {
						context.$match = text!.match(condition)!;
					}

					return passed;
				};
			}

			const stringCondition = String(condition);

			return (text: string | null): boolean => text === stringCondition;
		});

		const needText = textCondition && functionCondtion === false;

		// @ts-ignore
		this.hearStack.push((context: MessageContext, next: Function): Promise<void> => {
			const { text } = context;

			if (needText && text === null) {
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

		return this;
	}

	/**
	 * Handles longpoll event
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public handlePollingUpdate(update: any[]): Promise<void> {
		debug('longpoll update', update);

		const { 0: type } = update;

		const UpdateContext = pollingContexts[type];

		if (!UpdateContext) {
			debug(`Unsupported polling context type ${type}`);

			return Promise.resolve();
		}

		// @ts-ignore
		return this.dispatchMiddleware(new UpdateContext({
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
	public handleWebhookUpdate(update: Record<string, any>): Promise<void> {
		debug('webhook update', update);

		const { type, object: payload, group_id: groupId } = update;

		const UpdateContext = webhookContexts[type];

		if (!UpdateContext) {
			debug(`Unsupported webhook context type ${type}`);

			return Promise.resolve();
		}

		// @ts-ignore
		return this.dispatchMiddleware(new UpdateContext({
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

		const isGroup = pollingGroupId !== null;

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
				// @ts-ignore
				const [group] = await this.vk.api.groups.getById();

				this.vk.options.pollingGroupId = group.id;
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
	public getWebhookCallback(path: string | null = null): Function {
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
	public dispatchMiddleware(context: Context): Promise<void> {
		return this.stackMiddleware(context, noopNext);
	}

	/**
	 * Reloads middleware
	 */
	protected reloadMiddleware(): void {
		const stack = [...this.stack];

		if (this.hearStack.length !== 0) {
			stack.push(
				// @ts-ignore
				getOptionalMiddleware(
					(context: MessageContext): boolean => context.type === 'message' && !context.isEvent,
					compose([
						...this.hearStack,
						this.hearFallbackHandler
					])
				)
			);
		}

		this.stackMiddleware = compose(stack);
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;

		const { isStarted, stack } = this;

		const payload = { isStarted, stack };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
