import createDebug from 'debug';
import { inspectable } from 'inspectable';
import { type Middleware, compose, noopNext } from 'middleware-io';

import { type Agent, globalAgent } from 'https';

import {
    Composer,
    type ContextDefaultState,

    type Context,
    UnsupportedEventContext,
    VoteContext,
    LikeContext,
    TypingContext,
    MessageContext,
    WallPostContext,
    GroupUserContext,
    FriendActivityContext,
    GroupUpdateContext,
    DialogFlagsContext,
    GroupMemberContext,
    MarketOrderContext,
    MessageSubscriptionContext,
    MessagesReadContext,
    MessageFlagsContext,
    MessageEventContext,
    VKAppPayloadContext,
    CommentContext,
    NewAttachmentsContext,
    DialogMessagesContext,
    DialogNotificationSettingsContext,
    VKPayTransactionContext,
    DonutSubscriptionContext,
    DonutSubscriptionPriceContext,
    DonutWithdrawContext,

    type UnsupportedEventContextType,
    type CommentContextType,
    type DialogFlagsContextType,
    type DialogNotificationSettingsContextType,
    type GroupMemberContextType,
    type GroupUpdateContextType,
    type GroupUserContextType,
    type MessageSubscriptionContextType,
    type MessageEventContextType,
    type MessageFlagsContextType,
    type MessageContextType,
    type NewAttachmentsContextType,
    type MessagesReadContextType,
    type DialogMessagesContextType,
    type TypingContextType,
    type FriendActivityContextType,
    type VKAppPayloadContextType,
    type VKPayTransactionContextType,
    type VoteContextType,
    type LikeContextType,
    type WallPostContextType,
    type MarketOrderContextType,
    type DonutSubscriptionContextType,
    type DonutSubscriptionPriceContextType,
    type DonutWithdrawContextType,

    type CommentContextSubType,
    type DialogFlagsContextSubType,
    type DialogNotificationSettingsContextSubType,
    type GroupMemberContextSubType,
    type GroupUpdateContextSubType,
    type GroupUserContextSubType,
    type MessageSubscriptionContextSubType,
    type MessageEventContextSubType,
    type MessageFlagsContextSubType,
    type MessageContextSubType,
    type NewAttachmentsContextSubType,
    type MessagesReadContextSubType,
    type DialogMessagesContextSubType,
    type TypingContextSubType,
    type FriendActivityContextSubType,
    type VKAppPayloadContextSubType,
    type VKPayTransactionContextSubType,
    type VoteContextSubType,
    type LikeContextSubType,
    type WallPostContextSubType,
    type MarketOrderContextSubType,
    type DonutSubscriptionContextSubType,
    type DonutSubscriptionPriceContextSubType,
    type DonutWithdrawContextSubType,
} from '../structures';

import type { API } from '../api';
import type { Upload } from '../upload';

import {
    PollingTransport,

    WebhookTransport,
    type WebhookTransportCallback,
    type WebhookTransportKoaCallback,
    type IWebhookTransportStartOptions,
} from './transports';

import { type APIError, APIErrorCode } from '../errors';

import { UpdateSource } from '../utils/constants';
import type { AllowArray, Constructor } from '../types';

const debug = createDebug('vk-io:updates');

