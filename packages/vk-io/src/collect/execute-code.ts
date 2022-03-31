// @ts-ignore
import { getExecuteParams } from '../utils/helpers';
// @ts-ignore

// @ts-ignore
export interface IExecuteCodeOptions {
// @ts-ignore
	method: string;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	params: Record<string, any>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export const getExecuteCode = ({ method, params }: IExecuteCodeOptions): string => (
// @ts-ignore
	`
// @ts-ignore
		var params = ${getExecuteParams(params)};
// @ts-ignore

// @ts-ignore
		params.offset = parseInt(Args.offset);
// @ts-ignore

// @ts-ignore
		var total = parseInt(Args.total);
// @ts-ignore
		var received = parseInt(Args.received);
// @ts-ignore

// @ts-ignore
		var parallelRequests = parseInt(Args.parallelRequests);
// @ts-ignore

// @ts-ignore
		var proceed = total == 0 || received < total;
// @ts-ignore

// @ts-ignore
		var i = 0, items = [], profiles = [], groups = [], result, length;
// @ts-ignore

// @ts-ignore
		while (i < parallelRequests && proceed) {
// @ts-ignore
			result = API.${method}(params);
// @ts-ignore
			length = result.items.length;
// @ts-ignore

// @ts-ignore
			if (total == 0 || total > result.count) {
// @ts-ignore
				total = result.count;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			items = items + result.items;
// @ts-ignore
			if (result.profiles)
// @ts-ignore
				profiles = profiles + result.profiles;
// @ts-ignore
			if (result.groups)
// @ts-ignore
				groups = groups + result.groups;
// @ts-ignore

// @ts-ignore
			received = received + length;
// @ts-ignore
			params.offset = params.offset + length;
// @ts-ignore

// @ts-ignore
			proceed = received < total;
// @ts-ignore
			i = i + 1;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return {
// @ts-ignore
			count: total,
// @ts-ignore
			items: items.splice(0, total),
// @ts-ignore
			profiles: profiles.splice(0, total),
// @ts-ignore
			groups: groups.splice(0, total)
// @ts-ignore
		};
// @ts-ignore
	`
// @ts-ignore
);
