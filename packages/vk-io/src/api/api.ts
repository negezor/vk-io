// @ts-ignore
import fetch from 'node-fetch';
// @ts-ignore
import createDebug from 'debug';

import { inspect } from 'util';
import { URLSearchParams } from 'url';

import { APIMethods } from './schemas/methods';

import VK from '../vk';
import Request from './request';
import { getRandomId, delay } from '../utils/helpers';
import { VKError, APIError, ExecuteError } from '../errors';
import AccountVerification from '../auth/account-verification';
import { sequential, parallel, parallelSelected } from './workers';
import {
	MINIMUM_TIME_INTERVAL_API,

	APIErrorCode,
	CaptchaType
} from '../utils/constants';
import { IExecuteErrorOptions } from '../errors/execute';

const {
	CAPTCHA_REQUIRED,
	TOO_MANY_REQUESTS,
	USER_VALIDATION_REQUIRED
} = APIErrorCode;

const debug = createDebug('vk-io:api');

const requestHandlers: Record<string, Function> = {
	sequential,
	parallel,
	parallel_selected: parallelSelected
};

/**
 * Returns request handler
 */
const getRequestHandler = (mode = 'sequential'): Function => {
	const handler = requestHandlers[mode];

	if (!handler) {
		throw new VKError({
			message: 'Unsuported api mode',
			code: 'UNSUPPORTED_MODE'
		});
	}

	return handler;
};

const groupMethods = [
	'account',
	'ads',
	'appWidgets',
	'apps',
	'audio',
	'auth',
	'board',
	'database',
	'docs',
	'fave',
	'friends',
	'gifts',
	'groups',
	'leads',
	'leadForms',
	'likes',
	'market',
	'messages',
	'newsfeed',
	'notes',
	'notifications',
	'orders',
	'pages',
	'photos',
	'places',
	'polls',
	'podcasts',
	'prettyCards',
	'search',
	'secure',
	'stats',
	'status',
	'storage',
	'stories',
	'streaming',
	'users',
	'utils',
	'video',
	'wall',
	'widgets'
];

/**
 * Working with API methods
 */
export default class API extends APIMethods {
	private queue: Request[] = [];

	private started = false;

	private suspended = false;

	private vk: VK;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		super();

		this.vk = vk;

		for (const group of groupMethods) {
			const isMessagesGroup = group === 'messages';

			/**
			 * NOTE: Optimization for other methods
			 *
			 * Instead of checking everywhere the presence of a property in an object
			 * The check is only for the messages group
			 * Since it is necessary to change the behavior of the sending method
			 */
			// @ts-ignore
			this[group] = new Proxy(
				isMessagesGroup
					? {
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						send: (params: Record<string, any> = {}): Promise<number> => {
							const messageParams = params.random_id === undefined
								? { ...params, random_id: getRandomId() }
								: params;

							return this.enqueue('messages.send', messageParams);
						}
					}
					: {},
				{
					get: isMessagesGroup
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						? (obj: Record<string, any>, prop: string): Function => obj[prop] || (
							// eslint-disable-next-line @typescript-eslint/no-explicit-any
							(params: object): Promise<any> => (
								this.enqueue(`${group}.${prop}`, params)
							)
						)
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
						: (obj, prop: string) => (params: object): Promise<any> => (
							this.enqueue(`${group}.${prop}`, params)
						)
				}
			);
		}
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Returns the current used API version
	 */
	public get API_VERSION(): string {
		return this.vk.options.apiVersion;
	}

	/**
	 * Call execute method
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public execute(params: object): Promise<any> {
		return this.enqueue('execute', params);
	}

	/**
	 * Call execute procedure
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public procedure(name: string, params: object): Promise<any> {
		return this.enqueue(`execute.${name}`, params);
	}

	/**
	 * Call raw method
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public call(method: string, params: object): Promise<any> {
		return this.enqueue(method, params);
	}

	/**
	 * Adds request for queue
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public callWithRequest(request: Request): Promise<any> {
		this.queue.push(request);

		this.worker();

		return request.promise;
	}

	/**
	 * Adds method to queue
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public enqueue(method: string, params: object): Promise<any> {
		const request = new Request(method, params);

		return this.callWithRequest(request);
	}

	/**
	 * Adds an element to the beginning of the queue
	 */
	protected requeue(request: Request): void {
		this.queue.unshift(request);

		this.worker();
	}

