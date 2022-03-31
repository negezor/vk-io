// @ts-ignore
import createDebug from 'debug';
// @ts-ignore

// @ts-ignore
import { TlsOptions } from 'tls';
// @ts-ignore
import { Server as HTTPSServer, createServer as httpsCreateServer } from 'https';
// @ts-ignore
import {
// @ts-ignore
	Server as HTTPServer,
// @ts-ignore
	IncomingMessage,
// @ts-ignore
	ServerResponse,
// @ts-ignore

// @ts-ignore
	createServer as httpCreateServer
// @ts-ignore
} from 'http';
// @ts-ignore
import { promisify } from 'util';
// @ts-ignore

// @ts-ignore
import { API } from '../../api';
// @ts-ignore
import { parseRequestJSON } from '../helpers';
// @ts-ignore
import { IUpdatesOptions } from '../updates';
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:updates');
// @ts-ignore

// @ts-ignore
const defaultNextHandler = (req: IncomingMessage, res: ServerResponse): void => {
// @ts-ignore
	res.writeHead(403);
// @ts-ignore
	res.end();
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export interface IWebhookTransportStartOptions {
// @ts-ignore
	tls?: TlsOptions;
// @ts-ignore
	path?: string;
// @ts-ignore
	port?: number;
// @ts-ignore
	host?: string;
// @ts-ignore
	next?: (req: IncomingMessage, res: ServerResponse) => unknown
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WebhookTransportCallback = (
// @ts-ignore
	req: IncomingMessage,
// @ts-ignore
	res: ServerResponse,
// @ts-ignore
	next?: (err?: Error) => unknown
// @ts-ignore
) => unknown;
// @ts-ignore

// @ts-ignore
export type WebhookTransportKoaCallback = (
// @ts-ignore
	context: {
// @ts-ignore
		request: {
// @ts-ignore
			body: Record<string, string>;
// @ts-ignore
		}
// @ts-ignore
		body: object;
// @ts-ignore
		status: number;
// @ts-ignore
		set(key: string, value: string): unknown;
// @ts-ignore
	},
// @ts-ignore
	next: () => unknown
// @ts-ignore
) => unknown;
// @ts-ignore

// @ts-ignore
export class WebhookTransport {
// @ts-ignore
	public started = false;
// @ts-ignore

// @ts-ignore
	public webhookHandler!: Function;
// @ts-ignore

// @ts-ignore
	protected webhookServer?: HTTPServer | HTTPSServer;
// @ts-ignore

// @ts-ignore
	protected api: API;
// @ts-ignore

// @ts-ignore
	private options: Omit<IUpdatesOptions, 'api' | 'upload'>;
// @ts-ignore

// @ts-ignore
	public constructor({ api, ...options }: Omit<IUpdatesOptions, 'upload'>) {
// @ts-ignore
		this.api = api;
// @ts-ignore

// @ts-ignore
		this.options = options;
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
	public async start({
// @ts-ignore
		path = '/',
// @ts-ignore

// @ts-ignore
		tls,
// @ts-ignore
		host,
// @ts-ignore
		port: customPort,
// @ts-ignore

// @ts-ignore
		next = defaultNextHandler
// @ts-ignore
	}: IWebhookTransportStartOptions = {}): Promise<void> {
// @ts-ignore
		if (this.started) {
// @ts-ignore
			throw new Error('Webhook updates already started');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (!this.webhookHandler) {
// @ts-ignore
			throw new Error('You didn\'t subscribe to updates');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.started = true;
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const webhookCallback = this.getWebhookCallback(path);
// @ts-ignore

// @ts-ignore
			const callback = (req: IncomingMessage, res: ServerResponse) => (
// @ts-ignore
				webhookCallback(req, res, (): unknown => (
// @ts-ignore
					next(req, res)
// @ts-ignore
				))
// @ts-ignore
			);
// @ts-ignore

// @ts-ignore
			this.webhookServer = tls
// @ts-ignore
				? httpsCreateServer(tls, callback)
// @ts-ignore
				: httpCreateServer(callback);
// @ts-ignore

// @ts-ignore
			const { webhookServer } = this;
// @ts-ignore

// @ts-ignore
			const port = customPort || (
// @ts-ignore
				tls
// @ts-ignore
					? 443
// @ts-ignore
					: 80
// @ts-ignore
			);
// @ts-ignore

// @ts-ignore
			await promisify(webhookServer.listen)
// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
				// @ts-ignore https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#unmatched-parameters-are-no-longer-related
// @ts-ignore
				.call(webhookServer, { host, port });
// @ts-ignore

// @ts-ignore
			debug(`Webhook listening on port: ${port}`);
// @ts-ignore
		} catch (error) {
// @ts-ignore
			this.started = false;
// @ts-ignore

// @ts-ignore
			throw error;
// @ts-ignore
		}
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
		this.started = false;
// @ts-ignore

// @ts-ignore
		if (this.webhookServer !== undefined) {
// @ts-ignore
			const { webhookServer } = this;
// @ts-ignore

// @ts-ignore
			await promisify(webhookServer.close).call(webhookServer);
// @ts-ignore

// @ts-ignore
			this.webhookServer = undefined;
// @ts-ignore
		}
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
		const headers = {
// @ts-ignore
			connection: 'keep-alive',
// @ts-ignore
			'content-type': 'text/plain'
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		const checkIsNotValidPath = path !== undefined
// @ts-ignore
			? (requestPath: string): boolean => requestPath !== path
// @ts-ignore
			: (): boolean => false;
// @ts-ignore

// @ts-ignore
		return async (req, res, next) => {
// @ts-ignore
			if (req.method !== 'POST' || checkIsNotValidPath(req.url!)) {
// @ts-ignore
				next?.();
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
			const reqBody = (req as typeof req & { body: string | Record<string, any>; }).body;
// @ts-ignore

// @ts-ignore
			let update;
// @ts-ignore
			try {
// @ts-ignore
				update = typeof reqBody !== 'object'
// @ts-ignore
					? await parseRequestJSON(req)
// @ts-ignore
					: reqBody;
// @ts-ignore
			} catch (e) {
// @ts-ignore
				debug(e);
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			try {
// @ts-ignore
				const { webhookSecret, webhookConfirmation } = this.options;
// @ts-ignore

// @ts-ignore
				if (webhookSecret !== undefined && update.secret !== webhookSecret) {
// @ts-ignore
					res.writeHead(403);
// @ts-ignore
					res.end();
// @ts-ignore

// @ts-ignore
					return;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				if (update.type === 'confirmation') {
// @ts-ignore
					if (webhookConfirmation === undefined) {
// @ts-ignore
						res.writeHead(500);
// @ts-ignore
						res.end();
// @ts-ignore

// @ts-ignore
						return;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					res.writeHead(200, headers);
// @ts-ignore
					res.end(String(webhookConfirmation));
// @ts-ignore

// @ts-ignore
					return;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				res.writeHead(200, headers);
// @ts-ignore
				res.end('ok');
// @ts-ignore

// @ts-ignore
				this.webhookHandler(update).catch((error: Error): void => {
// @ts-ignore
					// eslint-disable-next-line no-console
// @ts-ignore
					console.error('Handle webhook update error', error);
// @ts-ignore
				});
// @ts-ignore
			} catch (error) {
// @ts-ignore
				debug('webhook error', error);
// @ts-ignore

// @ts-ignore
				res.writeHead(415);
// @ts-ignore
				res.end();
// @ts-ignore
			}
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public subscribe(handler: Function): void {
// @ts-ignore
		this.webhookHandler = handler;
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
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
		return async (context: any): Promise<void> => {
// @ts-ignore
			const update = context.request.body;
// @ts-ignore

// @ts-ignore
			const { webhookSecret, webhookConfirmation } = this.options;
// @ts-ignore

// @ts-ignore
			if (webhookSecret !== undefined && update.secret !== webhookSecret) {
// @ts-ignore
				context.status = 403;
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (update.type === 'confirmation') {
// @ts-ignore
				if (webhookConfirmation === undefined) {
// @ts-ignore
					context.status = 500;
// @ts-ignore

// @ts-ignore
					return;
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				context.body = webhookConfirmation;
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			context.body = 'ok';
// @ts-ignore
			context.set('connection', 'keep-alive');
// @ts-ignore

// @ts-ignore
			/* Do not delay server response */
// @ts-ignore
			setImmediate(() => this.webhookHandler(update));
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
