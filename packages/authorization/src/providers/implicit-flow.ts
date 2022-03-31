// @ts-ignore
import createDebug from 'debug';
// @ts-ignore
import { load as cheerioLoad } from 'cheerio';
// @ts-ignore
import { AbortController } from 'abort-controller';
// @ts-ignore

// @ts-ignore
import { CaptchaType, ICallbackServiceValidate, CallbackService } from 'vk-io';
// @ts-ignore

// @ts-ignore
import { Agent } from 'https';
// @ts-ignore
import { URL, URLSearchParams } from 'url';
// @ts-ignore

// @ts-ignore
import { AuthorizationError } from '../errors';
// @ts-ignore
import { parseFormField, getFullURL, CheerioStatic } from '../helpers';
// @ts-ignore
import {
// @ts-ignore
	CookieJar,
// @ts-ignore

// @ts-ignore
	FetchWrapper,
// @ts-ignore
	RequestInfo,
// @ts-ignore
	RequestInit,
// @ts-ignore
	Response,
// @ts-ignore

// @ts-ignore
	fetchCookieFollowRedirectsDecorator
// @ts-ignore
} from '../fetch-cookie';
// @ts-ignore
import { DESKTOP_USER_AGENT, CALLBACK_BLANK, AuthErrorCode } from '../constants';
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:authorization:implicit-flow');
// @ts-ignore

// @ts-ignore
const {
// @ts-ignore
	PAGE_BLOCKED,
// @ts-ignore
	INVALID_PHONE_NUMBER,
// @ts-ignore
	AUTHORIZATION_FAILED,
// @ts-ignore
	FAILED_PASSED_CAPTCHA,
// @ts-ignore
	FAILED_PASSED_TWO_FACTOR
// @ts-ignore
} = AuthErrorCode;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Blocked action
// @ts-ignore
 */
// @ts-ignore
const ACTION_BLOCKED = 'act=blocked';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Two-factor auth check action
// @ts-ignore
 */
// @ts-ignore
const ACTION_AUTH_CODE = 'act=authcheck';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Phone number check action
// @ts-ignore
 */
// @ts-ignore
const ACTION_SECURITY_CODE = 'act=security';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Number of two-factorial attempts
// @ts-ignore
 */
// @ts-ignore
const TWO_FACTOR_ATTEMPTS = 3;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Number of captcha attempts
// @ts-ignore
 */
// @ts-ignore
const CAPTCHA_ATTEMPTS = 3;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Removes the prefix
// @ts-ignore
 */
// @ts-ignore
const REPLACE_PREFIX_RE = /^[+|0]+/;
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Find location.href text
// @ts-ignore
 */
// @ts-ignore
const FIND_LOCATION_HREF_RE = /location\.href\s*=\s*['"]([^'"]+)['"]/i;
// @ts-ignore

