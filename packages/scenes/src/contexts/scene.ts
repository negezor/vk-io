// @ts-ignore
import { ISessionContext } from '../types';
// @ts-ignore
import {
// @ts-ignore
	ISceneContextOptions,
// @ts-ignore
	ISceneContextEnterOptions,
// @ts-ignore
	ISceneContextLeaveOptions,
// @ts-ignore

// @ts-ignore
	LastAction
// @ts-ignore
} from './scene.types';
// @ts-ignore
import { IScene } from '../scenes';
// @ts-ignore

// @ts-ignore
export class SceneContext {
// @ts-ignore
	/**
// @ts-ignore
	 * Lazy session for submodules
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.session.moduleFlag = true;
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public session!: ISessionContext;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Base namespace for user input
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.username = myInputText;
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public state!: Record<string, any>;
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Is the scene canceled, used in leaveHandler()
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.leave({
// @ts-ignore
	 *   canceled: true
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public canceled = false;
// @ts-ignore

// @ts-ignore
	public lastAction: LastAction = LastAction.NONE;
// @ts-ignore

// @ts-ignore
	private context: ISceneContextOptions['context'];
// @ts-ignore

// @ts-ignore
	private repository: ISceneContextOptions['repository'];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Controlled behavior leave
// @ts-ignore
	 */
// @ts-ignore
	public leaving = false;
// @ts-ignore

// @ts-ignore
	private sessionKey: string;
// @ts-ignore

// @ts-ignore
	public constructor(options: ISceneContextOptions) {
// @ts-ignore
		this.context = options.context;
// @ts-ignore

// @ts-ignore
		this.repository = options.repository;
// @ts-ignore

// @ts-ignore
		this.sessionKey = options.sessionKey;
// @ts-ignore

// @ts-ignore
		this.updateSession();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns current scene
// @ts-ignore
	 */
// @ts-ignore
	public get current(): IScene | undefined {
// @ts-ignore
		return this.repository.get(this.session.current);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Enter to scene
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.enter('signup');
// @ts-ignore
	 * ctx.scene.enter('signup', {
// @ts-ignore
	 *   silent: true,
// @ts-ignore
	 *   state: {
// @ts-ignore
	 *     username: 'Super_Developer'
// @ts-ignore
	 *   }
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public async enter(slug: string, options: ISceneContextEnterOptions = {}): Promise<void> {
// @ts-ignore
		const scene = this.repository.strictGet(slug);
// @ts-ignore

// @ts-ignore
		const isCurrent = this.current?.slug === scene.slug;
// @ts-ignore

// @ts-ignore
		if (!isCurrent) {
// @ts-ignore
			if (!this.leaving) {
// @ts-ignore
				await this.leave({
// @ts-ignore
					silent: options.silent
// @ts-ignore
				});
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			if (this.leaving) {
// @ts-ignore
				this.leaving = false;
// @ts-ignore

// @ts-ignore
				this.reset();
// @ts-ignore
			}
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.lastAction = LastAction.ENTER;
// @ts-ignore

// @ts-ignore
		this.session.current = scene.slug;
// @ts-ignore
		Object.assign(this.state, options.state || {});
// @ts-ignore

// @ts-ignore
		if (options.silent) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		await scene.enterHandler(this.context);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Reenter to current scene
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.reenter();
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public async reenter(): Promise<void> {
// @ts-ignore
		const { current } = this;
// @ts-ignore

// @ts-ignore
		if (!current) {
// @ts-ignore
			throw new Error('There is no active scene to enter');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		await this.enter(current.slug);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Leave from current scene
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.leave();
// @ts-ignore
	 * ctx.scene.leave({
// @ts-ignore
	 *   silent: true,
// @ts-ignore
	 *   canceled: true
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public async leave(options: ISceneContextLeaveOptions = {}): Promise<void> {
// @ts-ignore
		const { current } = this;
// @ts-ignore

// @ts-ignore
		if (!current) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.leaving = true;
// @ts-ignore
		this.lastAction = LastAction.LEAVE;
// @ts-ignore

// @ts-ignore
		if (!options.silent) {
// @ts-ignore
			this.canceled = options.canceled ?? false;
// @ts-ignore

// @ts-ignore
			await current.leaveHandler(this.context);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.leaving) {
// @ts-ignore
			this.reset();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.leaving = false;
// @ts-ignore
		this.canceled = false;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Reset state/session
// @ts-ignore
	 */
// @ts-ignore
	public reset(): void {
// @ts-ignore
		// eslint-disable-next-line no-underscore-dangle
// @ts-ignore
		delete this.context.session.__scene;
// @ts-ignore

// @ts-ignore
		this.updateSession();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Updates session and state is lazy
// @ts-ignore
	 */
// @ts-ignore
	private updateSession(): void {
// @ts-ignore
		// eslint-disable-next-line no-underscore-dangle
// @ts-ignore
		this.session = new Proxy(this.context[this.sessionKey].__scene || {}, {
// @ts-ignore
			set: (target, prop, value): boolean => {
// @ts-ignore
				target[prop] = value;
// @ts-ignore

// @ts-ignore
				// eslint-disable-next-line no-underscore-dangle
// @ts-ignore
				this.context[this.sessionKey].__scene = target;
// @ts-ignore

// @ts-ignore
				return true;
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.state = new Proxy(this.session.state || {}, {
// @ts-ignore
			set: (target, prop, value): boolean => {
// @ts-ignore
				target[prop] = value;
// @ts-ignore

// @ts-ignore
				this.session.state = target;
// @ts-ignore

// @ts-ignore
				return true;
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore
}
