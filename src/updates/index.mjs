import fetch from 'node-fetch';
import createDebug from 'debug';
import Middleware from 'middleware-io';

import nodeUrl from 'url';
import nodeUtil from 'util';
import nodeHttp from 'http';
import nodeHttps from 'https';

import {
	VoteContext,
	TypingContext,
	MessageContext,
	WallPostContext,
	GroupUserContext,
	UserOnlineContext,
	GroupUpdateContext,
	DialogFlagsContext,
	MessageAllowContext,
	ReadMessagesContext,
	MessageFlagsContext,
	CommentActionContext,
	GroupMemberContext,
	NewAttachmentsContext,
	RemovedMessagesContext
} from '../structures/contexts';

import { delay } from '../utils/helpers';
import { parseRequestJSON } from './helpers';
import { VKError, UpdatesError, updatesErrors } from '../errors';

import { updatesSources } from '../utils/constants';

const { URL, URLSearchParams } = nodeUrl;
const { inspect, promisify } = nodeUtil;

const { NEED_RESTART, POLLING_REQUEST_FAILED } = updatesErrors;

const debug = createDebug('vk-io:updates');

/**
 * Version polling
 *
 * @type {number}
 */
const POLLING_VERSION = 3;

const webhookContextsEvents = [
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
	]
];

