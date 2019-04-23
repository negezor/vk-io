import { Partial, ISessionContext } from '../types';
import { ISceneContextOptions, ISceneContextEnterOptions, ISceneContextLeaveOptions } from './scene.types';

export default class SceneContext {
	/**
	 * Lazy session for submodules
	 * @example
	 * ctx.scene.session.moduleFlag = true;
	 */
	session: ISessionContext;

	/**
	 * Base namespace for user input
	 *
	 * @example
	 * ctx.scene.username = myInputText;
	 */
	state: Partial;

	/**
	 * Is the scene canceled, used in leaveHandler()
	 *
	 * @example
	 * ctx.scene.leave({
	 *   canceled: true
	 * });
	 */
	canceled = false;

	private context: ISceneContextOptions['context'];

	private repository: ISceneContextOptions['repository'];

	/**
	 * Controlled behavior leave
	 */
	private leaved = false;

	constructor(options: ISceneContextOptions) {
		this.context = options.context;

		this.repository = options.repository;

		this.updateSession();
	}

	/**
	 * Returns current scene
	 */
	get current() {
		return this.repository.get(this.session.current);
	}

	/**
	 * Enter to scene
	 *
	 * @example
	 * ctx.scene.enter('signup');
	 * ctx.scene.enter('signup', {
	 *   silent: true,
	 *   state: {
	 *     username: 'Super_Developer'
	 *   }
	 * });
	 */
	async enter(slug: string, options: ISceneContextEnterOptions = {}) {
		const scene = this.repository.strictGet(slug);

		const { current } = this;

		const isNotCurrent = current !== null && current.slug !== scene.slug;

		if (!this.leaved && isNotCurrent) {
			await this.leave({
				silent: options.silent
			});
		}

		if (this.leaved && isNotCurrent) {
			this.leaved = false;

			this.reset();
		}

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
	 * @example
	 * ctx.scene.reenter();
	 */
	async reenter() {
		const { current } = this;

		if (!current) {
			throw new Error('There is no active scene to enter');
		}

		await this.enter(current.slug);
	}

	/**
	 * Leave from current scene
	 *
	 * @example
	 * ctx.scene.leave();
	 * ctx.scene.leave({
	 *   silent: true,
	 *   canceled: true
	 * });
	 */
	async leave(options: ISceneContextLeaveOptions = {}) {
		const { current } = this;

		if (!current) {
			return;
		}

		this.leaved = true;

		if (!options.silent) {
			this.canceled = options.canceled !== undefined
				? options.canceled
				: false;

			await current.leaveHandler(this.context);
		}

		if (this.leaved) {
			this.reset();
		}

		this.leaved = false;
		this.canceled = false;
	}


	/**
	 * Reset state/session
	 */
	reset() {
		// eslint-disable-next-line no-underscore-dangle
		delete this.context.session.__scene;

		this.updateSession();
	}

	/**
	 * Updates session and state is lazy
	 */
	private updateSession() {
		// eslint-disable-next-line no-underscore-dangle
		this.session = new Proxy(this.context.session.__scene || {}, {
			set: (target, prop, value) => {
				target[prop] = value;

				// eslint-disable-next-line no-underscore-dangle
				this.context.session.__scene = target;

				return true;
			}
		});

		this.state = new Proxy(this.session.state || {}, {
			set: (target, prop, value) => {
				target[prop] = value;

				this.session.state = target;

				return true;
			}
		});
	}
}
