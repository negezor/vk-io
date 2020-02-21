import { IContext } from '../types';

export interface IScene {
	/**
	 * The unique name of the scene
	 */
	slug: string;

	/**
	 * Enter handler for the scene
	 */
	enterHandler(context: IContext): unknown;

	/**
	 * Leave handler for the scene
	 */
	leaveHandler(context: IContext): unknown;
}
