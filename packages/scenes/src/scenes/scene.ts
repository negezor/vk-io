import { IContext } from '../types';

export default interface IScene {
	/**
	 * The unique name of the scene
	 */
	slug: string;

	/**
	 * Enter handler for the scene
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	enterHandler(context: IContext): any;

	/**
	 * Leave handler for the scene
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	leaveHandler(context: IContext): any;
}
