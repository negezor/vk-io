import VKError from './vk';

export default class AuthError extends VKError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor(payload = {}) {
		super(payload);
	}
}
