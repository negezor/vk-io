import IScene from './scenes/scene';

import { IContext } from './types';
import { SceneContext } from './contexts';
import CacheRepository from './cache-repository';
import { SceneRepository, ISceneManagerOptions } from './scene-manager.types';

export default class SceneManager {
	private repository: SceneRepository = new CacheRepository();

	constructor(rawOptions: ISceneManagerOptions | IScene[] = {}) {
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
	addScene(scene: IScene) {
		this.repository.set(scene.slug, scene);

		return this;
	}

	/**
	 * Returns the middleware for embedding
	 */
	get middleware() {
		return (context: IContext, next: Function) => {
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
	get middlewareIntercept() {
		return (context: IContext, next: Function) => {
			if (!context.scene.current) {
				return next();
			}

			return context.scene.reenter();
		};
	}
}
