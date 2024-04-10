import { inspectable } from 'inspectable';

import { VKError } from '../errors';

import type { API } from '../api';
import { APIRequest } from '../api/request';
import { type IExecutesPayload, executeRequests } from './executes';

export interface IChainOptions {
    api: API;
}

export class Chain {
    public started = false;

    protected api: API;

    protected queue: APIRequest[] = [];

    /**
     * Constructor
     */
    public constructor({ api }: IChainOptions) {
        this.api = api;
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }

    /**
     * Adds method to queue
     */
    public append<T = any>(method: string, params: object): Promise<T> {
        if (this.started) {
            return Promise.reject(new VKError({
                message: 'Chain already started',
                code: 'ALREADY_STARTED',
            }));
        }

        const request = new APIRequest({
            api: this.api,
            method,
            params,
        });

        this.queue.push(request);

        return request.promise as Promise<T>;
    }

    /**
     * Promise based
     */
    // biome-ignore lint/suspicious/noThenProperty: alias for .run().then() or await chain
    public then(thenFn: (value: IExecutesPayload) => unknown, catchFn: (reason: unknown) => unknown): Promise<unknown> {
        return this.run().then(thenFn, catchFn);
    }

    /**
     * Starts the chain
     */
    public async run(): Promise<IExecutesPayload> {
        if (this.started) {
            throw new VKError({
                message: 'Chain already started',
                code: 'ALREADY_STARTED',
            });
        }

        this.started = true;

        return executeRequests(this.api, this.queue);
    }
}

inspectable(Chain, {
    // @ts-expect-error queue is private
    serialize: ({ started, queue }) => ({
        started,
        queue,
    }),
});
