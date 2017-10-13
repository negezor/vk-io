import createDebug from 'debug';
import { CookieJar } from 'tough-cookie';
import { load as cheerioLoad } from 'cheerio';

import { URL, URLSearchParams } from 'url';

import { AuthError, authErrors } from '../errors';

import { fetchCookieFollowRedirectsDecorator } from '../util/fetch-cookie';
import {
	API_VERSION,
	CALLBACK_BLANK,
	DESKTOP_USER_AGENT
} from '../util/constants';
import {
	getFullURL,
	parseFormField,
	getAllUsersPermissions,
	getUsersPermissionsByName
} from './helpers';

const debug = createDebug('vk-io:auth:direct');

const {
	PAGE_BLOCKED,
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	FAILED_PASSED_CAPTCHA,
	MISSING_CAPTCHA_HANDLER,
	FAILED_PASSED_TWO_FACTOR,
	MISSING_TWO_FACTOR_HANDLER
} = authErrors;

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

export default class DirectAuth {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} options
	 */
	constructor(vk, {
		app = vk.options.app,
		key = vk.options.key,

		agent = vk.options.agent,

		scope = vk.options.scope,
		login = vk.options.login,
		phone = vk.options.phone,
		password = vk.options.password
	} = {}) {
		this.vk = vk;

		this.app = app;
		this.key = key;

		this.agent = agent;

		this.scope = scope;
		this.login = login;
		this.phone = phone;
		this.password = password;

		this.jar = new CookieJar();

		this.started = false;

		this.captcha = null;
		this.captchaAttempts = 0;
		this.twoFactorAttempts = 0;
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

			compress: false,

			headers: {
				...headers,

				'User-Agent': DESKTOP_USER_AGENT,
				agent
			}
		});
	}

	/**
	 * Returns permission page
	 *
	 * @param {Object} query
	 *
	 * @return {Response}
	 */
	getPermissionPage(query = {}) {
		let { scope } = this;

		if (scope === 'all' || scope === null) {
			scope = getAllUsersPermissions();
		} else if (typeof scope !== 'number') {
			scope = getUsersPermissionsByName(scope);
		}

		debug('auth scope %s', scope);

		const {
			app,
			key,
			login,
			phone,
			password
		} = this;

		const params = new URLSearchParams({
			...query,
			username: login || phone,
			grant_type: 'password',
			client_secret: key,
			'2fa_supported': 1,
			v: API_VERSION,
			client_id: app,
			password,
			scope
		});

		const url = new URL(`https://oauth.vk.com/token?${params}`);

		return this.fetch(url, {
			method: 'GET'
		});
	}

	/**
	 * Runs authorization
	 *
	 * @return {Promise<Object>}
	 */
	// eslint-disable-next-line consistent-return
	async run() {
		if (this.started) {
			throw new AuthError({
				message: 'Authorization already started!',
				code: AUTHORIZATION_FAILED
			});
		}

		this.started = true;

		let response = this.getPermissionsPage();
		let text;

		const isProcessed = true;

		while (isProcessed) {
			text = await response.text();

			let isJSON;
			try {
				text = JSON.parse(text);

				isJSON = true;
			} catch (e) {
				isJSON = false;
			}

			if (isJSON && 'access_token' in text) {
				const {
					email = null,
					user_id: user = null,
					expires_in: expires = null,
					access_token: token,
				} = text;

				return {
					email,
					user: user !== null
						? Number(user)
						: null,

					token,
					expires: expires !== null
						? Number(expires)
						: null
				};
			} else if (isJSON && 'error' in text) {
				if (text.error === 'need_captcha') {
					if (this.captcha !== null) {
						this.captcha.reject(new AuthError({
							message: 'Incorrect captcha code',
							code: FAILED_PASSED_CAPTCHA
						}));

						this.captcha = null;

						this.captchaAttempts += 1;
					}

					response = await this.processCaptcha(text);
				}
			}

			const $ = cheerioLoad(text);

			/* TODO: Make me! */
		}
	}

	/**
	 * Process captcha
	 *
	 * @param {Object} payload
	 *
	 * @return {Response}
	 */
	async processCaptcha({ captcha_sid: sid, captcha_img: src }) {
		debug('captcha process');

		if (this.vk.captchaHandler === null) {
			throw new AuthError({
				message: 'Missing captcha handler',
				code: MISSING_CAPTCHA_HANDLER
			});
		}

		if (this.captchaAttempts >= CAPTCHA_ATTEMPTS) {
			throw new AuthError({
				message: 'Maximum attempts passage captcha',
				code: FAILED_PASSED_CAPTCHA
			});
		}

		const key = await (new Promise((resolveCaptcha) => {
			this.vk.captchaHandler({ src, sid }, code => (
				new Promise((resolve, reject) => {
					this.captcha = { resolve, reject };

					resolveCaptcha(code);
				})
			));
		}));

		return await this.getPermissionsPage({
			captcha_sid: sid,
			captcha_key: key
		});
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

		let isProcessed = true;

		while (this.twoFactorAttempts < TWO_FACTOR_ATTEMPTS && isProcessed) {
			// eslint-disable-next-line no-loop-func
			await (new Promise((resolve, reject) => {
				this.vk.twoFactorHandler(async (code) => {
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

					if (response.url.includes('act=authcheck')) {
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
}
