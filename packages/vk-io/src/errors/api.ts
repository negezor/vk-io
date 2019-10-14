import VKError from './error';
import { APIErrorCode } from '../utils/constants';

const { CAPTCHA_REQUIRED, USER_VALIDATION_REQUIRED, CONFIRMATION_REQUIRED } = APIErrorCode;

export interface IAPIErrorParam {
	key: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
}

export interface IAPIErrorOptions {
	error_code: number;
	error_msg: string;
	request_params: IAPIErrorParam[];

	captcha_sid?: number;
	captcha_img?: string;
	redirect_uri?: string;
	confirmation_text?: string;
}

export default class APIError extends VKError {
	/**
	 * Request parameters
	 */
	public params: IAPIErrorParam[];

	/**
	 * Session identifier captcha
	 */
	public captchaSid?: number;

	/**
	 * Image of captcha
	 */
	public captchaImg?: string;

	/**
	 * Redirect URL, eg validation
	 */
	public redirectUri?: string;

	/**
	 * Required confirmation text
	 */
	public confirmationText?: string;

	/**
	 * Constructor
	 */
	public constructor(payload: IAPIErrorOptions) {
		const code = Number(payload.error_code);
		const message = `Code №${code} - ${payload.error_msg}`;

		super({ code, message });

		this.params = payload.request_params;

		if (code === CAPTCHA_REQUIRED) {
			this.captchaSid = Number(payload.captcha_sid);
			this.captchaImg = payload.captcha_img;
		} else if (code === USER_VALIDATION_REQUIRED) {
			this.redirectUri = payload.redirect_uri;
		} else if (code === CONFIRMATION_REQUIRED) {
			this.confirmationText = payload.confirmation_text;
		}
	}
}
