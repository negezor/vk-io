import { Context } from 'vk-io';

import { SceneContext } from './contexts';

export type Middleware<T> = (context: T, next: Function) => unknown;

export interface ISessionContext {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface IContext extends Context {
	/**
	 * Scene control context
	 */
	scene: SceneContext;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
