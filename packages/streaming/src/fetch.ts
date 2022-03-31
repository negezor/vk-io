// @ts-ignore
/**
// @ts-ignore
 * NOTICE: This file is needed to bridge between CJS and ESM
// @ts-ignore
 *
// @ts-ignore
 * @see https://github.com/node-fetch/node-fetch/issues/1266#issuecomment-913216211
// @ts-ignore
 */
// @ts-ignore
const fetchPromise = import('node-fetch').then(mod => mod.default);
// @ts-ignore

// @ts-ignore
export type RequestInfo = import('node-fetch').RequestInfo | URL;
// @ts-ignore
export type RequestInit = import('node-fetch').RequestInit;
// @ts-ignore
export type Response = import('node-fetch').Response;
// @ts-ignore

// @ts-ignore
export const fetch = (url: RequestInfo, init?: RequestInit): Promise<Response> => (
// @ts-ignore
	Promise.resolve(fetchPromise).then(fn => fn(url as string, init))
// @ts-ignore
);
