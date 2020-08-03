import { IScene } from './scenes/scene';

import { IContext, Middleware } from './types';
import { SceneContext } from './contexts';
import { CacheRepository } from './cache-repository';
import { SceneRepository, ISceneManagerOptions } from './scene-manager.types';

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
		return (context: IContext, next: Function): Promise<void> => {
			context.scene = new SceneContext({
				context,
				sessionKey: this.sessionKey,
				repository: this.repository
			});

			return next();
		};
	}

	/**
	 * Returns the middleware for intercept
	 */
	// eslint-disable-next-line class-methods-use-this
	public get middlewareIntercept(): Middleware<IContext> {
		return (context: IContext, next: Function): Promise<void> => {
			if (!context.scene.current) {
				return next();
			}

			return context.scene.reenter();
		};
	}
}
