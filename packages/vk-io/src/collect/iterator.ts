// @ts-ignore
import createDebug from 'debug';
// @ts-ignore

// @ts-ignore
import { API, Objects } from '../api';
// @ts-ignore
import {
// @ts-ignore
	APIError,
// @ts-ignore
	CollectError,
// @ts-ignore

// @ts-ignore
	APIErrorCode,
// @ts-ignore
	CollectErrorCode
// @ts-ignore
} from '../errors';
// @ts-ignore

// @ts-ignore
import { getExecuteCode } from './execute-code';
// @ts-ignore

// @ts-ignore
const debug = createDebug('api-io:collect');
// @ts-ignore

// @ts-ignore
export interface ICollectPaginateResponse<T> {
// @ts-ignore
	count: number;
// @ts-ignore
	items: T[]
// @ts-ignore
	groups?: Objects.GroupsGroupFull[];
// @ts-ignore
	profiles?: Objects.UsersUserFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ICollectIteratorOptions {
// @ts-ignore
	api: API;
// @ts-ignore

// @ts-ignore
	method: string;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	params: Record<string, any> & {
// @ts-ignore
		count?: number;
// @ts-ignore
		offset?: number;
// @ts-ignore
	};
// @ts-ignore

// @ts-ignore
	maxCount?: number;
// @ts-ignore
	countPerRequest: number;
// @ts-ignore

// @ts-ignore
	retryLimit?: number;
// @ts-ignore
	parallelRequests?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ICollectIteratorData<T> {
// @ts-ignore
	received: number;
// @ts-ignore
	percent: number;
// @ts-ignore
	total: number;
// @ts-ignore
	items: T[];
// @ts-ignore
	profiles: Objects.UsersUserFull[];
// @ts-ignore
	groups: Objects.GroupsGroupFull[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export async function* createCollectIterator<T>({
// @ts-ignore
	api,
// @ts-ignore

// @ts-ignore
	method,
// @ts-ignore
	params: rawParams = {},
// @ts-ignore

// @ts-ignore
	countPerRequest,
// @ts-ignore
	maxCount = Infinity,
// @ts-ignore

// @ts-ignore
	retryLimit = 3,
// @ts-ignore
	parallelRequests = 25
// @ts-ignore
}: ICollectIteratorOptions): AsyncGenerator<ICollectIteratorData<T>> {
// @ts-ignore
	if (parallelRequests < 1 || parallelRequests > 25) {
// @ts-ignore
		throw new RangeError('The number of parallel calls can be between 1 and 25');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	const params = {
// @ts-ignore
		...rawParams,
// @ts-ignore

// @ts-ignore
		count: countPerRequest
// @ts-ignore
	};
// @ts-ignore

// @ts-ignore
	const code = getExecuteCode({ method, params });
// @ts-ignore

// @ts-ignore
	const {
// @ts-ignore
		count: desiredCount = Infinity,
// @ts-ignore
		offset: ignoredOffset = 0
// @ts-ignore
	} = rawParams;
// @ts-ignore

// @ts-ignore
	let total: number | undefined = Math.min(maxCount, desiredCount);
// @ts-ignore
	if (!Number.isFinite(total)) {
// @ts-ignore
		total = undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	let offset = ignoredOffset;
// @ts-ignore
	let received = 0;
// @ts-ignore

// @ts-ignore
	let retries = 0;
// @ts-ignore
	let supportExecute = true;
// @ts-ignore

// @ts-ignore
	while (true) {
// @ts-ignore
		const firstTime = received === 0;
// @ts-ignore

// @ts-ignore
		if (!firstTime && total! <= received) {
// @ts-ignore
			break;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const singleRequests = !supportExecute || parallelRequests === 1;
// @ts-ignore

// @ts-ignore
		let result: ICollectPaginateResponse<T>;
// @ts-ignore
		try {
// @ts-ignore
			if (singleRequests) {
// @ts-ignore
				result = await api.call<ICollectPaginateResponse<T>>(method, {
// @ts-ignore
					...params,
// @ts-ignore

// @ts-ignore
					offset
// @ts-ignore
				});
// @ts-ignore
			} else {
// @ts-ignore
				const { errors, response } = await api.execute<ICollectPaginateResponse<T>>({
// @ts-ignore
					code,
// @ts-ignore
					total,
// @ts-ignore
					offset,
// @ts-ignore
					received,
// @ts-ignore
					parallelRequests
// @ts-ignore
				});
// @ts-ignore

// @ts-ignore
				if (errors.length !== 0) {
// @ts-ignore
					throw new CollectError({
// @ts-ignore
						message: 'Execute error',
// @ts-ignore
						code: CollectErrorCode.EXECUTE_ERROR,
// @ts-ignore
						errors
// @ts-ignore
					});
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				result = response;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			retries = 0;
// @ts-ignore
		} catch (error) {
// @ts-ignore
			if (error instanceof CollectError) {
// @ts-ignore
				throw error;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (retries === retryLimit) {
// @ts-ignore
				throw error;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			retries += 1;
// @ts-ignore

// @ts-ignore
			if ((error as APIError).code === APIErrorCode.APP_AUTH) {
// @ts-ignore
				supportExecute = false;
// @ts-ignore

// @ts-ignore
				debug('execute not supported in token');
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if ((error as APIError).code === APIErrorCode.RUNTIME) {
// @ts-ignore
				// eslint-disable-next-line no-param-reassign
// @ts-ignore
				parallelRequests -= 1;
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			continue;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (total === undefined || total > result.count) {
// @ts-ignore
			total = result.count;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { length } = result.items;
// @ts-ignore

// @ts-ignore
		if (length === 0) {
// @ts-ignore
			break;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		offset += length;
// @ts-ignore
		received += length;
// @ts-ignore

// @ts-ignore
		const percent = Math.floor((received / total) * 100);
// @ts-ignore

// @ts-ignore
		yield {
// @ts-ignore
			received,
// @ts-ignore
			percent,
// @ts-ignore
			total,
// @ts-ignore
			items: result.items,
// @ts-ignore
			profiles: result.profiles ?? [],
// @ts-ignore
			groups: result.groups ?? []
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
