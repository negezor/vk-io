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
import { DESKTOP_USER_AGENT, AuthErrorCode } from '../constants';
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
import {
// @ts-ignore
	CheerioStatic,
// @ts-ignore

// @ts-ignore
	getFullURL,
// @ts-ignore
	parseFormField,
// @ts-ignore
	getUserPermissionsByName,
// @ts-ignore
	getAllUserPermissions
// @ts-ignore
} from '../helpers';
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:authorization:direct');
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
	FAILED_PASSED_TWO_FACTOR,
// @ts-ignore
	USERNAME_OR_PASSWORD_IS_INCORRECT,
// @ts-ignore
	TOO_MUCH_TRIES,
// @ts-ignore
	WRONG_OTP,
// @ts-ignore
	OTP_FORMAT_IS_INCORRECT
// @ts-ignore
} = AuthErrorCode;
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
 * Phone number check action
// @ts-ignore
 */
// @ts-ignore
const ACTION_SECURITY_CODE = 'act=security';
// @ts-ignore

// @ts-ignore
export interface IDirectAuthOptions {
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
	password?: string;
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
export class DirectAuthorization {
// @ts-ignore
	protected options: IDirectAuthOptions;
// @ts-ignore

// @ts-ignore
	public started: boolean;
// @ts-ignore

// @ts-ignore
	public jar!: CookieJar;
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
	public constructor(options: IDirectAuthOptions) {
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
	 * Returns permission page
// @ts-ignore
	 */
// @ts-ignore
	protected getPermissionsPage(query = {}): Promise<Response> {
// @ts-ignore
		let { scope } = this.options;
// @ts-ignore

// @ts-ignore
		if (scope === undefined) {
// @ts-ignore
			throw new Error('Required option "scope" not set');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (scope === 'all') {
// @ts-ignore
			scope = getAllUserPermissions();
// @ts-ignore
		} else if (typeof scope !== 'number') {
// @ts-ignore
			scope = getUserPermissionsByName(scope);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		debug('auth scope %s', scope);
// @ts-ignore

// @ts-ignore
		const {
// @ts-ignore
			clientId,
// @ts-ignore
			clientSecret,
// @ts-ignore
			login,
// @ts-ignore
			phone,
// @ts-ignore
			password,
// @ts-ignore
			apiVersion
// @ts-ignore
		} = this.options;
// @ts-ignore

// @ts-ignore
		const params = new URLSearchParams({
// @ts-ignore
			...query,
// @ts-ignore
			username: String(login || phone),
// @ts-ignore
			grant_type: 'password',
// @ts-ignore
			client_secret: clientSecret,
// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/naming-convention
// @ts-ignore
			'2fa_supported': String(Number(this.options.callbackService.hasTwoFactorHandler)),
// @ts-ignore
			v: apiVersion,
// @ts-ignore
			client_id: clientId,
// @ts-ignore
			password: password!,
// @ts-ignore
			scope: String(scope)
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const url = new URL(`https://oauth.vk.com/token?${params}`);
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
	 * Runs authorization
// @ts-ignore
	 */
// @ts-ignore
	public async run(): Promise<{
// @ts-ignore
		email?: string;
// @ts-ignore
		user: number;
// @ts-ignore
		token: string;
// @ts-ignore
		expires: number;
// @ts-ignore
	}> {
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
		this.fetchCookie = fetchCookieFollowRedirectsDecorator();
// @ts-ignore

// @ts-ignore
		let response = await this.getPermissionsPage();
// @ts-ignore
		let text;
// @ts-ignore

// @ts-ignore
		const isProcessed = true;
// @ts-ignore

// @ts-ignore
		while (isProcessed) {
// @ts-ignore
			text = await response.text();
// @ts-ignore

// @ts-ignore
			let isJSON = true;
// @ts-ignore
			try {
// @ts-ignore
				text = JSON.parse(text);
// @ts-ignore
			} catch (e) {
// @ts-ignore
				isJSON = false;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (isJSON) {
// @ts-ignore
				if (text.access_token !== undefined) {
// @ts-ignore
					const {
// @ts-ignore
						email,
// @ts-ignore
						user_id: user,
// @ts-ignore
						expires_in: expires,
// @ts-ignore
						access_token: token
// @ts-ignore
					} = text;
// @ts-ignore

// @ts-ignore
					return {
// @ts-ignore
						email,
// @ts-ignore
						user: user !== undefined
// @ts-ignore
							? Number(user)
// @ts-ignore
							: 0,
// @ts-ignore

// @ts-ignore
						token,
// @ts-ignore
						expires: expires
// @ts-ignore
							? Number(expires)
// @ts-ignore
							: 0
// @ts-ignore
					};
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				if (text.error !== undefined) {
// @ts-ignore
					if (text.error === 'invalid_client') {
// @ts-ignore
						if (text.error_type === 'username_or_password_is_incorrect') {
// @ts-ignore
							throw new AuthorizationError({
// @ts-ignore
								message: 'Username or password is incorrect.',
// @ts-ignore
								code: USERNAME_OR_PASSWORD_IS_INCORRECT
// @ts-ignore
							});
// @ts-ignore
						}
// @ts-ignore

// @ts-ignore
						throw new AuthorizationError({
// @ts-ignore
							message: `Invalid client (${text.error_type}: ${text.error_description})`,
// @ts-ignore
							code: AUTHORIZATION_FAILED
// @ts-ignore
						});
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					if (text.error === 'need_captcha') {
// @ts-ignore
						response = await this.processCaptcha(text);
// @ts-ignore

// @ts-ignore
						continue;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					if (text.error === 'need_validation') {
// @ts-ignore
						if (text.validation_type !== undefined) {
// @ts-ignore
							response = await this.processTwoFactor(text);
// @ts-ignore

// @ts-ignore
							continue;
// @ts-ignore
						}
// @ts-ignore

// @ts-ignore
						const $ = cheerioLoad(text);
// @ts-ignore

// @ts-ignore
						response = await this.processSecurityForm(response, $);
// @ts-ignore

// @ts-ignore
						continue;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					if (text.error === 'invalid_request') {
// @ts-ignore
						if (text.error_type === 'too_much_tries') {
// @ts-ignore
							throw new AuthorizationError({
// @ts-ignore
								message: 'Too much authorization tries. Try again later in a few hours.',
// @ts-ignore
								code: TOO_MUCH_TRIES
// @ts-ignore
							});
// @ts-ignore
						}
// @ts-ignore

// @ts-ignore
						if (text.error_type === 'wrong_otp') {
// @ts-ignore
							throw new AuthorizationError({
// @ts-ignore
								message: 'Wrong two factor code.',
// @ts-ignore
								code: WRONG_OTP
// @ts-ignore
							});
// @ts-ignore
						}
// @ts-ignore

// @ts-ignore
						if (text.error_type === 'otp_format_is_incorrect') {
// @ts-ignore
							throw new AuthorizationError({
// @ts-ignore
								message: 'Invalid two factor code format.',
// @ts-ignore
								code: OTP_FORMAT_IS_INCORRECT
// @ts-ignore
							});
// @ts-ignore
						}
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					throw new AuthorizationError({
// @ts-ignore
						message: 'Unsupported type validation',
// @ts-ignore
						code: AUTHORIZATION_FAILED
// @ts-ignore
					});
// @ts-ignore
				}
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: 'Authorization failed',
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
	 * Process captcha
// @ts-ignore
	 */
// @ts-ignore
	protected async processCaptcha(
// @ts-ignore
		{ captcha_sid: sid, captcha_img: src }: {
// @ts-ignore
			captcha_sid: number;
// @ts-ignore
			captcha_img: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<Response> {
// @ts-ignore
		debug('captcha process');
// @ts-ignore

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
		if (this.captchaAttempts >= CAPTCHA_ATTEMPTS) {
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
		const { key, validate } = await this.options.callbackService.processingCaptcha({
// @ts-ignore
			type: CaptchaType.DIRECT_AUTH,
// @ts-ignore
			sid,
// @ts-ignore
			src
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.captchaValidate = validate;
// @ts-ignore

// @ts-ignore
		const response = await this.getPermissionsPage({
// @ts-ignore
			captcha_sid: sid,
// @ts-ignore
			captcha_key: key
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return response;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Process two-factor
// @ts-ignore
	 */
// @ts-ignore
	protected async processTwoFactor(
// @ts-ignore
		{ validation_type: validationType, phone_mask: phoneMask }: {
// @ts-ignore
			validation_type: string;
// @ts-ignore
			phone_mask: string;
// @ts-ignore
		}
// @ts-ignore
	): Promise<Response> {
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
				code: FAILED_PASSED_TWO_FACTOR
// @ts-ignore
			}));
// @ts-ignore

// @ts-ignore
			this.twoFactorValidate = undefined;
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
		const { code, validate } = await this.options.callbackService.processingTwoFactor({
// @ts-ignore
			phoneMask,
// @ts-ignore
			type: validationType === '2fa_app'
// @ts-ignore
				? 'app'
// @ts-ignore
				: 'sms'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.twoFactorValidate = validate;
// @ts-ignore

// @ts-ignore
		const response = await this.getPermissionsPage({ code });
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
}