	/**
	 * Running queue
	 */
	private worker(): void {
		if (this.started) {
			return;
		}

		this.started = true;

		const { apiLimit, apiMode } = this.vk.options;

		const handler = getRequestHandler(apiMode);
		const interval = Math.round(MINIMUM_TIME_INTERVAL_API / apiLimit);

		const work = (): void => {
			if (this.queue.length === 0 || this.suspended) {
				this.started = false;

				return;
			}

			handler(this, () => {
				setTimeout(work, interval);
			});
		};

		work();
	}

	/**
	 * Calls the api method
	 */
	protected async callMethod(request: Request): Promise<void> {
		const { options } = this.vk;
		const { method } = request;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const params: Record<string, any> = {
			access_token: options.token,
			v: options.apiVersion,

			...request.params
		};

		if (options.language !== null) {
			params.lang = options.language;
		}

		debug(`http --> ${method}`);

		const startTime = Date.now();

		let response;
		try {
			response = await fetch(`${options.apiBaseUrl}/${method}`, {
				method: 'POST',
				compress: false,
				agent: options.agent,
				timeout: options.apiTimeout,
				headers: {
					...options.apiHeaders,

					connection: 'keep-alive'
				},
				body: new URLSearchParams(params)
			});

			response = await response.json();
		} catch (error) {
			if (request.addAttempt() <= options.apiAttempts) {
				await delay(options.apiWait);

				debug(`Request ${method} restarted ${request.attempts} times`);

				this.requeue(request);

				return;
			}

			if (request.captchaValidate) {
				request.captchaValidate.reject(error);
			}

			request.reject(error);

			return;
		}

		const endTime = (Date.now() - startTime).toLocaleString();

		debug(`http <-- ${method} ${endTime}ms`);

		if ('error' in response) {
			this.handleError(request, new APIError(response.error));

			return;
		}

		if (request.captchaValidate) {
			request.captchaValidate.resolve();
		}

		if (method.startsWith('execute')) {
			request.resolve({
				response: response.response,
				errors: (response.execute_errors || []).map((error: IExecuteErrorOptions) => (
					new ExecuteError(error)
				))
			});

			return;
		}

		request.resolve(
			response.response !== undefined
				? response.response
				: response
		);
	}

	/**
	 * Error API handler
	 */
	public async handleError(request: Request, error: APIError): Promise<void> {
		const { code } = error;

		if (code === TOO_MANY_REQUESTS) {
			if (this.suspended) {
				this.requeue(request);

				return;
			}

			this.suspended = true;

			await delay((MINIMUM_TIME_INTERVAL_API / this.vk.options.apiLimit) + 50);

			this.suspended = false;

			this.requeue(request);

			return;
		}

		if (request.captchaValidate) {
			request.captchaValidate.reject(error);
		}

		if (code === USER_VALIDATION_REQUIRED) {
			if (this.suspended) {
				this.requeue(request);
			}

			this.suspended = true;

			try {
				const verification = new AccountVerification(this.vk);

				const { token } = await verification.run(error.redirectUri!);

				debug('Account verification passed');

				this.vk.token = token;

				this.suspended = false;

				this.requeue(request);
			} catch (verificationError) {
				debug('Account verification error', verificationError);

				request.reject(error);

				await delay(15e3);

				this.suspended = false;

				this.worker();
			}

			return;
		}

		if (code !== CAPTCHA_REQUIRED || !this.vk.callbackService.hasCaptchaHandler) {
			request.reject(error);

			return;
		}

		try {
			const { captchaSid } = error;

			const { key, validate } = await this.vk.callbackService.processingCaptcha({
				type: CaptchaType.API,
				src: error.captchaImg,
				sid: captchaSid,
				request
			});

			request.captchaValidate = validate;

			request.params.captcha_sid = captchaSid;
			request.params.captcha_key = key;

			this.requeue(request);
		} catch (e) {
			request.reject(e);
		}
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;
		const { started, queue } = this;

		const payload = { started, queue };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
