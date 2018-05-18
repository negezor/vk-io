import VKError from './error';

const { DEBUG = '' } = process.env;

const isDebug = DEBUG.includes('vk-io:auth');

export default class AuthError extends VKError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ message, code, pageHtml = null }) {
		super({ message, code });

		this.pageHtml = isDebug
			? pageHtml
			: null;
	}
}
