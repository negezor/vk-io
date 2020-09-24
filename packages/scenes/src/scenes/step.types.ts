import { IContext } from '../types';
import { SceneContext, StepSceneContext } from '../contexts';

export interface IStepContext extends IContext {
	scene: SceneContext & {
		/**
		 * Stepping scene control context
		 */
		step: StepSceneContext;
	};
}

export type StepSceneHandler<T = {}> = (context: IStepContext & T) => unknown;

export interface IStepSceneOptions<T> {
	steps: StepSceneHandler<T>[];
	enterHandler?: StepSceneHandler<T>;
	leaveHandler?: StepSceneHandler<T>;
}
