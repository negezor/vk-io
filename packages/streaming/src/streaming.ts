import createDebug from 'debug';
import { inspectable } from 'inspectable';
import WebSocket from 'ws';

import { type API, UpdateSource, type Updates, VKError } from 'vk-io';

import { type Agent, globalAgent } from 'https';

import { StreamingRuleError } from './errors';
import type { IStreamingRuleErrorOptions } from './errors/streaming-rule';

import { type IStreamingContextPayload, StreamingContext } from './contexts';

import { fetch } from './fetch';

const debug = createDebug('vk-io:streaming');

export interface IStreamingRule {
    value: string;
    tag: string;
}

export interface IStreamingAPI {
    api: API;

    updates: Updates;

    agent: Agent;
}

export class StreamingAPI {
    protected socket?: WebSocket;

    protected key?: string;

    protected endpoint?: URL;

    protected started = false;

    private api: API;

    private updates: Updates;

    private options: Omit<IStreamingAPI, 'api' | 'updates'>;

    /**
     * Constructor
     */
    public constructor({ api, updates, ...options }: Partial<IStreamingAPI> & { api: API; updates: Updates }) {
        this.api = api;

        this.updates = updates;

        this.options = {
            agent: globalAgent,

            ...options,
        };
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }

    /**
     * Starts websocket
     */
    public async startWebSocket(): Promise<void> {
        this.started = true;

        try {
            const { key, endpoint } = await this.api.streaming.getServerUrl({});

            this.key = key;
            this.endpoint = new URL(`https://${endpoint}`);

            const search = new URLSearchParams({ key: key });

            const { agent } = this.options;

            this.socket = new WebSocket(`wss://${endpoint}/stream?${search.toString()}`, { agent });
        } catch (error) {
            this.started = false;

            throw error;
        }

        const { socket } = this;
        socket.on('message', async (data: string) => {
            let message: any;

            try {
                message = JSON.parse(data);
            } catch (error) {
                debug('JSON parse failed', error);

                return;
            }

            const { code } = message;

            try {
                switch (code) {
                    case 100: {
                        await this.handleEvent(message.event as IStreamingContextPayload);

                        break;
                    }

                    case 300: {
                        await this.handleServiceMessage(
                            message.service_message as {
                                service_code: number;
                            },
                        );

                        break;
                    }

                    default: {
                        debug(`Unsupported message code: ${code}`);
                    }
                }
            } catch (error) {
                console.log('Handle event error', error);
            }
        });

        socket.on('error', (error: Error) => {
            debug('WebSocket error', error);
        });
    }

    /**
     * Stop all connection
     */
    public stop(): Promise<void> {
        if (!this.started) {
            return Promise.resolve();
        }

        this.socket?.close();

        this.started = false;

        return Promise.resolve();
    }

    /**
     * Processes server messages
     */
    public async handleServiceMessage({ service_code: code }: { service_code: number }): Promise<void> {
        if ([3000, 3001].includes(code)) {
            await this.stop();
            await this.startWebSocket();
        }
    }

    /**
     * Handles events
     */
    private async handleEvent(event: IStreamingContextPayload): Promise<void> {
        const context = new StreamingContext({
            api: this.api,
            // @ts-expect-error private method
            upload: this.updates.upload,
            payload: event,

            state: {},

            updateType: 'publication',
            source: UpdateSource.WEBSOCKET,
        });

        await this.updates.dispatchMiddleware(context);
    }

    /**
     * Executes the HTTP request for rules
     */
    private async fetchRules<T = never>(method: string, payload: object = {}): Promise<T> {
        const { agent } = this.options;

        if (!this.key) {
            throw new VKError({
                message: 'You should start websocket before call fetchRules',
                code: 0,
            });
        }

        const url = new URL('/rules', this.endpoint);
        url.searchParams.set('key', this.key);

        let body: any;
        if (method !== 'GET') {
            body = JSON.stringify(payload);
        }

        const response = await fetch(url, {
            agent,
            method,
            body,
            headers: {
                'content-type': 'application/json',
            },
        });
        const result = (await response.json()) as any;

        if (result.error !== undefined) {
            throw new StreamingRuleError(result.error as IStreamingRuleErrorOptions);
        }

        return result;
    }

    /**
     * Returns a list of rules
     */
    public async getRules(): Promise<IStreamingRule[]> {
        const { rules } = await this.fetchRules<{ rules: IStreamingRule[] | null }>('GET');

        return rules || [];
    }

    /**
     * Adds a rule
     */
    public async addRule(rule: IStreamingRule): Promise<void> {
        await this.fetchRules('POST', { rule });
    }

    /**
     * Removes the rule
     */
    public async deleteRule(tag: string): Promise<void> {
        await this.fetchRules('DELETE', { tag });
    }

    /**
     * Adds a list of rules
     */
    public async addRules(rules: IStreamingRule[]): Promise<void> {
        await Promise.all(rules.map(rule => this.addRule(rule)));
    }

    /**
     * Removes all rules
     */
    public async deleteRules(): Promise<void> {
        const rules = await this.getRules();

        await Promise.all(rules.map(({ tag }) => this.deleteRule(tag)));
    }
}

inspectable(StreamingAPI, {
    // @ts-expect-error started is private
    serialize: ({ started }) => ({
        started,
    }),
});
