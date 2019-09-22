import Request from '../request';
import sequential from './sequential';

import {
	delay,
	getChainReturn,
	resolveExecuteTask
} from '../../utils/helpers';

export default async function parallel(next: Function): Promise<void> {
	// @ts-ignore
	const { queue } = this;

	if (queue[0].method.startsWith('execute')) {
		sequential.call(this, next);

		return;
	}

	// Wait next event loop, saves one request or more
	await delay(0);

	// @ts-ignore
	const { apiExecuteCount } = this.vk.options;

	const tasks = [];
	const chain = [];

	for (let i = 0; i < queue.length; i += 1) {
		if (queue[i].method.startsWith('execute')) {
			continue;
		}

		const request = queue.splice(i, 1)[0];

		i -= 1;

		tasks.push(request);
		chain.push(String(request));

		if (tasks.length >= apiExecuteCount) {
			break;
		}
	}

	try {
		const request = new Request('execute', {
			code: getChainReturn(chain)
		});

		// @ts-ignore
		this.callMethod(request);

		next();

		resolveExecuteTask(tasks, await request.promise);
	} catch (error) {
		for (const task of tasks) {
			task.reject(error);
		}
	}
}
