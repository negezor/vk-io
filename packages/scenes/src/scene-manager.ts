import type { IScene } from './scenes/scene';

import { CacheRepository } from './cache-repository';
import { SceneContext } from './contexts';
import type { ISceneManagerOptions, SceneRepository } from './scene-manager.types';
import type { IContext, Middleware } from './types';

export class SceneManager {
    private repository: SceneRepository = new CacheRepository();

    private sessionKey: string;

    public constructor({ scenes, sessionKey = 'session' }: ISceneManagerOptions = {}) {
        this.sessionKey = sessionKey;

        if (scenes) {
            this.addScenes(scenes);
        }
    }

    /**
     * Checks for has a scene
     */
    public hasScene(slug: string): boolean {
        return this.repository.has(slug);
    }

    /**
     * Adds scenes to the repository
     */
    public addScenes(scenes: IScene[]): this {
        for (const scene of scenes) {
            this.repository.set(scene.slug, scene);
        }

        return this;
    }

    /**
     * Returns the middleware for embedding
     */
    public get middleware(): Middleware<IContext> {
        return (context: IContext, next: () => Promise<void>): Promise<void> => {
            context.scene = new SceneContext({
                context,
                sessionKey: this.sessionKey,
                repository: this.repository,
            });

            return next();
        };
    }

    /**
     * Returns the middleware for intercept
     */
    public get middlewareIntercept(): Middleware<IContext> {
        return (context: IContext, next: () => Promise<void>): Promise<void> => {
            if (!context.scene.current) {
                return next();
            }

            return context.scene.reenter();
        };
    }
}
