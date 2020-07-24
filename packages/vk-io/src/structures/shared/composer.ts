import { Composer as MiddlewareComposer } from 'middleware-io';

import { Context } from '../contexts';

// @ts-expect-error
export class Composer<T extends Context> extends MiddlewareComposer<T> {
	/**
	 * Create new `Composer` instance
	 */
	public static builder<T extends Context>(): Composer<T> {
		return new Composer<T>();
	}
}
