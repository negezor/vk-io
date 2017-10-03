import VKError from './vk';

export default class ExecuteError extends VKError {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 */
	constructor(payload) {
		const code = Number(payload.error_code);
		const message = `Code №${code} - ${payload.error_msg}`;

		super({ code, message });

		this.method = payload.method;
	}
}
