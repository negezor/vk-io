import createDebug from 'debug';
import { load as cheerioLoad } from 'cheerio';
import { AbortController } from 'abort-controller';

import { CaptchaType, ICallbackServiceValidate, CallbackService } from 'vk-io';

import { Agent } from 'https';
import { URL, URLSearchParams } from 'url';

import { AuthorizationError } from '../errors';
import { parseFormField, getFullURL, CheerioStatic } from '../helpers';
import {
	CookieJar,

	FetchWrapper,
	RequestInfo,
	RequestInit,
	Response,

	fetchCookieFollowRedirectsDecorator
} from '../fetch-cookie';
import { DESKTOP_USER_AGENT, CALLBACK_BLANK, AuthErrorCode } from '../constants';

const debug = createDebug('vk-io:authorization:implicit-flow');

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
const FIND_LOCATION_HREF_RE = /location\.href\s*=\s*['"]([^'"]+)['"]/i;

export interface IImplicitFlowOptions {
	callbackService: CallbackService;

	clientId: string;
	clientSecret: string;

	login?: string;
	phone?: string | number;
	password: string;

	agent?: Agent;
	scope?: string | number | string[];
	timeout?: number;

	apiVersion: string;
}

export abstract class ImplicitFlow {
	protected options: IImplicitFlowOptions;

	public started: boolean;

	public jar: CookieJar;

	protected fetchCookie!: FetchWrapper;

	protected captchaValidate?: ICallbackServiceValidate;

	protected captchaAttempts = 0;

	protected twoFactorValidate?: ICallbackServiceValidate;

	protected twoFactorAttempts = 0;

