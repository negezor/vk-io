// @ts-ignore
import { Context } from 'vk-io';
// @ts-ignore

// @ts-ignore
import { SceneContext } from './contexts';
// @ts-ignore

// @ts-ignore
export type Middleware<T> = (context: T, next: Function) => unknown;
// @ts-ignore

// @ts-ignore
export interface ISessionContext {
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	[key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IContext extends Context {
// @ts-ignore
	/**
// @ts-ignore
	 * Scene control context
// @ts-ignore
	 */
// @ts-ignore
	scene: SceneContext;
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	[key: string]: any;
// @ts-ignore
}
