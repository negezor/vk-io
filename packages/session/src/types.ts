import { Context } from 'vk-io';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Middleware<T> = (context: T, next: Function) => any;

export interface IContext extends Context {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}

export interface ISessionContext {
	$forceUpdate(): Promise<boolean>;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: any;
}
