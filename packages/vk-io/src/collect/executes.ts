import { type API, APIRequest } from '../api';

import type { ExecuteError } from '../errors';
import { getChainReturn, resolveExecuteTask } from '../utils/helpers';

export interface IExecutesPayload {
    response: any[];
    errors: ExecuteError[];
}

export interface IExecutesOptions {
    api: API;

    method: string;
    queue: Record<string, any>[];
}

export const executeRequests = async (api: API, queue: APIRequest[]): Promise<IExecutesPayload> => {
    const out: IExecutesPayload = {
        response: [],
        errors: [],
    };

    if (queue.length === 0) {
        return out;
    }

    while (queue.length > 0) {
        const tasks = queue.splice(0, 25);
        const code = getChainReturn(tasks.map(String));

        try {
            const response = await api.execute({ code });

            resolveExecuteTask(tasks, response);
            out.response.push(...response.response);
            out.errors.push(...response.errors);
        } catch (error) {
            for (const task of tasks) {
                task.reject(error);
            }

            throw error;
        }
    }

    return out;
};

export const executes = ({ api, method, queue }: IExecutesOptions): Promise<IExecutesPayload> =>
    executeRequests(
        api,
        queue.map(
            params =>
                new APIRequest({
                    api,
                    method,
                    params,
                }),
        ),
    );
