import createDebug from 'debug';

import { Server as HTTPSServer, createServer as httpsCreateServer } from 'https';
import { Server as HTTPServer, createServer as httpCreateServer } from 'http';
import { promisify } from 'util';

import VK from '../../vk';
import { parseRequestJSON } from '../helpers';

const debug = createDebug('vk-io:updates');

export default class WebhookTransport {
	public started = false;

	public webhookHandler: Function;

	protected webhookServer: HTTPServer | HTTPSServer | null = null;

	protected vk: VK;

	public constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Starts the webhook server
	 */
	public async start(
		{
			path = '/',

			tls,
			host,
			port
		}: {
			path?: string;
			tls?: object;
			host?: string;
			port?: number;
		} = {},
		next?: Function
	): Promise<void> {
		if (this.started) {
			throw new Error('Webhook updates already started');
		}

		if (!this.webhookHandler) {
			throw new Error('You didn\'t subscribe to updates');
		}

		this.started = true;

		try {
			const webhookCallback = this.getWebhookCallback(path);

			const callback = typeof next === 'function'
				? (req, res): Promise<void> => (
					webhookCallback(req, res, (): void => (
						next(req, res)
					))
				)
				: (req, res): Promise<void> => (
					webhookCallback(req, res, (): void => {
						res.writeHead(403);
						res.end();
					})
				);

			this.webhookServer = tls
				? httpsCreateServer(tls, callback)
				: httpCreateServer(callback);

			const { webhookServer } = this;

			const listen = promisify(webhookServer.listen).bind(webhookServer);

			const serverPort = port || (
				tls
					? 443
					: 80
			);

			await listen(serverPort, host);

			debug(`Webhook listening on port: ${serverPort}`);
		} catch (error) {
			this.started = false;

			throw error;
		}
	}

	/**
	 * Stopping gets updates
	 */
	public async stop(): Promise<void> {
		this.started = false;

		if (this.webhookServer !== null) {
			const { webhookServer } = this;

			const close = promisify(webhookServer.close).bind(webhookServer);

			await close();

			this.webhookServer = null;
		}
	}

	/**
	 * Returns webhook callback like http[s] or express
	 */
	public getWebhookCallback(path: string = null): Function {
		const headers = {
			connection: 'keep-alive',
			'content-type': 'text/plain'
		};

		const checkIsNotValidPath = path !== null
			? (requestPath: string): boolean => requestPath !== path
			: (): boolean => false;

		return async (req, res, next): Promise<void> => {
			if (req.method !== 'POST' || checkIsNotValidPath(req.url)) {
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

				this.webhookHandler(update).catch((error: Error): void => {
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

	public subscribe(handler: Function): void {
		this.webhookHandler = handler;
	}

	/**
	 * Returns the middleware for the webhook under koa
	 */
	public getKoaWebhookMiddleware(): Function {
		return async (context): Promise<void> => {
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
			this.webhookHandler(update).catch((error: Error): void => {
				// eslint-disable-next-line no-console
				console.error('Handle webhook update error', error);
			});
		};
	}
}
