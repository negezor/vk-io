import { Composer as MiddlewareComposer } from 'middleware-io';

import { Context } from '../contexts';

export class Composer<T extends object = Context> extends MiddlewareComposer<T> {
	/**
	 * Create new `Composer` instance
	 */
	public static builder<T extends object = Context>(): Composer<T> {
		return super.builder<T>();
	}
}