	/**
	 * Constructor
	 */
	public constructor(options: IImplicitFlowOptions) {
		this.options = {
			timeout: 10_000,

			...options
		};

		this.jar = new CookieJar();

		this.started = false;

		this.captchaValidate = undefined;
		this.captchaAttempts = 0;

		this.twoFactorValidate = undefined;
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
	// eslint-disable-next-line @typescript-eslint/naming-convention
	public async getCookies(): Promise<{ 'login.vk.com': string; 'vk.com': string }> {
		const { jar } = this;

		const [login, main] = await Promise.all([
			jar.getCookieString('https://login.vk.com'),
			jar.getCookieString('https://vk.com')
		]);

		return {
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'login.vk.com': login,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'vk.com': main
		};
	}

	/**
	 * Executes the HTTP request
	 */
	protected fetch(
		url: RequestInfo,
		options: RequestInit = {}
	): Promise<Response> {
		const { agent, timeout } = this.options;

		const { headers = {} } = options;

		const controller = new AbortController();

		const interval = setTimeout(() => controller.abort(), timeout);

		return this.fetchCookie(url, {
			...options,

			agent,
			signal: controller.signal,
			compress: false,

			headers: {
				...headers,

				// eslint-disable-next-line @typescript-eslint/naming-convention
				'User-Agent': DESKTOP_USER_AGENT
			}
		}).finally(() => clearTimeout(interval));
	}

	/**
	 * Runs authorization
	 */
	protected async login(): Promise<{ response: Response }> {
		if (this.started) {
			throw new AuthorizationError({
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

				throw new AuthorizationError({
					message: 'Page blocked',
					code: PAGE_BLOCKED
				});
			}

			const $ = cheerioLoad(await response.text());

			if (url.includes('act=authcheck_code')) {
				response = await this.processCaptchaForm(response, $);

				continue;
			}

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

			if (this.captchaValidate === undefined && (isError || $service.length !== 0)) {
				const errorText = isError
					? $error.text()
					: $service.text();

				throw new AuthorizationError({
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
				throw new AuthorizationError({
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
				const locations = $.html().match(FIND_LOCATION_HREF_RE) || undefined;

				if (locations === undefined) {
					throw new AuthorizationError({
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

		throw new Error('Fallback error');
	}

	/**
	 * Process form auth
	 */
	protected async processAuthForm(response: Response, $: CheerioStatic): Promise<Response> {
		debug('process login handle');

		if (this.captchaValidate) {
			this.captchaValidate.reject(new AuthorizationError({
				message: 'Incorrect captcha code',
				code: FAILED_PASSED_CAPTCHA,
				pageHtml: $.html()
			}));

			this.captchaValidate = undefined;

			this.captchaAttempts += 1;
		}

		if (this.captchaAttempts > CAPTCHA_ATTEMPTS) {
			throw new AuthorizationError({
				message: 'Maximum attempts passage captcha',
				code: FAILED_PASSED_CAPTCHA
			});
		}

		const { login, password, phone } = this.options;

		const { action, fields } = parseFormField($);

		fields.email = String(login || phone);
		fields.pass = String(password);

		if (fields.captcha_sid !== undefined) {
			const src = $('.oauth_captcha').attr('src') || $('#captcha').attr('src');

			if (!src) {
				throw new AuthorizationError({
					message: 'Failed get captcha image',
					code: AUTHORIZATION_FAILED
				});
			}

			const { key, validate } = await this.options.callbackService.processingCaptcha({
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
	protected async processTwoFactorForm(response: Response, $: CheerioStatic): Promise<Response> {
		debug('process two-factor handle');

		if (this.twoFactorValidate !== undefined) {
			this.twoFactorValidate.reject(new AuthorizationError({
				message: 'Incorrect two-factor code',
				code: FAILED_PASSED_TWO_FACTOR,
				pageHtml: $.html()
			}));

			this.twoFactorAttempts += 1;
		}

		if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS) {
			throw new AuthorizationError({
				message: 'Failed passed two-factor authentication',
				code: FAILED_PASSED_TWO_FACTOR
			});
		}

		const { action, fields } = parseFormField($);

		const { code, validate } = await this.options.callbackService.processingTwoFactor({});

		fields.code = code;

		try {
			const url = getFullURL(action, response);

			const newResponse = await this.fetch(url, {
				method: 'POST',
				body: new URLSearchParams(fields)
			});

			return newResponse;
		} catch (error) {
			validate.reject(error as Error);

			throw error;
		}
	}

	/**
	 * Process captcha form
	 *
	 * TODO: Make a generic captcha handler
	 */
	protected async processCaptchaForm(response: Response, $: CheerioStatic): Promise<Response> {
		const { action, fields } = parseFormField($);

		if (fields.captcha_sid !== undefined) {
			const src = $('.captcha_img').attr('src');

			if (!src) {
				throw new AuthorizationError({
					message: 'Failed get captcha image',
					code: AUTHORIZATION_FAILED
				});
			}

			const {
				key,
				validate: captchaValidate
			} = await this.options.callbackService.processingCaptcha({
				type: CaptchaType.IMPLICIT_FLOW_AUTH,
				sid: fields.captcha_sid,
				src: `https://api.vk.com/${src}`
			});

			this.captchaValidate = captchaValidate;

			fields.captcha_key = key;

			const newUrl = getFullURL(action, response);

			const newResponse = await this.fetch(newUrl, {
				method: 'POST',
				body: new URLSearchParams(fields)
			});

			return newResponse;
		}

		return response;
	}

	/**
	 * Process security form
	 */
	protected async processSecurityForm(response: Response, $: CheerioStatic): Promise<Response> {
		debug('process security form');

		const { login, phone } = this.options;

		let number;
		if (phone !== undefined) {
			number = phone;
		} else if (login !== undefined && !login.includes('@')) {
			number = login;
		} else {
			throw new AuthorizationError({
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
			throw new AuthorizationError({
				message: 'Invalid phone number',
				code: INVALID_PHONE_NUMBER,
				pageHtml: $.html()
			});
		}

		return newResponse;
	}

	protected abstract getPermissionsPage(): Promise<Response>;
}
