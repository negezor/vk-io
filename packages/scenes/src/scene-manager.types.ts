// @ts-ignore
import { IScene } from './scenes/scene';
// @ts-ignore
import { CacheRepository } from './cache-repository';
// @ts-ignore

// @ts-ignore
export type SceneRepository = CacheRepository<string, IScene>;
// @ts-ignore

// @ts-ignore
export interface ISceneManagerOptions {
// @ts-ignore
	/**
// @ts-ignore
	 * Scenes on the interface IScene
// @ts-ignore
	 */
// @ts-ignore
	scenes?: IScene[];
// @ts-ignore

// @ts-ignore
	sessionKey?: string;
// @ts-ignore
}
