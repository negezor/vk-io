import VKError from './error';

export interface IStreamingRuleErrorOptions {
	message: string;
	error_code: number;
}

export default class StreamingRuleError extends VKError {
	/**
	 * Constructor
	 */
	public constructor({ message, error_code: code }: IStreamingRuleErrorOptions) {
		super({ message, code });
	}
}
