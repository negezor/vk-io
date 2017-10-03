import createDebug from 'debug';
import { CookieJar } from 'tough-cookie';
import { load as cheerioLoad } from 'cheerio';

import { writeFileSync } from 'fs';
import { URL, URLSearchParams } from 'url';

import { AuthError, authErrors } from '../errors';

import { parseFormField } from './helpers';
import { STANDALONE_USER_AGENT, CALLBACK_BLANK } from '../util/constants';
import { fetchCookieFollowRedirectsDecorator } from '../util/fetch-cookie';

const debug = createDebug('vk-io:auth:implicit-flow');

const {
	PAGE_BLOCKED,
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	MISSING_CAPTCHA_HANDLER
} = authErrors;

let pages = -1;
const writeHtml = (html) => {
	writeFileSync(`pages/page-${pages += 1}.html`, html);
};

export default class ImplicitFlow {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.jar = new CookieJar();
	}

	/**
	 * Returns CookieJar
	 *
	 * @return {CookieJar}
	 */
	getCookieJar() {
		return this.jar;
	}

	/**
	 * Sets the CookieJar
	 *
	 * @param {CookieJar} jar
	 *
	 * @return {this}
	 */
	setCookieJar(jar) {
		this.jar = jar;

		return this;
	}

	/**
	 * Executes the HTTP request
	 *
	 * @param {string} url
	 * @param {Object} options
	 *
	 * @return {Promise<Response>}
	 */
	fetch(url, options = {}) {
		const { headers = {} } = options;

		// eslint-disable-next-line no-underscore-dangle
		return this._fetch(url, {
			...options,

			headers: {
				...headers,

				'User-Agent': STANDALONE_USER_AGENT
			}
		});
	}

	/**
	 * Runs authorization
	 *
	 * @return {Promise<mixed>}
	 */
	async run() {
		// eslint-disable-next-line no-underscore-dangle
		this._fetch = fetchCookieFollowRedirectsDecorator(this.jar);

		debug('get permissions page');

		let response = await this.getPermissionsPage();

		let i = 0;

		while (i < 3) {
			i += 1;

			if (response.url.includes(CALLBACK_BLANK)) {
				break;
			}

			// eslint-disable-next-line no-await-in-loop
			const $ = cheerioLoad(await response.textConverted());

			const $error = $('.box_error');

			if ($error.length !== 0) {
				throw new AuthError({
					message: `Auth form error: ${$error.text()}`,
					code: AUTHORIZATION_FAILED
				});
			}

			writeHtml($.html());

			if ($('input[name="pass"]').length !== 0) {
				debug('Authorization started');

				response = await this.processAuthForm(parseFormField($));

				continue;
			}
		}

		return response;
	}

	/**
	 * Process form auth
	 *
	 * @param {Object} form
	 *
	 * @return {Promise}
	 */
	processAuthForm({ action, fields }) {
		const { login, password, phone } = this.vk.options;

		fields.email = login || phone;
		fields.pass = password;

		return this.fetch(action, {
			method: 'POST',
			body: new URLSearchParams(fields)
		});
	}
}
