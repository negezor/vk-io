import fetch from 'node-fetch';
import createDebug from 'debug';

import http from 'http';
import https from 'https';
import { inspect, promisify } from 'util';
import { URL, URLSearchParams } from 'url';

import {
	VoteContext,
	TypingContext,
	MessageContext,
	WallPostContext,
	UserOnlineContext,
	GroupChangeContext,
	DialogFlagsContext,
	MessageAllowContext,
	ReadMessagesContext,
	MessageFlagsContext,
	CommentActionContext,
	GroupSubscribeContext,
	NewAttachmentsContext,
	RemovedMessagesContext
} from '../structures/contexts';

import { delay } from '../util/helpers';
import { UpdatesError } from '../errors';
import { updatesErrors } from '../util/constants';
import transformMessage from './transform-message';

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

		this.handlers = [];
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
	 * Added handler
	 * Temporarily
	 *
	 * @param {function} handler
	 */
	use(handler) {
		this.handlers.push(handler);
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
			this.runHandlers(new MessageFlagsContext(
				this.vk,
				update
			));

			break;
		}

		case 4: {
			this.runHandlers(new MessageContext(
				this.vk,
				transformMessage(update)
			));

			break;
		}

		case 6:
		case 7: {
			this.runHandlers(new ReadMessagesContext(
				this.vk,
				update
			));

			break;
		}

		case 8:
		case 9: {
			this.runHandlers(new UserOnlineContext(
				this.vk,
				update
			));

			break;
		}

		case 10:
		case 11:
		case 12: {
			this.runHandlers(new DialogFlagsContext(
				this.vk,
				update
			));

			break;
		}

		case 13:
		case 14: {
			this.runHandlers(new RemovedMessagesContext(
				this.vk,
				update
			));

			break;
		}

		case 61:
		case 62: {
			this.runHandlers(new TypingContext(
				this.vk,
				update
			));

			break;
		}
		}
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
			this.runHandlers(new MessageContext(this.vk, update.object));

			break;
		}

		case 'message_allow':
		case 'message_deny': {
			this.runHandlers(new MessageAllowContext(this.vk, update));

			break;
		}

		case 'photo_new':
		case 'audio_new':
		case 'video_new': {
			this.runHandlers(new NewAttachmentsContext(this.vk, update));

			break;
		}

		case 'wall_post_new':
		case 'wall_repost': {
			this.runHandlers(new WallPostContext(this.vk, update));

			break;
		}

		case 'group_join':
		case 'group_leave': {
			this.runHandlers(new GroupSubscribeContext(this.vk, update));

			break;
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
			this.runHandlers(new CommentActionContext(this.vk, update));

			break;
		}

		case 'poll_vote_new': {
			this.runHandlers(new VoteContext(this.vk, update));

			break;
		}

		case 'group_change_photo':
		case 'group_officers_edit':
		case 'group_change_settings': {
			this.runHandlers(new GroupChangeContext(this.vk, update));

			break;
		}
		}
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
	async startWebhook({ tls, port, host }, next) {
		if (this.started !== null) {
			debug(`Updates already started: ${this.started}`);

			return;
		}

		this.started = 'webhook';

		try {
			const webhookCallback = this.getWebhookCallback();

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
	 * Returns webhook callback like http(s) or express
	 *
	 * @return {Function}
	 */
	getWebhookCallback() {
		const { webhookPath } = this.vk.options;

		return (req, res, next) => {
			if (req.method !== 'POST' || req.url !== webhookPath) {
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

					this.handleWebhookUpdate(update);
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

			const { longpollWait, longpollAttempts } = this.vk.options;

			if (error.code !== NEED_RESTART && this.restarted < longpollAttempts) {
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

					await delay(longpollWait);
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
					this.handleLongpollUpdate(update);
				} catch (error) {
					debug('handle update error', error);
				}
			}
		}
	}

	/**
	 * Run handlers
	 * Temporarily
	 */
	runHandlers(...args) {
		for (const handler of this.handlers) {
			handler(...args);
		}
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
