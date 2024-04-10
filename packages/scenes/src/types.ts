import { Context } from 'vk-io';

import { SceneContext } from './contexts';

export type Middleware<T> = (context: T, next: () => Promise<void>) => unknown;

export type ISessionContext = Record<string, any> & {
    current: string;
};

export interface IContext<
    S extends Record<string, unknown> = Record<string, any>
> extends Context {
    /**
     * Scene control context
     */
    scene: SceneContext<S>;
    [key: string]: any;
}
