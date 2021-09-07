import createDebug from 'debug';
import { CookieJar } from 'tough-cookie';

import {
	fetch,

	RequestInfo,
	RequestInit,
	Response
} from './fetch';

export type Headers = Record<string, string>;

export type FetchWrapper = (
	url: RequestInfo,
	options?: RequestInit
) => Promise<Response>;

export {
	CookieJar,
	RequestInfo,
	RequestInit,
	Response
};

const debug = createDebug('vk-io:util:fetch-cookie');

const userAgentRe = /^User-Agent$/i;

const redirectCodes = new Set([303, 301, 302]);

const findUserAgent = (headers?: Headers): string | undefined => {
	if (!headers) {
		return undefined;
	}

	const key = Object.keys(headers)
		.find((header): boolean => userAgentRe.test(header));

	if (!key) {
		return undefined;
	}

	return headers[key];
};

export const fetchCookieDecorator = (jar = new CookieJar()): FetchWrapper => (
	async function fetchCookie(
		url: RequestInfo,
		options: RequestInit = {}
	): Promise<Response> {
		const previousCookie = await jar.getCookieString(String(url));

		const { headers = {} } = options as {
			headers: Headers;
		};

		if (previousCookie) {
			headers.cookie = previousCookie;
		}

		debug('fetch url %s', url);

		const response = await fetch(url, {
			...options,

			headers
		});

		const { 'set-cookie': cookies = [] } = response.headers.raw();

		if (cookies.length === 0) {
			return response;
		}

		await Promise.all(cookies.map((cookie: string): Promise<unknown> => (
			jar.setCookie(cookie, response.url)
		)));

		return response;
	}
);

export const fetchCookieFollowRedirectsDecorator = (jar?: CookieJar): FetchWrapper => {
	const fetchCookie = fetchCookieDecorator(jar);

	return async function fetchCookieFollowRedirects(
		url: RequestInfo,
		options: RequestInit = {}
	): Promise<Response> {
		const response = await fetchCookie(url, {
			...options,

			redirect: 'manual'
		});

		const isRedirect = redirectCodes.has(response.status);

		if (isRedirect && options.redirect !== 'manual' && options.follow !== 0) {
			const location = response.headers.get('location');

			debug('Redirect to', location);

			if (!location) {
				throw new Error('Location header missing');
			}

			let follow;
			if (options.follow) {
				follow = options.follow - 1;
			}

			const userAgent = findUserAgent(options.headers as Headers);

			const headers: Headers = userAgent !== undefined
				// eslint-disable-next-line @typescript-eslint/naming-convention
				? { 'User-Agent': userAgent }
				: {};

			const redirectResponse = await fetchCookieFollowRedirects(location, {
				method: 'GET',
				body: undefined,
				agent: options.agent,
				headers,
				follow
			});

			return redirectResponse;
		}

		return response;
	};
};
