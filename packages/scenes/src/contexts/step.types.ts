import { IStepContext, StepSceneHandler } from '../scenes/step.types';

export interface IStepContextOptions {
	context: IStepContext;
	steps: StepSceneHandler[];
}

export interface IStepContextGoOptions {
	/**
	 * Logging into a handler without executing it
	 */
	silent?: boolean;
}
