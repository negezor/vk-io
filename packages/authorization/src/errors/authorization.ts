// @ts-ignore
import { VKError } from 'vk-io';
// @ts-ignore

// @ts-ignore
const { DEBUG = '' } = process.env;
// @ts-ignore

// @ts-ignore
const isDebug = DEBUG.includes('vk-io:authorization');
// @ts-ignore

// @ts-ignore
export interface IAuthorizationErrorOptions {
// @ts-ignore
	message: string;
// @ts-ignore
	code: string;
// @ts-ignore

// @ts-ignore
	pageHtml?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class AuthorizationError extends VKError {
// @ts-ignore
	/**
// @ts-ignore
	 * HTML error page
// @ts-ignore
	 */
// @ts-ignore
	public pageHtml?: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({ message, code, pageHtml }: IAuthorizationErrorOptions) {
// @ts-ignore
		super({ message, code });
// @ts-ignore

// @ts-ignore
		this.pageHtml = isDebug
// @ts-ignore
			? pageHtml
// @ts-ignore
			: undefined;
// @ts-ignore
	}
// @ts-ignore
}
