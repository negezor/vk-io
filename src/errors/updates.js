import VKError from './vk';

export default class UpdatesError extends VKError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor(payload = {}) {
		super(payload);
	}
}
