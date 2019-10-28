import VKError from './error';

const { DEBUG = '' } = process.env;

const isDebug = DEBUG.includes('vk-io:auth');

export interface IAuthErrorOptions {
	message: string;
	code: string;

	pageHtml?: string | null;
}

export default class AuthError extends VKError {
	/**
	 * HTML error page
	 */
	public pageHtml: string | null;

	/**
	 * Constructor
	 */
	public constructor({ message, code, pageHtml = null }: IAuthErrorOptions) {
		super({ message, code });

		this.pageHtml = isDebug
			? pageHtml
			: null;
	}
}
