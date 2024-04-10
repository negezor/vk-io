import { IContext } from '../types';
import { SceneContext, StepSceneContext } from '../contexts';

export interface IStepContext<S extends Record<string, unknown>> extends IContext {
    scene: SceneContext<S> & {
        /**
         * Stepping scene control context
         */
        step: StepSceneContext<S>;
    };
}

export type StepSceneHandler<
    T = object,
    S extends Record<string, unknown> = Record<string, any>
> = (context: IStepContext<S> & T) => unknown;

export interface IStepSceneOptions<T, S extends Record<string, unknown>> {
    steps: StepSceneHandler<T, S>[];
    enterHandler?: StepSceneHandler<T, S>;
    leaveHandler?: StepSceneHandler<T, S>;
}
