import createDebug from 'debug';

import { APIError, APIErrorCode, ExecuteError, type IAPIErrorOptions, type IExecuteErrorOptions } from '../../errors';

import type { APIRequest } from '../request';
import { APIWorker } from './worker';

import { CaptchaType, MINIMUM_TIME_INTERVAL_API } from '../../utils/constants';

import { delay } from '../../utils/helpers';

const debug = createDebug('vk-io:api');

export class SequentialWorker extends APIWorker {
    protected async execute(request: APIRequest | undefined = this.queue.shift()): Promise<void> {
        if (!request) {
            return;
        }

        const { method } = request;

        debug(`${method} -->`);

        let response: any;
        try {
            response = await request.make();
        } catch (error) {
            const { options } = this.api;

            if (request.retries === options.apiRetryLimit) {
                debug(`${method} <X-`);

                request.captchaValidate?.reject(error as Error);

                request.reject(error);

                return;
            }

            request.retries += 1;

            await delay(options.apiWait);

            debug(`Request ${method} restarted ${request.retries} times`);

            this.requeue(request);

            return;
        }

        debug(`${method} <--`);

        if (response.error !== undefined) {
            void this.handleError(request, new APIError(response.error as IAPIErrorOptions));

            return;
        }

        request.captchaValidate?.resolve();

        if (method.startsWith('execute')) {
            request.resolve({
                response: response.response,
                errors: ((response.execute_errors || []) as IExecuteErrorOptions[]).map(
                    error => new ExecuteError(error),
                ),
            });

            return;
        }

        request.resolve(response.response ?? response);
    }

    /**
     * Error API handler
     */
    public async handleError(request: APIRequest, error: APIError): Promise<void> {
        const { code } = error;

        if (code === APIErrorCode.TOO_MANY) {
            if (this.paused) {
                this.requeue(request);

                return;
            }

            this.pause();

            await delay(MINIMUM_TIME_INTERVAL_API);

            this.requeue(request);

            this.resume();

            return;
        }

        request.captchaValidate?.reject(error);

        if (code !== APIErrorCode.CAPTCHA || !this.api.options.callbackService?.hasCaptchaHandler) {
            request.reject(error);

            return;
        }

        try {
            const { captchaSid, redirectUri } = error;

            const { key, validate } = await this.api.options.callbackService.processingCaptcha({
                type: CaptchaType.API,
                // biome-ignore lint/style/noNonNullAssertion: Captcha error always has captcha img
                src: error.captchaImg!,
                // biome-ignore lint/style/noNonNullAssertion: Captcha error always has captcha sid
                sid: captchaSid!,
                // biome-ignore lint/style/noNonNullAssertion: Captcha error always has captcha sid
                redirectUri: redirectUri!,
                request,
            });

            request.captchaValidate = validate;

            if (redirectUri) {
                request.params.success_token = key;
            } else {
                request.params.captcha_sid = captchaSid;
                request.params.captcha_key = key;
            }

            this.requeue(request);
        } catch (e) {
            request.reject(e);
        }
    }
}
