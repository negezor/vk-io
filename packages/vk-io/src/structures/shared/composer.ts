import { Composer as MiddlewareComposer } from 'middleware-io';

export default class Composer extends MiddlewareComposer {
	/**
	 * Create new `Composer` instance
	 */
	public static builder(): Composer {
		return new Composer();
	}
}
