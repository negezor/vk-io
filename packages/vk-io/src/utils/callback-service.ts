import VK from '../vk';
import { VKError, SharedErrorCode } from '../errors';

const {
	MISSING_CAPTCHA_HANDLER,
	MISSING_TWO_FACTOR_HANDLER
} = SharedErrorCode;

export interface ICallbackServiceValidate {
	resolve: () => Promise<void>;
	reject: (error: Error) => Promise<void>;
}

export default class CallbackService {
	public captchaHandler: Function | null = null;

	public twoFactorHandler: Function | null = null;

	protected vk: VK;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Checks if there is a captcha handler
	 */
	public get hasCaptchaHandler(): boolean {
		return this.captchaHandler !== null;
	}

	/**
	 * Checks if there is a two-factor handler
	 */
	public get hasTwoFactorHandler(): boolean {
		return this.twoFactorHandler !== null;
	}

	/**
	 * Processing captcha
	 */
	public processingCaptcha(payload: object): Promise<{
		key: string;
		validate: ICallbackServiceValidate;
	}> {
		return new Promise((resolveProcessing, rejectProcessing): void => {
			if (!this.hasCaptchaHandler) {
				rejectProcessing(new VKError({
					message: 'Missing captcha handler',
					code: MISSING_CAPTCHA_HANDLER
				}));

				return;
			}

			// @ts-ignore
			this.captchaHandler(payload, (key: Error | string): Promise<void> => (
				new Promise((resolve, reject): void => {
					if (key instanceof Error) {
						reject(key);
						rejectProcessing(key);

						return;
					}

					// @ts-ignore
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
	public processingTwoFactor(payload: object): Promise<{
		code: string;
		validate: ICallbackServiceValidate;
	}> {
		return new Promise((resolveProcessing, rejectProcessing): void => {
			if (!this.hasTwoFactorHandler) {
				rejectProcessing(new VKError({
					message: 'Missing two-factor handler',
					code: MISSING_TWO_FACTOR_HANDLER
				}));

				return;
			}

			// @ts-ignore
			this.twoFactorHandler(payload, (code: Error | string): Promise<void> => (
				new Promise((resolve, reject): void => {
					if (code instanceof Error) {
						reject(code);
						rejectProcessing(code);

						return;
					}

					// @ts-ignore
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
