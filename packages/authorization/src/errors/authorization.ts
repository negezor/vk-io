import { VKError } from 'vk-io';

const { DEBUG = '' } = process.env;

const isDebug = DEBUG.includes('vk-io:authorization');

export interface IAuthorizationErrorOptions {
	message: string;
	code: string;

	pageHtml?: string;
}

export class AuthorizationError extends VKError {
	/**
	 * HTML error page
	 */
	public pageHtml?: string;

	/**
	 * Constructor
	 */
	public constructor({ message, code, pageHtml }: IAuthorizationErrorOptions) {
		super({ message, code });

		this.pageHtml = isDebug
			? pageHtml
			: undefined;
	}
}
