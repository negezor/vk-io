// @ts-ignore
import { load as cheerioLoad } from 'cheerio';
// @ts-ignore
import createDebug from 'debug';

import { Agent } from 'https';
import { promisify } from 'util';
import { URL, URLSearchParams } from 'url';

import VK from '../vk';
import { AuthError, AuthErrorCode } from '../errors';

import { parseFormField, getFullURL } from './helpers';
import { CookieJar, fetchCookieFollowRedirectsDecorator } from '../utils/fetch-cookie';
import { DESKTOP_USER_AGENT, CALLBACK_BLANK, CaptchaType } from '../utils/constants';
import { ICallbackServiceValidate } from '../utils/callback-service';

const debug = createDebug('vk-io:auth:implicit-flow');

const {
	PAGE_BLOCKED,
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	FAILED_PASSED_CAPTCHA,
	FAILED_PASSED_TWO_FACTOR
} = AuthErrorCode;

/**
 * Blocked action
 */
const ACTION_BLOCKED = 'act=blocked';

/**
 * Two-factor auth check action
 */
const ACTION_AUTH_CODE = 'act=authcheck';

/**
 * Phone number check action
 */
const ACTION_SECURITY_CODE = 'act=security';

/**
 * Number of two-factorial attempts
 */
const TWO_FACTOR_ATTEMPTS = 3;

/**
 * Number of captcha attempts
 */
const CAPTCHA_ATTEMPTS = 3;

/**
 * Removes the prefix
 */
const REPLACE_PREFIX_RE = /^[+|0]+/;

/**
 * Find location.href text
 */
const FIND_LOCATION_HREF_RE = /location\.href\s+=\s+"([^"]+)"/i;

export interface IImplicitFlowOptions {
	appId: number | null;
	appSecret: string | null;

	login: string | null;
	phone: string | number | null;
	password: string | null;

	agent: Agent;
	scope: string | number | string[] | null;
	timeout: number;

	apiVersion: string;
}

export default class ImplicitFlow {
	protected vk: VK;

	protected options: IImplicitFlowOptions;

	public started: boolean;

	public jar: CookieJar;

	// @ts-ignore
	protected fetchCookie: Function;

	protected captchaValidate: ICallbackServiceValidate | null = null;

	protected captchaAttempts = 0;

	protected twoFactorValidate: ICallbackServiceValidate | null = null;

	protected twoFactorAttempts = 0;

	/**
	 * Constructor
	 */
	public constructor(vk: VK, options: Partial<IImplicitFlowOptions> = {}) {
		this.vk = vk;

		const {
			appId = vk.options.appId,
			appSecret = vk.options.appSecret,

			login = vk.options.login,
			phone = vk.options.phone,
			password = vk.options.password,

			scope = vk.options.authScope,
			agent = vk.options.agent,
			timeout = vk.options.authTimeout,

			apiVersion = vk.options.apiVersion
		} = options;

		this.options = {
			appId,
			appSecret,

			login,
			phone,
			password,

			agent,
			scope,
			timeout,

			apiVersion
		};

		this.jar = new CookieJar();

		this.started = false;

		this.captchaValidate = null;
		this.captchaAttempts = 0;

		this.twoFactorValidate = null;
		this.twoFactorAttempts = 0;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Returns CookieJar
	 */
	public get cookieJar(): CookieJar {
		return this.jar;
	}

	/**
	 * Sets the CookieJar
	 */
	public set cookieJar(jar: CookieJar) {
		this.jar = jar;
	}

	/**
	 * Returns cookie
	 */
	public async getCookies(): Promise<{ 'login.vk.com': string; 'vk.com': string }> {
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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected fetch(
		url: string | URL,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		options: Record<string, any> = {}
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): Promise<any> {
		const { agent, timeout } = this.options;

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
	 * Runs authorization
	 */
	// eslint-disable-next-line consistent-return, @typescript-eslint/no-explicit-any
	public async run(): Promise<any> {
		if (this.started) {
			throw new AuthError({
				message: 'Authorization already started!',
				code: AUTHORIZATION_FAILED
			});
		}

		this.started = true;

		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);

		debug('get permissions page');

		// @ts-ignore
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
				const locations = $.html().match(FIND_LOCATION_HREF_RE);

				if (locations === null) {
					throw new AuthError({
						message: 'Could not log in',
						code: AUTHORIZATION_FAILED,
						pageHtml: $.html()
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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected async processAuthForm(response: any, $: any): Promise<any> {
		debug('process login handle');

		if (this.captchaValidate) {
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

		const { login, password, phone } = this.options;

		const { action, fields } = parseFormField($);

		fields.email = login || phone;
		fields.pass = password;

		if ('captcha_sid' in fields) {
			const src = $('.oauth_captcha').attr('src') || $('#captcha').attr('src');

			const { key, validate } = await this.vk.callbackService.processingCaptcha({
				type: CaptchaType.IMPLICIT_FLOW_AUTH,
				sid: fields.captcha_sid,
				src
			});

			this.captchaValidate = validate;

			fields.captcha_key = key;
		}

		debug('Fields', fields);

		const url = new URL(action);

		url.searchParams.set('utf8', '1');

		const pageResponse = await this.fetch(url, {
			method: 'POST',
			body: new URLSearchParams(fields)
		});

		return pageResponse;
	}

	/**
	 * Process two-factor form
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected async processTwoFactorForm(response: any, $: any): Promise<any> {
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

			const newResponse = await this.fetch(url, {
				method: 'POST',
				body: new URLSearchParams(fields)
			});

			return newResponse;
		} catch (error) {
			validate.reject(error);

			throw error;
		}
	}

	/**
	 * Process security form
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected async processSecurityForm(response: any, $: any): Promise<any> {
		debug('process security form');

		const { login, phone } = this.options;

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

		const newResponse = await this.fetch(url, {
			method: 'POST',
			body: new URLSearchParams(fields)
		});

		if (newResponse.url.includes(ACTION_SECURITY_CODE)) {
			throw new AuthError({
				message: 'Invalid phone number',
				code: INVALID_PHONE_NUMBER,
				pageHtml: $.html()
			});
		}

		return newResponse;
	}
}
