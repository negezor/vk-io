// @ts-ignore
import { Context } from 'vk-io';
// @ts-ignore

// @ts-ignore
import { ISessionStorage } from './storages';
// @ts-ignore

// @ts-ignore
export type Middleware<T> = (context: T, next: Function) => unknown;
// @ts-ignore

// @ts-ignore
export type SessionForceUpdate = () => Promise<boolean>;
// @ts-ignore

// @ts-ignore
export interface IContext extends Context {
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	[key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ISessionContext {
// @ts-ignore
	$forceUpdate(): Promise<boolean>;
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	[key: string]: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ISessionManagerOptions<T = {}> {
// @ts-ignore
	/**
// @ts-ignore
	 * Storage based on ISessionStorage interface
// @ts-ignore
	 */
// @ts-ignore
	storage: ISessionStorage;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Key for session in context
// @ts-ignore
	 */
// @ts-ignore
	contextKey: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the key for session storage
// @ts-ignore
	 */
// @ts-ignore
	getStorageKey(context: IContext & T): string;
// @ts-ignore
}
