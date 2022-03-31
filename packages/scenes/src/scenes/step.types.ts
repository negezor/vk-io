// @ts-ignore
import { IContext } from '../types';
// @ts-ignore
import { SceneContext, StepSceneContext } from '../contexts';
// @ts-ignore

// @ts-ignore
export interface IStepContext extends IContext {
// @ts-ignore
	scene: SceneContext & {
// @ts-ignore
		/**
// @ts-ignore
		 * Stepping scene control context
// @ts-ignore
		 */
// @ts-ignore
		step: StepSceneContext;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type StepSceneHandler<T = {}> = (context: IStepContext & T) => unknown;
// @ts-ignore

// @ts-ignore
export interface IStepSceneOptions<T> {
// @ts-ignore
	steps: StepSceneHandler<T>[];
// @ts-ignore
	enterHandler?: StepSceneHandler<T>;
// @ts-ignore
	leaveHandler?: StepSceneHandler<T>;
// @ts-ignore
}
