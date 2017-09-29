'use strict';

import http from 'http';
import https from 'https';
import { URL, URLSearchParams } from 'url';

import fetch from 'node-fetch';
import createDebug from 'debug';

import {
	TypingContext,
	MessageContext,
	UserOnlineContext,
	ReadMessagesContext,
	MessageFlagsContext,
	RemovedMessagesContext
} from '../structures/contexts';

import { delay } from '../util/helpers';
import { UpdatesError } from '../errors';
import { transformMessage } from './longpoll';
import { updatesErrors } from '../util/constants';

const { NEED_RESTART } = updatesErrors;

const debug = createDebug('vk-io:updates');

export default class Updates {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;

		this._restarted = 0;
		this._started = null;

		this._url = null;
		this._pts = null;
		this._ts = null;

		/**
		 * 2 -  Attachments
		 * 8 -  Extended events
		 * 64 - Online user platform ID
		 *
		 * @type {number}
		 */
		this._mode = 2 + 8 + 64;

		this.webhookServer = null;

		this._handlers = [];
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag] () {
		return 'Updates';
	}

	/**
	 * Added handler
	 * Temporarily
	 *
	 * @param {function} handler
	 */
	use (handler) {
		this._handlers.push(handler);
	}

	/**
	 * Handles longpoll event
	 *
	 * @param {Array} update
	 */
	handleLongpollUpdate (update) {
		switch (update[0]) {
			case 1:
			case 2:
			case 3:
				return this._runHandlers(
					new MessageFlagsContext(
						this.vk,
						update
					)
				);
			case 4:
				return this._runHandlers(
					new MessageContext(
						this.vk,
						transformMessage(update)
					)
				);
			case 6:
			case 7:
				return this._runHandlers(
					new ReadMessagesContext(
						this.vk,
						update
					)
				);
			case 8:
			case 9:
				return this._runHandlers(
					new UserOnlineContext(
						this.vk,
						update
					)
				);
			case 10:
			case 11:
			case 12:
				return this._runHandlers(
					new DialogFlagsContext(
						this.vk,
						update
					)
				);
			case 13:
			case 14:
				return this._runHandlers(
					new RemovedMessagesContext(
						this.vk,
						update
					)
				);
			case 61:
			case 62:
				return this._runHandlers(
					new TypingContext(
						this.vk,
						update
					)
				);
		}
	}

	/**
	 * Handles webhook event
	 *
	 * @param {Object} update
	 */
	handleWebhookUpdate (update) {
		console.log('Webhook', update);

		if (['message_new', 'message_reply'].includes(update.type)) {
			return this._runHandlers(new MessageContext(this.vk, update));
		}
	}

	/**
	 * Starts to poll server
	 *
	 * @return {Promise}
	 */
	async startPolling () {
		if (this._started !== null) {
			return void debug(`Updates already started: ${this._started}`);
		}

		this._started = 'longpoll';

		try {
			const { server, key, ts } = await this.vk.api.messages.getLongPollServer({
				lp_version: 2
			});

			if (this._ts === null) {
				this._ts = ts;
			}

			this._url = new URL(`https://${server}`);
			this._url.search = new URLSearchParams({
				act: 'a_check',
				version: 2,
				wait: 20,
				key,
			});

			this._startFetchLoop();
		} catch (error) {
			this._started = null;

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
	async startWebhook ({ tls, port, host }, next) {
		if (this._started !== null) {
			return void debug(`Updates already started: ${this._started}`);
		}

		this._started = 'webhook';

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

			this.webhookServer.listen(port, host, () => {
				debug(`Webhook listening on port: ${port || tls ? 443 : 80}`);
			});
		} catch (error) {
			this._started = null;

			throw error;
		}
	}

	/**
	 * Stopping gets updates
	 *
	 * @return {Promise}
	 */
	stop () {
		this._restarted = 0;
		this._started = null;

		if (this.webhookServer !== null) {
			this.webhookServer.close();
			this.webhookServer = null;
		}
	}

	/**
	 * Returns webhook callback like http(s) or express
	 *
	 * @return {Function}
	 */
	getWebhookCallback () {
		const { webhookPath } = this.vk.options;

		return (req, res, next) => {
			if (req.method !== 'POST' || req.url !== webhookPath) {
				if (typeof next === 'function') {
					return next();
				}

				res.writeHead(403);
				return res.end();
			}

			let body = '';

			req.on('data', (chunk) => {
				if (body.length > 1e6) {
					body = null;

					res.writeHead(413);
					res.end();

					return req.connection.destroy();
				}

				body += String(chunk);
			});

			req.on('end', () => {
				try {
					const update = JSON.parse(body);

					const { webhookSecret, webhookConfirmation } = this.vk.options;

					if (webhookSecret !== null && update.secret !== webhookSecret) {
						res.writeHead(403);
						return res.end();
					}

					const headers = {
						connection: 'keep-alive',
						'content-type': 'text/plain'
					};

					if (update.type === 'confirmation') {
						if (webhookConfirmation === null) {
							res.writeHead(500);
							return res.end();
						}

						res.writeHead(200, headers);
						return res.end(String(webhookConfirmation));
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
	async _startFetchLoop () {
		try {
			while (this._started === 'longpoll') {
				await this._fetchUpdates();
			}
		} catch (error) {
			debug('longpoll error', error);

			const { longpollWait, longpollAttempts } = this.vk.options;

			if (error.code !== NEED_RESTART && this._restarted < longpollAttempts) {
				++this._restarted;

				debug('longpoll restart request');

				await delay(3e3);

				return this._startFetchLoop();
			}

			while (this._started === 'longpoll') {
				try {
					await this.stop();
					await this.startPolling();
				} catch (error) {
					debug('longpoll restarted error', error);

					this._started = 'longpoll';

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
	async _fetchUpdates () {
		const { agent } = this.vk.options;
		const { searchParams } = this._url;

		searchParams.set('mode', this._mode);
		searchParams.set('ts', this._ts);

		debug('http -->');

		let response = await fetch(this._url, {
			agent,

			method: 'GET',
			timeout: 25e3,
			headers: {
				connection: 'keep-alive'
			}
		});
		response = await response.json();

		debug('http <--');

		if ('failed' in response && response.failed !== 1) {
			this._ts = null;

			throw new UpdatesError({
				code: NEED_RESTART,
				message: 'Polling failed'
			});
		}

		this._ts = Number(response.ts);

		if ('pts' in response && response.pts !== this._pts) {
			this._pts = Number(response.pts);
		}

		if ('updates' in response) {
			for (const update of response.updates) {
				try {
					this.handleLongpollUpdate(update);
				} catch (error) {
					console.log(error);
				}
			}
		}
	}

	/**
	 * Run handlers
	 * Temporarily
	 */
	_runHandlers (...args) {
		for (const handler of this._handlers) {
			handler(...args);
		}
	}
}
