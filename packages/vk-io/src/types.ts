import { Agent } from 'https';

export type AllowArray<T> = T | T[];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T = {}> = new (...args: any[]) => T;

export interface IVKOptions {
	/**
	 * Access token
	 */
	token?: string;

	/**
	 * HTTPS agent
	 *
	 * @see https://nodejs.org/api/https.html#https_class_https_agent
	 */
	agent: Agent;

	/**
	 * The return data language
	 */
	language?: 'ru' | 'uk' | 'be' | 'en' | 'es' | 'fi' | 'de' | 'it';

	/**
	 * Application ID
	 */
	appId?: number;

	/**
	 * Secret application key
	 */
	appSecret?: string;

	/**
	 * User login (phone number or email)
	 */
	login?: string;

	/**
	 * User phone number
	 */
	phone?: string | number;

	/**
	 * User password
	 */
	password?: string;

	/**
	 * List of permissions
	 */
	authScope?: AllowArray<string> | number;

	/**
	 * Wait time in ms for one auth request
	 *
	 * @defaultValue `10000`
	 */
	authTimeout: number;

	/**
	 * Determines how requests will be collected
	 * - `sequential` - in order
	 * - `parallel` - all requests are sent through execute
	 * - `parallel_selected` - only the specified methods in `apiExecuteMethods`
	 * are collected in `execute`, other methods as in `sequential` mode
	 *
	 * @defaultValue `sequential`
	 */
	apiMode: 'sequential' | 'parallel' | 'parallel_selected';

	/**
	 * Determines how requests will be sent
	 *
	 * - `sequential` - through the interval
	 * - `burst` - in parallel,
	 * the maximum number of requests (attention, may cause an EAI_AGAIN error)
	 *
	 * @defaultValue `sequential`
	 */
	apiRequestMode: 'sequential' | 'burst';

	/**
	 * Time to wait before re-querying
	 *
	 *  @defaultValue `3000`
	 */
	apiWait: number;

	/**
	 * Requests per second
	 *
	 * @defaultValue `3`
	 */
	apiLimit: number;

	/**
	 * VK API version
	 *
	 * @see https://vk.com/dev/versions
	 */
	apiVersion: string;

	/**
	 * Base API URL
	 *
	 * @defaultValue `https://api.vk.com/method`
	 */
	apiBaseUrl: string;

	/**
	 * The number of retries at calling
	 *
	 * @defaultValue `3`
	 */
	apiRetryLimit: number;

	/**
	 * Wait time for one request
	 *
	 * @defaultValue `10000`
	 */
	apiTimeout: number;

	/**
	 * Headers sent to the API
	 *
	 * @defaultValue `{ User-Agent': 'vk-io/${version} (+https://github.com/negezor/vk-io)' }`
	 */
	apiHeaders: Record<string, string>;

	/**
	 * Number of requests per execute
	 *
	 * @defaultValue `25`
	 */
	apiExecuteCount: number;

	/**
	 * Methods for call execute (apiMode=parallel_selected)
	 *
	 * @defaultValue `['messages.send']`
	 */
	apiExecuteMethods: string[];

	/**
	 * Wait time for one request
	 *
	 * @defaultValue `20000`
	 */
	uploadTimeout: number;

	/**
	 * Time to wait before re-querying
	 *
	 * @defaultValue `3000`
	 */
	pollingWait: number;

	/**
	 * The number of retries at calling
	 *
	 * @defaultValue `3`
	 */
	pollingRetryLimit: number;

	/**
	 * Group ID for polling
	 */
	pollingGroupId?: number;

	/**
	 * Webhook secret key
	 */
	webhookSecret?: string;

	/**
	 * Webhook confirmation key
	 */
	webhookConfirmation?: string;

	/**
	 * The number of retries at calling
	 *
	 * @defaultValue `3`
	 */
	collectRetryLimit: number;
}
