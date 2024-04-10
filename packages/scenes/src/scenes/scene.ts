import type { IContext } from '../types';

export interface IScene<S extends Record<string, unknown> = Record<string, any>> {
    /**
     * The unique name of the scene
     */
    slug: string;

    /**
     * Enter handler for the scene
     */
    enterHandler(context: IContext<S>): unknown;

    /**
     * Leave handler for the scene
     */
    leaveHandler(context: IContext<S>): unknown;
}