const webhookContextsEvents: [string[], Constructor<any>][] = [
    [
        ['message_new', 'message_edit', 'message_reply'],
        MessageContext,
    ],
    [
        ['message_allow', 'message_deny'],
        MessageSubscriptionContext,
    ],
    [
        ['message_event'],
        MessageEventContext,
    ],
    [
        ['photo_new', 'audio_new', 'video_new'],
        NewAttachmentsContext,
    ],
    [
        ['wall_post_new', 'wall_repost'],
        WallPostContext,
    ],
    [
        ['group_join', 'group_leave'],
        GroupMemberContext,
    ],
    [
        ['user_block', 'user_unblock'],
        GroupUserContext,
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
            'market_comment_restore',
        ],
        CommentContext,
    ],
    [
        ['poll_vote_new'],
        VoteContext,
    ],
    [
        ['group_change_photo', 'group_officers_edit', 'group_change_settings'],
        GroupUpdateContext,
    ],
    [
        ['message_typing_state'],
        TypingContext,
    ],
    [
        ['app_payload'],
        VKAppPayloadContext,
    ],
    [
        ['vkpay_transaction'],
        VKPayTransactionContext,
    ],
    [
        ['like_add', 'like_remove'],
        LikeContext,
    ],
    [
        ['market_order_new', 'market_order_edit'],
        MarketOrderContext,
    ],
    [
        [
            'donut_subscription_create',
            'donut_subscription_prolonged',
            'donut_subscription_expired',
            'donut_subscription_cancelled',
        ],
        DonutSubscriptionContext,
    ],
    [
        ['donut_subscription_price_changed'],
        DonutSubscriptionPriceContext,
    ],
    [
        [
            'donut_money_withdraw',
            'donut_money_withdraw_error',
        ],
        DonutWithdrawContext,
    ],
];

const pollingContextsEvents: [number[], Constructor<any>][] = [
    [
        [10002, 10003],
        MessageFlagsContext,
    ],
    [
        [10004, 10005, 10018],
        MessageContext,
    ],
    [
        [10006, 10007],
        MessagesReadContext,
    ],
    [
        [8, 9, 81],
        FriendActivityContext,
    ],
    [
        [10, 12],
        DialogFlagsContext,
    ],
    [
        [10013],
        DialogMessagesContext,
    ],
    [
        [63, 64, 65, 66, 67],
        TypingContext,
    ],
    [
        [114],
        DialogNotificationSettingsContext,
    ],
];

