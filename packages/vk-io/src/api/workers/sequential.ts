// @ts-ignore
import createDebug from 'debug';
// @ts-ignore

// @ts-ignore
import { APIWorker } from './worker';
// @ts-ignore

// @ts-ignore
import { APIRequest } from '../request';
// @ts-ignore
import { delay } from '../../utils/helpers';
// @ts-ignore
import {
// @ts-ignore
	IExecuteErrorOptions,
// @ts-ignore

// @ts-ignore
	APIError,
// @ts-ignore
	ExecuteError,
// @ts-ignore

// @ts-ignore
	APIErrorCode
// @ts-ignore
} from '../../errors';
// @ts-ignore

// @ts-ignore
import { CaptchaType, MINIMUM_TIME_INTERVAL_API } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:api');
// @ts-ignore

// @ts-ignore
export class SequentialWorker extends APIWorker {
// @ts-ignore
	protected async execute(request: APIRequest | undefined = this.queue.shift()): Promise<void> {
// @ts-ignore
		if (!request) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { method } = request;
// @ts-ignore

// @ts-ignore
		debug(`${method} -->`);
// @ts-ignore

// @ts-ignore
		let response;
// @ts-ignore
		try {
// @ts-ignore
			response = await request.make();
// @ts-ignore
		} catch (error) {
// @ts-ignore
			const { options } = this.api;
// @ts-ignore

// @ts-ignore
			if (request.retries === options.apiRetryLimit) {
// @ts-ignore
				debug(`${method} <X-`);
// @ts-ignore

// @ts-ignore
				request.captchaValidate?.reject(error as Error);
// @ts-ignore

// @ts-ignore
				request.reject(error);
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			request.retries += 1;
// @ts-ignore

// @ts-ignore
			await delay(options.apiWait);
// @ts-ignore

// @ts-ignore
			debug(`Request ${method} restarted ${request.retries} times`);
// @ts-ignore

// @ts-ignore
			this.requeue(request);
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		debug(`${method} <--`);
// @ts-ignore

// @ts-ignore
		if (response.error !== undefined) {
// @ts-ignore
			this.handleError(request, new APIError(response.error));
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		request.captchaValidate?.resolve();
// @ts-ignore

// @ts-ignore
		if (method.startsWith('execute')) {
// @ts-ignore
			request.resolve({
// @ts-ignore
				response: response.response,
// @ts-ignore
				errors: (response.execute_errors || []).map((error: IExecuteErrorOptions) => (
// @ts-ignore
					new ExecuteError(error)
// @ts-ignore
				))
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		request.resolve(response.response ?? response);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Error API handler
// @ts-ignore
	 */
// @ts-ignore
	public async handleError(request: APIRequest, error: APIError): Promise<void> {
// @ts-ignore
		const { code } = error;
// @ts-ignore

// @ts-ignore
		if (code === APIErrorCode.TOO_MANY) {
// @ts-ignore
			if (this.paused) {
// @ts-ignore
				this.requeue(request);
// @ts-ignore

// @ts-ignore
				return;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			this.pause();
// @ts-ignore

// @ts-ignore
			await delay(MINIMUM_TIME_INTERVAL_API);
// @ts-ignore

// @ts-ignore
			this.requeue(request);
// @ts-ignore

// @ts-ignore
			this.resume();
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		request.captchaValidate?.reject(error);
// @ts-ignore

// @ts-ignore
		if (
// @ts-ignore
			code !== APIErrorCode.CAPTCHA
// @ts-ignore
			|| !this.api.options.callbackService
// @ts-ignore
			|| !this.api.options.callbackService.hasCaptchaHandler
// @ts-ignore
		) {
// @ts-ignore
			request.reject(error);
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		try {
// @ts-ignore
			const { captchaSid } = error;
// @ts-ignore

// @ts-ignore
			const { key, validate } = await this.api.options.callbackService.processingCaptcha({
// @ts-ignore
				type: CaptchaType.API,
// @ts-ignore
				src: error.captchaImg!,
// @ts-ignore
				sid: captchaSid!,
// @ts-ignore
				request
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			request.captchaValidate = validate;
// @ts-ignore

// @ts-ignore
			request.params.captcha_sid = captchaSid;
// @ts-ignore
			request.params.captcha_key = key;
// @ts-ignore

// @ts-ignore
			this.requeue(request);
// @ts-ignore
		} catch (e) {
// @ts-ignore
			request.reject(e);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
}
