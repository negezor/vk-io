import { APIError } from './api';

export interface IExecuteErrorOptions {
	error_code: number;
	error_msg: string;
	method: string;
}

export class ExecuteError extends APIError {
	/**
	 * The method in which the error occurred
	 */
	public method: string;

	/**
	 * Constructor
	 */
	public constructor(options: IExecuteErrorOptions) {
		super({
			error_code: options.error_code,
			error_msg: options.error_msg,
			request_params: []
		});

		this.method = options.method;
	}
}
