// @ts-ignore
import { IScene } from './scenes/scene';
// @ts-ignore

// @ts-ignore
import { IContext, Middleware } from './types';
// @ts-ignore
import { SceneContext } from './contexts';
// @ts-ignore
import { CacheRepository } from './cache-repository';
// @ts-ignore
import { SceneRepository, ISceneManagerOptions } from './scene-manager.types';
// @ts-ignore

// @ts-ignore
export class SceneManager {
// @ts-ignore
	private repository: SceneRepository = new CacheRepository();
// @ts-ignore

// @ts-ignore
	private sessionKey: string;
// @ts-ignore

// @ts-ignore
	public constructor({ scenes, sessionKey = 'session' }: ISceneManagerOptions = {}) {
// @ts-ignore
		this.sessionKey = sessionKey;
// @ts-ignore

// @ts-ignore
		if (scenes) {
// @ts-ignore
			this.addScenes(scenes);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for has a scene
// @ts-ignore
	 */
// @ts-ignore
	public hasScene(slug: string): boolean {
// @ts-ignore
		return this.repository.has(slug);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds scenes to the repository
// @ts-ignore
	 */
// @ts-ignore
	public addScenes(scenes: IScene[]): this {
// @ts-ignore
		for (const scene of scenes) {
// @ts-ignore
			this.repository.set(scene.slug, scene);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the middleware for embedding
// @ts-ignore
	 */
// @ts-ignore
	public get middleware(): Middleware<IContext> {
// @ts-ignore
		return (context: IContext, next: Function): Promise<void> => {
// @ts-ignore
			context.scene = new SceneContext({
// @ts-ignore
				context,
// @ts-ignore
				sessionKey: this.sessionKey,
// @ts-ignore
				repository: this.repository
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			return next();
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the middleware for intercept
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line class-methods-use-this
// @ts-ignore
	public get middlewareIntercept(): Middleware<IContext> {
// @ts-ignore
		return (context: IContext, next: Function): Promise<void> => {
// @ts-ignore
			if (!context.scene.current) {
// @ts-ignore
				return next();
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			return context.scene.reenter();
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
