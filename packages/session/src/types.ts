import { Context } from 'vk-io';

import { ISessionStorage } from './storages';

export type Middleware<T> = (context: T, next: Function) => unknown;

export type SessionForceUpdate = () => Promise<boolean>;

export interface IContext extends Context {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface ISessionContext {
	$forceUpdate(): Promise<boolean>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface ISessionManagerOptions<T = {}> {
	/**
	 * Storage based on ISessionStorage interface
	 */
	storage: ISessionStorage;

	/**
	 * Key for session in context
	 */
	contextKey: string;

	/**
	 * Returns the key for session storage
	 */
	getStorageKey(context: IContext & T): string;
}
