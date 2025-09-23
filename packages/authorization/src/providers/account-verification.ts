import { AbortController } from 'abort-controller';
import { load as cheerioLoad } from 'cheerio';
import createDebug from 'debug';

import { type CallbackService, CaptchaType, type ICallbackServiceValidate } from 'vk-io';

import type { Agent } from 'https';

import { AuthorizationError } from '../errors';

import {
    CookieJar,
    type FetchWrapper,
    fetchCookieFollowRedirectsDecorator,
    type RequestInfo,
    type RequestInit,
    type Response,
} from '../fetch-cookie';

import { AuthErrorCode, CALLBACK_BLANK, DESKTOP_USER_AGENT } from '../constants';

import { type CheerioStatic, getFullURL, parseFormField } from '../helpers';

const debug = createDebug('vk-io:authorization:account-verification');

const { INVALID_PHONE_NUMBER, AUTHORIZATION_FAILED, FAILED_PASSED_CAPTCHA, FAILED_PASSED_TWO_FACTOR } = AuthErrorCode;

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
    headers?: Record<string, string>;
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
            headers: options.headers || {
                'User-Agent': DESKTOP_USER_AGENT,
            },

            ...options,
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

        const controller = new AbortController();

        const interval = setTimeout(() => controller.abort(), timeout);

        return this.fetchCookie(url, {
            ...options,
            headers: this.options.headers,

            agent,
            signal: controller.signal,
            compress: false,
        }).finally(() => clearTimeout(interval));
    }

    /**
     * Runs authorization
     */
    public async run(redirectUri: RequestInfo): Promise<{ userId: number; token: string }> {
        let response = await this.fetch(redirectUri, {
            method: 'GET',
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
                        code: AUTHORIZATION_FAILED,
                    });
                }

                const userId = params.get('user_id');

                if (!userId) {
                    throw new AuthorizationError({
                        message: 'Field user_id is not found in params',
                        code: AUTHORIZATION_FAILED,
                    });
                }

                const accessToken = params.get('access_token');

                if (!accessToken) {
                    throw new AuthorizationError({
                        message: 'Field access_token is not found in params',
                        code: AUTHORIZATION_FAILED,
                    });
                }

                return {
                    userId: Number(userId),
                    token: accessToken,
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
                code: AUTHORIZATION_FAILED,
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
            this.twoFactorValidate.reject(
                new AuthorizationError({
                    message: 'Incorrect two-factor code',
                    code: FAILED_PASSED_TWO_FACTOR,
                    pageHtml: $.html(),
                }),
            );

            this.twoFactorAttempts += 1;
        }

        if (this.twoFactorAttempts >= TWO_FACTOR_ATTEMPTS) {
            throw new AuthorizationError({
                message: 'Failed passed two-factor authentication',
                code: FAILED_PASSED_TWO_FACTOR,
            });
        }

        const { action, fields } = parseFormField($);

        const { code, validate } = await this.options.callbackService.processingTwoFactor({});

        fields.code = code;

        try {
            const url = getFullURL(action, response);

            const newResponse = await this.fetch(url, {
                method: 'POST',
                body: new URLSearchParams(fields),
            });

            return newResponse;
        } catch (error) {
            validate.reject(error as Error);

            throw error;
        }
    }

    /**
     * Process security form
     */
    protected async processSecurityForm(response: Response, $: CheerioStatic): Promise<Response> {
        debug('process security form');

        const { login, phone } = this.options;

        let number: string | number;
        if (phone !== undefined) {
            number = phone;
        } else if (login !== undefined && !login.includes('@')) {
            number = login;
        } else {
            throw new AuthorizationError({
                message: 'Missing phone number in the phone or login field',
                code: INVALID_PHONE_NUMBER,
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
            body: new URLSearchParams(fields),
        });

        if (rewResponse.url.includes(ACTION_SECURITY_CODE)) {
            throw new AuthorizationError({
                message: 'Invalid phone number',
                code: INVALID_PHONE_NUMBER,
            });
        }

        return rewResponse;
    }

    /**
     * Process validation form
     */
    protected processValidateForm(response: Response, $: CheerioStatic): Promise<Response> {
        const href = $('#activation_wrap a').attr('href');

        if (!href) {
            throw new AuthorizationError({
                message: 'Validate form href is missing',
                code: AUTHORIZATION_FAILED,
            });
        }

        const url = getFullURL(href, response);

        return this.fetch(url, {
            method: 'GET',
        });
    }

    /**
     * Process captcha form
     */
    protected async processCaptchaForm(response: Response, $: CheerioStatic): Promise<Response> {
        if (this.captchaValidate !== undefined) {
            this.captchaValidate.reject(
                new AuthorizationError({
                    message: 'Incorrect captcha code',
                    code: FAILED_PASSED_CAPTCHA,
                }),
            );

            this.captchaValidate = undefined;

            this.captchaAttempts += 1;
        }

        const { action, fields } = parseFormField($);

        const src = $('.captcha_img').attr('src');

        if (!src) {
            throw new AuthorizationError({
                message: 'Failed get captcha image',
                code: AUTHORIZATION_FAILED,
            });
        }

        const { key, validate } = await this.options.callbackService.processingCaptcha({
            type: CaptchaType.ACCOUNT_VERIFICATION,
            sid: fields.captcha_sid,
            // TODO: Handle redirect uri
            redirectUri: '',
            src,
        });

        this.captchaValidate = validate;

        fields.captcha_key = key;

        const url = getFullURL(action, response);

        url.searchParams.set('utf8', '1');

        const pageResponse = await this.fetch(url, {
            method: 'POST',
            body: new URLSearchParams(fields),
        });

        return pageResponse;
    }
}
