import { Agent } from 'https';

export interface IVKOptions {
	/**
	 * Access token
	 */
	token: string | null;

	/**
	 * HTTPS agent
	 */
	agent: Agent;

	/**
	 * The return data language
	 */
	language: 'ru' | 'uk' | 'be' | 'en' | 'es' | 'fi' | 'de' | 'it' | null;

	/**
	 * Application ID
	 */
	appId: number | null;

	/**
	 * Secret application key
	 */
	appSecret: string | null;

	/**
	 * User login (phone number or email)
	 */
	login: string | null;

	/**
	 * User phone number
	 */
	phone: string | number | null;

	/**
	 * User password
	 */
	password: string | null;

	/**
	 * List of permissions
	 */
	authScope: string | string[] | number | null;

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
	apiHeaders: { [key: string]: string };

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
	pollingGroupId: number | null;

	/**
	 * Webhook secret key
	 */
	webhookSecret: string | null;

	/**
	 * Webhook confirmation key
	 */
	webhookConfirmation: string | null;

	/**
	 * The number of retries at calling
	 */
	collectAttempts: number;
}
