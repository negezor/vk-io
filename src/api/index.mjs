import fetch from 'node-fetch';
import createDebug from 'debug';

import nodeUtil from 'util';
import nodeUrl from 'url';

import Request from './request';
import { VKError, APIError, ExecuteError } from '../errors';
import { getRandomId, delay } from '../utils/helpers';
import AccountVerification from '../auth/account-verification';
import { sequential, parallel, parallelSelected } from './workers';
import {
	MINIMUM_TIME_INTERVAL_API,
	API_VERSION,

	apiErrors,
	captchaTypes
} from '../utils/constants';

const { inspect } = nodeUtil;
const { URLSearchParams } = nodeUrl;

const {
	CAPTCHA_REQUIRED,
	TOO_MANY_REQUESTS,
	USER_VALIDATION_REQUIRED
} = apiErrors;

const debug = createDebug('vk-io:api');

const requestHandlers = {
	sequential,
	parallel,
	parallel_selected: parallelSelected
};

/**
 * Returns request handler
 *
 * @param {string} mode
 *
 * @return {Function}
 */
const getRequestHandler = (mode = 'sequential') => {
	const handler = requestHandlers[mode];

	if (!handler) {
		throw new VKError({
			message: 'Unsuported api mode'
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
 *
 * @public
 */
export default class API {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;

		this.queue = [];
		this.started = false;
		this.suspended = false;

		for (const group of groupMethods) {
			const isMessagesGroup = group === 'messages';

			/**
			 * NOTE: Optimization for other methods
			 *
			 * Instead of checking everywhere the presence of a property in an object
			 * The check is only for the messages group
			 * Since it is necessary to change the behavior of the sending method
			 */
			this[group] = new Proxy(
				isMessagesGroup
					? {
						send: (params = {}) => {
							if (!('random_id' in params)) {
								params = {
									...params,

									random_id: getRandomId()
								};
							}

							return this.enqueue('messages.send', params);
						}
					}
					: {},
				{
					get: isMessagesGroup
						? (obj, prop) => obj[prop] || (
							params => (
								this.enqueue(`${group}.${prop}`, params)
							)
						)
						: (obj, prop) => params => (
							this.enqueue(`${group}.${prop}`, params)
						)
				}
			);
		}
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'API';
	}

	/**
	 * Returns the current used API version
	 *
	 * @return {string}
	 */
	get API_VERSION() {
		return API_VERSION;
	}

	/**
	 * Call execute method
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	execute(params) {
		return this.enqueue('execute', params);
	}

	/**
	 * Call execute procedure
	 *
	 * @param {string} name
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	procedure(name, params) {
		return this.enqueue(`execute.${name}`, params);
	}

	/**
	 * Call raw method
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	call(method, params) {
		return this.enqueue(method, params);
	}

	/**
	 * Adds request for queue
	 *
	 * @param {Request} request
	 *
	 * @return {Promise<Object>}
	 */
	callWithRequest(request) {
		this.queue.push(request);

		this.worker();

		return request.promise;
	}

	/**
	 * Adds method to queue
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	enqueue(method, params) {
		const request = new Request(method, params);

		return this.callWithRequest(request);
	}

	/**
	 * Adds an element to the beginning of the queue
	 *
	 * @param {Request} request
	 */
	requeue(request) {
		this.queue.unshift(request);

		this.worker();
	}

	/**
	 * Running queue
	 */
	worker() {
		if (this.started) {
			return;
		}

		this.started = true;

		const { apiLimit, apiMode } = this.vk.options;

		const handler = getRequestHandler(apiMode);
		const interval = Math.round(MINIMUM_TIME_INTERVAL_API / apiLimit);

		const work = () => {
			if (this.queue.length === 0 || this.suspended) {
				this.started = false;

				return;
			}

			handler.call(this, () => {
				setTimeout(work, interval);
			});
		};

		work();
	}

	/**
	 * Calls the api method
	 *
	 * @param {Request} request
	 */
	async callMethod(request) {
		const { options } = this.vk;
		const { method } = request;

		const params = {
			access_token: options.token,
			v: API_VERSION,

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

			if ('captchaValidate' in request) {
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

		if ('captchaValidate' in request) {
			request.captchaValidate.resolve();
		}

		if (method.startsWith('execute')) {
			request.resolve({
				response: response.response,
				errors: (response.execute_errors || []).map(error => (
					new ExecuteError(error)
				))
			});

			return;
		}

		request.resolve(response.response || response);
	}

	/**
	 * Error API handler
	 *
	 * @param {Request} request
	 * @param {Object}  error
	 */
	async handleError(request, error) {
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

		if ('captchaValidate' in request) {
			request.captchaValidate.reject(error);
		}

		if (code === USER_VALIDATION_REQUIRED) {
			if (this.suspended) {
				this.requeue(request);
			}

			this.suspended = true;

			try {
				const verification = new AccountVerification(this.vk);

				const { token } = await verification.run(error.redirectUri);

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
				type: captchaTypes.API,
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
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;
		const { started, queue } = this;

		const payload = { started, queue };

		return `${options.stylize(name, 'special')} ${inspect(payload, options)}`;
	}
}
