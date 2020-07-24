/**
 * Copies object params to new object
 */
export const copyParams = <
	T,
	K extends keyof T
>(params: T, properties: K[]): Pick<T, K> => {
	// @ts-expect-error
	const copies: Pick<T, K> = {};

	for (const property of properties) {
		copies[property] = params[property];
	}

	return copies;
};
