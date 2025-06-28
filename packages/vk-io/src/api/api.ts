import { inspectable } from 'inspectable';

import { type Agent, globalAgent } from 'https';

import { type ExecuteError, VKError } from '../errors';

// @ts-expect-error assert's not supported yet
import { version } from '../../package.json';
import { APIRequest } from './request';
import type { APIMethods } from './schemas/methods';
import { type APIWorker, ParallelSelectedWorker, ParallelWorker, SequentialWorker } from './workers';

import { MINIMUM_TIME_INTERVAL_API } from '../utils/constants';
import type { Constructor } from '../types';

import type { CallbackService } from '../utils/callback-service';

const groupMethods = [
    'account',
    'ads',
    'appWidgets',
    'apps',
    'audio',
    'auth',
    'board',
    'database',
    'docs',
    'fave',
    'friends',
    'gifts',
    'groups',
    'leads',
    'leadForms',
    'likes',
    'market',
    'messages',
    'newsfeed',
    'notes',
    'notifications',
    'orders',
    'pages',
    'photos',
    'places',
    'polls',
    'podcasts',
    'prettyCards',
    'store',
    'search',
    'secure',
    'stats',
    'status',
    'storage',
    'stories',
    'streaming',
    'users',
    'utils',
    'video',
    'wall',
    'widgets',
    'junction',
    'articles',
    'donut',
    'specials',
    'statEvents',
    'loyaltyTeen',
    'marusia',
    'bugtracker',
    'calls',
    'asr',
];

const workers: Record<string, Constructor<APIWorker>> = {
    sequential: SequentialWorker,
    parallel: ParallelWorker,
    parallel_selected: ParallelSelectedWorker,
};

export interface IAPIOptions {
    /**
     * Access token
     */
    token: string;

    /**
     * The return data language
     */
    language?: 'ru' | 'uk' | 'be' | 'en' | 'es' | 'fi' | 'de' | 'it';

    /**
     * HTTPS agent
     *
     * @see https://nodejs.org/api/https.html#https_class_https_agent
     */
    agent: Agent;

    /**
     * Determines how requests will be collected
     * - `sequential` - in order
     * - `parallel` - all requests are sent through execute
     * - `parallel_selected` - only the specified methods in `apiExecuteMethods`
     * are collected in `execute`, other methods as in `sequential` mode
     *
     * @defaultValue `sequential`
     */
    apiMode: 'sequential' | 'parallel' | 'parallel_selected';

    /**
     * Determines how requests will be sent
     *
     * - `sequential` - through the interval
     * - `burst` - in parallel,
     * the maximum number of requests (attention, may cause an EAI_AGAIN error)
     *
     * @defaultValue `sequential`
     */
    apiRequestMode: 'sequential' | 'burst';

    /**
     * Time to wait before re-querying
     *
     *  @defaultValue `3000`
     */
    apiWait: number;

    /**
     * Requests per second
     *
     * @defaultValue `3`
     */
    apiLimit: number;

    /**
     * VK API version
     *
     * @see https://vk.com/dev/versions
     */
    apiVersion: string;

    /**
     * Base API URL
     *
     * @defaultValue `https://api.vk.com/method`
     */
    apiBaseUrl: string;

    /**
     * The number of retries at calling
     *
     * @defaultValue `3`
     */
    apiRetryLimit: number;

    /**
     * Wait time for one request
     *
     * @defaultValue `10000`
     */
    apiTimeout: number;

    /**
     * Headers sent to the API
     *
     * @defaultValue `{ User-Agent': 'vk-io/${version} (+https://github.com/negezor/vk-io)' }`
     */
    apiHeaders: Record<string, string>;

    /**
     * Number of requests per execute
     *
     * @defaultValue `25`
     */
    apiExecuteCount: number;

    /**
     * Methods for call execute (apiMode=parallel_selected)
     *
     * @defaultValue `['messages.send']`
     */
    apiExecuteMethods: string[];

