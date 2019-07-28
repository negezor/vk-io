import { IContext } from '../types';
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	state?: Record<string, any>;
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

// eslint-disable-next-line import/prefer-default-export
export enum LastAction {
	NONE = 'none',
	ENTER = 'enter',
	LEAVE = 'leave'
}
