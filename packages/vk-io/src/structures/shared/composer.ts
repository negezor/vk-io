import { Composer as MiddlewareComposer } from 'middleware-io';

import { Context } from '../contexts';

export class Composer<T = Context> extends MiddlewareComposer<T> {
	/**
	 * Create new `Composer` instance
	 */
	public static builder<T = Context>(): Composer<T> {
		return new Composer<T>();
	}
}