    /**
     * Methods that are not supported in execute (apiMode=parallel & apiMode=parallel_selected)
     *
     * Basically it's upload methods
     * @defaultValue ```ts
     * [
     * 'photos.save',
     * 'photos.saveWallPhoto',
     * 'photos.saveOwnerPhoto',
     * 'photos.saveMessagesPhoto',
     * 'messages.setChatPhoto',
     * 'photos.saveMarketPhoto',
     * 'photos.saveMarketAlbumPhoto',
     * 'audio.save',
     * 'docs.save',
     * 'photos.saveOwnerCoverPhoto',
     * 'stories.save',
     * 'polls.savePhoto'
     * ]
     * ```
     */
    apiExecuteUnsupportedMethods: string[];

    callbackService?: CallbackService;
}

export interface IExecuteResponse<T> {
    response: T;
    errors: ExecuteError[];
}

/**
 * Working with API methods
 */
// biome-ignore lint/suspicious/noUnsafeDeclarationMerging: this is how types in library works
class API {
    public options: IAPIOptions;

    private worker!: APIWorker;

    /**
     * Constructor
     */
    public constructor(options: Partial<IAPIOptions> & { token: string }) {
        this.options = {
            agent: globalAgent,
            language: undefined,

            apiMode: 'sequential',
            apiRequestMode: 'sequential',
            apiWait: 3e3,
            apiLimit: 3,
            apiVersion: '5.199',
            apiBaseUrl: 'https://api.vk.com/method',
            apiRetryLimit: 3,
            apiTimeout: 10e3,
            apiHeaders: {
                'User-Agent': `vk-io/${version} (+https://github.com/negezor/vk-io)`,
            },
            apiExecuteCount: 25,
            apiExecuteMethods: ['messages.send'],
            apiExecuteUnsupportedMethods: [
                'photos.save',
                'photos.saveWallPhoto',
                'photos.saveOwnerPhoto',
                'photos.saveMessagesPhoto',
                'messages.setChatPhoto',
                'photos.saveMarketPhoto',
                'photos.saveMarketAlbumPhoto',
                'audio.save',
                'docs.save',
                'photos.saveOwnerCoverPhoto',
                'stories.save',
                'polls.savePhoto',
            ],

            ...options,
        };

        for (const group of groupMethods) {
            // @ts-ignore
            this[group] = new Proxy(Object.create(null), {
                get:
                    (obj, prop: string) =>
                    (params: object): Promise<any> =>
                        this.callWithRequest(
                            new APIRequest({
                                api: this,
                                method: `${group}.${prop}`,
                                params,
                            }),
                        ),
            });
        }

        this.worker = this.getWorker();
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }

    /**
     * Call execute method
     */
    public execute<T = any>(params: Record<string, unknown> & { code: string }): Promise<IExecuteResponse<T>> {
        return this.call('execute', params);
    }

    /**
     * Call execute procedure
     */
    public procedure<T = any>(name: string, params: object): Promise<IExecuteResponse<T>> {
        return this.call(`execute.${name}`, params);
    }

    /**
     * Call raw method
     */
    public call<T = any>(method: string, params: object): Promise<T> {
        return this.callWithRequest(
            new APIRequest({
                method,
                params,

                api: this,
            }),
        );
    }

    /**
     * Adds request for queue
     */
    public callWithRequest<T = any>(request: APIRequest): Promise<T> {
        this.worker.enqueue(request);

        return request.promise;
    }

    private getWorker(): APIWorker {
        const Worker = workers[this.options.apiMode];

        if (!Worker) {
            throw new VKError({
                message: 'Unsupported api mode',
                code: 'UNSUPPORTED_MODE',
            });
        }

        return new Worker(this);
    }

    public updateWorker(): void {
        const newWorker = this.getWorker();

        if (this.worker.constructor === newWorker.constructor) {
            return;
        }

        if (this.worker.busy) {
            this.worker.pause();
            newWorker.pause();

            // @ts-expect-error private property
            newWorker.queue = [...this.worker.queue];

            setTimeout(() => newWorker.resume(), MINIMUM_TIME_INTERVAL_API);
        }

        this.worker = newWorker;
    }
}
inspectable(API, {
    serialize: ({ options }) => ({
        options: {
            token: options.token ? '[set]' : '[none]',
        },
    }),
});

interface API extends APIMethods {}

export { API };
