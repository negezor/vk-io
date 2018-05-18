import VKError from './error';

export default class CollectError extends VKError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ message, code, errors }) {
		super({ message, code });

		this.errors = errors;
	}
}
