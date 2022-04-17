import { Context } from 'vk-io';

import { SceneContext } from './contexts';

export type Middleware<T> = (context: T, next: Function) => unknown;

export interface ISessionContext {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface IContext<
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	S extends Record<string, unknown> = Record<string, any>
> extends Context {
	/**
	 * Scene control context
	 */
	scene: SceneContext<S>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
