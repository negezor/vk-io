import { getExecuteParams } from '../utils/helpers';

export interface IExecuteCodeOptions {
	method: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: Record<string, any>;
}

export const getExecuteCode = ({ method, params }: IExecuteCodeOptions): string => (
	`
		var params = ${getExecuteParams(params)};

		params.offset = parseInt(Args.offset);

		var total = parseInt(Args.total);
		var received = parseInt(Args.received);

		var parallelRequests = parseInt(Args.parallelRequests);

		var proceed = total == 0 || received < total;

		var i = 0, items = [], profiles = [], groups = [], result, length;

		while (i < parallelRequests && proceed) {
			result = API.${method}(params);
			length = result.items.length;

			if (total == 0 || total > result.count) {
				total = result.count;
			}

			items = items + result.items;
			if (result.profiles)
				profiles = profiles + result.profiles;
			if (result.groups)
				groups = groups + result.groups;

			received = received + length;
			params.offset = params.offset + length;

			proceed = received < total;
			i = i + 1;
		}

		return {
			count: total,
			items: items.splice(0, total),
			profiles: profiles.splice(0, total),
			groups: groups.splice(0, total)
		};
	`
);
