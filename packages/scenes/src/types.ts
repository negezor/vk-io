import { SceneContext } from './contexts';

export type Partial = {
	[key: string]: any;
};

export interface ISessionContext extends Partial {

}

export interface IContext extends Partial {
	/**
	 * Scene control context
	 */
	scene: SceneContext;
}
