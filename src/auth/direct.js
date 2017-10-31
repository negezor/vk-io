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

/**
 * Phone number check action
 *
 * @type {string}
 */
const ACTION_SECURITY_CODE = 'act=security';

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
		this.twoFactor = null;

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

			agent,
			compress: false,

			headers: {
				...headers,

				'User-Agent': DESKTOP_USER_AGENT
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
	getPermissionsPage(query = {}) {
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
			'2fa_supported': this.vk.twoFactorHandler !== null
				? 1
				: 0,
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

		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);

		let response = await this.getPermissionsPage();
		let text;

		const isProcessed = true;

		while (isProcessed) {
			text = await response.text();

			let isJSON = true;
			try {
				text = JSON.parse(text);
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
					response = await this.processCaptcha(text);

					continue;
				}

				if (text.error === 'need_validation') {
					if ('validation_type' in text) {
						response = await this.processTwoFactor(text);

						continue;
					}

					const $ = cheerioLoad(text);

					response = this.processSecurityForm(response, $);

					continue;
				}

				throw new AuthError({
					message: 'Unsupported type validation',
					code: AUTHORIZATION_FAILED
				});
			}

			throw new AuthError({
				message: 'Authorization failed',
				code: AUTHORIZATION_FAILED
			});
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

		if (this.captcha !== null) {
			this.captcha.reject(new AuthError({
				message: 'Incorrect captcha code',
				code: FAILED_PASSED_CAPTCHA
			}));

			this.captcha = null;

			this.captchaAttempts += 1;
		}

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
	 * Process two-factor
	 *
	 * @param {Object} response
	 *
	 * @return {Promise<Response>}
	 */
	async processTwoFactor({ validation_type: validationType, phone_mask: phoneMask }) {
		debug('process two-factor handle');

		if (this.twoFactor !== null) {
			this.twoFactor.reject(new AuthError({
				message: 'Incorrect two-factor code',
				code: FAILED_PASSED_TWO_FACTOR
			}));

			this.twoFactor = null;

			this.twoFactorAttempts += 1;
		}

		if (this.vk.twoFactorHandler === null) {
			throw new AuthError({
				message: 'Missing two-factor handler',
				code: MISSING_TWO_FACTOR_HANDLER
			});
		}

		if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS) {
			throw new AuthError({
				message: 'Failed passed two-factor authentication',
				code: FAILED_PASSED_TWO_FACTOR
			});
		}

		const type = validationType === '2fa_app'
			? 'app'
			: 'sms';

		const key = await (new Promise((resolveTwoFactor) => {
			this.vk.captchaHandler({ type, phoneMask }, code => (
				new Promise((resolve, reject) => {
					this.twoFactor = { resolve, reject };

					resolveTwoFactor(code);
				})
			));
		}));

		return await this.getPermissionsPage({
			code: key
		});
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
