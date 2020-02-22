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
	 * Wait time for one auth request
	 */
	authTimeout: number;

	/**
	 * Query mode (sequential|parallel|parallel_selected)
	 */
	apiMode: 'sequential' | 'parallel' | 'parallel_selected';

	/**
	 * Time to wait before re-querying
	 */
	apiWait: number;

	/**
	 * Requests per second
	 */
	apiLimit: number;

	/**
	 * VK API version
	 */
	apiVersion: string;

	/**
	 * Base API URL
	 */
	apiBaseUrl: string;

	/**
	 * The number of retries at calling
	 */
	apiAttempts: number;

	/**
	 * Wait time for one request
	 */
	apiTimeout: number;

	/**
	 * Headers sent to the API
	 */
	apiHeaders: Record<string, string>;

	/**
	 * Number of requests per execute
	 */
	apiExecuteCount: number;

	/**
	 * Methods for call execute (apiMode=parallel_selected)
	 */
	apiExecuteMethods: string[];

	/**
	 * Wait time for one request
	 */
	uploadTimeout: number;

	/**
	 * Time to wait before re-querying
	 */
	pollingWait: number;

	/**
	 * The number of retries at calling
	 */
	pollingAttempts: number;

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
	 */
	collectAttempts: number;
}
