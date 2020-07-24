import { inspectable } from 'inspectable';

import { APIMethods } from './schemas/methods';

import {
	APIWorker,
	SequentialWorker,
	ParallelWorker,
	ParallelSelectedWorker
} from './workers';

import { VK } from '../vk';
import { APIRequest } from './request';
import { Constructor } from '../types';
import { VKError } from '../errors';
import { MINIMUM_TIME_INTERVAL_API } from '../utils/constants';

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
	'junction'
];

const workers: Record<string, Constructor<APIWorker>> = {
	sequential: SequentialWorker,
	parallel: ParallelWorker,
	parallel_selected: ParallelSelectedWorker
};

/**
 * Working with API methods
 */
class API {
	private vk: VK;

	public options: VK['options'];

	private worker!: APIWorker;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;
		this.options = vk.options;

		for (const group of groupMethods) {
			// @ts-expect-error
			this[group] = new Proxy(Object.create(null), {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				get: (obj, prop: string) => (params: object): Promise<any> => (
					this.callWithRequest(new APIRequest({
						api: this,
						method: `${group}.${prop}`,
						params
					}))
				)
			});
		}
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public execute(params: Record<string, unknown> & { code: string }): Promise<any> {
		return this.call('execute', params);
	}

	/**
	 * Call execute procedure
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public procedure(name: string, params: object): Promise<any> {
		return this.call(`execute.${name}`, params);
	}

	/**
	 * Call raw method
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public call(method: string, params: object): Promise<any> {
		return this.callWithRequest(new APIRequest({
			method,
			params,

			api: this
		}));
	}

	/**
	 * Adds request for queue
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public callWithRequest(request: APIRequest): Promise<any> {
		this.worker.enqueue(request);

		return request.promise;
	}

	private getWorker(): APIWorker {
		const Worker = workers[this.options.apiMode];

		if (!Worker) {
			throw new VKError({
				message: 'Unsuported api mode',
				code: 'UNSUPPORTED_MODE'
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

			// @ts-expect-error
			newWorker.queue = [...this.worker.queue];

			setTimeout(
				() => newWorker.resume(),
				MINIMUM_TIME_INTERVAL_API
			);
		}

		this.worker = newWorker;
	}
}

inspectable(API);

// eslint-disable-next-line
interface API extends APIMethods {}

export { API };
