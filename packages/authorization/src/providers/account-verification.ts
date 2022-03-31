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
import { CheerioStatic, parseFormField, getFullURL } from '../helpers';
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
const debug = createDebug('vk-io:authorization:account-verification');
// @ts-ignore

// @ts-ignore
const {
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
 * Bind a phone to a page
// @ts-ignore
 */
// @ts-ignore
const ACTION_VALIDATE = 'act=validate';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Bind a phone to a page action
// @ts-ignore
 */
// @ts-ignore
const ACTION_CAPTCHA = 'act=captcha';
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
interface IAccountVerificationOptions {
// @ts-ignore
	callbackService: CallbackService;
// @ts-ignore

// @ts-ignore
	agent: Agent;
// @ts-ignore

// @ts-ignore
	login?: string;
// @ts-ignore
	phone?: string | number;
// @ts-ignore

// @ts-ignore
	timeout?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class AccountVerification {
// @ts-ignore
	protected options: IAccountVerificationOptions;
// @ts-ignore

// @ts-ignore
	public jar: CookieJar;
// @ts-ignore

// @ts-ignore
	protected fetchCookie: FetchWrapper;
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
	public constructor(options: IAccountVerificationOptions) {
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
		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);
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
	 * Executes the HTTP request
// @ts-ignore
	 */
// @ts-ignore
	protected fetch(url: RequestInfo, options: RequestInit = {}): Promise<Response> {
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
	public async run(redirectUri: RequestInfo): Promise<{ userId: number; token: string }> {
// @ts-ignore
		let response = await this.fetch(redirectUri, {
// @ts-ignore
			method: 'GET'
// @ts-ignore
		});
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
			if (url.includes(CALLBACK_BLANK)) {
// @ts-ignore
				let { hash } = new URL(response.url);
// @ts-ignore

// @ts-ignore
				if (hash.startsWith('#')) {
// @ts-ignore
					hash = hash.substring(1);
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				const params = new URLSearchParams(hash);
// @ts-ignore

// @ts-ignore
				if (params.has('error')) {
// @ts-ignore
					throw new AuthorizationError({
// @ts-ignore
						message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
// @ts-ignore
						code: AUTHORIZATION_FAILED
// @ts-ignore
					});
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				const userId = params.get('user_id')!;
// @ts-ignore

// @ts-ignore
				return {
// @ts-ignore
					userId: Number(userId),
// @ts-ignore
					token: params.get('access_token')!
// @ts-ignore
				};
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			const $ = cheerioLoad(await response.text());
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
			if (url.includes(ACTION_VALIDATE)) {
// @ts-ignore
				response = await this.processValidateForm(response, $);
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (url.includes(ACTION_CAPTCHA)) {
// @ts-ignore
				response = await this.processCaptchaForm(response, $);
// @ts-ignore

// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Account verification failed',
// @ts-ignore
				code: AUTHORIZATION_FAILED
// @ts-ignore
			});
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
	 * Process two-factor form
// @ts-ignore
	 */
// @ts-ignore
	protected async processTwoFactorForm(response: Response, $: CheerioStatic): Promise<Response> {
// @ts-ignore
		debug('process two-factor handle');
// @ts-ignore

// @ts-ignore
		if (this.twoFactorValidate) {
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
				code: INVALID_PHONE_NUMBER
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (typeof number === 'string') {
// @ts-ignore
			number = number.trim().replace(/^(\+|00)/, '');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		number = String(number);
// @ts-ignore

// @ts-ignore
		const $field = $('.field_prefix');
// @ts-ignore

// @ts-ignore
		const prefix = $field.first().text().trim().replace('+', '').length;
// @ts-ignore
		const postfix = $field.last().text().trim().length;
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
		const rewResponse = await this.fetch(url, {
// @ts-ignore
			method: 'POST',
// @ts-ignore
			body: new URLSearchParams(fields)
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		if (rewResponse.url.includes(ACTION_SECURITY_CODE)) {
// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Invalid phone number',
// @ts-ignore
				code: INVALID_PHONE_NUMBER
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return rewResponse;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Process validation form
// @ts-ignore
	 */
// @ts-ignore
	protected processValidateForm(response: Response, $: CheerioStatic): Promise<Response> {
// @ts-ignore
		const href = $('#activation_wrap a').attr('href')!;
// @ts-ignore
		const url = getFullURL(href, response);
// @ts-ignore

// @ts-ignore
		return this.fetch(url, {
// @ts-ignore
			method: 'GET'
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Process captcha form
// @ts-ignore
	 */
// @ts-ignore
	protected async processCaptchaForm(response: Response, $: CheerioStatic): Promise<Response> {
// @ts-ignore
		if (this.captchaValidate !== undefined) {
// @ts-ignore
			this.captchaValidate.reject(new AuthorizationError({
// @ts-ignore
				message: 'Incorrect captcha code',
// @ts-ignore
				code: FAILED_PASSED_CAPTCHA
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
		const { action, fields } = parseFormField($);
// @ts-ignore

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
		const { key, validate } = await this.options.callbackService.processingCaptcha({
// @ts-ignore
			type: CaptchaType.ACCOUNT_VERIFICATION,
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

// @ts-ignore
		const url = getFullURL(action, response);
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
}
