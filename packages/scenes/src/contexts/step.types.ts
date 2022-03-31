// @ts-ignore
import { IStepContext, StepSceneHandler } from '../scenes/step.types';
// @ts-ignore

// @ts-ignore
export interface IStepContextOptions {
// @ts-ignore
	context: IStepContext;
// @ts-ignore
	steps: StepSceneHandler[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IStepContextGoOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Logging into a handler without executing it
// @ts-ignore
	 */
// @ts-ignore
	silent?: boolean;
// @ts-ignore
}
