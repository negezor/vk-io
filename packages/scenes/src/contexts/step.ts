// @ts-ignore
import { IStepContextOptions, IStepContextGoOptions } from './step.types';
// @ts-ignore
import { StepSceneHandler } from '../scenes/step.types';
// @ts-ignore
import { LastAction } from './scene.types';
// @ts-ignore

// @ts-ignore
export class StepSceneContext {
// @ts-ignore
	private context: IStepContextOptions['context'];
// @ts-ignore

// @ts-ignore
	private steps: IStepContextOptions['steps'];
// @ts-ignore

// @ts-ignore
	private stepChanged = false;
// @ts-ignore

// @ts-ignore
	public constructor(options: IStepContextOptions) {
// @ts-ignore
		this.context = options.context;
// @ts-ignore

// @ts-ignore
		this.steps = options.steps;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The first enter to the handler
// @ts-ignore
	 */
// @ts-ignore
	public get firstTime(): boolean {
// @ts-ignore
		const { firstTime = true } = this.context.scene.session;
// @ts-ignore

// @ts-ignore
		return firstTime;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns current stepId
// @ts-ignore
	 */
// @ts-ignore
	public get stepId(): number {
// @ts-ignore
		return this.context.scene.session.stepId || 0;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sets current stepId
// @ts-ignore
	 */
// @ts-ignore
	public set stepId(stepId: number) {
// @ts-ignore
		const { session } = this.context.scene;
// @ts-ignore

// @ts-ignore
		session.stepId = stepId;
// @ts-ignore
		session.firstTime = true;
// @ts-ignore

// @ts-ignore
		this.stepChanged = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns current handler
// @ts-ignore
	 */
// @ts-ignore
	public get current(): StepSceneHandler<{}> | undefined {
// @ts-ignore
		return this.steps[this.stepId];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Reenter current step handler
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.step.reenter();
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
			await this.context.scene.leave();
// @ts-ignore

// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.stepChanged = false;
// @ts-ignore

// @ts-ignore
		await current(this.context);
// @ts-ignore

// @ts-ignore
		if (this.context.scene.lastAction !== LastAction.LEAVE && !this.stepChanged) {
// @ts-ignore
			this.context.scene.session.firstTime = false;
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * The go method goes to a specific step
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.step.go(3);
// @ts-ignore
	 * ctx.scene.step.go(3, {
// @ts-ignore
	 *   silent: true
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public go(stepId: number, { silent = false }: IStepContextGoOptions = {}): Promise<void> {
// @ts-ignore
		this.stepId = stepId;
// @ts-ignore

// @ts-ignore
		if (silent) {
// @ts-ignore
			return Promise.resolve();
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.reenter();
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Move to the next handler
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.step.next();
// @ts-ignore
	 * ctx.scene.step.next({
// @ts-ignore
	 *   silent: true
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public next(options?: IStepContextGoOptions): Promise<void> {
// @ts-ignore
		return this.go(this.stepId + 1, options);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Move to the previous handler
// @ts-ignore
	 *
// @ts-ignore
	 * ```ts
// @ts-ignore
	 * ctx.scene.step.previous();
// @ts-ignore
	 * ctx.scene.step.previous({
// @ts-ignore
	 *   silent: true
// @ts-ignore
	 * });
// @ts-ignore
	 * ```
// @ts-ignore
	 */
// @ts-ignore
	public previous(options?: IStepContextGoOptions): Promise<void> {
// @ts-ignore
		return this.go(this.stepId - 1, options);
// @ts-ignore
	}
// @ts-ignore
}
