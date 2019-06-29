import VKError from './error';

const { DEBUG = '' } = process.env;

const isDebug = DEBUG.includes('vk-io:auth');

export interface IAuthErrorOptions {
	message: string;
	code: string;

	pageHtml?: string;
}

export default class AuthError extends VKError {
	/**
	 * HTML error page
	 */
	pageHtml: string | null;

	/**
	 * Constructor
	 */
	constructor({ message, code, pageHtml = null }: IAuthErrorOptions) {
		super({ message, code });

		this.pageHtml = isDebug
			? pageHtml
			: null;
	}
}
