import VKError from './error';

export default class StreamingRuleError extends VKError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor({ message, error_code: code }) {
		super({ message, code });
	}
}
