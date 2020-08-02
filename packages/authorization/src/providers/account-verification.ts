import createDebug from 'debug';
import { load as cheerioLoad } from 'cheerio';
import { AbortController } from 'abort-controller';

import { CaptchaType, ICallbackServiceValidate, CallbackService } from 'vk-io';

import { Agent } from 'https';
import { URL, URLSearchParams } from 'url';

import { AuthorizationError } from '../errors';
import { CheerioStatic, parseFormField, getFullURL } from '../helpers';
import {
	CookieJar,

	FetchWrapper,
	RequestInfo,
	RequestInit,
	Response,

	fetchCookieFollowRedirectsDecorator
} from '../fetch-cookie';
import { DESKTOP_USER_AGENT, CALLBACK_BLANK, AuthErrorCode } from '../constants';

const debug = createDebug('vk-io:authorization:account-verification');

const {
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	FAILED_PASSED_CAPTCHA,
	FAILED_PASSED_TWO_FACTOR
} = AuthErrorCode;

/**
 * Two-factor auth check action
 */
const ACTION_AUTH_CODE = 'act=authcheck';

/**
 * Phone number check action
 */
const ACTION_SECURITY_CODE = 'act=security';

/**
 * Bind a phone to a page
 */
const ACTION_VALIDATE = 'act=validate';

/**
 * Bind a phone to a page action
 */
const ACTION_CAPTCHA = 'act=captcha';

/**
 * Number of two-factorial attempts
 */
const TWO_FACTOR_ATTEMPTS = 3;

interface IAccountVerificationOptions {
	callbackService: CallbackService;

	agent: Agent;

	login?: string;
	phone?: string | number;

	timeout?: number;
}

export class AccountVerification {
	protected options: IAccountVerificationOptions;

	public jar: CookieJar;

	protected fetchCookie: FetchWrapper;

	protected captchaValidate?: ICallbackServiceValidate;

	protected captchaAttempts = 0;

	protected twoFactorValidate?: ICallbackServiceValidate;

	protected twoFactorAttempts = 0;

	/**
	 * Constructor
	 */
	public constructor(options: IAccountVerificationOptions) {
		this.options = {
			timeout: 10_000,

			...options
		};

		this.jar = new CookieJar();
		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);

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
	 * Executes the HTTP request
	 */
	protected fetch(url: RequestInfo, options: RequestInit = {}): Promise<Response> {
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
	public async run(redirectUri: RequestInfo): Promise<{ userId: number; token: string }> {
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
					throw new AuthorizationError({
						message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
						code: AUTHORIZATION_FAILED
					});
				}

				const userId = params.get('user_id')!;

				return {
					userId: Number(userId),
					token: params.get('access_token')!
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

			if (url.includes(ACTION_VALIDATE)) {
				response = await this.processValidateForm(response, $);

				continue;
			}

			if (url.includes(ACTION_CAPTCHA)) {
				response = await this.processCaptchaForm(response, $);

				continue;
			}

			throw new AuthorizationError({
				message: 'Account verification failed',
				code: AUTHORIZATION_FAILED
			});
		}

		throw new Error('Fallback error');
	}

	/**
	 * Process two-factor form
	 */
	protected async processTwoFactorForm(response: Response, $: CheerioStatic): Promise<Response> {
		debug('process two-factor handle');

		if (this.twoFactorValidate) {
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
			validate.reject(error);

			throw error;
		}
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

		const rewResponse = await this.fetch(url, {
			method: 'POST',
			body: new URLSearchParams(fields)
		});

		if (rewResponse.url.includes(ACTION_SECURITY_CODE)) {
			throw new AuthorizationError({
				message: 'Invalid phone number',
				code: INVALID_PHONE_NUMBER
			});
		}

		return rewResponse;
	}

	/**
	 * Process validation form
	 */
	protected processValidateForm(response: Response, $: CheerioStatic): Promise<Response> {
		const href = $('#activation_wrap a').attr('href')!;
		const url = getFullURL(href, response);

		return this.fetch(url, {
			method: 'GET'
		});
	}

	/**
	 * Process captcha form
	 */
	protected async processCaptchaForm(response: Response, $: CheerioStatic): Promise<Response> {
		if (this.captchaValidate !== undefined) {
			this.captchaValidate.reject(new AuthorizationError({
				message: 'Incorrect captcha code',
				code: FAILED_PASSED_CAPTCHA
			}));

			this.captchaValidate = undefined;

			this.captchaAttempts += 1;
		}

		const { action, fields } = parseFormField($);

		const src = $('.captcha_img').attr('src');

		if (!src) {
			throw new AuthorizationError({
				message: 'Failed get captcha image',
				code: AUTHORIZATION_FAILED
			});
		}

		const { key, validate } = await this.options.callbackService.processingCaptcha({
			type: CaptchaType.ACCOUNT_VERIFICATION,
			sid: fields.captcha_sid,
			src
		});

		this.captchaValidate = validate;

		fields.captcha_key = key;

		const url = getFullURL(action, response);

		url.searchParams.set('utf8', '1');

		const pageResponse = await this.fetch(url, {
			method: 'POST',
			body: new URLSearchParams(fields)
		});

		return pageResponse;
	}
}
