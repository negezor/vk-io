// @ts-ignore
import fetch from 'node-fetch';
// @ts-ignore
import createDebug from 'debug';
import { CookieJar } from 'tough-cookie';

import { URL } from 'url';
import { promisify } from 'util';

const debug = createDebug('vk-io:util:fetch-cookie');

const REDIRECT_CODES = [303, 301, 302];

const USER_AGENT_RE = /^User-Agent$/i;

const findUserAgent = (headers: Record<string, string> | null): string | null => {
	if (!headers) {
		return null;
	}

	const key = Object.keys(headers)
		.find((header): boolean => USER_AGENT_RE.test(header));

	if (!key) {
		return null;
	}

	return headers[key];
};

export { CookieJar };

export const fetchCookieDecorator = (jar = new CookieJar()): Function => {
	const setCookie = promisify(jar.setCookie).bind(jar);
	const getCookieString = promisify(jar.getCookieString).bind(jar);

	// @ts-ignore
	return async function fetchCookie(
		url: URL | string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		options: Record<string, any> = {}
	): Promise<object> {
		const previousCookie = await getCookieString(String(url));

		const { headers = {} } = options;

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

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		await Promise.all(cookies.map((cookie: string): Promise<any> => (
			setCookie(cookie, response.url)
		)));

		return response;
	};
};

export const fetchCookieFollowRedirectsDecorator = (jar?: CookieJar): Function => {
	const fetchCookie = fetchCookieDecorator(jar);

	return async function fetchCookieFollowRedirects(
		url: URL | string,
		// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		options: Record<string, any> = {}
	): Promise<object> {
		const response = await fetchCookie(url, {
			...options,

			redirect: 'manual'
		});

		const isRedirect = REDIRECT_CODES.includes(response.status);

		if (isRedirect && options.redirect !== 'manual' && options.follow !== 0) {
			debug('Redirect to', response.headers.get('location'));

			let follow;
			if (options.follow) {
				follow = options.follow - 1;
			}

			const userAgent = findUserAgent(options.headers);

			const headers = userAgent
				? { 'User-Agent': userAgent }
				: {};

			const redirectResponse = await fetchCookieFollowRedirects(response.headers.get('location'), {
				method: 'GET',
				body: null,
				headers,
				follow
			});

			return redirectResponse;
		}

		return response;
	};
};
