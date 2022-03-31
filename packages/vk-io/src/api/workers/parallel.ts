// @ts-ignore
import { APIRequest } from '../request';
// @ts-ignore
import { SequentialWorker } from './sequential';
// @ts-ignore

// @ts-ignore
import { getChainReturn, resolveExecuteTask } from '../../utils/helpers';
// @ts-ignore

// @ts-ignore
export class ParallelWorker extends SequentialWorker {
// @ts-ignore
	protected async execute(): Promise<void> {
// @ts-ignore
		const { queue } = this;
// @ts-ignore

// @ts-ignore
		if (this.skipMethod(queue[0].method)) {
// @ts-ignore
			super.execute();
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { apiExecuteCount } = this.api.options;
// @ts-ignore

// @ts-ignore
		const tasks: APIRequest[] = [];
// @ts-ignore

// @ts-ignore
		for (let i = 0; i < this.queue.length; i += 1) {
// @ts-ignore
			if (this.skipMethod(queue[i].method)) {
// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			tasks.push(
// @ts-ignore
				queue.splice(i, 1)[0]
// @ts-ignore
			);
// @ts-ignore

// @ts-ignore
			i -= 1;
// @ts-ignore

// @ts-ignore
			if (tasks.length >= apiExecuteCount) {
// @ts-ignore
				break;
// @ts-ignore
			}
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (tasks.length === 0) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const request = new APIRequest({
// @ts-ignore
			api: this.api,
// @ts-ignore
			method: 'execute',
// @ts-ignore
			params: {
// @ts-ignore
				code: getChainReturn(tasks.map(String))
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		super.execute(request);
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			resolveExecuteTask(tasks, await request.promise);
// @ts-ignore
		} catch (error) {
// @ts-ignore
			for (const task of tasks) {
// @ts-ignore
				task.reject(error);
// @ts-ignore
			}
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	protected skipMethod(method: string): boolean {
// @ts-ignore
		return method.startsWith('execute')
// @ts-ignore
			|| this.api.options.apiExecuteUnsupportedMethods.includes(method);
// @ts-ignore
	}
// @ts-ignore
}
