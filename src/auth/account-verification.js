import createDebug from 'debug';
import { CookieJar } from 'tough-cookie';
import { load as cheerioLoad } from 'cheerio';

import { URL, URLSearchParams } from 'url';

import { AuthError, authErrors } from '../errors';
import { parseFormField, getFullURL } from './helpers';
import { DESKTOP_USER_AGENT, CALLBACK_BLANK } from '../util/constants';
import { fetchCookieFollowRedirectsDecorator } from '../util/fetch-cookie';

const debug = createDebug('vk-io:auth:account-verification');

const {
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	FAILED_PASSED_TWO_FACTOR,
	MISSING_TWO_FACTOR_HANDLER
} = authErrors;

/**
 * Two-factor auth check action
 *
 * @type {string}
 */
const ACTION_AUTH_CODE = 'act=authcheck';

/**
 * Phone number check action
 *
 * @type {string}
 */
const ACTION_SECURITY_CODE = 'act=security';

/**
 * Number of two-factorial attempts
 *
 * @type {number}
 */
const TWO_FACTOR_ATTEMPTS = 3;

/**
 * Number of captcha attempts
 *
 * @type {number}
 */
const CAPTCHA_ATTEMPTS = 3;

export default class AccountVerification {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		const { agent, login, phone } = vk.options;

		this.agent = agent;
		this.login = login;
		this.phone = phone;

		this.jar = new CookieJar();
		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);

		this.twoFactorAttempts = 0;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'AccountVerification';
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
		const { agent } = this;

		const { headers = {} } = options;

		return this.fetchCookie(url, {
			...options,

			agent,
			compress: false,

			headers: {
				...headers,

				'User-Agent': DESKTOP_USER_AGENT
			}
		});
	}

	/**
	 * Runs authorization
	 *
	 * @return {Promise<Object>}
	 */
	// eslint-disable-next-line consistent-return
	async run(redirectUri) {
		let response = await this.fetch(redirectUri, {
			method: 'GET'
		});

		const isProcessed = true;

		while (isProcessed) {
			const { url } = response;

			if (url.includes(CALLBACK_BLANK)) {
				let { hash } = new URL(response.url);

				if (hash.startsWith('#')) {
					hash = hash.substring(1);
				}

				const params = new URLSearchParams(hash);

				if (params.has('error')) {
					throw new AuthError({
						message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
						code: AUTHORIZATION_FAILED
					});
				}

				const user = params.get('user_id');

				return {
					user: user !== null
						? Number(user)
						: null,

					token: params.get('access_token')
				};
			}

			const $ = cheerioLoad(await response.text());

			if (url.includes(ACTION_AUTH_CODE)) {
				response = await this.processTwoFactorForm(response, $);

				continue;
			}

			if (url.includes(ACTION_SECURITY_CODE)) {
				response = await this.processSecurityForm(response, $);

				continue;
			}

			throw new AuthError({
				message: 'Account verification failed',
				code: AUTHORIZATION_FAILED
			});
		}
	}

	/**
	 * Process two-factor form
	 *
	 * @param {Response} response
	 * @param {Cheerio}  $
	 *
	 * @return {Promise<Response>}
	 */
	async processTwoFactorForm(response, $) {
		debug('process two-factor handle');

		if (this.vk.twoFactorHandler === null) {
			throw new AuthError({
				message: 'Missing two-factor handler',
				code: MISSING_TWO_FACTOR_HANDLER
			});
		}

		let isProcessed = true;

		while (this.twoFactorAttempts < TWO_FACTOR_ATTEMPTS && isProcessed) {
			// eslint-disable-next-line no-loop-func
			await (new Promise((resolve, reject) => {
				this.vk.twoFactorHandler({}, async (code) => {
					const { action, fields } = parseFormField($);

					fields.code = code;

					try {
						const url = getFullURL(action, response);

						response = await this.fetch(url, {
							method: 'POST',
							body: new URLSearchParams(fields)
						});
					} catch (error) {
						reject(error);

						throw error;
					}

					if (response.url.includes(ACTION_AUTH_CODE)) {
						resolve();

						throw new AuthError({
							message: 'Incorrect two-factor code',
							code: FAILED_PASSED_TWO_FACTOR
						});
					}

					isProcessed = false;

					resolve();
				});
			}));

			this.twoFactorAttempts += 1;
		}

		if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS && isProcessed) {
			throw new AuthError({
				message: 'Failed passed two-factor authentication',
				code: FAILED_PASSED_TWO_FACTOR
			});
		}

		return response;
	}

	/**
	 * Process security form
	 *
	 * @param {Response} response
	 * @param {Cheerio}  $
	 *
	 * @return {Promise<Response>}
	 */
	async processSecurityForm(response, $) {
		debug('process security form');

		const { login, phone } = this;

		let number;
		if (phone !== null) {
			number = phone;
		} else if (login !== null && !login.includes('@')) {
			number = login;
		} else {
			throw new AuthError({
				message: 'Missing phone number in the phone or login field',
				code: INVALID_PHONE_NUMBER
			});
		}

		if (typeof number === 'string') {
			number = number.trim().replace(/^(\+|00)/, '');
		}

		number = String(number);

		const $field = $('.field_prefix');

		const prefix = $field.first().text().trim().replace('+', '').length;
		const postfix = $field.last().text().trim().length;

		const { action, fields } = parseFormField($);

		fields.code = number.slice(prefix, number.length - postfix);

		const url = getFullURL(action, response);

		response = await this.fetch(url, {
			method: 'POST',
			body: new URLSearchParams(fields)
		});

		if (response.url.includes(ACTION_SECURITY_CODE)) {
			throw new AuthError({
				message: 'Invalid phone number',
				code: INVALID_PHONE_NUMBER
			});
		}

		return response;
	}
}
