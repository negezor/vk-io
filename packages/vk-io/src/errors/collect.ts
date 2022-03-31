// @ts-ignore
import { VKError } from './error';
// @ts-ignore
import { ExecuteError } from './execute';
// @ts-ignore

// @ts-ignore
export interface ICollectErrorOptions {
// @ts-ignore
	message: string;
// @ts-ignore
	code: string;
// @ts-ignore

// @ts-ignore
	errors: ExecuteError[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class CollectError extends VKError {
// @ts-ignore
	/**
// @ts-ignore
	 * Errors collect
// @ts-ignore
	 */
// @ts-ignore
	public errors: ExecuteError[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({ message, code, errors }: ICollectErrorOptions) {
// @ts-ignore
		super({ message, code });
// @ts-ignore

// @ts-ignore
		this.errors = errors;
// @ts-ignore
	}
// @ts-ignore
}
