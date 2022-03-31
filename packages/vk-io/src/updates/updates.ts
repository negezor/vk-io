// @ts-ignore
import createDebug from 'debug';
// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore
import { Middleware, compose, noopNext } from 'middleware-io';
// @ts-ignore

// @ts-ignore
import { Agent, globalAgent } from 'https';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	Composer,
// @ts-ignore

// @ts-ignore
	Context,
// @ts-ignore
	VoteContext,
// @ts-ignore
	LikeContext,
// @ts-ignore
	TypingContext,
// @ts-ignore
	MessageContext,
// @ts-ignore
	WallPostContext,
// @ts-ignore
	GroupUserContext,
// @ts-ignore
	FriendActivityContext,
// @ts-ignore
	GroupUpdateContext,
// @ts-ignore
	DialogFlagsContext,
// @ts-ignore
	GroupMemberContext,
// @ts-ignore
	MarketOrderContext,
// @ts-ignore
	MessageSubscriptionContext,
// @ts-ignore
	MessagesReadContext,
// @ts-ignore
	MessageFlagsContext,
// @ts-ignore
	MessageEventContext,
// @ts-ignore
	VKAppPayloadContext,
// @ts-ignore
	CommentContext,
// @ts-ignore
	NewAttachmentsContext,
// @ts-ignore
	DialogMessagesContext,
// @ts-ignore
	DialogNotificationSettingsContext,
// @ts-ignore
	VKPayTransactionContext,
// @ts-ignore
	DonutSubscriptionContext,
// @ts-ignore
	DonutSubscriptionPriceContext,
// @ts-ignore
	DonutWithdrawContext,
// @ts-ignore

// @ts-ignore
	CommentContextType,
// @ts-ignore
	DialogFlagsContextType,
// @ts-ignore
	DialogNotificationSettingsContextType,
// @ts-ignore
	GroupMemberContextType,
// @ts-ignore
	GroupUpdateContextType,
// @ts-ignore
	GroupUserContextType,
// @ts-ignore
	MessageSubscriptionContextType,
// @ts-ignore
	MessageEventContextType,
// @ts-ignore
	MessageFlagsContextType,
// @ts-ignore
	MessageContextType,
// @ts-ignore
	NewAttachmentsContextType,
// @ts-ignore
	MessagesReadContextType,
// @ts-ignore
	DialogMessagesContextType,
// @ts-ignore
	TypingContextType,
// @ts-ignore
	FriendActivityContextType,
// @ts-ignore
	VKAppPayloadContextType,
// @ts-ignore
	VKPayTransactionContextType,
// @ts-ignore
	VoteContextType,
// @ts-ignore
	LikeContextType,
// @ts-ignore
	WallPostContextType,
// @ts-ignore
	MarketOrderContextType,
// @ts-ignore
	DonutSubscriptionContextType,
// @ts-ignore
	DonutSubscriptionPriceContextType,
// @ts-ignore
	DonutWithdrawContextType,
// @ts-ignore

// @ts-ignore
	CommentContextSubType,
// @ts-ignore
	DialogFlagsContextSubType,
// @ts-ignore
	DialogNotificationSettingsContextSubType,
// @ts-ignore
	GroupMemberContextSubType,
// @ts-ignore
	GroupUpdateContextSubType,
// @ts-ignore
	GroupUserContextSubType,
// @ts-ignore
	MessageSubscriptionContextSubType,
// @ts-ignore
	MessageEventContextSubType,
// @ts-ignore
	MessageFlagsContextSubType,
// @ts-ignore
	MessageContextSubType,
// @ts-ignore
	NewAttachmentsContextSubType,
// @ts-ignore
	MessagesReadContextSubType,
// @ts-ignore
	DialogMessagesContextSubType,
// @ts-ignore
	TypingContextSubType,
// @ts-ignore
	FriendActivityContextSubType,
// @ts-ignore
	VKAppPayloadContextSubType,
// @ts-ignore
	VKPayTransactionContextSubType,
// @ts-ignore
	VoteContextSubType,
// @ts-ignore
	LikeContextSubType,
