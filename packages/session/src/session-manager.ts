import { MemoryStorage } from './storages';

import type {
    IContext,
    ISessionContext,
    ISessionManagerOptions,

    Middleware,
} from './types';

export class SessionManager<T = object> {
    protected storage: ISessionManagerOptions['storage'];

    protected contextKey: ISessionManagerOptions['contextKey'];

    protected getStorageKey: ISessionManagerOptions['getStorageKey'];

    public constructor(options: Partial<ISessionManagerOptions<T>> = {}) {
        this.storage = options.storage || (
            new MemoryStorage()
        );

        this.contextKey = options.contextKey || 'session';

        this.getStorageKey = options.getStorageKey || ((context): string => (
            String(context.senderId || context.userId)
        ));
    }

    /**
     * Returns the middleware for embedding
     */
    public get middleware(): Middleware<IContext> {
        const { storage, contextKey, getStorageKey } = this;

        return async (context: IContext, next: () => Promise<void>): Promise<void> => {
            const storageKey = getStorageKey(context);

            let changed = false;
            const wrapSession = (targetRaw: object): ISessionContext => (
                new Proxy<ISessionContext>({ ...targetRaw, $forceUpdate }, {
                    set: (target, prop: string, value): boolean => {
                        changed = true;

                        target[prop] = value;

                        return true;
                    },
                    deleteProperty: (target, prop: string): boolean => {
                        changed = true;

                        delete target[prop];

                        return true;
                    },
                })
            );

            const $forceUpdate = (): Promise<boolean> => {
                if (Object.keys(session).length > 1) {
                    changed = false;
                    return storage.set(storageKey, session);
                }

                return storage.delete(storageKey);
            };

            const initialSession = await storage.get(storageKey) || {};

            let session = wrapSession(initialSession);

            Object.defineProperty(context, contextKey, {
                get: (): ISessionContext => session,
                set: (newSession): void => {
                    session = wrapSession(newSession as object);
                    changed = true;
                },
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
