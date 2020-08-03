/**
 * Copies object params to new object
 */
export const copyParams = <
	T,
	K extends keyof T
>(params: T, properties: K[]): Pick<T, K> => {
	const copies = {} as Pick<T, K>;

	for (const property of properties) {
		copies[property] = params[property];
	}

	return copies;
};
