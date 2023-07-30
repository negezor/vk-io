import { IStepContext, StepSceneHandler } from '../scenes/step.types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IStepContextOptions<S extends Record<string, unknown> = Record<string, any>> {
    context: IStepContext<S>;
    steps: StepSceneHandler<{}, S>[];
}

export interface IStepContextGoOptions {
    /**
     * Logging into a handler without executing it
     */
    silent?: boolean;
}
