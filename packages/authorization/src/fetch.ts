/**
 * NOTICE: This file is needed to bridge between CJS and ESM
 *
 * @see https://github.com/node-fetch/node-fetch/issues/1266#issuecomment-913216211
 */
const fetchPromise = import('node-fetch').then(mod => mod.default);

export type RequestInfo = import('node-fetch').RequestInfo | URL;
export type RequestInit = import('node-fetch').RequestInit;
export type Response = import('node-fetch').Response;

export const fetch = (url: RequestInfo, init?: RequestInit): Promise<Response> => (
	Promise.resolve(fetchPromise).then(fn => fn(url as string, init))
);
