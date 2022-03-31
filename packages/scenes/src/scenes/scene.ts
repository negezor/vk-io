// @ts-ignore
import { IContext } from '../types';
// @ts-ignore

// @ts-ignore
export interface IScene {
// @ts-ignore
	/**
// @ts-ignore
	 * The unique name of the scene
// @ts-ignore
	 */
// @ts-ignore
	slug: string;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Enter handler for the scene
// @ts-ignore
	 */
// @ts-ignore
	enterHandler(context: IContext): unknown;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Leave handler for the scene
// @ts-ignore
	 */
// @ts-ignore
	leaveHandler(context: IContext): unknown;
// @ts-ignore
}
