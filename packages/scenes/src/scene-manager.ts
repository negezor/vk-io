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
	 * Checks for has a scene
	 */
	public hasScene(slug: string): boolean {
		return this.repository.has(slug);
	}

	/**
	 * Adds a scene to the shared list
	 *
	 * @deprecated use `sceneManager.addScenes([scene])`
	 */
	public addScene(scene: IScene): this {
		// eslint-disable-next-line no-console
		console.error('[@vk-io/scenes] sceneManager.addScene(scene) deprecated, use sceneManager.addScenes([scene])');

		return this.addScenes([scene]);
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
