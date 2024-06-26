import type { Context } from 'vk-io';

import type { ISessionStorage } from './storages';

export type Middleware<T> = (context: T, next: () => Promise<void>) => unknown;

export type SessionForceUpdate = () => Promise<boolean>;

export interface IContext extends Context {
    [key: string]: any;
}

export interface ISessionContext {
    $forceUpdate(): Promise<boolean>;
    [key: string]: any;
}

export interface ISessionManagerOptions<T = object> {
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
