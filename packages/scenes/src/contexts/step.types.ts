import { IStepContext, StepSceneHandler } from '../scenes/step.types';

export interface IStepContextOptions<S extends Record<string, unknown> = Record<string, any>> {
    context: IStepContext<S>;
    steps: StepSceneHandler<object, S>[];
}

export interface IStepContextGoOptions {
    /**
     * Logging into a handler without executing it
     */
    silent?: boolean;
}
