import { VKError } from 'vk-io';

const { DEBUG = '' } = process.env;

const isDebug = DEBUG.includes('vk-io:authorization');

export interface IAuthorizationErrorOptions {
	message: string;
	code: string;

	pageHtml?: string | null;
}

export default class AuthorizationError extends VKError {
	/**
	 * HTML error page
	 */
	public pageHtml: string | null;

	/**
	 * Constructor
	 */
	public constructor({ message, code, pageHtml = null }: IAuthorizationErrorOptions) {
		super({ message, code });

		this.pageHtml = isDebug
			? pageHtml
			: null;
	}
}