// @ts-ignore
	WallPostContextSubType,
// @ts-ignore
	MarketOrderContextSubType,
// @ts-ignore
	DonutSubscriptionContextSubType,
// @ts-ignore
	DonutSubscriptionPriceContextSubType,
// @ts-ignore
	DonutWithdrawContextSubType
// @ts-ignore
} from '../structures';
// @ts-ignore

// @ts-ignore
import { API } from '../api';
// @ts-ignore
import { Upload } from '../upload';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	PollingTransport,
// @ts-ignore

// @ts-ignore
	WebhookTransport,
// @ts-ignore
	WebhookTransportCallback,
// @ts-ignore
	WebhookTransportKoaCallback,
// @ts-ignore
	IWebhookTransportStartOptions
// @ts-ignore
} from './transports';
// @ts-ignore

// @ts-ignore
import { APIError, APIErrorCode } from '../errors';
// @ts-ignore

// @ts-ignore
import { UpdateSource } from '../utils/constants';
// @ts-ignore
import { AllowArray, Constructor } from '../types';
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:updates');
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
const webhookContextsEvents: [string[], Constructor<any>][] = [
// @ts-ignore
	[
// @ts-ignore
		['message_new', 'message_edit', 'message_reply'],
// @ts-ignore
		MessageContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['message_allow', 'message_deny'],
// @ts-ignore
		MessageSubscriptionContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['message_event'],
// @ts-ignore
		MessageEventContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['photo_new', 'audio_new', 'video_new'],
// @ts-ignore
		NewAttachmentsContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['wall_post_new', 'wall_repost'],
// @ts-ignore
		WallPostContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['group_join', 'group_leave'],
// @ts-ignore
		GroupMemberContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['user_block', 'user_unblock'],
// @ts-ignore
		GroupUserContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[
// @ts-ignore
			'photo_comment_new',
// @ts-ignore
			'photo_comment_edit',
// @ts-ignore
			'photo_comment_delete',
// @ts-ignore
			'photo_comment_restore',
// @ts-ignore
			'video_comment_new',
// @ts-ignore
			'video_comment_edit',
// @ts-ignore
			'video_comment_delete',
// @ts-ignore
			'video_comment_restore',
// @ts-ignore
			'wall_reply_new',
// @ts-ignore
			'wall_reply_edit',
// @ts-ignore
			'wall_reply_delete',
// @ts-ignore
			'wall_reply_restore',
// @ts-ignore
			'board_post_new',
// @ts-ignore
			'board_post_edit',
// @ts-ignore
			'board_post_delete',
// @ts-ignore
			'board_post_restore',
// @ts-ignore
			'market_comment_new',
// @ts-ignore
			'market_comment_edit',
// @ts-ignore
			'market_comment_delete',
// @ts-ignore
			'market_comment_restore'
// @ts-ignore
		],
// @ts-ignore
		CommentContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['poll_vote_new'],
// @ts-ignore
		VoteContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['group_change_photo', 'group_officers_edit', 'group_change_settings'],
// @ts-ignore
		GroupUpdateContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['message_typing_state'],
// @ts-ignore
		TypingContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['app_payload'],
// @ts-ignore
		VKAppPayloadContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['vkpay_transaction'],
// @ts-ignore
		VKPayTransactionContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['like_add', 'like_remove'],
// @ts-ignore
		LikeContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['market_order_new', 'market_order_edit'],
// @ts-ignore
		MarketOrderContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[
// @ts-ignore
			'donut_subscription_create',
// @ts-ignore
			'donut_subscription_prolonged',
// @ts-ignore
			'donut_subscription_expired',
// @ts-ignore
			'donut_subscription_cancelled'
// @ts-ignore
		],
// @ts-ignore
		DonutSubscriptionContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		['donut_subscription_price_changed'],
// @ts-ignore
		DonutSubscriptionPriceContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[
// @ts-ignore
			'donut_money_withdraw',
// @ts-ignore
			'donut_money_withdraw_error'
// @ts-ignore
		],
// @ts-ignore
		DonutWithdrawContext
// @ts-ignore
	]
// @ts-ignore
];
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
const pollingContextsEvents: [number[], Constructor<any>][] = [
// @ts-ignore
	[
// @ts-ignore
		[1, 2, 3],
// @ts-ignore
		MessageFlagsContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[4, 5, 18],
// @ts-ignore
		MessageContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[6, 7],
// @ts-ignore
		MessagesReadContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[8, 9, 81],
// @ts-ignore
		FriendActivityContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[10, 11, 12],
// @ts-ignore
		DialogFlagsContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[13, 14],
// @ts-ignore
		DialogMessagesContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[63, 64, 65, 66, 67],
// @ts-ignore
		TypingContext
// @ts-ignore
	],
// @ts-ignore
	[
// @ts-ignore
		[114],
// @ts-ignore
		DialogNotificationSettingsContext
// @ts-ignore
	]
// @ts-ignore
];
// @ts-ignore

