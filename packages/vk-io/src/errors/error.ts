// @ts-ignore
export interface IVKErrorOptions {
// @ts-ignore
	code: string | number;
// @ts-ignore
	message: string;
// @ts-ignore
	cause?: Error;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * General error class
// @ts-ignore
 */
// @ts-ignore
export class VKError extends Error {
// @ts-ignore
	/**
// @ts-ignore
	 * Error code
// @ts-ignore
	 */
// @ts-ignore
	public code: string | number;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Error stack
// @ts-ignore
	 */
// @ts-ignore
	public stack!: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Error cause
// @ts-ignore
	 */
// @ts-ignore
	public cause?: Error;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor({ code, message, cause }: IVKErrorOptions) {
// @ts-ignore
		super(message, {
// @ts-ignore
			cause
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.code = code;
// @ts-ignore
		this.name = this.constructor.name;
// @ts-ignore

// @ts-ignore
		Error.captureStackTrace(this, this.constructor);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns custom tag
// @ts-ignore
	 */
// @ts-ignore
	public get [Symbol.toStringTag](): string {
// @ts-ignore
		return this.constructor.name;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns property for json
// @ts-ignore
	 */
// @ts-ignore
	public toJSON(): Pick<this, keyof this> {
// @ts-ignore
		const json = {} as Pick<this, keyof this>;
// @ts-ignore

// @ts-ignore
		for (const key of Object.getOwnPropertyNames(this)) {
// @ts-ignore
			json[key as keyof this] = this[key as keyof this];
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return json;
// @ts-ignore
	}
// @ts-ignore
}
