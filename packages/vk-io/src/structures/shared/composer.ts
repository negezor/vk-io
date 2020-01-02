import { Composer as MiddlewareComposer } from 'middleware-io';

export class Composer extends MiddlewareComposer {
	/**
	 * Create new `Composer` instance
	 */
	public static builder(): Composer {
		return new Composer();
	}
}
