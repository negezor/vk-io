import fetch from 'node-fetch';
import createDebug from 'debug';
import Middleware from 'middleware-io';

import http from 'http';
import https from 'https';
import { inspect, promisify } from 'util';
import { URL, URLSearchParams } from 'url';

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

import { delay } from '../util/helpers';
import transformMessage from './transform-message';
import { UpdatesError, updatesErrors } from '../errors';

const { NEED_RESTART } = updatesErrors;

const debug = createDebug('vk-io:updates');

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
		this.pts = null;
		this.ts = null;

		/**
		 * 2 -  Attachments
		 * 8 -  Extended events
		 * 64 - Online user platform ID
		 *
		 * @type {number}
		 */
		this.mode = 2 + 8 + 64;

		this.webhookServer = null;

		this.stack = [];

		this.hears = new Middleware();
		this.middleware = new Middleware();
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
	isStarted() {
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
		this.stack.push(middleware);

		this.middleware = new Middleware(this.stack);
		this.middleware.use(async (context, next) => {
			if (!context.subTypes.includes('text')) {
				await next();

				return;
			}

			const { finished } = await this.hears.run(context);

			if (finished) {
				await next();
			}
		});

		return this;
	}

	/**
	 * Subscribe to events
	 *
	 * @param {String[]} events
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	on(events, handler) {
		if (!Array.isArray(events)) {
			events = [events];
		}

		const hasNull = events.some(event => !event);

		if (hasNull) {
			throw new Error('Events should be not null');
		}

		return this.use(async (context, next) => {
			const hasSomeType = events.includes(context.type);
			const hasSomeSubTypes = context.subTypes.some(event => (
				events.includes(event)
			));

			if (hasSomeType || hasSomeSubTypes) {
				await handler(context, next);

				return;
			}

			await next();
		});
	}

	/**
	 * Listen text
	 *
	 * @param {Mixed[]}  condition
	 * @param {Function} handler
	 *
	 * @return {this}
	 */
	hear(conditions, handler) {
		if (!Array.isArray(conditions)) {
			conditions = [conditions];
		}

		const hasNull = conditions.some(condition => !condition);

		if (hasNull) {
			throw new Error('Condition should be not null');
		}

		this.hears.use(async (context, next) => {
			const text = context.getText();

			const hasSome = conditions.some((condition) => {
				if (typeof condition === 'function') {
					return conditions(text, context);
				}

				if (condition instanceof RegExp) {
					const passed = condition.test(text);

					if (passed) {
						context.$match = text.match(condition);
					}

					return passed;
				}

				return text === condition;
			});

			if (!hasSome) {
				await next();

				return;
			}

			await handler(context, next);
		});

		return this;
	}

	/**
	 * Handles longpoll event
	 *
	 * @param {Array} update
	 */
	handleLongpollUpdate(update) {
		debug('longpoll update', update);
		// eslint-disable-next-line default-case
		switch (update[0]) {
		case 1:
		case 2:
		case 3: {
			return this.dispatchMiddleware(new MessageFlagsContext(
				this.vk,
				update
			));
		}

		case 4: {
			return this.dispatchMiddleware(new MessageContext(
				this.vk,
				transformMessage(update)
			));
		}

		case 6:
		case 7: {
			return this.dispatchMiddleware(new ReadMessagesContext(
				this.vk,
				update
			));
		}

		case 8:
		case 9: {
			return this.dispatchMiddleware(new UserOnlineContext(
				this.vk,
				update
			));
		}

		case 10:
		case 11:
		case 12: {
			return this.dispatchMiddleware(new DialogFlagsContext(
				this.vk,
				update
			));
		}

		case 13:
		case 14: {
			return this.dispatchMiddleware(new RemovedMessagesContext(
				this.vk,
				update
			));
		}

		case 61:
		case 62: {
			return this.dispatchMiddleware(new TypingContext(
				this.vk,
				update
			));
		}
		}

		return Promise.resolve();
	}

	/**
	 * Handles webhook event
	 *
	 * @param {Object} update
	 */
	handleWebhookUpdate(update) {
		debug('webhook update', update);

		// eslint-disable-next-line default-case
		switch (update.type) {
		case 'message_new':
		case 'message_reply': {
			return this.dispatchMiddleware(new MessageContext(this.vk, update.object));
		}

		case 'message_allow':
		case 'message_deny': {
			return this.dispatchMiddleware(new MessageAllowContext(this.vk, update));
		}

		case 'photo_new':
		case 'audio_new':
		case 'video_new': {
			return this.dispatchMiddleware(new NewAttachmentsContext(this.vk, update));
		}

		case 'wall_post_new':
		case 'wall_repost': {
			return this.dispatchMiddleware(new WallPostContext(this.vk, update));
		}

		case 'group_join':
		case 'group_leave': {
			return this.dispatchMiddleware(new GroupMemberContext(this.vk, update));
		}

		case 'user_block':
		case 'user_unblock': {
			return this.dispatchMiddleware(new GroupUserContext(this.vk, update));
		}

		case 'photo_comment_new':
		case 'photo_comment_edit':
		case 'photo_comment_delete':
		case 'photo_comment_restore':
		case 'video_comment_new':
		case 'video_comment_edit':
		case 'video_comment_delete':
		case 'video_comment_restore':
		case 'wall_reply_new':
		case 'wall_reply_edit':
		case 'wall_reply_delete':
		case 'wall_reply_restore':
		case 'board_reply_new':
		case 'board_reply_edit':
		case 'board_reply_delete':
		case 'board_reply_restore':
		case 'market_reply_new':
		case 'market_reply_edit':
		case 'market_reply_delete':
		case 'market_reply_restore': {
			return this.dispatchMiddleware(new CommentActionContext(this.vk, update));
		}

		case 'poll_vote_new': {
			return this.dispatchMiddleware(new VoteContext(this.vk, update));
		}

		case 'group_change_photo':
		case 'group_officers_edit':
		case 'group_change_settings': {
			return this.dispatchMiddleware(new GroupUpdateContext(this.vk, update));
		}
		}

		return Promise.resolve();
	}

	/**
	 * Starts to poll server
	 *
	 * @return {Promise}
	 */
	async startPolling() {
		if (this.started !== null) {
			debug(`Updates already started: ${this.started}`);

			return;
		}

		this.started = 'longpoll';

		try {
			const { server, key, ts } = await this.vk.api.messages.getLongPollServer({
				lp_version: 2
			});

			if (this.ts === null) {
				this.ts = ts;
			}

			this.url = new URL(`https://${server}`);
			this.url.search = new URLSearchParams({
				act: 'a_check',
				version: 2,
				wait: 20,
				key,
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
			port = 80,
			host,
		} = {},
		next
	) {
		if (this.started !== null) {
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
				: webhookCallback;

			this.webhookServer = tls
				? https.createServer(tls, callback)
				: http.createServer(callback);

			const { webhookServer } = this;

			const listen = promisify(webhookServer.listen).bind(webhookServer);

			await listen(port, host);

			debug(`Webhook listening on port: ${port || tls ? 443 : 80}`);
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
		this.restarted = 0;
		this.started = null;

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
	getWebhookCallback(path = null) {
		return (req, res, next) => {
			if (req.method !== 'POST' || (path !== null && req.url !== path)) {
				if (typeof next === 'function') {
					next();

					return;
				}

				res.writeHead(403);
				res.end();

				return;
			}

			let body = '';

			req.on('data', (chunk) => {
				if (body.length > 1e6) {
					body = null;

					res.writeHead(413);
					res.end();

					req.connection.destroy();

					return;
				}

				body += String(chunk);
			});

			req.on('end', () => {
				try {
					const update = JSON.parse(body);

					const { webhookSecret, webhookConfirmation } = this.vk.options;

					if (webhookSecret !== null && update.secret !== webhookSecret) {
						res.writeHead(403);
						res.end();

						return;
					}

					const headers = {
						connection: 'keep-alive',
						'content-type': 'text/plain'
					};

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
			while (this.started === 'longpoll') {
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

			while (this.started === 'longpoll') {
				try {
					await this.stop();
					await this.startPolling();
				} catch (restartError) {
					debug('longpoll restarted error', restartError);

					this.started = 'longpoll';

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
		const { agent } = this.vk.options;
		const { searchParams } = this.url;

		searchParams.set('mode', this.mode);
		searchParams.set('ts', this.ts);

		debug('http -->');

		let response = await fetch(this.url, {
			agent,

			method: 'GET',
			timeout: 25e3,
			compress: false,
			headers: {
				connection: 'keep-alive'
			}
		});
		response = await response.json();

		debug('http <--');

		if ('failed' in response && response.failed !== 1) {
			this.ts = null;

			throw new UpdatesError({
				code: NEED_RESTART,
				message: 'Polling failed'
			});
		}

		this.ts = Number(response.ts);

		if ('pts' in response && response.pts !== this.pts) {
			this.pts = Number(response.pts);
		}

		if ('updates' in response) {
			for (const update of response.updates) {
				try {
					await this.handleLongpollUpdate(update);
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Handle polling update error', error);
				}
			}
		}
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
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		const { started, handlers } = this;

		const payload = { started, handlers };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
