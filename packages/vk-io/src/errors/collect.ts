import VKError from './error';
import ExecuteError from './execute';

export interface ICollectErrorOptions {
	message: string;
	code: string;

	errors: ExecuteError[];
}

export default class CollectError extends VKError {
	/**
	 * Errors collect
	 */
	public errors: ExecuteError[];

	/**
	 * Constructor
	 */
	public constructor({ message, code, errors }: ICollectErrorOptions) {
		super({ message, code });

		this.errors = errors;
	}
}
