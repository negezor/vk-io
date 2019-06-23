import { Context } from 'vk-io';

import { SceneContext } from './contexts';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Middleware<T> = (context: T, next: Function) => any;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
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
