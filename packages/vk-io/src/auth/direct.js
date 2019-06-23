import cheerio from 'cheerio';
import createDebug from 'debug';

import nodeUrl from 'url';

import { AuthError, authErrors } from '../errors';

import { fetchCookieFollowRedirectsDecorator } from '../utils/fetch-cookie';
import {
	API_VERSION,
	DESKTOP_USER_AGENT,

	captchaTypes
} from '../utils/constants';
import {
	getFullURL,
	parseFormField,
	getAllUsersPermissions,
	getUsersPermissionsByName
} from './helpers';

const { load: cheerioLoad } = cheerio;

const { URL, URLSearchParams } = nodeUrl;

const debug = createDebug('vk-io:auth:direct');

const {
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	FAILED_PASSED_CAPTCHA,
	FAILED_PASSED_TWO_FACTOR
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
		appId = vk.options.appId,
		appSecret = vk.options.appSecret,

		login = vk.options.login,
		phone = vk.options.phone,
		password = vk.options.password,

		scope = vk.options.authScope,
		agent = vk.options.agent,
		timeout = vk.options.authTimeout
	} = {}) {
		this.vk = vk;

		this.appId = appId;
		this.appSecret = appSecret;

		this.login = login;
		this.phone = phone;
		this.password = password;

		this.agent = agent;
		this.scope = scope;
		this.timeout = timeout;

		this.started = false;

		this.captchaValidate = null;
		this.captchaAttempts = 0;

		this.twoFactorValidate = null;
		this.twoFactorAttempts = 0;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'DirectAuth';
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
		const { agent, timeout } = this;

		const { headers = {} } = options;

		return this.fetchCookie(url, {
			...options,

			agent,
			timeout,
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
			appId,
			appSecret,
			login,
			phone,
			password
		} = this;

		const params = new URLSearchParams({
			...query,
			username: login || phone,
			grant_type: 'password',
			client_secret: appSecret,
			'2fa_supported': this.vk.callbackService.hasTwoFactorHandler
				? 1
				: 0,
			v: API_VERSION,
			client_id: appId,
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

		this.fetchCookie = fetchCookieFollowRedirectsDecorator();

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

			if (isJSON) {
				if ('access_token' in text) {
					const {
						email = null,
						user_id: user = null,
						expires_in: expires = null,
						access_token: token
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
				}

				if ('error' in text) {
					if (text.error === 'invalid_client') {
						throw new AuthError({
							message: `Invalid client (${text.error_description})`,
							code: AUTHORIZATION_FAILED
						});
					}

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

		if (this.captchaValidate !== null) {
			this.captchaValidate.reject(new AuthError({
				message: 'Incorrect captcha code',
				code: FAILED_PASSED_CAPTCHA
			}));

			this.captchaValidate = null;

			this.captchaAttempts += 1;
		}

		if (this.captchaAttempts >= CAPTCHA_ATTEMPTS) {
			throw new AuthError({
				message: 'Maximum attempts passage captcha',
				code: FAILED_PASSED_CAPTCHA
			});
		}

		const { key, validate } = await this.vk.callbackService.processingCaptcha({
			type: captchaTypes.DIRECT_AUTH,
			sid,
			src
		});

		this.captchaValidate = validate;

		const response = await this.getPermissionsPage({
			captcha_sid: sid,
			captcha_key: key
		});

		return response;
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

		if (this.twoFactorValidate !== null) {
			this.twoFactorValidate.reject(new AuthError({
				message: 'Incorrect two-factor code',
				code: FAILED_PASSED_TWO_FACTOR
			}));

			this.twoFactorValidate = null;

			this.twoFactorAttempts += 1;
		}

		if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS) {
			throw new AuthError({
				message: 'Failed passed two-factor authentication',
				code: FAILED_PASSED_TWO_FACTOR
			});
		}

		const { code, validate } = await this.vk.callbackService.processingTwoFactor({
			phoneMask,
			type: validationType === '2fa_app'
				? 'app'
				: 'sms'
		});

		this.twoFactorValidate = validate;

		const response = await this.getPermissionsPage({ code });

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