// @ts-ignore
export interface IImplicitFlowOptions {
// @ts-ignore
	callbackService: CallbackService;
// @ts-ignore

// @ts-ignore
	clientId: string;
// @ts-ignore
	clientSecret: string;
// @ts-ignore

// @ts-ignore
	login?: string;
// @ts-ignore
	phone?: string | number;
// @ts-ignore
	password: string;
// @ts-ignore

// @ts-ignore
	agent?: Agent;
// @ts-ignore
	scope?: string | number | string[];
// @ts-ignore
	timeout?: number;
// @ts-ignore

// @ts-ignore
	apiVersion: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export abstract class ImplicitFlow {
// @ts-ignore
	protected options: IImplicitFlowOptions;
// @ts-ignore

// @ts-ignore
	public started: boolean;
// @ts-ignore

// @ts-ignore
	public jar: CookieJar;
// @ts-ignore

// @ts-ignore
	protected fetchCookie!: FetchWrapper;
// @ts-ignore

// @ts-ignore
	protected captchaValidate?: ICallbackServiceValidate;
// @ts-ignore

// @ts-ignore
	protected captchaAttempts = 0;
// @ts-ignore

// @ts-ignore
	protected twoFactorValidate?: ICallbackServiceValidate;
// @ts-ignore

// @ts-ignore
	protected twoFactorAttempts = 0;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: IImplicitFlowOptions) {
// @ts-ignore
		this.options = {
// @ts-ignore
			timeout: 10_000,
// @ts-ignore

// @ts-ignore
			...options
// @ts-ignore
		};
// @ts-ignore

// @ts-ignore
		this.jar = new CookieJar();
// @ts-ignore

// @ts-ignore
		this.started = false;
// @ts-ignore

// @ts-ignore
		this.captchaValidate = undefined;
// @ts-ignore
		this.captchaAttempts = 0;
// @ts-ignore

// @ts-ignore
		this.twoFactorValidate = undefined;
// @ts-ignore
		this.twoFactorAttempts = 0;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns CookieJar
// @ts-ignore
	 */
// @ts-ignore
	public get cookieJar(): CookieJar {
// @ts-ignore
		return this.jar;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets the CookieJar
// @ts-ignore
	 */
// @ts-ignore
	public set cookieJar(jar: CookieJar) {
// @ts-ignore
		this.jar = jar;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns cookie
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
	public async getCookies(): Promise<{ 'login.vk.com': string; 'vk.com': string }> {
// @ts-ignore
		const { jar } = this;
// @ts-ignore

// @ts-ignore
		const [login, main] = await Promise.all([
// @ts-ignore
			jar.getCookieString('https://login.vk.com'),
// @ts-ignore
			jar.getCookieString('https://vk.com')
// @ts-ignore
		]);
// @ts-ignore

// @ts-ignore
		return {
// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
			'login.vk.com': login,
// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
			'vk.com': main
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Executes the HTTP request
// @ts-ignore
	 */
// @ts-ignore
	protected fetch(
// @ts-ignore
		url: RequestInfo,
// @ts-ignore
		options: RequestInit = {}
// @ts-ignore
	): Promise<Response> {
// @ts-ignore
		const { agent, timeout } = this.options;
// @ts-ignore

// @ts-ignore
		const { headers = {} } = options;
// @ts-ignore

// @ts-ignore
		const controller = new AbortController();
// @ts-ignore

// @ts-ignore
		const interval = setTimeout(() => controller.abort(), timeout);
// @ts-ignore

// @ts-ignore
		return this.fetchCookie(url, {
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			agent,
// @ts-ignore
			signal: controller.signal,
// @ts-ignore
			compress: false,
// @ts-ignore

// @ts-ignore
			headers: {
// @ts-ignore
				...headers,
// @ts-ignore

// @ts-ignore
				// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
				'User-Agent': DESKTOP_USER_AGENT
// @ts-ignore
			}
// @ts-ignore
		}).finally(() => clearTimeout(interval));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Runs authorization
// @ts-ignore
	 */
// @ts-ignore
	protected async login(): Promise<{ response: Response }> {
// @ts-ignore
		if (this.started) {
// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Authorization already started!',
// @ts-ignore
				code: AUTHORIZATION_FAILED
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.started = true;
// @ts-ignore

// @ts-ignore
		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);
// @ts-ignore

// @ts-ignore
		debug('get permissions page');
// @ts-ignore

// @ts-ignore
		let response = await this.getPermissionsPage();
// @ts-ignore

// @ts-ignore
		const isProcessed = true;
// @ts-ignore

// @ts-ignore
		while (isProcessed) {
// @ts-ignore
			const { url } = response;
// @ts-ignore

// @ts-ignore
			debug('URL', url);
// @ts-ignore

// @ts-ignore
			if (url.includes(CALLBACK_BLANK)) {
// @ts-ignore
				return { response };
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (url.includes(ACTION_BLOCKED)) {
// @ts-ignore
				debug('page blocked');
// @ts-ignore

// @ts-ignore
				throw new AuthorizationError({
// @ts-ignore
					message: 'Page blocked',
// @ts-ignore
					code: PAGE_BLOCKED
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const $ = cheerioLoad(await response.text());
// @ts-ignore

// @ts-ignore
			if (url.includes('act=authcheck_code')) {
// @ts-ignore
				response = await this.processCaptchaForm(response, $);
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (url.includes(ACTION_AUTH_CODE)) {
// @ts-ignore
				response = await this.processTwoFactorForm(response, $);
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (url.includes(ACTION_SECURITY_CODE)) {
// @ts-ignore
				response = await this.processSecurityForm(response, $);
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const $error = $('.box_error');
// @ts-ignore
			const $service = $('.service_msg_warning');
// @ts-ignore

// @ts-ignore
			const isError = $error.length !== 0;
// @ts-ignore

// @ts-ignore
			if (this.captchaValidate === undefined && (isError || $service.length !== 0)) {
// @ts-ignore
				const errorText = isError
// @ts-ignore
					? $error.text()
// @ts-ignore
					: $service.text();
// @ts-ignore

// @ts-ignore
				throw new AuthorizationError({
// @ts-ignore
					message: `Auth form error: ${errorText}`,
// @ts-ignore
					code: AUTHORIZATION_FAILED,
// @ts-ignore
					pageHtml: $.html()
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if ($('input[name="pass"]').length !== 0) {
// @ts-ignore
				response = await this.processAuthForm(response, $);
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (url.includes('act=')) {
// @ts-ignore
				throw new AuthorizationError({
// @ts-ignore
					message: 'Unsupported authorization event',
// @ts-ignore
					code: AUTHORIZATION_FAILED,
// @ts-ignore
					pageHtml: $.html()
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			debug('auth with login & pass complete');
// @ts-ignore

// @ts-ignore
			if ($('form').length !== 0) {
// @ts-ignore
				const { action } = parseFormField($);
// @ts-ignore

// @ts-ignore
				debug('url grant access', action);
// @ts-ignore

// @ts-ignore
				response = await this.fetch(action, {
// @ts-ignore
					method: 'POST'
// @ts-ignore
				});
// @ts-ignore
			} else {
// @ts-ignore
				const locations = $.html().match(FIND_LOCATION_HREF_RE) || undefined;
// @ts-ignore

// @ts-ignore
				if (locations === undefined) {
// @ts-ignore
					throw new AuthorizationError({
// @ts-ignore
						message: 'Could not log in',
// @ts-ignore
						code: AUTHORIZATION_FAILED,
// @ts-ignore
						pageHtml: $.html()
// @ts-ignore
					});
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				const location = locations[1].replace('&cancel=1', '');
// @ts-ignore

// @ts-ignore
				debug('url grant access', location);
// @ts-ignore

// @ts-ignore
				response = await this.fetch(location, {
// @ts-ignore
					method: 'POST'
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		throw new Error('Fallback error');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Process form auth
// @ts-ignore
	 */
// @ts-ignore
	protected async processAuthForm(response: Response, $: CheerioStatic): Promise<Response> {
// @ts-ignore
		debug('process login handle');
// @ts-ignore

// @ts-ignore
		if (this.captchaValidate) {
// @ts-ignore
			this.captchaValidate.reject(new AuthorizationError({
// @ts-ignore
				message: 'Incorrect captcha code',
// @ts-ignore
				code: FAILED_PASSED_CAPTCHA,
// @ts-ignore
				pageHtml: $.html()
// @ts-ignore
			}));
// @ts-ignore

// @ts-ignore
			this.captchaValidate = undefined;
// @ts-ignore

// @ts-ignore
			this.captchaAttempts += 1;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.captchaAttempts > CAPTCHA_ATTEMPTS) {
// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Maximum attempts passage captcha',
// @ts-ignore
				code: FAILED_PASSED_CAPTCHA
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { login, password, phone } = this.options;
// @ts-ignore

// @ts-ignore
		const { action, fields } = parseFormField($);
// @ts-ignore

// @ts-ignore
		fields.email = String(login || phone);
// @ts-ignore
		fields.pass = String(password);
// @ts-ignore

// @ts-ignore
		if (fields.captcha_sid !== undefined) {
// @ts-ignore
			const src = $('.oauth_captcha').attr('src') || $('#captcha').attr('src');
// @ts-ignore

// @ts-ignore
			if (!src) {
// @ts-ignore
				throw new AuthorizationError({
// @ts-ignore
					message: 'Failed get captcha image',
// @ts-ignore
					code: AUTHORIZATION_FAILED
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const { key, validate } = await this.options.callbackService.processingCaptcha({
// @ts-ignore
				type: CaptchaType.IMPLICIT_FLOW_AUTH,
// @ts-ignore
				sid: fields.captcha_sid,
// @ts-ignore
				src
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			this.captchaValidate = validate;
// @ts-ignore

// @ts-ignore
			fields.captcha_key = key;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		debug('Fields', fields);
// @ts-ignore

// @ts-ignore
		const url = new URL(action);
// @ts-ignore

// @ts-ignore
		url.searchParams.set('utf8', '1');
// @ts-ignore

// @ts-ignore
		const pageResponse = await this.fetch(url, {
// @ts-ignore
			method: 'POST',
// @ts-ignore
			body: new URLSearchParams(fields)
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return pageResponse;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Process two-factor form
// @ts-ignore
	 */
// @ts-ignore
	protected async processTwoFactorForm(response: Response, $: CheerioStatic): Promise<Response> {
// @ts-ignore
		debug('process two-factor handle');
// @ts-ignore

// @ts-ignore
		if (this.twoFactorValidate !== undefined) {
// @ts-ignore
			this.twoFactorValidate.reject(new AuthorizationError({
// @ts-ignore
				message: 'Incorrect two-factor code',
// @ts-ignore
				code: FAILED_PASSED_TWO_FACTOR,
// @ts-ignore
				pageHtml: $.html()
// @ts-ignore
			}));
// @ts-ignore

// @ts-ignore
			this.twoFactorAttempts += 1;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS) {
// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Failed passed two-factor authentication',
// @ts-ignore
				code: FAILED_PASSED_TWO_FACTOR
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { action, fields } = parseFormField($);
// @ts-ignore

// @ts-ignore
		const { code, validate } = await this.options.callbackService.processingTwoFactor({});
// @ts-ignore

// @ts-ignore
		fields.code = code;
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const url = getFullURL(action, response);
// @ts-ignore

// @ts-ignore
			const newResponse = await this.fetch(url, {
// @ts-ignore
				method: 'POST',
// @ts-ignore
				body: new URLSearchParams(fields)
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			return newResponse;
// @ts-ignore
		} catch (error) {
// @ts-ignore
			validate.reject(error as Error);
// @ts-ignore

// @ts-ignore
			throw error;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Process captcha form
// @ts-ignore
	 *
// @ts-ignore
	 * TODO: Make a generic captcha handler
// @ts-ignore
	 */
// @ts-ignore
	protected async processCaptchaForm(response: Response, $: CheerioStatic): Promise<Response> {
// @ts-ignore
		const { action, fields } = parseFormField($);
// @ts-ignore

// @ts-ignore
		if (fields.captcha_sid !== undefined) {
// @ts-ignore
			const src = $('.captcha_img').attr('src');
// @ts-ignore

// @ts-ignore
			if (!src) {
// @ts-ignore
				throw new AuthorizationError({
// @ts-ignore
					message: 'Failed get captcha image',
// @ts-ignore
					code: AUTHORIZATION_FAILED
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const {
// @ts-ignore
				key,
// @ts-ignore
				validate: captchaValidate
// @ts-ignore
			} = await this.options.callbackService.processingCaptcha({
// @ts-ignore
				type: CaptchaType.IMPLICIT_FLOW_AUTH,
// @ts-ignore
				sid: fields.captcha_sid,
// @ts-ignore
				src: `https://api.vk.com/${src}`
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			this.captchaValidate = captchaValidate;
// @ts-ignore

// @ts-ignore
			fields.captcha_key = key;
// @ts-ignore

// @ts-ignore
			const newUrl = getFullURL(action, response);
// @ts-ignore

// @ts-ignore
			const newResponse = await this.fetch(newUrl, {
// @ts-ignore
				method: 'POST',
// @ts-ignore
				body: new URLSearchParams(fields)
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			return newResponse;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return response;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Process security form
// @ts-ignore
	 */
// @ts-ignore
	protected async processSecurityForm(response: Response, $: CheerioStatic): Promise<Response> {
// @ts-ignore
		debug('process security form');
// @ts-ignore

// @ts-ignore
		const { login, phone } = this.options;
// @ts-ignore

// @ts-ignore
		let number;
// @ts-ignore
		if (phone !== undefined) {
// @ts-ignore
			number = phone;
// @ts-ignore
		} else if (login !== undefined && !login.includes('@')) {
// @ts-ignore
			number = login;
// @ts-ignore
		} else {
// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Missing phone number in the phone or login field',
// @ts-ignore
				code: INVALID_PHONE_NUMBER,
// @ts-ignore
				pageHtml: $.html()
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		number = String(number).trim().replace(REPLACE_PREFIX_RE, '');
// @ts-ignore

// @ts-ignore
		const $field = $('.field_prefix');
// @ts-ignore

// @ts-ignore
		const { length: prefix } = $field.first().text().trim().replace(REPLACE_PREFIX_RE, '');
// @ts-ignore
		const { length: postfix } = $field.last().text().trim();
// @ts-ignore

// @ts-ignore
		const { action, fields } = parseFormField($);
// @ts-ignore

// @ts-ignore
		fields.code = number.slice(prefix, number.length - postfix);
// @ts-ignore

// @ts-ignore
		const url = getFullURL(action, response);
// @ts-ignore

// @ts-ignore
		const newResponse = await this.fetch(url, {
// @ts-ignore
			method: 'POST',
// @ts-ignore
			body: new URLSearchParams(fields)
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		if (newResponse.url.includes(ACTION_SECURITY_CODE)) {
// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Invalid phone number',
// @ts-ignore
				code: INVALID_PHONE_NUMBER,
// @ts-ignore
				pageHtml: $.html()
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return newResponse;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	protected abstract getPermissionsPage(): Promise<Response>;
// @ts-ignore
}
