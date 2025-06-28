import createDebug from 'debug';

import {
    createServer as createHttpServer,
    type Server as HttpServer,
    type IncomingMessage,
    type ServerResponse,
} from 'http';
import { createServer as createHttpsServer, type Server as HTTPSServer } from 'https';
import type { TlsOptions } from 'tls';
import { promisify } from 'util';

import type { API } from '../../api';
import type { IUpdatesOptions } from '../updates';

import { parseRequestJSON } from '../helpers';

const debug = createDebug('vk-io:updates');

const defaultNextHandler = (req: IncomingMessage, res: ServerResponse): void => {
    res.writeHead(403);
    res.end();
};

export interface IWebhookTransportStartOptions {
    tls?: TlsOptions;
    path?: string;
    port?: number;
    host?: string;
    next?: (req: IncomingMessage, res: ServerResponse) => unknown;
}

export type WebhookTransportCallback = (
    req: IncomingMessage,
    res: ServerResponse,
    next?: (err?: Error) => unknown,
) => unknown;

export type WebhookTransportKoaCallback = (
    context: {
        request: {
            body: Record<string, string>;
        };
        body: object;
        status: number;
        set(key: string, value: string): unknown;
    },
    next: () => unknown,
) => unknown;

export class WebhookTransport {
    public started = false;

    public webhookHandler!: (update: object) => unknown;

    protected webhookServer?: HttpServer | HTTPSServer;

    protected api: API;

    private options: Omit<IUpdatesOptions, 'api' | 'upload'>;

    public constructor({ api, ...options }: Omit<IUpdatesOptions, 'upload'>) {
        this.api = api;

        this.options = options;
    }

    /**
     * Starts the webhook server
     */
    public async start({
        path = '/',

        tls,
        host,
        port: customPort,

        next = defaultNextHandler,
    }: IWebhookTransportStartOptions = {}): Promise<void> {
        if (this.started) {
            throw new Error('Webhook updates already started');
        }

        if (!this.webhookHandler) {
            throw new Error("You didn't subscribe to updates");
        }

        this.started = true;

        try {
            const webhookCallback = this.getWebhookCallback(path);

            const callback = (req: IncomingMessage, res: ServerResponse) =>
                webhookCallback(req, res, (): unknown => next(req, res));

            this.webhookServer = tls ? createHttpsServer(tls, callback) : createHttpServer(callback);

            const { webhookServer } = this;

            const port = customPort || (tls ? 443 : 80);

            await promisify(webhookServer.listen)
                // @ts-ignore https://devblogs.microsoft.com/typescript/announcing-typescript-4-1/#unmatched-parameters-are-no-longer-related
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
    public getWebhookCallback(path?: string): WebhookTransportCallback {
        const headers = {
            connection: 'keep-alive',
            'content-type': 'text/plain',
        };

        const checkIsNotValidPath =
            path !== undefined
                ? (requestPath: string | undefined): boolean => requestPath !== path
                : (): boolean => false;

        return async (req, res, next) => {
            if (req.method !== 'POST' || checkIsNotValidPath(req.url)) {
                next?.();

                return;
            }
            const reqBody = (req as typeof req & { body: string | Record<string, any> }).body;

            let update: any;
            try {
                update = typeof reqBody !== 'object' ? await parseRequestJSON(req) : reqBody;
            } catch (e) {
                debug(e);

                return;
            }

            try {
                const { webhookSecret, webhookConfirmation } = this.options;

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

                Promise.resolve(this.webhookHandler(update)).catch((error: Error): void => {
                    console.error('Handle webhook update error', error);
                });
            } catch (error) {
                debug('webhook error', error);

                res.writeHead(415);
                res.end();
            }
        };
    }

    public subscribe(handler: (update: object) => unknown): void {
        this.webhookHandler = handler;
    }

    /**
     * Returns the middleware for the webhook under koa
     */
    public getKoaWebhookMiddleware(): WebhookTransportKoaCallback {
        return async (context: any): Promise<void> => {
            const update = context.request.body;

            const { webhookSecret, webhookConfirmation } = this.options;

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
            setImmediate(() => this.webhookHandler(update as object));
        };
    }
}
