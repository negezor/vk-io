import { IStepContext, StepSceneHandler } from '../scenes/step.types';

// eslint-disable-next-line import/prefer-default-export
export interface IStepContextOptions {
	context: IStepContext;
	steps: StepSceneHandler[];
}
