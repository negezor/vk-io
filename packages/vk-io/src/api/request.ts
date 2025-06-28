import { AbortController } from 'abort-controller';
import { inspectable } from 'inspectable';

import type { API } from './api';

import { getExecuteMethod } from '../utils/helpers';
import type { ICallbackServiceValidate } from '../utils/callback-service';
import { fetch } from '../utils/fetch';

export interface IAPIRequestOptions {
    api: API;

    method: string;
    params: Record<string, any>;
}

export class APIRequest {
    public method: string;
    public params: Record<string, any>;

    public retries = 0;
    public promise: Promise<any>;

    public resolve!: (value: unknown) => unknown;

    public reject!: (reason: unknown) => unknown;

    public captchaValidate?: ICallbackServiceValidate;

    protected api: API;

    /**
     * Constructor
     */
    public constructor({ api, method, params = {} }: IAPIRequestOptions) {
        this.api = api;

        this.method = method;
        this.params = { ...params };

        this.promise = new Promise((resolve, reject): void => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }

    /**
     * Returns string to execute
     */
    public toString(): string {
        return getExecuteMethod(this.method, this.params);
    }

    /**
     * Sends a request to the server
     */
    public async make(): Promise<any> {
        const { options } = this.api;

        const params: APIRequest['params'] = {
            access_token: options.token,
            v: options.apiVersion,

            ...this.params,
        };

        if (options.language !== undefined) {
            params.lang = options.language;
        }

        const controller = new AbortController();

        const timeout = setTimeout(() => controller.abort(), options.apiTimeout);

        try {
            const response = await fetch(`${options.apiBaseUrl}/${this.method}`, {
                method: 'POST',
                compress: false,
                agent: options.agent,
                signal: controller.signal,
                headers: {
                    ...options.apiHeaders,

                    connection: 'keep-alive',
                },
                body: new URLSearchParams(Object.entries(params).filter(({ 1: value }) => value !== undefined)),
            });

            const result = await response.json();

            return result;
        } finally {
            clearTimeout(timeout);
        }
    }
}

inspectable(APIRequest, {
    serialize: ({ method, params }) => ({
        method,
        params,
    }),
});
