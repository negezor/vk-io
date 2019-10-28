// @ts-ignore
import { load as cheerioLoad } from 'cheerio';
// @ts-ignore
import createDebug from 'debug';

import { Agent } from 'https';
import { URL, URLSearchParams } from 'url';

import VK from '../vk';
import { AuthError, AuthErrorCode } from '../errors';
import { parseFormField, getFullURL } from './helpers';
import { DESKTOP_USER_AGENT, CALLBACK_BLANK, CaptchaType } from '../utils/constants';
import { CookieJar, fetchCookieFollowRedirectsDecorator } from '../utils/fetch-cookie';
import { ICallbackServiceValidate } from '../utils/callback-service';

const debug = createDebug('vk-io:auth:account-verification');

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
	agent: Agent;

	login: string | null;
	phone: string | number | null;
}

export default class AccountVerification {
	protected vk: VK;

	protected options: IAccountVerificationOptions;

	public jar: CookieJar;

	protected fetchCookie: Function;

	protected captchaValidate: ICallbackServiceValidate | null = null;

	protected captchaAttempts = 0;

	protected twoFactorValidate: ICallbackServiceValidate | null = null;

	protected twoFactorAttempts = 0;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;

		const { agent, login, phone } = vk.options;

		this.options = {
			login,
			phone,
			agent
		};

		this.jar = new CookieJar();
		this.fetchCookie = fetchCookieFollowRedirectsDecorator(this.jar);

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
	 * Executes the HTTP request
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected fetch(url: URL | string, options: Record<string, any> = {}): Promise<any> {
		const { agent } = this.options;

		const { headers = {} } = options;

		return this.fetchCookie(url, {
			...options,

			agent,
			timeout: this.vk.options.authTimeout,
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
	// @ts-ignore
	// eslint-disable-next-line consistent-return, @typescript-eslint/no-explicit-any
	public async run(redirectUri: string): Promise<Record<string, any>> {
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

			if (url.includes(ACTION_VALIDATE)) {
				response = await this.processValidateForm(response, $);

				continue;
			}

			if (url.includes(ACTION_CAPTCHA)) {
				response = await this.processCaptchaForm(response, $);

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
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected async processTwoFactorForm(response: any, $: any): Promise<any> {
		debug('process two-factor handle');

		if (this.twoFactorValidate) {
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
			throw new AuthError({
				message: 'Invalid phone number',
				code: INVALID_PHONE_NUMBER
			});
		}

		return rewResponse;
	}

	/**
	 * Process validation form
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected processValidateForm(response: any, $: any): Promise<any> {
		const href = $('#activation_wrap a').attr('href');
		const url = getFullURL(href, response);

		return this.fetch(url, {
			method: 'GET'
		});
	}

	/**
	 * Process captcha form
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected async processCaptchaForm(response: any, $: any): Promise<any> {
		if (this.captchaValidate !== null) {
			this.captchaValidate.reject(new AuthError({
				message: 'Incorrect captcha code',
				code: FAILED_PASSED_CAPTCHA
			}));

			this.captchaValidate = null;

			this.captchaAttempts += 1;
		}

		const { action, fields } = parseFormField($);

		const src = $('.captcha_img').attr('src');

		const { key, validate } = await this.vk.callbackService.processingCaptcha({
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
