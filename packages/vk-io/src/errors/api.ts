// @ts-ignore
import { VKError } from './error';
// @ts-ignore
import { APIErrorCode } from '../api/schemas/constants';
// @ts-ignore

// @ts-ignore
export interface IAPIErrorParam {
// @ts-ignore
	key: string;
// @ts-ignore
	value: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IAPIErrorOptions {
// @ts-ignore
	error_code: number;
// @ts-ignore
	error_msg: string;
// @ts-ignore
	request_params: IAPIErrorParam[];
// @ts-ignore

// @ts-ignore
	captcha_sid?: number;
// @ts-ignore
	captcha_img?: string;
// @ts-ignore
	redirect_uri?: string;
// @ts-ignore
	confirmation_text?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class APIError extends VKError {
// @ts-ignore
	/**
// @ts-ignore
	 * Request parameters
// @ts-ignore
	 */
// @ts-ignore
	public params: IAPIErrorParam[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Session identifier captcha
// @ts-ignore
	 */
// @ts-ignore
	public captchaSid?: number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Image of captcha
// @ts-ignore
	 */
// @ts-ignore
	public captchaImg?: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Redirect URL, eg validation
// @ts-ignore
	 */
// @ts-ignore
	public redirectUri?: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Required confirmation text
// @ts-ignore
	 */
// @ts-ignore
	public confirmationText?: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(payload: IAPIErrorOptions) {
// @ts-ignore
		const code = Number(payload.error_code);
// @ts-ignore
		const message = `Code №${code} - ${payload.error_msg}`;
// @ts-ignore

// @ts-ignore
		super({ code, message });
// @ts-ignore

// @ts-ignore
		this.params = payload.request_params;
// @ts-ignore

// @ts-ignore
		if (code === APIErrorCode.CAPTCHA) {
// @ts-ignore
			this.captchaSid = Number(payload.captcha_sid);
// @ts-ignore
			this.captchaImg = payload.captcha_img;
// @ts-ignore
		} else if (code === APIErrorCode.AUTH_VALIDATION) {
// @ts-ignore
			this.redirectUri = payload.redirect_uri;
// @ts-ignore
		} else if (code === APIErrorCode.NEED_CONFIRMATION) {
// @ts-ignore
			this.confirmationText = payload.confirmation_text;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export { APIErrorCode };
