// @ts-ignore
import { API, APIRequest } from '../api';
// @ts-ignore

// @ts-ignore
import { ExecuteError } from '../errors';
// @ts-ignore
import { getChainReturn, resolveExecuteTask } from '../utils/helpers';
// @ts-ignore

// @ts-ignore
export interface IExecutesPayload {
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	response: any[];
// @ts-ignore
	errors: ExecuteError[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IExecutesOptions {
// @ts-ignore
	api: API;
// @ts-ignore

// @ts-ignore
	method: string;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	queue: Record<string, any>[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export const executeRequests = async (
// @ts-ignore
	api: API,
// @ts-ignore
	queue: APIRequest[]
// @ts-ignore
): Promise<IExecutesPayload> => {
// @ts-ignore
	const out: IExecutesPayload = {
// @ts-ignore
		response: [],
// @ts-ignore
		errors: []
// @ts-ignore
	};
// @ts-ignore

// @ts-ignore
	if (queue.length === 0) {
// @ts-ignore
		return out;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	while (queue.length > 0) {
// @ts-ignore
		const tasks = queue.splice(0, 25);
// @ts-ignore
		const code = getChainReturn(tasks.map(String));
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const response = await api.execute({ code });
// @ts-ignore

// @ts-ignore
			resolveExecuteTask(tasks, response);
// @ts-ignore

// @ts-ignore
			out.response.push(...response.response);
// @ts-ignore
			out.errors.push(...response.errors);
// @ts-ignore
		} catch (error) {
// @ts-ignore
			for (const task of tasks) {
// @ts-ignore
				task.reject(error);
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			throw error;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return out;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export const executes = ({
// @ts-ignore
	api,
// @ts-ignore
	method,
// @ts-ignore
	queue
// @ts-ignore
}: IExecutesOptions): Promise<IExecutesPayload> => (
// @ts-ignore
	executeRequests(api, queue.map(params => (
// @ts-ignore
		new APIRequest({
// @ts-ignore
			api,
// @ts-ignore
			method,
// @ts-ignore
			params
// @ts-ignore
		})
// @ts-ignore
	)))
// @ts-ignore
);
