import { APIRequest } from './request';

import {
	APIWorker,

	SequentialWorker,

	ParallelWorker,
	ParallelSelectedWorker
} from './workers';

import { API } from './api';
import { VKError } from '../errors';
import { Constructor } from '../types';
import { MINIMUM_TIME_INTERVAL_API } from '../utils/constants';

const workers: Record<string, Constructor<APIWorker>> = {
	sequential: SequentialWorker,
	parallel: ParallelWorker,
	parallel_selected: ParallelSelectedWorker
};

export class APIManager {
	private api: API;

	private worker!: APIWorker;

	public constructor(api: API) {
		this.api = api;

		this.worker = this.getWorker();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public callWithRequest(request: APIRequest): Promise<any> {
		this.worker.enqueue(request);

		return request.promise;
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

	private getWorker(): APIWorker {
		const Worker = workers[this.api.options.apiMode];

		if (!Worker) {
			throw new VKError({
				message: 'Unsuported api mode',
				code: 'UNSUPPORTED_MODE'
			});
		}

		return new Worker(this.api);
	}
}
