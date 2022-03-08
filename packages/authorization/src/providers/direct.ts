import createDebug from 'debug';
import { load as cheerioLoad } from 'cheerio';
import { AbortController } from 'abort-controller';

import { CaptchaType, ICallbackServiceValidate, CallbackService } from 'vk-io';

import { Agent } from 'https';
import { URL, URLSearchParams } from 'url';

import { AuthorizationError } from '../errors';
import { DESKTOP_USER_AGENT, AuthErrorCode } from '../constants';
import {
	CookieJar,

	FetchWrapper,
	RequestInfo,
	RequestInit,
	Response,

	fetchCookieFollowRedirectsDecorator
} from '../fetch-cookie';
import {
	CheerioStatic,

	getFullURL,
	parseFormField,
	getUserPermissionsByName,
	getAllUserPermissions
} from '../helpers';

const debug = createDebug('vk-io:authorization:direct');

const {
	INVALID_PHONE_NUMBER,
	AUTHORIZATION_FAILED,
	FAILED_PASSED_CAPTCHA,
	FAILED_PASSED_TWO_FACTOR,
	USERNAME_OR_PASSWORD_IS_INCORRECT,
	TOO_MUCH_TRIES,
	WRONG_OTP,
	OTP_FORMAT_IS_INCORRECT
} = AuthErrorCode;

/**
 * Number of two-factorial attempts
 */
const TWO_FACTOR_ATTEMPTS = 3;

/**
 * Number of captcha attempts
 */
const CAPTCHA_ATTEMPTS = 3;

/**
 * Phone number check action
 */
const ACTION_SECURITY_CODE = 'act=security';

export interface IDirectAuthOptions {
	callbackService: CallbackService;

	clientId: string;
	clientSecret: string;

	login?: string;
	phone?: string | number;
	password?: string;

	agent?: Agent;
	scope?: string | number | string[];
	timeout?: number;

	apiVersion: string;
}

export class DirectAuthorization {
	protected options: IDirectAuthOptions;

	public started: boolean;

	public jar!: CookieJar;

	protected fetchCookie!: FetchWrapper;

	protected captchaValidate?: ICallbackServiceValidate;

	protected captchaAttempts = 0;

	protected twoFactorValidate?: ICallbackServiceValidate;

	protected twoFactorAttempts = 0;

	/**
	 * Constructor
	 */
	public constructor(options: IDirectAuthOptions) {
		this.options = {
			timeout: 10_000,

			...options
		};

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
	 * Returns permission page
	 */
	protected getPermissionsPage(query = {}): Promise<Response> {
		let { scope } = this.options;

		if (scope === undefined) {
			throw new Error('Required option "scope" not set');
		}

		if (scope === 'all') {
			scope = getAllUserPermissions();
		} else if (typeof scope !== 'number') {
			scope = getUserPermissionsByName(scope);
		}

		debug('auth scope %s', scope);

		const {
			clientId,
			clientSecret,
			login,
			phone,
			password,
			apiVersion
		} = this.options;

		const params = new URLSearchParams({
			...query,
			username: String(login || phone),
			grant_type: 'password',
			client_secret: clientSecret,
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'2fa_supported': String(Number(this.options.callbackService.hasTwoFactorHandler)),
			v: apiVersion,
			client_id: clientId,
			password: password!,
			scope: String(scope)
		});

		const url = new URL(`https://oauth.vk.com/token?${params}`);

		return this.fetch(url, {
			method: 'GET'
		});
	}

	/**
	 * Runs authorization
	 */
	public async run(): Promise<{
		email?: string;
		user: number;
		token: string;
		expires: number;
	}> {
		if (this.started) {
			throw new AuthorizationError({
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
				if (text.access_token !== undefined) {
					const {
						email,
						user_id: user,
						expires_in: expires,
						access_token: token
					} = text;

					return {
						email,
						user: user !== undefined
							? Number(user)
							: 0,

						token,
						expires: expires
							? Number(expires)
							: 0
					};
				}

				if (text.error !== undefined) {
					if (text.error === 'invalid_client') {
						if (text.error_type === 'username_or_password_is_incorrect') {
							throw new AuthorizationError({
								message: 'Username or password is incorrect.',
								code: USERNAME_OR_PASSWORD_IS_INCORRECT
							});
						}

						throw new AuthorizationError({
							message: `Invalid client (${text.error_type}: ${text.error_description})`,
							code: AUTHORIZATION_FAILED
						});
					}

					if (text.error === 'need_captcha') {
						response = await this.processCaptcha(text);

						continue;
					}

					if (text.error === 'need_validation') {
						if (text.validation_type !== undefined) {
							response = await this.processTwoFactor(text);

							continue;
						}

						const $ = cheerioLoad(text);

						response = await this.processSecurityForm(response, $);

						continue;
					}

					if (text.error === 'invalid_request') {
						if (text.error_type === 'too_much_tries') {
							throw new AuthorizationError({
								message: 'Too much authorization tries. Try again later in a few hours.',
								code: TOO_MUCH_TRIES
							});
						}

						if (text.error_type === 'wrong_otp') {
							throw new AuthorizationError({
								message: 'Wrong two factor code.',
								code: WRONG_OTP
							});
						}

						if (text.error_type === 'otp_format_is_incorrect') {
							throw new AuthorizationError({
								message: 'Invalid two factor code format.',
								code: OTP_FORMAT_IS_INCORRECT
							});
						}
					}

					throw new AuthorizationError({
						message: 'Unsupported type validation',
						code: AUTHORIZATION_FAILED
					});
				}
			}

			throw new AuthorizationError({
				message: 'Authorization failed',
				code: AUTHORIZATION_FAILED
			});
		}

		throw new Error('Fallback error');
	}

	/**
	 * Process captcha
	 */
	protected async processCaptcha(
		{ captcha_sid: sid, captcha_img: src }: {
			captcha_sid: number;
			captcha_img: string;
		}
	): Promise<Response> {
		debug('captcha process');

		if (this.captchaValidate !== undefined) {
			this.captchaValidate.reject(new AuthorizationError({
				message: 'Incorrect captcha code',
				code: FAILED_PASSED_CAPTCHA
			}));

			this.captchaValidate = undefined;

			this.captchaAttempts += 1;
		}

		if (this.captchaAttempts >= CAPTCHA_ATTEMPTS) {
			throw new AuthorizationError({
				message: 'Maximum attempts passage captcha',
				code: FAILED_PASSED_CAPTCHA
			});
		}

		const { key, validate } = await this.options.callbackService.processingCaptcha({
			type: CaptchaType.DIRECT_AUTH,
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
	 */
	protected async processTwoFactor(
		{ validation_type: validationType, phone_mask: phoneMask }: {
			validation_type: string;
			phone_mask: string;
		}
	): Promise<Response> {
		debug('process two-factor handle');

		if (this.twoFactorValidate !== undefined) {
			this.twoFactorValidate.reject(new AuthorizationError({
				message: 'Incorrect two-factor code',
				code: FAILED_PASSED_TWO_FACTOR
			}));

			this.twoFactorValidate = undefined;

			this.twoFactorAttempts += 1;
		}

		if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS) {
			throw new AuthorizationError({
				message: 'Failed passed two-factor authentication',
				code: FAILED_PASSED_TWO_FACTOR
			});
		}

		const { code, validate } = await this.options.callbackService.processingTwoFactor({
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
}
