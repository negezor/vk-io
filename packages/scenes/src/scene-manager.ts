import IScene from './scenes/scene';

import { IContext, Middleware } from './types';
import { SceneContext } from './contexts';
import CacheRepository from './cache-repository';
import { SceneRepository, ISceneManagerOptions } from './scene-manager.types';

export default class SceneManager {
	private repository: SceneRepository = new CacheRepository();

	public constructor(rawOptions: ISceneManagerOptions | IScene[] = {}) {
		const options = Array.isArray(rawOptions)
			? {
				scenes: rawOptions
			}
			: rawOptions;

		if (options.scenes) {
			for (const scene of options.scenes) {
				this.addScene(scene);
			}
		}
	}

	/**
	 * Adds a scene to the shared list
	 */
	public addScene(scene: IScene): this {
		this.repository.set(scene.slug, scene);

		return this;
	}

	/**
	 * Returns the middleware for embedding
	 */
	public get middleware(): Middleware<IContext> {
		return (context: IContext, next: Function): Promise<void> => {
			context.scene = new SceneContext({
				context,
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
