import { VKError } from 'vk-io';

export interface IStreamingRuleErrorOptions {
	message: string;
	error_code: number;
}

export class StreamingRuleError extends VKError {
	/**
	 * Constructor
	 */
	public constructor({ message, error_code: code }: IStreamingRuleErrorOptions) {
		super({ message, code });
	}
}
