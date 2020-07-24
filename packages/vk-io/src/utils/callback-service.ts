import { APIRequest } from '../api/request';

import { VKError, SharedErrorCode } from '../errors';
import { CaptchaType } from './constants';

const {
	MISSING_CAPTCHA_HANDLER,
	MISSING_TWO_FACTOR_HANDLER
} = SharedErrorCode;

export interface ICallbackServiceCaptchaPayload {
	type: CaptchaType;
	sid: string | number;
	src: string;
	request?: APIRequest;
}

export interface ICallbackServiceTwoFactorPayload {
	phoneMask?: string;
	type?: 'app' | 'sms';
}

export type CallbackServiceRetry = (code: Error | string) => Promise<void>;

export type CaptchaHandler = (
	payload: ICallbackServiceCaptchaPayload,
	retry: CallbackServiceRetry
) => Promise<void> | void;

export type TwoFactorHandler = (
	payload: ICallbackServiceTwoFactorPayload,
	retry: CallbackServiceRetry
) => Promise<void> | void;

export interface ICallbackServiceValidate {
	resolve: () => void;
	reject: (error: Error) => void;
}

export class CallbackService {
	private captchaHandler?: CaptchaHandler;

	private twoFactorHandler?: TwoFactorHandler;

	/**
	 * Checks if there is a captcha handler
	 */
	public get hasCaptchaHandler(): boolean {
		return this.captchaHandler !== undefined;
	}

	/**
	 * Checks if there is a two-factor handler
	 */
	public get hasTwoFactorHandler(): boolean {
		return this.twoFactorHandler !== undefined;
	}

	/**
	 * Sets a handler for captcha processing
	 */
	public onCaptcha(handler: CaptchaHandler): this {
		this.captchaHandler = handler;

		return this;
	}

	/**
	 * Sets a handler for two factor processing
	 */
	public onTwoFactor(handler: TwoFactorHandler): this {
		this.twoFactorHandler = handler;

		return this;
	}

	/**
	 * Processing captcha
	 */
	public processingCaptcha(payload: ICallbackServiceCaptchaPayload): Promise<{
		key: string;
		validate: ICallbackServiceValidate;
	}> {
		const { captchaHandler } = this;

		if (captchaHandler === undefined) {
			return Promise.reject(new VKError({
				message: 'Missing captcha handler',
				code: MISSING_CAPTCHA_HANDLER
			}));
		}

		return new Promise((resolveProcessing, rejectProcessing): void => {
			captchaHandler(payload, (key): Promise<void> => (
				new Promise((resolve, reject): void => {
					if (key instanceof Error) {
						reject(key);
						rejectProcessing(key);

						return;
					}

					resolveProcessing({
						key,
						validate: {
							resolve,
							reject
						}
					});
				})
			));
		});
	}

	/**
	 * Processing two-factor
	 */
	public processingTwoFactor(payload: ICallbackServiceTwoFactorPayload): Promise<{
		code: string;
		validate: ICallbackServiceValidate;
	}> {
		const { twoFactorHandler } = this;

		if (twoFactorHandler === undefined) {
			return Promise.reject(new VKError({
				message: 'Missing two-factor handler',
				code: MISSING_TWO_FACTOR_HANDLER
			}));
		}

		return new Promise((resolveProcessing, rejectProcessing): void => {
			twoFactorHandler(payload, (code): Promise<void> => (
				new Promise((resolve, reject): void => {
					if (code instanceof Error) {
						reject(code);
						rejectProcessing(code);

						return;
					}

					resolveProcessing({
						code,
						validate: {
							resolve,
							reject
						}
					});
				})
			));
		});
	}
}
