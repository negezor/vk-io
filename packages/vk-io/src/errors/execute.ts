// @ts-ignore
import { APIError } from './api';
// @ts-ignore

// @ts-ignore
export interface IExecuteErrorOptions {
// @ts-ignore
	error_code: number;
// @ts-ignore
	error_msg: string;
// @ts-ignore
	method: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class ExecuteError extends APIError {
// @ts-ignore
	/**
// @ts-ignore
	 * The method in which the error occurred
// @ts-ignore
	 */
// @ts-ignore
	public method: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: IExecuteErrorOptions) {
// @ts-ignore
		super({
// @ts-ignore
			error_code: options.error_code,
// @ts-ignore
			error_msg: options.error_msg,
// @ts-ignore
			request_params: []
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.method = options.method;
// @ts-ignore
	}
// @ts-ignore
}
