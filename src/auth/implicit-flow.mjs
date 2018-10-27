import cheerio from 'cheerio';
import createDebug from 'debug';

import nodeUrl from 'url';
import nodeUtil from 'util';

import { AuthError, authErrors } from '../errors';

import { parseFormField, getFullURL } from './helpers';
import { CookieJar, fetchCookieFollowRedirectsDecorator } from '../utils/fetch-cookie';
import { DESKTOP_USER_AGENT, CALLBACK_BLANK, captchaTypes } from '../utils/constants';

const { load: cheerioLoad } = cheerio;

const { URL, URLSearchParams } = nodeUrl;
const { promisify } = nodeUtil;

const debug = createDebug('vk-io:auth:implicit-flow');

const {
	PAGE_BLOCKED,
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	FAILED_PASSED_CAPTCHA,
	FAILED_PASSED_TWO_FACTOR
} = authErrors;

/**
 * Blocked action
 *
 * @type {string}
 */
const ACTION_BLOCKED = 'act=blocked';

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

/**
 * Removes the prefix
 *
 * @type {RegExp}
 */
const REPLACE_PREFIX_RE = /^[+|0]+/;

export default class ImplicitFlow {
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

		agent = vk.options.agent,
		scope = vk.options.authScope
	} = {}) {
		this.vk = vk;

		this.appId = appId;
		this.appSecret = appSecret;

		this.login = login;
		this.phone = phone;
		this.password = password;

		this.agent = agent;
		this.scope = scope;

		this.jar = new CookieJar();

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
		return this.constructor.name;
	}

	/**
	 * Returns CookieJar
	 *
	 * @return {CookieJar}
	 */
	get cookieJar() {
		return this.jar;
	}

	/**
	 * Sets the CookieJar
	 *
	 * @param {CookieJar} jar
	 *
	 * @return {this}
	 */
	set cookieJar(jar) {
		this.jar = jar;
	}

	/**
	 * Returns cookie
	 *
	 * @return {Promise<Object>}
	 */
	async getCookies() {
		const { jar } = this;

		const getCookieString = promisify(jar.getCookieString).bind(jar);

		const [login, main] = await Promise.all([
			getCookieString('https://login.vk.com'),
			getCookieString('https://vk.com')
		]);

		return {
			'login.vk.com': login,
			'vk.com': main
		};
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
	async run() {
		if (this.started) {
			throw new AuthError({
				message: 'Authorization already started!',
				code: AUTHORIZATION_FAILED
			});
		}

		this.started = true;

		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);

		debug('get permissions page');

		let response = await this.getPermissionsPage();

		const isProcessed = true;

		while (isProcessed) {
			const { url } = response;

			debug('URL', url);

			if (url.includes(CALLBACK_BLANK)) {
				return { response };
			}

			if (url.includes(ACTION_BLOCKED)) {
				debug('page blocked');

				throw new AuthError({
					message: 'Page blocked',
					code: PAGE_BLOCKED
				});
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

			const $error = $('.box_error');
			const $service = $('.service_msg_warning');

			const isError = $error.length !== 0;

			if (this.captchaValidate === null && (isError || $service.length !== 0)) {
				const errorText = isError
					? $error.text()
					: $service.text();

				throw new AuthError({
					message: `Auth form error: ${errorText}`,
					code: AUTHORIZATION_FAILED,
					pageHtml: $.html()
				});
			}

			if ($('input[name="pass"]').length !== 0) {
				response = await this.processAuthForm(response, $);

				continue;
			}

			if (url.includes('act=')) {
				throw new AuthError({
					message: 'Unsupported authorization event',
					code: AUTHORIZATION_FAILED,
					pageHtml: $.html()
				});
			}

			debug('auth with login & pass complete');

			if ($('form').length !== 0) {
				const { action } = parseFormField($);

				debug('url grant access', action);

				response = await this.fetch(action, {
					method: 'POST'
				});
			} else {
				const script = $('script[type="text/javascript"][language="javascript"]').text();
				const locations = script.match(/location\.href\s+=\s+"([^"]+)"/i);

				if (locations === null) {
					throw new AuthError({
						message: 'Could not log in',
						code: AUTHORIZATION_FAILED
					});
				}

				const location = locations[1].replace('&cancel=1', '');

				debug('url grant access', location);

				response = await this.fetch(location, {
					method: 'POST'
				});
			}
		}
	}

	/**
	 * Process form auth
	 *
	 * @param {Response} response
	 * @param {Cheerio}  $
	 *
	 * @return {Promise<Response>}
	 */
	async processAuthForm(response, $) {
		debug('process login handle');

		if (this.captchaValidate !== null) {
			this.captchaValidate.reject(new AuthError({
				message: 'Incorrect captcha code',
				code: FAILED_PASSED_CAPTCHA,
				pageHtml: $.html()
			}));

			this.captchaValidate = null;

			this.captchaAttempts += 1;
		}

		if (this.captchaAttempts > CAPTCHA_ATTEMPTS) {
			throw new AuthError({
				message: 'Maximum attempts passage captcha',
				code: FAILED_PASSED_CAPTCHA
			});
		}

		const { login, password, phone } = this;

		const { action, fields } = parseFormField($);

		fields.email = login || phone;
		fields.pass = password;

		if ('captcha_sid' in fields) {
			const src = $('.oauth_captcha').attr('src') || $('#captcha').attr('src');

			const { key, validate } = await this.vk.callbackService.processingCaptcha({
				type: captchaTypes.IMPLICIT_FLOW_AUTH,
				sid: fields.captcha_sid,
				src
			});

			this.captchaValidate = validate;

			fields.captcha_key = key;
		}

		debug('Fields', fields);

		const url = new URL(action);

		url.searchParams.set('utf8', 1);

		const pageResponse = await this.fetch(url, {
			method: 'POST',
			body: new URLSearchParams(fields)
		});

		return pageResponse;
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

		if (this.twoFactorValidate !== null) {
			this.twoFactorValidate.reject(new AuthError({
				message: 'Incorrect two-factor code',
				code: FAILED_PASSED_TWO_FACTOR,
				pageHtml: $.html()
			}));

			this.twoFactorAttempts += 1;
		}

		if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS) {
			throw new AuthError({
				message: 'Failed passed two-factor authentication',
				code: FAILED_PASSED_TWO_FACTOR
			});
		}

		const { action, fields } = parseFormField($);

		const { code, validate } = await this.vk.callbackService.processingTwoFactor({});

		fields.code = code;

		try {
			const url = getFullURL(action, response);

			response = await this.fetch(url, {
				method: 'POST',
				body: new URLSearchParams(fields)
			});

			return response;
		} catch (error) {
			validate.reject(error);

			throw error;
		}
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
				code: INVALID_PHONE_NUMBER,
				pageHtml: $.html()
			});
		}

		number = String(number).trim().replace(REPLACE_PREFIX_RE, '');

		const $field = $('.field_prefix');

		const { length: prefix } = $field.first().text().trim().replace(REPLACE_PREFIX_RE, '');
		const { length: postfix } = $field.last().text().trim();

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
				code: INVALID_PHONE_NUMBER,
				pageHtml: $.html()
			});
		}

		return response;
	}
}
