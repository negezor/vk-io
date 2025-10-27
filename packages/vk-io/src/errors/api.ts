import { APIErrorCode } from "../api/schemas/constants";

import { VKError } from "./error";

export interface IAPIErrorParam {
    key: string;
    value: string;
}

export interface IAPIErrorOptions {
    error_code: number;
    error_msg: string;
    request_params: IAPIErrorParam[];

    captcha_sid?: string;
    captcha_img?: string;
    redirect_uri?: string;
    confirmation_text?: string;
}

export class APIError extends VKError {
    /**
     * Request parameters
     */
    public params: IAPIErrorParam[];

    /**
     * Session identifier captcha
     */
    public captchaSid?: string;

    /**
     * Image of captcha
     */
    public captchaImg?: string;

    /**
     * Redirect URL, e.g. validation
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
        if (code === APIErrorCode.CAPTCHA) {
            this.captchaSid = payload.captcha_sid;
            this.captchaImg = payload.captcha_img;
            this.redirectUri = payload.redirect_uri;
        } else if (code === APIErrorCode.AUTH_VALIDATION) {
            this.redirectUri = payload.redirect_uri;
        } else if (code === APIErrorCode.NEED_CONFIRMATION) {
            this.confirmationText = payload.confirmation_text;
        }
    }
}

export { APIErrorCode };
