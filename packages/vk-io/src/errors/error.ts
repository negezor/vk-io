// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CopiedError = Record<string, any>;

export interface IVKErrorOptions {
	code: string | number;
	message: string;
}

/**
 * General error class
 */
export default class VKError extends Error {
	/**
	 * Error code
	 */
	code: string | number;

	/**
	 * Constructor
	 */
	constructor({ code, message }: IVKErrorOptions) {
		super(message);

		this.code = code;
		this.message = message;
		this.name = this.constructor.name;

		Error.captureStackTrace(this, this.constructor);
	}

	/**
	 * Returns custom tag
	 */
	get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Returns property for json
	 */
	toJSON(): CopiedError {
		const json: CopiedError = {};

		for (const key of Object.getOwnPropertyNames(this)) {
			json[key] = this[key];
		}

		return json;
	}
}
