// @ts-ignore
/**
// @ts-ignore
 * Copies object params to new object
// @ts-ignore
 */
// @ts-ignore
export const copyParams = <
// @ts-ignore
	T,
// @ts-ignore
	K extends keyof T
// @ts-ignore
>(params: T, properties: K[]): Pick<T, K> => {
// @ts-ignore
	const copies = {} as Pick<T, K>;
// @ts-ignore

// @ts-ignore
	for (const property of properties) {
// @ts-ignore
		copies[property] = params[property];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return copies;
// @ts-ignore
};