// @ts-ignore
const makeContexts = (
// @ts-ignore
	groups: [(number | string)[], Constructor<Context>][]
// @ts-ignore
): Record<string, Constructor<Context>> => {
// @ts-ignore
	const contexts: Record<string | number, Constructor<Context>> = {};
// @ts-ignore

// @ts-ignore
	for (const [events, UpdateContext] of groups) {
// @ts-ignore
		for (const event of events) {
// @ts-ignore
			contexts[event] = UpdateContext;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return contexts;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const webhookContexts = makeContexts(webhookContextsEvents);
// @ts-ignore
const pollingContexts = makeContexts(pollingContextsEvents);
// @ts-ignore

// @ts-ignore
export type ContextTypes =
// @ts-ignore
CommentContextType
// @ts-ignore
| DialogFlagsContextType
// @ts-ignore
| DialogNotificationSettingsContextType
// @ts-ignore
| GroupMemberContextType
// @ts-ignore
| GroupUpdateContextType
// @ts-ignore
| GroupUserContextType
// @ts-ignore
| MessageSubscriptionContextType
// @ts-ignore
| MessageEventContextType
// @ts-ignore
| MessageFlagsContextType
// @ts-ignore
| MessageContextType
// @ts-ignore
| NewAttachmentsContextType
// @ts-ignore
| MessagesReadContextType
// @ts-ignore
| DialogMessagesContextType
// @ts-ignore
| TypingContextType
// @ts-ignore
| FriendActivityContextType
// @ts-ignore
| VKAppPayloadContextType
// @ts-ignore
| VKPayTransactionContextType
// @ts-ignore
| VoteContextType
// @ts-ignore
| LikeContextType
// @ts-ignore
| WallPostContextType
// @ts-ignore
| DonutSubscriptionContextType
// @ts-ignore
| DonutSubscriptionPriceContextType
// @ts-ignore
| DonutWithdrawContextType;
// @ts-ignore

// @ts-ignore
export type ContextSubTypes =
// @ts-ignore
CommentContextSubType
// @ts-ignore
| DialogFlagsContextSubType
// @ts-ignore
| DialogNotificationSettingsContextSubType
// @ts-ignore
| GroupMemberContextSubType
// @ts-ignore
| GroupUpdateContextSubType
// @ts-ignore
| GroupUserContextSubType
// @ts-ignore
| MessageSubscriptionContextSubType
// @ts-ignore
| MessageEventContextSubType
// @ts-ignore
| MessageFlagsContextSubType
// @ts-ignore
| MessageContextSubType
// @ts-ignore
| NewAttachmentsContextSubType
// @ts-ignore
| MessagesReadContextSubType
// @ts-ignore
| DialogMessagesContextSubType
// @ts-ignore
| TypingContextSubType
// @ts-ignore
| FriendActivityContextSubType
// @ts-ignore
| VKAppPayloadContextSubType
// @ts-ignore
| VKPayTransactionContextSubType
// @ts-ignore
| VoteContextSubType
// @ts-ignore
| LikeContextSubType
// @ts-ignore
| WallPostContextSubType
// @ts-ignore
| DonutSubscriptionContextSubType
// @ts-ignore
| DonutSubscriptionPriceContextSubType
// @ts-ignore
| DonutWithdrawContextSubType;
// @ts-ignore

// @ts-ignore
export type ContextPossibleTypes = ContextTypes | ContextSubTypes | string;
// @ts-ignore

// @ts-ignore
export interface IUpdatesOptions {
// @ts-ignore
	api: API;
// @ts-ignore

// @ts-ignore
	upload: Upload;
// @ts-ignore

// @ts-ignore
	agent?: Agent;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Time to wait before re-querying
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `3000`
// @ts-ignore
	 */
// @ts-ignore
	pollingWait: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The number of retries at calling
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `3`
// @ts-ignore
	 */
// @ts-ignore
	pollingRetryLimit: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Group ID for polling
// @ts-ignore
	 */
// @ts-ignore
	pollingGroupId?: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Webhook secret key
// @ts-ignore
	 */
// @ts-ignore
	webhookSecret?: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Webhook confirmation key
// @ts-ignore
	 */
// @ts-ignore
	webhookConfirmation?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class Updates {
// @ts-ignore
	private pollingTransport: PollingTransport;
// @ts-ignore

// @ts-ignore
	private webhookTransport: WebhookTransport;
// @ts-ignore

// @ts-ignore
	private composer = Composer.builder<Context>()
// @ts-ignore
		.caught((context, error) => {
// @ts-ignore
			// eslint-disable-next-line no-console
// @ts-ignore
			console.error(error);
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
	private composed!: Middleware<Context>;
// @ts-ignore

// @ts-ignore
	private api: API;
// @ts-ignore

// @ts-ignore
	private upload: Upload;
// @ts-ignore

// @ts-ignore
	private options: Omit<IUpdatesOptions, 'api' | 'upload'>;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({
// @ts-ignore
		api,
// @ts-ignore
		upload,
// @ts-ignore

// @ts-ignore
		...options
// @ts-ignore
	}: Partial<IUpdatesOptions> & { api: API; upload: Upload }) {
// @ts-ignore
		this.api = api;
// @ts-ignore
		this.upload = upload;
// @ts-ignore

// @ts-ignore
		this.options = {
// @ts-ignore
			agent: globalAgent,
// @ts-ignore

// @ts-ignore
			pollingWait: 3e3,
// @ts-ignore
			pollingRetryLimit: 3,
// @ts-ignore
			pollingGroupId: undefined,
// @ts-ignore

// @ts-ignore
			webhookSecret: undefined,
// @ts-ignore
			webhookConfirmation: undefined,
// @ts-ignore

// @ts-ignore
			...options
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		this.recompose();
// @ts-ignore

// @ts-ignore
		this.pollingTransport = new PollingTransport({
// @ts-ignore
			api,
// @ts-ignore

// @ts-ignore
			...this.options
// @ts-ignore
		});
// @ts-ignore
		this.webhookTransport = new WebhookTransport({
// @ts-ignore
			api,
// @ts-ignore

// @ts-ignore
			...this.options
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.webhookTransport.subscribe(this.handleWebhookUpdate.bind(this));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is started
// @ts-ignore
	 */
// @ts-ignore
	public get isStarted(): boolean {
// @ts-ignore
		return this.pollingTransport.started || this.webhookTransport.started;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Added middleware
// @ts-ignore
	 */
// @ts-ignore
	public use<T = {}>(middleware: Middleware<Context & T>): this {
// @ts-ignore
		if (typeof middleware !== 'function') {
// @ts-ignore
			throw new TypeError('Middleware must be a function');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.composer.use(middleware);
// @ts-ignore

// @ts-ignore
		this.recompose();
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Subscribe to events
// @ts-ignore
	 */
// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<CommentContextType | CommentContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<CommentContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<DialogFlagsContextType | DialogFlagsContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<DialogFlagsContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		// eslint-disable-next-line max-len
// @ts-ignore
		events: AllowArray<DialogNotificationSettingsContextType | DialogNotificationSettingsContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<DialogNotificationSettingsContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<GroupMemberContextType | GroupMemberContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<GroupMemberContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<GroupUpdateContextType | GroupUpdateContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<GroupUpdateContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<GroupUserContextType | GroupUserContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<GroupUserContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<MessageSubscriptionContextType | MessageSubscriptionContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<MessageSubscriptionContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<MessageFlagsContextType | MessageFlagsContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<MessageFlagsContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<MessageEventContextType | MessageEventContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<MessageEventContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<MessageContextType | MessageContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<MessageContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<NewAttachmentsContextType | NewAttachmentsContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<NewAttachmentsContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<MessagesReadContextType | MessagesReadContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<MessagesReadContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<DialogMessagesContextType | DialogMessagesContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<DialogMessagesContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<TypingContextType | TypingContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<TypingContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<FriendActivityContextType | FriendActivityContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<FriendActivityContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<VKAppPayloadContextType | VKAppPayloadContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<VKAppPayloadContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<VKPayTransactionContextType | VKPayTransactionContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<VKPayTransactionContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<VoteContextType | VoteContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<VoteContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<WallPostContextType | WallPostContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<WallPostContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<LikeContextType | LikeContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<LikeContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<MarketOrderContextType | MarketOrderContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<MarketOrderContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<DonutSubscriptionContextType | DonutSubscriptionContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<DonutSubscriptionContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<DonutSubscriptionPriceContextType | DonutSubscriptionPriceContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<DonutSubscriptionPriceContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		events: AllowArray<DonutWithdrawContextType | DonutWithdrawContextSubType>,
// @ts-ignore
		handler: AllowArray<Middleware<DonutWithdrawContext & T>>
// @ts-ignore
	): this;
// @ts-ignore

// @ts-ignore
	public on<T = {}>(
// @ts-ignore
		rawEvents: AllowArray<ContextPossibleTypes>,
// @ts-ignore
		rawHandlers: AllowArray<Middleware<Context & T>>
// @ts-ignore
	): this {
// @ts-ignore
		const events = !Array.isArray(rawEvents)
// @ts-ignore
			? [rawEvents]
// @ts-ignore
			: rawEvents;
// @ts-ignore

// @ts-ignore
		const hasEvents = events.every(Boolean);
// @ts-ignore

// @ts-ignore
		if (!hasEvents) {
// @ts-ignore
			throw new Error('Events should be not empty');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const handler = Array.isArray(rawHandlers)
// @ts-ignore
			? compose(rawHandlers)
// @ts-ignore
			: rawHandlers;
// @ts-ignore

// @ts-ignore
		if (typeof handler !== 'function') {
// @ts-ignore
			throw new TypeError('Handler must be a function');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.use((context, next): unknown => (
// @ts-ignore
			context.is(events)
// @ts-ignore
				// @ts-expect-error
// @ts-ignore
				? handler(context, next)
// @ts-ignore
				: next()
// @ts-ignore
		));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Handles longpoll event
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public handlePollingUpdate(update: any[]): Promise<void> {
// @ts-ignore
		debug('longpoll update', update);
// @ts-ignore

// @ts-ignore
		const { 0: type } = update;
// @ts-ignore

// @ts-ignore
		const UpdateContext = pollingContexts[type];
// @ts-ignore

// @ts-ignore
		if (!UpdateContext) {
// @ts-ignore
			debug(`Unsupported polling context type ${type}`);
// @ts-ignore

// @ts-ignore
			return Promise.resolve();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.dispatchMiddleware(new UpdateContext({
// @ts-ignore
			api: this.api,
// @ts-ignore
			upload: this.upload,
// @ts-ignore

// @ts-ignore
			payload: update,
// @ts-ignore
			updateType: type,
// @ts-ignore
			source: UpdateSource.POLLING
// @ts-ignore
		}));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Handles webhook event
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public handleWebhookUpdate(update: Record<string, any>): Promise<void> {
// @ts-ignore
		debug('webhook update', update);
// @ts-ignore

// @ts-ignore
		const { type, object: payload, group_id: groupId } = update;
// @ts-ignore

// @ts-ignore
		const UpdateContext = webhookContexts[type];
// @ts-ignore

// @ts-ignore
		if (!UpdateContext) {
// @ts-ignore
			debug(`Unsupported webhook context type ${type}`);
// @ts-ignore

// @ts-ignore
			return Promise.resolve();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.dispatchMiddleware(new UpdateContext({
// @ts-ignore
			api: this.api,
// @ts-ignore
			upload: this.upload,
// @ts-ignore

// @ts-ignore
			payload,
// @ts-ignore
			groupId,
// @ts-ignore
			updateType: type,
// @ts-ignore
			source: UpdateSource.WEBHOOK
// @ts-ignore
		}));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Starts to poll server
// @ts-ignore
	 */
// @ts-ignore
	public startPolling(): Promise<void> {
// @ts-ignore
		const { pollingGroupId } = this.options;
// @ts-ignore

// @ts-ignore
		const isGroup = pollingGroupId !== undefined;
// @ts-ignore

// @ts-ignore
		this.pollingTransport.subscribe(
// @ts-ignore
			isGroup
// @ts-ignore
				? this.handleWebhookUpdate.bind(this)
// @ts-ignore
				: this.handlePollingUpdate.bind(this)
// @ts-ignore
		);
// @ts-ignore

// @ts-ignore
		return this.pollingTransport.start();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Starts the webhook server
// @ts-ignore
	 */
// @ts-ignore
	public async startWebhook(options: IWebhookTransportStartOptions = {}): Promise<void> {
// @ts-ignore
		return this.webhookTransport.start(options);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Automatically determines the settings to run
// @ts-ignore
	 */
// @ts-ignore
	public async start({ webhook }: { webhook?: IWebhookTransportStartOptions } = {}): Promise<void> {
// @ts-ignore
		if (webhook) {
// @ts-ignore
			await this.startWebhook(webhook);
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (!this.options.pollingGroupId) {
// @ts-ignore
			try {
// @ts-ignore
				const [group] = await this.api.groups.getById({});
// @ts-ignore

// @ts-ignore
				this.pollingTransport = new PollingTransport({
// @ts-ignore
					api: this.api,
// @ts-ignore

// @ts-ignore
					...this.options,
// @ts-ignore

// @ts-ignore
					pollingGroupId: group.id!
// @ts-ignore
				});
// @ts-ignore

// @ts-ignore
				this.options.pollingGroupId = group.id!;
// @ts-ignore
			} catch (error) {
// @ts-ignore
				if ((error as APIError).code !== APIErrorCode.PARAM) {
// @ts-ignore
					throw error;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				debug('This is not a group.');
// @ts-ignore
			}
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		await this.startPolling();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Stopping gets updates
// @ts-ignore
	 */
// @ts-ignore
	public async stop(): Promise<void> {
// @ts-ignore
		await Promise.all([
// @ts-ignore
			this.pollingTransport.stop(),
// @ts-ignore
			this.webhookTransport.stop()
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns webhook callback like http[s] or express
// @ts-ignore
	 */
// @ts-ignore
	public getWebhookCallback(path?: string): WebhookTransportCallback {
// @ts-ignore
		return this.webhookTransport.getWebhookCallback(path);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the middleware for the webhook under koa
// @ts-ignore
	 */
// @ts-ignore
	public getKoaWebhookMiddleware(): WebhookTransportKoaCallback {
// @ts-ignore
		return this.webhookTransport.getKoaWebhookMiddleware();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Calls up the middleware chain
// @ts-ignore
	 */
// @ts-ignore
	public dispatchMiddleware(context: Context): Promise<void> {
// @ts-ignore
		return this.composed(context, noopNext) as Promise<void>;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Reloads middleware
// @ts-ignore
	 */
// @ts-ignore
	protected recompose(): void {
// @ts-ignore
		this.composed = this.composer.compose();
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
inspectable(Updates, {
// @ts-ignore
	// @ts-expect-error
// @ts-ignore
	serialize: ({ isStarted, composer }) => ({
// @ts-ignore
		isStarted,
// @ts-ignore
		composer
// @ts-ignore
	})
// @ts-ignore
});
