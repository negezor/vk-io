// @ts-ignore
import { IContext } from '../types';
// @ts-ignore
import { SceneRepository } from '../scene-manager.types';
// @ts-ignore

// @ts-ignore
export interface ISceneContextOptions {
// @ts-ignore
	context: IContext;
// @ts-ignore

// @ts-ignore
	sessionKey: string;
// @ts-ignore

// @ts-ignore
	repository: SceneRepository;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ISceneContextEnterOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Logging into a handler without executing it
// @ts-ignore
	 */
// @ts-ignore
	silent?: boolean;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The standard state for the scene
// @ts-ignore
	 */
// @ts-ignore
	state?: Record<string, unknown>;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ISceneContextLeaveOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Logging into a handler without executing it
// @ts-ignore
	 */
// @ts-ignore
	silent?: boolean;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Canceled scene
// @ts-ignore
	 */
// @ts-ignore
	canceled?: boolean;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export enum LastAction {
// @ts-ignore
	NONE = 'none',
// @ts-ignore
	ENTER = 'enter',
// @ts-ignore
	LEAVE = 'leave'
// @ts-ignore
}
