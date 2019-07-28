import VKError from './error';

export interface IExecuteErrorOptions {
	error_code: number;
	error_msg: string;
	method: string;
}

export default class ExecuteError extends VKError {
	/**
	 * The method in which the error occurred
	 */
	public method: string;

	/**
	 * Constructor
	 */
	public constructor(options: IExecuteErrorOptions) {
		const code = Number(options.error_code);
		const message = `Code №${code} - ${options.error_msg}`;

		super({ code, message });

		this.method = options.method;
	}
}
