import { VKError, sharedErrors } from '../errors';

const {
	MISSING_CAPTCHA_HANDLER,
	MISSING_TWO_FACTOR_HANDLER
} = sharedErrors;

export default class CallbackService {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.captchaHandler = null;
		this.twoFactorHandler = null;
	}

	/**
	 * Checks if there is a captcha handler
	 *
	 * @return {boolean}
	 */
	get hasCaptchaHandler() {
		return this.captchaHandler !== null;
	}

	/**
	 * Checks if there is a two-factor handler
	 *
	 * @return {boolean}
	 */
	get hasTwoFactorHandler() {
		return this.twoFactorHandler !== null;
	}

	/**
	 * Processing captcha
	 *
	 * @param {Object} payload
	 *
	 * @return {Promise<Object>}
	 */
	processingCaptcha(payload) {
		return new Promise((resolveProcessing, rejectProcessing) => {
			if (!this.hasCaptchaHandler) {
				rejectProcessing(new VKError({
					message: 'Missing captcha handler',
					code: MISSING_CAPTCHA_HANDLER
				}));

				return;
			}

			this.vk.captchaHandler(payload, key => (
				new Promise((resolve, reject) => {
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
	 *
	 * @param {Object} payload
	 *
	 * @return {Promise<Object>}
	 */
	processingTwoFactor(payload) {
		return new Promise((resolveProcessing, rejectProcessing) => {
			if (!this.hasTwoFactorHandler) {
				rejectProcessing(new VKError({
					message: 'Missing two-factor handler',
					code: MISSING_TWO_FACTOR_HANDLER
				}));

				return;
			}

			this.vk.twoFactorHandler(payload, code => (
				new Promise((resolve, reject) => {
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
