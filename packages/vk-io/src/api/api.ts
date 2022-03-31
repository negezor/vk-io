// @ts-ignore
import { inspectable } from 'inspectable';
// @ts-ignore

// @ts-ignore
import { Agent, globalAgent } from 'https';
// @ts-ignore

// @ts-ignore
import { APIMethods } from './schemas/methods';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	APIWorker,
// @ts-ignore
	SequentialWorker,
// @ts-ignore
	ParallelWorker,
// @ts-ignore
	ParallelSelectedWorker
// @ts-ignore
} from './workers';
// @ts-ignore

// @ts-ignore
import { APIRequest } from './request';
// @ts-ignore
import { Constructor } from '../types';
// @ts-ignore
import { VKError, ExecuteError } from '../errors';
// @ts-ignore
import { CallbackService } from '../utils/callback-service';
// @ts-ignore
import { MINIMUM_TIME_INTERVAL_API } from '../utils/constants';
// @ts-ignore

// @ts-ignore
// @ts-expect-error
// @ts-ignore
import { version } from '../../package.json';
// @ts-ignore

// @ts-ignore
const groupMethods = [
// @ts-ignore
	'account',
// @ts-ignore
	'ads',
// @ts-ignore
	'appWidgets',
// @ts-ignore
	'apps',
// @ts-ignore
	'audio',
// @ts-ignore
	'auth',
// @ts-ignore
	'board',
// @ts-ignore
	'database',
// @ts-ignore
	'docs',
// @ts-ignore
	'fave',
// @ts-ignore
	'friends',
// @ts-ignore
	'gifts',
// @ts-ignore
	'groups',
// @ts-ignore
	'leads',
// @ts-ignore
	'leadForms',
// @ts-ignore
	'likes',
// @ts-ignore
	'market',
// @ts-ignore
	'messages',
// @ts-ignore
	'newsfeed',
// @ts-ignore
	'notes',
// @ts-ignore
	'notifications',
// @ts-ignore
	'orders',
// @ts-ignore
	'pages',
// @ts-ignore
	'photos',
// @ts-ignore
	'places',
// @ts-ignore
	'polls',
// @ts-ignore
	'podcasts',
// @ts-ignore
	'prettyCards',
// @ts-ignore
	'store',
// @ts-ignore
	'search',
// @ts-ignore
	'secure',
// @ts-ignore
	'stats',
// @ts-ignore
	'status',
// @ts-ignore
	'storage',
// @ts-ignore
	'stories',
// @ts-ignore
	'streaming',
// @ts-ignore
	'users',
// @ts-ignore
	'utils',
// @ts-ignore
	'video',
// @ts-ignore
	'wall',
// @ts-ignore
	'widgets',
// @ts-ignore
	'junction',
// @ts-ignore
	'articles',
// @ts-ignore
	'donut'
// @ts-ignore
];
// @ts-ignore

