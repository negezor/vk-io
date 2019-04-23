import { IContext, Partial } from '../types';
import { SceneRepository } from '../scene-manager.types';

export interface ISceneContextOptions {
	context: IContext;

	repository: SceneRepository;
}

export interface ISceneContextEnterOptions {
	/**
	 * Logging into a handler without executing it
	 */
	silent?: boolean;

	/**
	 * The standard state for the scene
	 */
	state?: Partial;
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
