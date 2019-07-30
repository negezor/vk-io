import VK from '../vk';
import { VKError, sharedErrors } from '../errors';

const {
	MISSING_CAPTCHA_HANDLER,
	MISSING_TWO_FACTOR_HANDLER
} = sharedErrors;

export default class CallbackService {
	protected vk: VK;

	protected captchaHandler: Function | null = null;

	protected twoFactorHandler: Function | null = null;

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
	public processingCaptcha(payload: object): Promise<object> {
		return new Promise((resolveProcessing, rejectProcessing): void => {
			if (!this.hasCaptchaHandler) {
				rejectProcessing(new VKError({
					message: 'Missing captcha handler',
					code: MISSING_CAPTCHA_HANDLER
				}));

				return;
			}

			this.captchaHandler(payload, (key: Error | string): Promise<void> => (
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
	public processingTwoFactor(payload: object): Promise<object> {
		return new Promise((resolveProcessing, rejectProcessing): void => {
			if (!this.hasTwoFactorHandler) {
				rejectProcessing(new VKError({
					message: 'Missing two-factor handler',
					code: MISSING_TWO_FACTOR_HANDLER
				}));

				return;
			}

			this.twoFactorHandler(payload, (code: Error | string): Promise<object> => (
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