const makeContexts = (
    groups: [(number | string)[], Constructor<Context>][],
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

export type ContextTypes =
UnsupportedEventContextType
| CommentContextType
| DialogFlagsContextType
| DialogNotificationSettingsContextType
| GroupMemberContextType
| GroupUpdateContextType
| GroupUserContextType
| MessageSubscriptionContextType
| MessageEventContextType
| MessageFlagsContextType
| MessageContextType
| NewAttachmentsContextType
| MessagesReadContextType
| DialogMessagesContextType
| TypingContextType
| FriendActivityContextType
| VKAppPayloadContextType
| VKPayTransactionContextType
| VoteContextType
| LikeContextType
| WallPostContextType
| DonutSubscriptionContextType
| DonutSubscriptionPriceContextType
| DonutWithdrawContextType;

export type ContextSubTypes =
CommentContextSubType
| DialogFlagsContextSubType
| DialogNotificationSettingsContextSubType
| GroupMemberContextSubType
| GroupUpdateContextSubType
| GroupUserContextSubType
| MessageSubscriptionContextSubType
| MessageEventContextSubType
| MessageFlagsContextSubType
| MessageContextSubType
| NewAttachmentsContextSubType
| MessagesReadContextSubType
| DialogMessagesContextSubType
| TypingContextSubType
| FriendActivityContextSubType
| VKAppPayloadContextSubType
| VKPayTransactionContextSubType
| VoteContextSubType
| LikeContextSubType
| WallPostContextSubType
| DonutSubscriptionContextSubType
| DonutSubscriptionPriceContextSubType
| DonutWithdrawContextSubType;

export type ContextPossibleTypes = ContextTypes | ContextSubTypes;

export interface IUpdatesOptions {
    api: API;

    upload: Upload;

    agent?: Agent;

    /**
     * Time to wait before re-querying
     *
     * @defaultValue `3000`
     */
    pollingWait: number;

    /**
     * The number of retries at calling
     *
     * @defaultValue `3`
     */
    pollingRetryLimit: number;

    /**
     * Group ID for polling
     */
    pollingGroupId?: number;

    /**
     * Webhook secret key
     */
    webhookSecret?: string;

    /**
     * Webhook confirmation key
     */
    webhookConfirmation?: string;
}

export class Updates {
    private pollingTransport: PollingTransport;

    private webhookTransport: WebhookTransport;

    private composer = Composer.builder<Context>()
        .caught((context, error) => {
            console.error(error);
        });

    private composed!: Middleware<Context>;

    private api: API;

    private upload: Upload;

    private options: Omit<IUpdatesOptions, 'api' | 'upload'>;

    /**
     * Constructor
     */
    public constructor({
        api,
        upload,

        ...options
    }: Partial<IUpdatesOptions> & { api: API; upload: Upload }) {
        this.api = api;
        this.upload = upload;

        this.options = {
            agent: globalAgent,

            pollingWait: 3e3,
            pollingRetryLimit: 3,
            pollingGroupId: undefined,

            webhookSecret: undefined,
            webhookConfirmation: undefined,

            ...options,
        };

        this.recompose();

        this.pollingTransport = new PollingTransport({
            api,

            ...this.options,
        });
        this.webhookTransport = new WebhookTransport({
            api,

            ...this.options,
        });

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
    public use<T = object>(middleware: Middleware<Context & T>): this {
        if (typeof middleware !== 'function') {
            throw new TypeError('Middleware must be a function');
        }

        this.composer.use(middleware);

        this.recompose();

        return this;
    }

    /**
     * Subscribe to events
     */
    public on<T = object>(
        events: AllowArray<CommentContextType | CommentContextSubType>,
        handler: AllowArray<Middleware<CommentContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<DialogFlagsContextType | DialogFlagsContextSubType>,
        handler: AllowArray<Middleware<DialogFlagsContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<DialogNotificationSettingsContextType | DialogNotificationSettingsContextSubType>,
        handler: AllowArray<Middleware<DialogNotificationSettingsContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<GroupMemberContextType | GroupMemberContextSubType>,
        handler: AllowArray<Middleware<GroupMemberContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<GroupUpdateContextType | GroupUpdateContextSubType>,
        handler: AllowArray<Middleware<GroupUpdateContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<GroupUserContextType | GroupUserContextSubType>,
        handler: AllowArray<Middleware<GroupUserContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<MessageSubscriptionContextType | MessageSubscriptionContextSubType>,
        handler: AllowArray<Middleware<MessageSubscriptionContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<MessageFlagsContextType | MessageFlagsContextSubType>,
        handler: AllowArray<Middleware<MessageFlagsContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<MessageEventContextType  >,
        handler: AllowArray<Middleware<MessageEventContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<MessageContextType | MessageContextSubType>,
        handler: AllowArray<Middleware<MessageContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<NewAttachmentsContextType | NewAttachmentsContextSubType>,
        handler: AllowArray<Middleware<NewAttachmentsContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<MessagesReadContextType | MessagesReadContextSubType>,
        handler: AllowArray<Middleware<MessagesReadContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<DialogMessagesContextType | DialogMessagesContextSubType>,
        handler: AllowArray<Middleware<DialogMessagesContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<TypingContextType | TypingContextSubType>,
        handler: AllowArray<Middleware<TypingContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<FriendActivityContextType | FriendActivityContextSubType>,
        handler: AllowArray<Middleware<FriendActivityContext & T>>
    ): this;
    public on<T = object, P extends Record<string, any> = object>(
        events: AllowArray<VKAppPayloadContextType | VKAppPayloadContextSubType>,
        handler: AllowArray<Middleware<VKAppPayloadContext<ContextDefaultState, P> & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<VKPayTransactionContextType | VKPayTransactionContextSubType>,
        handler: AllowArray<Middleware<VKPayTransactionContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<VoteContextType | VoteContextSubType>,
        handler: AllowArray<Middleware<VoteContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<WallPostContextType | WallPostContextSubType>,
        handler: AllowArray<Middleware<WallPostContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<LikeContextType | LikeContextSubType>,
        handler: AllowArray<Middleware<LikeContext & T>>
    ): this;

    // @ts-expect-error incompitable overload signature
    public on<T = object>(
        events: AllowArray<MarketOrderContextType | MarketOrderContextSubType>,
        handler: AllowArray<Middleware<MarketOrderContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<DonutSubscriptionContextType | DonutSubscriptionContextSubType>,
        handler: AllowArray<Middleware<DonutSubscriptionContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<DonutSubscriptionPriceContextType | DonutSubscriptionPriceContextSubType>,
        handler: AllowArray<Middleware<DonutSubscriptionPriceContext & T>>
    ): this;

    public on<T = object>(
        events: AllowArray<DonutWithdrawContextType | DonutWithdrawContextSubType>,
        handler: AllowArray<Middleware<DonutWithdrawContext & T>>
    ): this;
    public on<T = object, P extends Record<string, any> = object>(
        events: AllowArray<UnsupportedEventContextType>,
        handler: AllowArray<Middleware<UnsupportedEventContext<ContextDefaultState, P> & T>>
    ): this;

    public on<T = object>(
        rawEvents: AllowArray<ContextPossibleTypes>,
        rawHandlers: AllowArray<Middleware<Context & T>>,
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

        return this.use((context, next): unknown => (
            context.is(events)
                // @ts-expect-error we need support generic
                ? handler(context, next)
                : next()
        ));
    }

    /**
     * Handles longpoll event
     */
    public handlePollingUpdate(update: any[]): Promise<void> {
        debug('longpoll update', update);

        const { 0: type } = update;

        const UpdateContext = pollingContexts[type];

        if (!UpdateContext) {
            debug(`Unsupported polling context type ${type}`);

            return Promise.resolve();
        }

        return this.dispatchMiddleware(new UpdateContext({
            api: this.api,
            upload: this.upload,

            payload: update,
            updateType: type,
            source: UpdateSource.POLLING,
        }));
    }

    /**
     * Handles webhook event
     */
    public handleWebhookUpdate(update: Record<string, any>): Promise<void> {
        debug('webhook update', update);

        const { type, object: payload, group_id: groupId } = update;

        const UpdateContext = webhookContexts[type] || UnsupportedEventContext;

        return this.dispatchMiddleware(new UpdateContext({
            api: this.api,
            upload: this.upload,

            payload,
            groupId,
            updateType: type,
            source: UpdateSource.WEBHOOK,
        }));
    }

    /**
     * Starts to poll server
     */
    public startPolling(): Promise<void> {
        const { pollingGroupId } = this.options;

        const isGroup = pollingGroupId !== undefined;

        this.pollingTransport.subscribe(
            isGroup
                ? this.handleWebhookUpdate.bind(this)
                : this.handlePollingUpdate.bind(this),
        );

        return this.pollingTransport.start();
    }

    /**
     * Starts the webhook server
     */
    public async startWebhook(options: IWebhookTransportStartOptions = {}): Promise<void> {
        return this.webhookTransport.start(options);
    }

    /**
     * Automatically determines the settings to run
     */
    public async start({ webhook }: { webhook?: IWebhookTransportStartOptions } = {}): Promise<void> {
        if (webhook) {
            await this.startWebhook(webhook);

            return;
        }

        if (!this.options.pollingGroupId) {
            try {
                const { groups: [group] } = await this.api.groups.getById({});

                this.pollingTransport = new PollingTransport({
                    api: this.api,

                    ...this.options,

                    pollingGroupId: group.id,
                });

                this.options.pollingGroupId = group.id;
            } catch (error) {
                if ((error as APIError).code !== APIErrorCode.PARAM) {
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
            this.webhookTransport.stop(),
        ]);
    }

    /**
     * Returns webhook callback like http[s] or express
     */
    public getWebhookCallback(path?: string): WebhookTransportCallback {
        return this.webhookTransport.getWebhookCallback(path);
    }

    /**
     * Returns the middleware for the webhook under koa
     */
    public getKoaWebhookMiddleware(): WebhookTransportKoaCallback {
        return this.webhookTransport.getKoaWebhookMiddleware();
    }

    /**
     * Calls up the middleware chain
     */
    public dispatchMiddleware(context: Context): Promise<void> {
        return this.composed(context, noopNext) as Promise<void>;
    }

    /**
     * Reloads middleware
     */
    protected recompose(): void {
        this.composed = this.composer.compose();
    }
}

inspectable(Updates, {
    // @ts-expect-error composer is private
    serialize: ({ isStarted, composer }) => ({
        isStarted,
        composer,
    }),
});
