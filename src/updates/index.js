'use strict';

import createDebug from 'debug';

const debug = createDebug('vk-io:updates');

export default class Updates {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;
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
	 * Handles webhook event
	 *
	 * @param {Object} update
	 */
	handleWebhookUpdate (update) {
		console.log(update);
	}

	/**
	 * Returns webhook callback like http(s) or express
	 *
	 * @param {string} path
	 *
	 * @return {Function}
	 */
	getWebhookCallback (path = '/') {
		path = String(path);

		return (req, res, next) => {
			if (req.method !== 'POST' || req.url !== path) {
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

					if (update.type === 'confirmation') {
						if (webhookConfirmation === null) {
							res.writeHead(500);
							return res.end();
						}

						return res.end(String(webhookConfirmation));
					}

					res.writeHead(200);
					res.end('OK');

					this.handleWebhookUpdate(update);
				} catch (error) {
					debug('webhook error', error);

					res.writeHead(415);
					res.end();
				}
			});
		};
	}
}
