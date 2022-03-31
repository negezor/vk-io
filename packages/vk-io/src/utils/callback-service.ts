// @ts-ignore
import { APIRequest } from '../api/request';
// @ts-ignore

// @ts-ignore
import { VKError, SharedErrorCode } from '../errors';
// @ts-ignore
import { CaptchaType } from './constants';
// @ts-ignore

// @ts-ignore
const {
// @ts-ignore
	MISSING_CAPTCHA_HANDLER,
// @ts-ignore
	MISSING_TWO_FACTOR_HANDLER
// @ts-ignore
} = SharedErrorCode;
// @ts-ignore

// @ts-ignore
export interface ICallbackServiceCaptchaPayload {
// @ts-ignore
	type: CaptchaType;
// @ts-ignore
	sid: string | number;
// @ts-ignore
	src: string;
// @ts-ignore
	request?: APIRequest;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ICallbackServiceTwoFactorPayload {
// @ts-ignore
	phoneMask?: string;
// @ts-ignore
	type?: 'app' | 'sms';
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type CallbackServiceRetry = (code: Error | string) => Promise<void>;
// @ts-ignore

// @ts-ignore
export type CaptchaHandler = (
// @ts-ignore
	payload: ICallbackServiceCaptchaPayload,
// @ts-ignore
	retry: CallbackServiceRetry
// @ts-ignore
) => Promise<void> | void;
// @ts-ignore

// @ts-ignore
export type TwoFactorHandler = (
// @ts-ignore
	payload: ICallbackServiceTwoFactorPayload,
// @ts-ignore
	retry: CallbackServiceRetry
// @ts-ignore
) => Promise<void> | void;
// @ts-ignore

// @ts-ignore
export interface ICallbackServiceValidate {
// @ts-ignore
	resolve: () => void;
// @ts-ignore
	reject: (error: Error) => void;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class CallbackService {
// @ts-ignore
	private captchaHandler?: CaptchaHandler;
// @ts-ignore

// @ts-ignore
	private twoFactorHandler?: TwoFactorHandler;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if there is a captcha handler
// @ts-ignore
	 */
// @ts-ignore
	public get hasCaptchaHandler(): boolean {
// @ts-ignore
		return this.captchaHandler !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if there is a two-factor handler
// @ts-ignore
	 */
// @ts-ignore
	public get hasTwoFactorHandler(): boolean {
// @ts-ignore
		return this.twoFactorHandler !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets a handler for captcha processing
// @ts-ignore
	 */
// @ts-ignore
	public onCaptcha(handler: CaptchaHandler): this {
// @ts-ignore
		this.captchaHandler = handler;
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets a handler for two factor processing
// @ts-ignore
	 */
// @ts-ignore
	public onTwoFactor(handler: TwoFactorHandler): this {
// @ts-ignore
		this.twoFactorHandler = handler;
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Processing captcha
// @ts-ignore
	 */
// @ts-ignore
	public processingCaptcha(payload: ICallbackServiceCaptchaPayload): Promise<{
// @ts-ignore
		key: string;
// @ts-ignore
		validate: ICallbackServiceValidate;
// @ts-ignore
	}> {
// @ts-ignore
		const { captchaHandler } = this;
// @ts-ignore

// @ts-ignore
		if (captchaHandler === undefined) {
// @ts-ignore
			return Promise.reject(new VKError({
// @ts-ignore
				message: 'Missing captcha handler',
// @ts-ignore
				code: MISSING_CAPTCHA_HANDLER
// @ts-ignore
			}));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return new Promise((resolveProcessing, rejectProcessing): void => {
// @ts-ignore
			captchaHandler(payload, (key): Promise<void> => (
// @ts-ignore
				new Promise((resolve, reject): void => {
// @ts-ignore
					if (key instanceof Error) {
// @ts-ignore
						reject(key);
// @ts-ignore
						rejectProcessing(key);
// @ts-ignore

// @ts-ignore
						return;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					resolveProcessing({
// @ts-ignore
						key,
// @ts-ignore
						validate: {
// @ts-ignore
							resolve,
// @ts-ignore
							reject
// @ts-ignore
						}
// @ts-ignore
					});
// @ts-ignore
				})
// @ts-ignore
			));
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Processing two-factor
// @ts-ignore
	 */
// @ts-ignore
	public processingTwoFactor(payload: ICallbackServiceTwoFactorPayload): Promise<{
// @ts-ignore
		code: string;
// @ts-ignore
		validate: ICallbackServiceValidate;
// @ts-ignore
	}> {
// @ts-ignore
		const { twoFactorHandler } = this;
// @ts-ignore

// @ts-ignore
		if (twoFactorHandler === undefined) {
// @ts-ignore
			return Promise.reject(new VKError({
// @ts-ignore
				message: 'Missing two-factor handler',
// @ts-ignore
				code: MISSING_TWO_FACTOR_HANDLER
// @ts-ignore
			}));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return new Promise((resolveProcessing, rejectProcessing): void => {
// @ts-ignore
			twoFactorHandler(payload, (code): Promise<void> => (
// @ts-ignore
				new Promise((resolve, reject): void => {
// @ts-ignore
					if (code instanceof Error) {
// @ts-ignore
						reject(code);
// @ts-ignore
						rejectProcessing(code);
// @ts-ignore

// @ts-ignore
						return;
// @ts-ignore
					}
// @ts-ignore

// @ts-ignore
					resolveProcessing({
// @ts-ignore
						code,
// @ts-ignore
						validate: {
// @ts-ignore
							resolve,
// @ts-ignore
							reject
// @ts-ignore
						}
// @ts-ignore
					});
// @ts-ignore
				})
// @ts-ignore
			));
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore
}
