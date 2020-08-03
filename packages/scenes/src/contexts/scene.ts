import { ISessionContext } from '../types';
import {
	ISceneContextOptions,
	ISceneContextEnterOptions,
	ISceneContextLeaveOptions,

	LastAction
} from './scene.types';
import { IScene } from '../scenes';

export class SceneContext {
	/**
	 * Lazy session for submodules
	 * ```ts
	 * ctx.scene.session.moduleFlag = true;
	 * ```
	 */
	public session!: ISessionContext;

	/**
	 * Base namespace for user input
	 *
	 * ```ts
	 * ctx.scene.username = myInputText;
	 * ```
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public state!: Record<string, any>;

	/**
	 * Is the scene canceled, used in leaveHandler()
	 *
	 * ```ts
	 * ctx.scene.leave({
	 *   canceled: true
	 * });
	 * ```
	 */
	public canceled = false;

	public lastAction: LastAction = LastAction.NONE;

	private context: ISceneContextOptions['context'];

	private repository: ISceneContextOptions['repository'];

	/**
	 * Controlled behavior leave
	 */
	public leaving = false;

	private sessionKey: string;

	public constructor(options: ISceneContextOptions) {
		this.context = options.context;

		this.repository = options.repository;

		this.sessionKey = options.sessionKey;

		this.updateSession();
	}

	/**
	 * Returns current scene
	 */
	public get current(): IScene | undefined {
		return this.repository.get(this.session.current);
	}

	/**
	 * Enter to scene
	 *
	 * ```ts
	 * ctx.scene.enter('signup');
	 * ctx.scene.enter('signup', {
	 *   silent: true,
	 *   state: {
	 *     username: 'Super_Developer'
	 *   }
	 * });
	 * ```
	 */
	public async enter(slug: string, options: ISceneContextEnterOptions = {}): Promise<void> {
		const scene = this.repository.strictGet(slug);

		const isCurrent = this.current?.slug === scene.slug;

		if (!isCurrent) {
			if (!this.leaving) {
				await this.leave({
					silent: options.silent
				});
			}

			if (this.leaving) {
				this.leaving = false;

				this.reset();
			}
		}

		this.lastAction = LastAction.ENTER;

		this.session.current = scene.slug;
		Object.assign(this.state, options.state || {});

		if (options.silent) {
			return;
		}

		await scene.enterHandler(this.context);
	}

	/**
	 * Reenter to current scene
	 *
	 * ```ts
	 * ctx.scene.reenter();
	 * ```
	 */
	public async reenter(): Promise<void> {
		const { current } = this;

		if (!current) {
			throw new Error('There is no active scene to enter');
		}

		await this.enter(current.slug);
	}

	/**
	 * Leave from current scene
	 *
	 * ```ts
	 * ctx.scene.leave();
	 * ctx.scene.leave({
	 *   silent: true,
	 *   canceled: true
	 * });
	 * ```
	 */
	public async leave(options: ISceneContextLeaveOptions = {}): Promise<void> {
		const { current } = this;

		if (!current) {
			return;
		}

		this.leaving = true;
		this.lastAction = LastAction.LEAVE;

		if (!options.silent) {
			this.canceled = options.canceled ?? false;

			await current.leaveHandler(this.context);
		}

		if (this.leaving) {
			this.reset();
		}

		this.leaving = false;
		this.canceled = false;
	}

	/**
	 * Reset state/session
	 */
	public reset(): void {
		// eslint-disable-next-line no-underscore-dangle
		delete this.context.session.__scene;

		this.updateSession();
	}

	/**
	 * Updates session and state is lazy
	 */
	private updateSession(): void {
		// eslint-disable-next-line no-underscore-dangle
		this.session = new Proxy(this.context[this.sessionKey].__scene || {}, {
			set: (target, prop, value): boolean => {
				target[prop] = value;

				// eslint-disable-next-line no-underscore-dangle
				this.context[this.sessionKey].__scene = target;

				return true;
			}
		});

		this.state = new Proxy(this.session.state || {}, {
			set: (target, prop, value): boolean => {
				target[prop] = value;

				this.session.state = target;

				return true;
			}
		});
	}
}
