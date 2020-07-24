import { VK } from '../vk';

import { APIRequest } from './request';

import {
	APIWorker,

	SequentialWorker,

	ParallelWorker,
	ParallelSelectedWorker
} from './workers';

import { Constructor } from '../types';
import { VKError } from '../errors';
import { MINIMUM_TIME_INTERVAL_API } from '../utils/constants';

const workers: Record<string, Constructor<APIWorker>> = {
	sequential: SequentialWorker,
	parallel: ParallelWorker,
	parallel_selected: ParallelSelectedWorker
};

export class APIManager {
	private vk: VK;

	private worker!: APIWorker;

	public constructor(vk: VK) {
		this.vk = vk;

		this.vk.internalHooks.on('update_options', ({ keys }: { keys: string[] }) => {
			if (!keys.includes('apiMode')) {
				return;
			}

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
		});

		this.worker = this.getWorker();
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public callWithRequest(request: APIRequest): Promise<any> {
		this.worker.enqueue(request);

		return request.promise;
	}

	private getWorker(): APIWorker {
		const Worker = workers[this.vk.options.apiMode];

		if (!Worker) {
			throw new VKError({
				message: 'Unsuported api mode',
				code: 'UNSUPPORTED_MODE'
			});
		}

		return new Worker(this.vk);
	}
}
