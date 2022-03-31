// @ts-ignore
import { MemoryStorage } from './storages';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	IContext,
// @ts-ignore
	ISessionContext,
// @ts-ignore
	ISessionManagerOptions,
// @ts-ignore

// @ts-ignore
	Middleware
// @ts-ignore
} from './types';
// @ts-ignore

// @ts-ignore
export class SessionManager<T = {}> {
// @ts-ignore
	protected storage: ISessionManagerOptions['storage'];
// @ts-ignore

// @ts-ignore
	protected contextKey: ISessionManagerOptions['contextKey'];
// @ts-ignore

// @ts-ignore
	protected getStorageKey: ISessionManagerOptions['getStorageKey'];
// @ts-ignore

// @ts-ignore
	public constructor(options: Partial<ISessionManagerOptions<T>> = {}) {
// @ts-ignore
		this.storage = options.storage || (
// @ts-ignore
			new MemoryStorage()
// @ts-ignore
		);
// @ts-ignore

// @ts-ignore
		this.contextKey = options.contextKey || 'session';
// @ts-ignore

// @ts-ignore
		this.getStorageKey = options.getStorageKey || ((context): string => (
// @ts-ignore
			String(context.senderId)
// @ts-ignore
		));
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the middleware for embedding
// @ts-ignore
	 */
// @ts-ignore
	public get middleware(): Middleware<IContext> {
// @ts-ignore
		const { storage, contextKey, getStorageKey } = this;
// @ts-ignore

// @ts-ignore
		return async (context: IContext, next: Function): Promise<void> => {
// @ts-ignore
			const storageKey = getStorageKey(context);
// @ts-ignore

// @ts-ignore
			let changed = false;
// @ts-ignore
			const wrapSession = (targetRaw: object): ISessionContext => (
// @ts-ignore
				// eslint-disable-next-line no-use-before-define
// @ts-ignore
				new Proxy<ISessionContext>({ ...targetRaw, $forceUpdate }, {
// @ts-ignore
					set: (target, prop: string, value): boolean => {
// @ts-ignore
						changed = true;
// @ts-ignore

// @ts-ignore
						target[prop] = value;
// @ts-ignore

// @ts-ignore
						return true;
// @ts-ignore
					},
// @ts-ignore
					deleteProperty: (target, prop: string): boolean => {
// @ts-ignore
						changed = true;
// @ts-ignore

// @ts-ignore
						delete target[prop];
// @ts-ignore

// @ts-ignore
						return true;
// @ts-ignore
					}
// @ts-ignore
				})
// @ts-ignore
			);
// @ts-ignore

// @ts-ignore
			const $forceUpdate = (): Promise<boolean> => {
// @ts-ignore
				// eslint-disable-next-line no-use-before-define
// @ts-ignore
				if (Object.keys(session).length > 1) {
// @ts-ignore
					changed = false;
// @ts-ignore

// @ts-ignore
					// eslint-disable-next-line no-use-before-define
// @ts-ignore
					return storage.set(storageKey, session);
// @ts-ignore
				}
// @ts-ignore

// @ts-ignore
				return storage.delete(storageKey);
// @ts-ignore
			};
// @ts-ignore

// @ts-ignore
			const initialSession = await storage.get(storageKey) || {};
// @ts-ignore

// @ts-ignore
			let session = wrapSession(initialSession);
// @ts-ignore

// @ts-ignore
			Object.defineProperty(context, contextKey, {
// @ts-ignore
				get: (): ISessionContext => session,
// @ts-ignore
				set: (newSession): void => {
// @ts-ignore
					session = wrapSession(newSession);
// @ts-ignore
					changed = true;
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			await next();
// @ts-ignore

// @ts-ignore
			if (changed) {
// @ts-ignore
				await $forceUpdate();
// @ts-ignore
			} else {
// @ts-ignore
				await storage.touch(storageKey);
// @ts-ignore
			}
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
