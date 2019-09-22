import { getExecuteMethod } from '../utils/helpers';

const unespaceOffset = /"offset":"(\w+)"/g;

export interface IExecuteCodeOptions {
	method: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	params: Record<string, any>;
	parallelCount: number;
}

export default ({ method, params, parallelCount }: IExecuteCodeOptions): string => {
	const methodCode = getExecuteMethod(method, {
		...params,

		offset: 'offset'
	});

	const code = `
		var total = parseInt(Args.total);
		var offset = parseInt(Args.offset);
		var received = parseInt(Args.received);

		var proceed = total == 0 || received < total;

		var i = 0, items = [], profiles = [], groups = [], result, length;

		while (i < ${parallelCount} && proceed) {
			result = ${methodCode};
			length = result.items.length;

			if (total == 0 || total > result.count) {
				total = result.count;
			}

			items = items + result.items;
			if (result.profiles)
				profiles = profiles + result.profiles;
			if (result.groups)
				groups = groups + result.groups;

			offset = offset + length;
			received = received + length;

			proceed = received < total;
			i = i + 1;
		}

		return {
			total: total,
			items: items.splice(0, total),
			profiles: profiles.splice(0, total),
			groups: groups.splice(0, total)
		};
	`;

	return code.replace(unespaceOffset, '"offset":$1');
};
