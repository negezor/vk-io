// @ts-ignore
import { VKError } from 'vk-io';
// @ts-ignore

// @ts-ignore
export interface IStreamingRuleErrorOptions {
// @ts-ignore
	message: string;
// @ts-ignore
	error_code: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class StreamingRuleError extends VKError {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({ message, error_code: code }: IStreamingRuleErrorOptions) {
// @ts-ignore
		super({ message, code });
// @ts-ignore
	}
// @ts-ignore
}
