import createDebug from 'debug';

import { API, Objects } from '../api';
import {
	APIError,
	CollectError,

	APIErrorCode,
	CollectErrorCode
} from '../errors';

import { getExecuteCode } from './execute-code';

const debug = createDebug('api-io:collect');

export interface ICollectPaginateResponse<T> {
	count: number;
	items: T[]
	groups?: Objects.GroupsGroupFull[];
	profiles?: Objects.UsersUserFull[];
}

export interface ICollectIteratorOptions {
	api: API;

	method: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: Record<string, any> & {
		count?: number;
		offset?: number;
	};

	maxCount?: number;
	countPerRequest: number;

	retryLimit?: number;
	parallelRequests?: number;
}

export interface ICollectIteratorData<T> {
	received: number;
	percent: number;
	total: number;
	items: T[];
	profiles: Objects.UsersUserFull[];
	groups: Objects.GroupsGroupFull[];
}

export async function* createCollectIterator<T>({
	api,

	method,
	params: rawParams = {},

	countPerRequest,
	maxCount = Infinity,

	retryLimit = 3,
	parallelRequests = 25
}: ICollectIteratorOptions): AsyncGenerator<ICollectIteratorData<T>> {
	if (parallelRequests < 1 || parallelRequests > 25) {
		throw new RangeError('The number of parallel calls can be between 1 and 25');
	}

	const params = {
		...rawParams,

		count: countPerRequest
	};

	const code = getExecuteCode({ method, params });

	const {
		count: desiredCount = Infinity,
		offset: ignoredOffset = 0
	} = rawParams;

	let total: number | undefined = Math.min(maxCount, desiredCount);
	if (!Number.isFinite(total)) {
		total = undefined;
	}

	let offset = ignoredOffset;
	let received = 0;

	let retries = 0;
	let supportExecute = true;

	while (true) {
		const firstTime = received === 0;

		if (!firstTime && total! <= received) {
			break;
		}

		const singleRequests = !supportExecute || parallelRequests === 1;

		let result: ICollectPaginateResponse<T>;
		try {
			if (singleRequests) {
				result = await api.call<ICollectPaginateResponse<T>>(method, {
					...params,

					offset
				});
			} else {
				const { errors, response } = await api.execute<ICollectPaginateResponse<T>>({
					code,
					total,
					offset,
					received,
					parallelRequests
				});

				if (errors.length !== 0) {
					throw new CollectError({
						message: 'Execute error',
						code: CollectErrorCode.EXECUTE_ERROR,
						errors
					});
				}

				result = response;
			}

			retries = 0;
		} catch (error) {
			if (error instanceof CollectError) {
				throw error;
			}

			if (retries === retryLimit) {
				throw error;
			}

			retries += 1;

			if ((error as APIError).code === APIErrorCode.APP_AUTH) {
				supportExecute = false;

				debug('execute not supported in token');

				continue;
			}

			if ((error as APIError).code === APIErrorCode.RUNTIME) {
				// eslint-disable-next-line no-param-reassign
				parallelRequests -= 1;

				continue;
			}

			continue;
		}

		if (total === undefined || total > result.count) {
			total = result.count;
		}

		const { length } = result.items;

		if (length === 0) {
			break;
		}

		offset += length;
		received += length;

		const percent = Math.floor((received / total) * 100);

		yield {
			received,
			percent,
			total,
			items: result.items,
			profiles: result.profiles ?? [],
			groups: result.groups ?? []
		};
	}
}
