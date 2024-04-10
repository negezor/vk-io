import type { IScene } from './scenes/scene';
import type { CacheRepository } from './cache-repository';

export type SceneRepository = CacheRepository<string, IScene>;

export interface ISceneManagerOptions {
    /**
     * Scenes on the interface IScene
     */
    scenes?: IScene[];

    sessionKey?: string;
}