const pollingContextsEvents = [
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

const makeContexts = (groups) => {
	const contexts = {};

	for (const [events, Context] of groups) {
		for (const event of events) {
			contexts[event] = Context;
		}
	}

	return contexts;
};

const webhookContexts = makeContexts(webhookContextsEvents);
const pollingContexts = makeContexts(pollingContextsEvents);

export default class Updates {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.restarted = 0;
		this.started = null;

		this.url = null;

		this.ts = null;
		this.pts = null;

		/**
		 * 2 -  Attachments
		 * 8 -  Extended events
		 * 64 - Online user platform ID
		 *
		 * @type {number}
		 */
		this.mode = 2 | 8 | 64;

		this.webhookServer = null;

		this.stack = [];
		this.middleware = null;

		this.hears = new Middleware();

		this.hearFallbackHandler = (context, next) => next();

		this.reloadMiddleware();
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'Updates';
	}

	/**
	 * Checks is started
	 *
	 * @return {boolean}
	 */
	get isStarted() {
		return this.started !== null;
	}

	/**
	 * Added middleware
	 *
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	use(middleware) {
		if (typeof middleware !== 'function') {
			throw new VKError({
				message: 'Middleware must be a function'
			});
		}

		this.stack.push(middleware);

		this.reloadMiddleware();

		return this;
	}

	/**
	 * Subscribe to events
	 *
	 * @param {string[]} events
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	on(events, handler) {
		if (!Array.isArray(events)) {
			events = [events];
		}

		const hasEvents = events.every(Boolean);

		if (!hasEvents) {
			throw new VKError({
				message: 'Events should be not empty'
			});
		}

		if (typeof handler !== 'function') {
			throw new VKError({
				message: 'Handler must be a function'
			});
		}

		return this.use((context, next) => (
			context.is(events)
				? handler(context, next)
				: next()
		));
	}

	/**
	 * Listen text
	 *
	 * @param {*[]}      condition
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	hear(conditions, handler) {
		if (!Array.isArray(conditions)) {
			conditions = [conditions];
		}

		const hasConditions = conditions.every(Boolean);

		if (!hasConditions) {
			throw new VKError({
				message: 'Condition should be not empty'
			});
		}

		if (typeof handler !== 'function') {
			throw new VKError({
				message: 'Handler must be a function'
			});
		}

		conditions = conditions.map((condition) => {
			if (typeof condition === 'function') {
				return condition;
			}

			if (condition instanceof RegExp) {
				return (text, context) => {
					const passed = condition.test(text);

					if (passed) {
						context.$match = text.match(condition);
					}

					return passed;
				};
			}

			return text => text === condition;
		});

		this.hears.use((context, next) => {
			const { text } = context;

			const hasSome = conditions.some(condition => (
				condition(text, context)
			));

			return hasSome
				? handler(context, next)
				: next();
		});

		if (this.hears.length === 1) {
			this.reloadMiddleware();
		}

		return this;
	}

	/**
	 * A handler that is called when handlers are not found
	 *
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	setHearFallbackHandler(handler) {
		this.hearFallbackHandler = handler;

		return this;
	}

	/**
	 * Handles longpoll event
	 *
	 * @param {Array} update
	 *
	 * @return {Promise}
	 */
	handlePollingUpdate(update) {
		debug('longpoll update', update);

		const { 0: type } = update;

		const Context = pollingContexts[type];

		if (!Context) {
			debug(`Unsupported polling context type ${type}`);

			return null;
		}

		return this.dispatchMiddleware(new Context(this.vk, update, {
			source: updatesSources.POLLING,

			updateType: type
		}));
	}

	/**
	 * Handles webhook event
	 *
	 * @param {Object} update
	 *
	 * @return {Promise}
	 */
	handleWebhookUpdate(update) {
		debug('webhook update', update);

		const { type, object: payload, group_id: groupId } = update;

		const Context = webhookContexts[type];

		if (!Context) {
			debug(`Unsupported webhook context type ${type}`);

			return null;
		}

		return this.dispatchMiddleware(new Context(this.vk, payload, {
			source: updatesSources.WEBHOOK,

			updateType: type,
			groupId
		}));
	}

	/**
	 * Starts to poll server
	 *
	 * @return {Promise}
	 */
	async startPolling() {
		if (this.isStarted) {
			debug(`Updates already started: ${this.started}`);

			return;
		}

		this.started = 'polling';

		try {
			const { pollingGroupId } = this.vk.options;

			const isGroup = pollingGroupId !== null;

			const { server, key, ts } = isGroup
				? await this.vk.api.groups.getLongPollServer({
					group_id: pollingGroupId
				})
				: await this.vk.api.messages.getLongPollServer({
					lp_version: POLLING_VERSION
				});

			this.pollingHandler = isGroup
				? this.handleWebhookUpdate.bind(this)
				: this.handlePollingUpdate.bind(this);

			if (this.ts === null) {
				this.ts = ts;
			}

			const pollingURL = isGroup
				? server
				: `https://${server}`;

			this.url = new URL(pollingURL);
			this.url.search = new URLSearchParams({
				key,
				act: 'a_check',
				wait: 25,
				mode: this.mode,
				version: POLLING_VERSION
			});

			this.startFetchLoop();
		} catch (error) {
			this.started = null;

			throw error;
		}
	}

	/**
	 * Starts the webhook server
	 *
	 * @param {Function} next
	 *
	 * @return {Promise}
	 */
	async startWebhook(
		{
			tls,
			path,
			port,
			host
		} = {},
		next
	) {
		if (this.isStarted) {
			debug(`Updates already started: ${this.started}`);

			return;
		}

		this.started = 'webhook';

		try {
			const { webhookPath } = this.vk.options;

			const webhookCallback = this.getWebhookCallback(path || webhookPath || '/');

			const callback = typeof next === 'function'
				? (req, res) => (
					webhookCallback(req, res, () => (
						next(req, res)
					))
				)
				: (req, res) => (
					webhookCallback(req, res, () => {
						res.writeHead(403);
						res.end();
					})
				);

			this.webhookServer = tls
				? nodeHttps.createServer(tls, callback)
				: nodeHttp.createServer(callback);

			if (!port) {
				port = tls
					? 443
					: 80;
			}

			const { webhookServer } = this;

			const listen = promisify(webhookServer.listen).bind(webhookServer);

			await listen(port, host);

			debug(`Webhook listening on port: ${port}`);
		} catch (error) {
			this.started = null;

			throw error;
		}
	}

	/**
	 * Stopping gets updates
	 *
	 * @return {Promise}
	 */
	async stop() {
		this.started = null;

		this.restarted = 0;

		if (this.webhookServer !== null) {
			const { webhookServer } = this;

			const close = promisify(webhookServer.close).bind(webhookServer);

			await close();

			this.webhookServer = null;
		}
	}

	/**
	 * Returns webhook callback like http[s] or express
	 *
	 * @param {string} path
	 *
	 * @return {Function}
	 */
	getWebhookCallback(path = '/') {
		const headers = {
			connection: 'keep-alive',
			'content-type': 'text/plain'
		};

		return async (req, res, next) => {
			if (req.method !== 'POST' || req.url !== path) {
				next();

				return;
			}

			let update;
			try {
				update = typeof req.body !== 'object'
					? await parseRequestJSON(req, res)
					: req.body;
			} catch (e) {
				debug(e);

				return;
			}

			try {
				const { webhookSecret, webhookConfirmation } = this.vk.options;

				if (webhookSecret !== null && update.secret !== webhookSecret) {
					res.writeHead(403);
					res.end();

					return;
				}

				if (update.type === 'confirmation') {
					if (webhookConfirmation === null) {
						res.writeHead(500);
						res.end();

						return;
					}

					res.writeHead(200, headers);
					res.end(String(webhookConfirmation));

					return;
				}

				res.writeHead(200, headers);
				res.end('ok');

				this.handleWebhookUpdate(update).catch((error) => {
					// eslint-disable-next-line no-console
					console.error('Handle webhook update error', error);
				});
			} catch (error) {
				debug('webhook error', error);

				res.writeHead(415);
				res.end();
			}
		};
	}

	/**
	 * Returns the middleware for the webhook under koa
	 *
	 * @param {Object} options
	 *
	 * @return {Function}
	 */
	getKoaWebhookMiddleware() {
		return async (context) => {
			const update = context.request.body;

			const { webhookSecret, webhookConfirmation } = this.vk.options;

			if (webhookSecret !== null && update.secret !== webhookSecret) {
				context.status = 403;

				return;
			}

			if (update.type === 'confirmation') {
				if (webhookConfirmation === null) {
					context.status = 500;

					return;
				}

				context.body = webhookConfirmation;

				return;
			}

			context.body = 'ok';
			context.set('connection', 'keep-alive');

			/* Do not delay server response */
			this.handleWebhookUpdate(update).catch((error) => {
				// eslint-disable-next-line no-console
				console.error('Handle webhook update error', error);
			});
		};
	}

	/**
	 * Starts forever fetch updates  loop
	 *
	 * @return {Promise}
	 */
	async startFetchLoop() {
		try {
			while (this.started === 'polling') {
				await this.fetchUpdates();
			}
		} catch (error) {
			debug('longpoll error', error);

			const { pollingWait, pollingAttempts } = this.vk.options;

			if (error.code !== NEED_RESTART && this.restarted < pollingAttempts) {
				this.restarted += 1;

				debug('longpoll restart request');

				await delay(3e3);

				this.startFetchLoop();

				return;
			}

			while (this.started === 'polling') {
				try {
					await this.stop();
					await this.startPolling();

					break;
				} catch (restartError) {
					debug('longpoll restarted error', restartError);

					this.started = 'polling';

					await delay(pollingWait);
				}
			}
		}
	}

	/**
	 * Gets updates
	 *
	 * @return {Promise}
	 */
	async fetchUpdates() {
		this.url.searchParams.set('ts', this.ts);

		debug('http -->');

		let response = await fetch(this.url, {
			agent: this.vk.options.agent,
			method: 'GET',
			timeout: 30e3,
			compress: false,
			headers: {
				connection: 'keep-alive'
			}
		});

		debug(`http <-- ${response.status}`);

		if (!response.ok) {
			throw new UpdatesError({
				code: POLLING_REQUEST_FAILED,
				message: 'Polling request failed'
			});
		}

		response = await response.json();

		if ('failed' in response) {
			if (response.failed === 1) {
				this.ts = response.ts;

				return;
			}

			this.ts = null;

			throw new UpdatesError({
				code: NEED_RESTART,
				message: 'The server has failed'
			});
		}

		this.restarted = 0;
		this.ts = response.ts;

		if ('pts' in response) {
			this.pts = Number(response.pts);
		}

		/* Async handle updates */
		response.updates.forEach(async (update) => {
			try {
				await this.pollingHandler(update);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Handle polling update error:', error);
			}
		});
	}

	/**
	 * Calls up the middleware chain
	 *
	 * @param {Context} context
	 *
	 * @return {Promise<void>}
	 */
	dispatchMiddleware(context) {
		return this.middleware.run(context);
	}

	/**
	 * Reloads middleware
	 */
	reloadMiddleware() {
		this.middleware = new Middleware(this.stack);

		if (this.hears.length === 0) {
			return;
		}

		this.middleware.use(async (context, next) => {
			if (context.type !== 'message' || !context.hasText) {
				await next();

				return;
			}

			const { finished } = await this.hears.run(context);

			if (finished) {
				await this.hearFallbackHandler(context, next);
			}
		});
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		const { started, stack } = this;

		const payload = { started, stack };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
