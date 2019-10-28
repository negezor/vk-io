import { ISessionStorage, MemoryStorage } from './storages';

import { IContext, ISessionContext, Middleware } from './types';

export interface ISessionManagerOptions {
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
	getStorageKey<T = {}>(context: IContext & T): string;
}

export type SessionForceUpdate = () => Promise<boolean>;

export default class SessionManager {
	protected storage: ISessionManagerOptions['storage'];

	protected contextKey: ISessionManagerOptions['contextKey'];

	protected getStorageKey: ISessionManagerOptions['getStorageKey'];

	public constructor(options: Partial<ISessionManagerOptions> = {}) {
		this.storage = options.storage || (
			new MemoryStorage()
		);

		this.contextKey = options.contextKey || 'session';

		this.getStorageKey = options.getStorageKey || ((context): string => (
			String(context.senderId)
		));
	}

	/**
	 * Returns the middleware for embedding
	 */
	public get middleware(): Middleware<IContext> {
		const { storage, contextKey, getStorageKey } = this;

		return async (context: IContext, next: Function): Promise<void> => {
			const storageKey = getStorageKey(context);

			let changed = false;
			const wrapSession = (targetRaw: object): ISessionContext => (
				new Proxy<
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				Record<string, any> & { $forceUpdate: SessionForceUpdate }
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				>({ ...targetRaw, $forceUpdate }, {
					set: (target, prop: string, value): boolean => {
						changed = true;

						target[prop] = value;

						return true;
					},
					deleteProperty(target, prop: string): boolean {
						changed = true;

						delete target[prop];

						return true;
					}
				})
			);

			const $forceUpdate = (): Promise<boolean> => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				if (Object.keys(session).length > 1) {
					changed = false;

					// eslint-disable-next-line @typescript-eslint/no-use-before-define
					return storage.set(storageKey, session);
				}

				return storage.delete(storageKey);
			};

			const initialSession = await storage.get(storageKey) || {};

			let session = wrapSession(initialSession);

			Object.defineProperty(context, contextKey, {
				get: (): ISessionContext => session,
				set: (newSession): void => {
					session = wrapSession(newSession);
					changed = true;
				}
			});

			await next();

			if (changed) {
				await $forceUpdate();
			} else {
				await storage.touch(storageKey);
			}
		};
	}
}
