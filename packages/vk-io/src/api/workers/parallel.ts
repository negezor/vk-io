import { APIRequest } from '../request';
import { SequentialWorker } from './sequential';

import { getChainReturn, resolveExecuteTask } from '../../utils/helpers';

export class ParallelWorker extends SequentialWorker {
	protected async execute(): Promise<void> {
		const { queue } = this;

		if (this.skipMethod(queue[0].method)) {
			super.execute();

			return;
		}

		const { apiExecuteCount } = this.api.options;

		const tasks: APIRequest[] = [];

		for (let i = 0; i < this.queue.length; i += 1) {
			if (this.skipMethod(queue[i].method)) {
				continue;
			}

			tasks.push(
				queue.splice(i, 1)[0]
			);

			i -= 1;

			if (tasks.length >= apiExecuteCount) {
				break;
			}
		}

		if (tasks.length === 0) {
			return;
		}

		const request = new APIRequest({
			api: this.api,
			method: 'execute',
			params: {
				code: getChainReturn(tasks.map(String))
			}
		});

		super.execute(request);

		try {
			resolveExecuteTask(tasks, await request.promise);
		} catch (error) {
			for (const task of tasks) {
				task.reject(error);
			}
		}
	}

	// eslint-disable-next-line class-methods-use-this
	protected skipMethod(method: string): boolean {
		return method.startsWith('execute')
			|| this.api.options.apiExecuteUnsupportedMethods.includes(method);
	}
}