// @ts-ignore
const workers: Record<string, Constructor<APIWorker>> = {
// @ts-ignore
	sequential: SequentialWorker,
// @ts-ignore
	parallel: ParallelWorker,
// @ts-ignore
	parallel_selected: ParallelSelectedWorker
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export interface IAPIOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Access token
// @ts-ignore
	 */
// @ts-ignore
	token: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The return data language
// @ts-ignore
	 */
// @ts-ignore
	language?: 'ru' | 'uk' | 'be' | 'en' | 'es' | 'fi' | 'de' | 'it';
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * HTTPS agent
// @ts-ignore
	 *
// @ts-ignore
	 * @see https://nodejs.org/api/https.html#https_class_https_agent
// @ts-ignore
	 */
// @ts-ignore
	agent: Agent;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Determines how requests will be collected
// @ts-ignore
	 * - `sequential` - in order
// @ts-ignore
	 * - `parallel` - all requests are sent through execute
// @ts-ignore
	 * - `parallel_selected` - only the specified methods in `apiExecuteMethods`
// @ts-ignore
	 * are collected in `execute`, other methods as in `sequential` mode
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `sequential`
// @ts-ignore
	 */
// @ts-ignore
	apiMode: 'sequential' | 'parallel' | 'parallel_selected';
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Determines how requests will be sent
// @ts-ignore
	 *
// @ts-ignore
	 * - `sequential` - through the interval
// @ts-ignore
	 * - `burst` - in parallel,
// @ts-ignore
	 * the maximum number of requests (attention, may cause an EAI_AGAIN error)
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `sequential`
// @ts-ignore
	 */
// @ts-ignore
	apiRequestMode: 'sequential' | 'burst';
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Time to wait before re-querying
// @ts-ignore
	 *
// @ts-ignore
	 *  @defaultValue `3000`
// @ts-ignore
	 */
// @ts-ignore
	apiWait: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Requests per second
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `3`
// @ts-ignore
	 */
// @ts-ignore
	apiLimit: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * VK API version
// @ts-ignore
	 *
// @ts-ignore
	 * @see https://vk.com/dev/versions
// @ts-ignore
	 */
// @ts-ignore
	apiVersion: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Base API URL
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `https://api.vk.com/method`
// @ts-ignore
	 */
// @ts-ignore
	apiBaseUrl: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The number of retries at calling
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `3`
// @ts-ignore
	 */
// @ts-ignore
	apiRetryLimit: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Wait time for one request
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `10000`
// @ts-ignore
	 */
// @ts-ignore
	apiTimeout: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Headers sent to the API
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `{ User-Agent': 'vk-io/${version} (+https://github.com/negezor/vk-io)' }`
// @ts-ignore
	 */
// @ts-ignore
	apiHeaders: Record<string, string>;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Number of requests per execute
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `25`
// @ts-ignore
	 */
// @ts-ignore
	apiExecuteCount: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Methods for call execute (apiMode=parallel_selected)
// @ts-ignore
	 *
// @ts-ignore
	 * @defaultValue `['messages.send']`
// @ts-ignore
	 */
// @ts-ignore
	apiExecuteMethods: string[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Methods that are not supported in execute (apiMode=parallel & apiMode=parallel_selected)
// @ts-ignore
	 *
// @ts-ignore
	 * Basically it's upload methods
// @ts-ignore
	 * @defaultValue ```ts
// @ts-ignore
	 * [
// @ts-ignore
     * 'photos.save',
// @ts-ignore
     * 'photos.saveWallPhoto',
// @ts-ignore
     * 'photos.saveOwnerPhoto',
// @ts-ignore
     * 'photos.saveMessagesPhoto',
// @ts-ignore
     * 'messages.setChatPhoto',
// @ts-ignore
     * 'photos.saveMarketPhoto',
// @ts-ignore
     * 'photos.saveMarketAlbumPhoto',
// @ts-ignore
     * 'audio.save',
// @ts-ignore
     * 'docs.save',
// @ts-ignore
     * 'photos.saveOwnerCoverPhoto',
// @ts-ignore
     * 'stories.save',
// @ts-ignore
     * 'polls.savePhoto'
// @ts-ignore
     * ]
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	apiExecuteUnsupportedMethods: string[];
// @ts-ignore

// @ts-ignore
	callbackService?: CallbackService;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IExecuteResponse<T> {
// @ts-ignore
	response: T;
// @ts-ignore
	errors: ExecuteError[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Working with API methods
// @ts-ignore
 */
// @ts-ignore
class API {
// @ts-ignore
	public options: IAPIOptions;
// @ts-ignore

// @ts-ignore
	private worker!: APIWorker;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: Partial<IAPIOptions> & { token: string; }) {
// @ts-ignore
		this.options = {
// @ts-ignore
			agent: globalAgent,
// @ts-ignore
			language: undefined,
// @ts-ignore

// @ts-ignore
			apiMode: 'sequential',
// @ts-ignore
			apiRequestMode: 'sequential',
// @ts-ignore
			apiWait: 3e3,
// @ts-ignore
			apiLimit: 3,
// @ts-ignore
			apiVersion: '5.131',
// @ts-ignore
			apiBaseUrl: 'https://api.vk.com/method',
// @ts-ignore
			apiRetryLimit: 3,
// @ts-ignore
			apiTimeout: 10e3,
// @ts-ignore
			apiHeaders: {
// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
				'User-Agent': `vk-io/${version} (+https://github.com/negezor/vk-io)`
// @ts-ignore
			},
// @ts-ignore
			apiExecuteCount: 25,
// @ts-ignore
			apiExecuteMethods: ['messages.send'],
// @ts-ignore
			apiExecuteUnsupportedMethods: [
// @ts-ignore
				'photos.save',
// @ts-ignore
				'photos.saveWallPhoto',
// @ts-ignore
				'photos.saveOwnerPhoto',
// @ts-ignore
				'photos.saveMessagesPhoto',
// @ts-ignore
				'messages.setChatPhoto',
// @ts-ignore
				'photos.saveMarketPhoto',
// @ts-ignore
				'photos.saveMarketAlbumPhoto',
// @ts-ignore
				'audio.save',
// @ts-ignore
				'docs.save',
// @ts-ignore
				'photos.saveOwnerCoverPhoto',
// @ts-ignore
				'stories.save',
// @ts-ignore
				'polls.savePhoto'
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			...options
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		for (const group of groupMethods) {
// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
			// @ts-ignore
// @ts-ignore
			this[group] = new Proxy(Object.create(null), {
// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
				get: (obj, prop: string) => (params: object): Promise<any> => (
// @ts-ignore
					this.callWithRequest(new APIRequest({
// @ts-ignore
						api: this,
// @ts-ignore
						method: `${group}.${prop}`,
// @ts-ignore
						params
// @ts-ignore
					}))
// @ts-ignore
				)
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.worker = this.getWorker();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Call execute method
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public execute<T = any>(
// @ts-ignore
		params: Record<string, unknown> & { code: string }
// @ts-ignore
	): Promise<IExecuteResponse<T>> {
// @ts-ignore
		return this.call('execute', params);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Call execute procedure
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public procedure<T = any>(name: string, params: object): Promise<IExecuteResponse<T>> {
// @ts-ignore
		return this.call(`execute.${name}`, params);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Call raw method
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public call<T = any>(method: string, params: object): Promise<T> {
// @ts-ignore
		return this.callWithRequest(new APIRequest({
// @ts-ignore
			method,
// @ts-ignore
			params,
// @ts-ignore

// @ts-ignore
			api: this
// @ts-ignore
		}));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds request for queue
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public callWithRequest<T = any>(request: APIRequest): Promise<T> {
// @ts-ignore
		this.worker.enqueue(request);
// @ts-ignore

// @ts-ignore
		return request.promise;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	private getWorker(): APIWorker {
// @ts-ignore
		const Worker = workers[this.options.apiMode];
// @ts-ignore

// @ts-ignore
		if (!Worker) {
// @ts-ignore
			throw new VKError({
// @ts-ignore
				message: 'Unsupported api mode',
// @ts-ignore
				code: 'UNSUPPORTED_MODE'
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return new Worker(this);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public updateWorker(): void {
// @ts-ignore
		const newWorker = this.getWorker();
// @ts-ignore

// @ts-ignore
		if (this.worker.constructor === newWorker.constructor) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.worker.busy) {
// @ts-ignore
			this.worker.pause();
// @ts-ignore
			newWorker.pause();
// @ts-ignore

// @ts-ignore
			// @ts-expect-error
// @ts-ignore
			newWorker.queue = [...this.worker.queue];
// @ts-ignore

// @ts-ignore
			setTimeout(
// @ts-ignore
				() => newWorker.resume(),
// @ts-ignore
				MINIMUM_TIME_INTERVAL_API
// @ts-ignore
			);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.worker = newWorker;
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore
inspectable(API, {
// @ts-ignore
	serialize: ({ options }) => ({
// @ts-ignore
		options: {
// @ts-ignore
			token: options.token
// @ts-ignore
				? '[set]'
// @ts-ignore
				: '[none]'
// @ts-ignore
		}
// @ts-ignore
	})
// @ts-ignore
});
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface API extends APIMethods {}
// @ts-ignore

// @ts-ignore
export { API };
