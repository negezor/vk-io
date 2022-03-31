// @ts-ignore
import createDebug from 'debug';
// @ts-ignore
import { CookieJar } from 'tough-cookie';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	fetch,
// @ts-ignore

// @ts-ignore
	RequestInfo,
// @ts-ignore
	RequestInit,
// @ts-ignore
	Response
// @ts-ignore
} from './fetch';
// @ts-ignore

// @ts-ignore
export type Headers = Record<string, string>;
// @ts-ignore

// @ts-ignore
export type FetchWrapper = (
// @ts-ignore
	url: RequestInfo,
// @ts-ignore
	options?: RequestInit
// @ts-ignore
) => Promise<Response>;
// @ts-ignore

// @ts-ignore
export {
// @ts-ignore
	CookieJar,
// @ts-ignore
	RequestInfo,
// @ts-ignore
	RequestInit,
// @ts-ignore
	Response
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:util:fetch-cookie');
// @ts-ignore

// @ts-ignore
const userAgentRe = /^User-Agent$/i;
// @ts-ignore

// @ts-ignore
const redirectCodes = new Set([303, 301, 302]);
// @ts-ignore

// @ts-ignore
const findUserAgent = (headers?: Headers): string | undefined => {
// @ts-ignore
	if (!headers) {
// @ts-ignore
		return undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	const key = Object.keys(headers)
// @ts-ignore
		.find((header): boolean => userAgentRe.test(header));
// @ts-ignore

// @ts-ignore
	if (!key) {
// @ts-ignore
		return undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return headers[key];
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export const fetchCookieDecorator = (jar = new CookieJar()): FetchWrapper => (
// @ts-ignore
	async function fetchCookie(
// @ts-ignore
		url: RequestInfo,
// @ts-ignore
		options: RequestInit = {}
// @ts-ignore
	): Promise<Response> {
// @ts-ignore
		const previousCookie = await jar.getCookieString(String(url));
// @ts-ignore

// @ts-ignore
		const { headers = {} } = options as {
// @ts-ignore
			headers: Headers;
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		if (previousCookie) {
// @ts-ignore
			headers.cookie = previousCookie;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		debug('fetch url %s', url);
// @ts-ignore

// @ts-ignore
		const response = await fetch(url, {
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			headers
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const { 'set-cookie': cookies = [] } = response.headers.raw();
// @ts-ignore

// @ts-ignore
		if (cookies.length === 0) {
// @ts-ignore
			return response;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		await Promise.all(cookies.map((cookie: string): Promise<unknown> => (
// @ts-ignore
			jar.setCookie(cookie, response.url)
// @ts-ignore
		)));
// @ts-ignore

// @ts-ignore
		return response;
// @ts-ignore
	}
// @ts-ignore
);
// @ts-ignore

// @ts-ignore
export const fetchCookieFollowRedirectsDecorator = (jar?: CookieJar): FetchWrapper => {
// @ts-ignore
	const fetchCookie = fetchCookieDecorator(jar);
// @ts-ignore

// @ts-ignore
	return async function fetchCookieFollowRedirects(
// @ts-ignore
		url: RequestInfo,
// @ts-ignore
		options: RequestInit = {}
// @ts-ignore
	): Promise<Response> {
// @ts-ignore
		const response = await fetchCookie(url, {
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			redirect: 'manual'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const isRedirect = redirectCodes.has(response.status);
// @ts-ignore

// @ts-ignore
		if (isRedirect && options.redirect !== 'manual' && options.follow !== 0) {
// @ts-ignore
			const location = response.headers.get('location');
// @ts-ignore

// @ts-ignore
			debug('Redirect to', location);
// @ts-ignore

// @ts-ignore
			if (!location) {
// @ts-ignore
				throw new Error('Location header missing');
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			let follow;
// @ts-ignore
			if (options.follow) {
// @ts-ignore
				follow = options.follow - 1;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const userAgent = findUserAgent(options.headers as Headers);
// @ts-ignore

// @ts-ignore
			const headers: Headers = userAgent !== undefined
// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
				? { 'User-Agent': userAgent }
// @ts-ignore
				: {};
// @ts-ignore

// @ts-ignore
			const redirectResponse = await fetchCookieFollowRedirects(location, {
// @ts-ignore
				method: 'GET',
// @ts-ignore
				body: undefined,
// @ts-ignore
				agent: options.agent,
// @ts-ignore
				headers,
// @ts-ignore
				follow
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			return redirectResponse;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return response;
// @ts-ignore
	};
// @ts-ignore
};
