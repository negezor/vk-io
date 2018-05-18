import Request from '../request';
import sequential from './sequential';

import {
	delay,
	getChainReturn,
	resolveExecuteTask
} from '../../utils/helpers';

export default async function parallelSelected(next) {
	const { apiExecuteMethods, apiExecuteCount } = this.vk.options;

	const { queue } = this;

	if (!apiExecuteMethods.includes(queue[0].method)) {
		sequential.call(this, next);

		return;
	}

	// Wait next event loop, saves one request or more
	await delay(0);

	const tasks = [];
	const chain = [];

	for (let i = 0; i < queue.length; i += 1) {
		if (!apiExecuteMethods.includes(queue[i].method)) {
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

	if (tasks.length === 0) {
		sequential.call(this, next);

		return;
	}

	try {
		const request = new Request('execute', {
			code: getChainReturn(chain)
		});

		this.callMethod(request);

		next();

		resolveExecuteTask(tasks, await request.promise);
	} catch (error) {
		for (const task of tasks) {
			task.reject(error);
		}
	}
}
