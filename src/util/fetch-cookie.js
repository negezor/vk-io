import fetch from 'node-fetch';
import createDebug from 'debug';
import { CookieJar } from 'tough-cookie';

import { promisify } from 'util';

const debug = createDebug('vk-io:util:fetch-cookie');

const REDIRECT_CODES = [303, 301, 302];

export const fetchCookieDecorator = (jar = new CookieJar()) => {
	const setCookie = promisify(jar.setCookie).bind(jar);
	const getCookieString = promisify(jar.getCookieString).bind(jar);

	return async function fetchCookie(url, options = {}) {
		const previousCookie = await getCookieString(url);

		const { headers = {} } = options;

		if (previousCookie) {
			headers.cookie = previousCookie;
		}

		debug('fetch url %s', url, options);

		const response = await fetch(url, {
			...options,

			headers
		});

		const cookies = response.headers.raw()['set-cookie'] || [];

		if (cookies.length === 0) {
			return response;
		}

		await Promise.all(cookies.map(cookie => (
			setCookie(cookie, response.url)
		)));

		return response;
	};
};

export const fetchCookieFollowRedirectsDecorator = (jar) => {
	const fetchCookie = fetchCookieDecorator(jar);

	return async function fetchCookieFollowRedirects(url, options = {}) {
		const response = await fetchCookie(url, {
			...options,

			redirect: 'manual'
		});

		const isRedirect = REDIRECT_CODES.includes(response.status);

		if (isRedirect && options.redirect !== 'manual' && options.follow !== 0) {
			debug('Redirect to', response.headers.get('location'));

			return await fetchCookieFollowRedirects(response.headers.get('location'), {
				method: 'GET',
				body: null,
				follow: options.follow
					? options.follow - 1
					: undefined
			});
		}

		return response;
	};
};
