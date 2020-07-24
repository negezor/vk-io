import createDebug from 'debug';

import { Server as HTTPSServer, createServer as httpsCreateServer } from 'https';
import {
	Server as HTTPServer,
	IncomingMessage,
	ServerResponse,

	createServer as httpCreateServer
} from 'http';
import { ListenOptions } from 'net';
import { promisify } from 'util';

import { VK } from '../../vk';
import { parseRequestJSON } from '../helpers';

const debug = createDebug('vk-io:updates');

export class WebhookTransport {
	public started = false;

	public webhookHandler!: Function;

	protected webhookServer?: HTTPServer | HTTPSServer;

	protected vk: VK;

	public constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Starts the webhook server
	 */
	public async start({
		path = '/',

		tls,
		host,
		port: customPort,

		next = (req, res): void => {
			res.writeHead(403);
			res.end();
		}
	}: {
		path?: string;
		tls?: object;
		host?: string;
		port?: number;
		next?: (req: IncomingMessage, res: ServerResponse) => unknown
	} = {}): Promise<void> {
		if (this.started) {
			throw new Error('Webhook updates already started');
		}

		if (!this.webhookHandler) {
			throw new Error('You didn\'t subscribe to updates');
		}

		this.started = true;

		try {
			const webhookCallback = this.getWebhookCallback(path);

			const callback = (req: IncomingMessage, res: ServerResponse): Promise<void> => (
				webhookCallback(req, res, (): unknown => (
					next(req, res)
				))
			);

			this.webhookServer = tls
				? httpsCreateServer(tls, callback)
				: httpCreateServer(callback);

			const { webhookServer } = this;

			const port = customPort || (
				tls
					? 443
					: 80
			);

			await promisify<ListenOptions>(webhookServer.listen)
				.call(webhookServer, { host, port });

			debug(`Webhook listening on port: ${port}`);
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

		if (this.webhookServer !== undefined) {
			const { webhookServer } = this;

			await promisify(webhookServer.close).call(webhookServer);

			this.webhookServer = undefined;
		}
	}

	/**
	 * Returns webhook callback like http[s] or express
	 */
	public getWebhookCallback(path?: string): Function {
		const headers = {
			connection: 'keep-alive',
			'content-type': 'text/plain'
		};

		const checkIsNotValidPath = path !== undefined
			? (requestPath: string): boolean => requestPath !== path
			: (): boolean => false;

		return async (req: IncomingMessage, res: ServerResponse, next: Function): Promise<void> => {
			if (req.method !== 'POST' || checkIsNotValidPath(req.url!)) {
				next();

				return;
			}

			let update;
			try {
				// @ts-expect-error
				update = typeof req.body !== 'object'
					? await parseRequestJSON(req)
					// @ts-expect-error
					: req.body;
			} catch (e) {
				debug(e);

				return;
			}

			try {
				const { webhookSecret, webhookConfirmation } = this.vk.options;

				if (webhookSecret !== undefined && update.secret !== webhookSecret) {
					res.writeHead(403);
					res.end();

					return;
				}

				if (update.type === 'confirmation') {
					if (webhookConfirmation === undefined) {
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		return async (context: any): Promise<void> => {
			const update = context.request.body;

			const { webhookSecret, webhookConfirmation } = this.vk.options;

			if (webhookSecret !== undefined && update.secret !== webhookSecret) {
				context.status = 403;

				return;
			}

			if (update.type === 'confirmation') {
				if (webhookConfirmation === undefined) {
					context.status = 500;

					return;
				}

				context.body = webhookConfirmation;

				return;
			}

			context.body = 'ok';
			context.set('connection', 'keep-alive');

			/* Do not delay server response */
			setImmediate(() => this.webhookHandler(update));
		};
	}
}
