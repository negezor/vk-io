import type { SceneRepository } from '../scene-manager.types';
import type { IContext } from '../types';

export interface ISceneContextOptions {
    context: IContext;

    sessionKey: string;

    repository: SceneRepository;
}

export interface ISceneContextEnterOptions<S extends Record<string, unknown>> {
    /**
     * Logging into a handler without executing it
     */
    silent?: boolean;

    /**
     * The standard state for the scene
     */
    state?: S;
}

export interface ISceneContextLeaveOptions {
    /**
     * Logging into a handler without executing it
     */
    silent?: boolean;

    /**
     * Canceled scene
     */
    canceled?: boolean;
}

export enum LastAction {
    NONE = 'none',
    ENTER = 'enter',
    LEAVE = 'leave',
}
