// @ts-ignore
import { MessageContext } from 'vk-io';
// @ts-ignore

// @ts-ignore
import { IScene } from './scene';
// @ts-ignore

// @ts-ignore
import { StepSceneContext } from '../contexts';
// @ts-ignore
import { LastAction } from '../contexts/scene.types';
// @ts-ignore
import { StepSceneHandler, IStepContext, IStepSceneOptions } from './step.types';
// @ts-ignore

// @ts-ignore
export class StepScene<T = MessageContext> implements IScene {
// @ts-ignore
	public slug: string;
// @ts-ignore

// @ts-ignore
	private steps: StepSceneHandler<T>[];
// @ts-ignore

// @ts-ignore
	private onEnterHandler: NonNullable<IStepSceneOptions<T>['enterHandler']>;
// @ts-ignore

// @ts-ignore
	private onLeaveHandler: NonNullable<IStepSceneOptions<T>['leaveHandler']>;
// @ts-ignore

// @ts-ignore
	public constructor(slug: string, rawOptions: IStepSceneOptions<T> | StepSceneHandler<T>[]) {
// @ts-ignore
		const options = Array.isArray(rawOptions)
// @ts-ignore
			? { steps: rawOptions }
// @ts-ignore
			: rawOptions;
// @ts-ignore

// @ts-ignore
		this.slug = slug;
// @ts-ignore

// @ts-ignore
		this.steps = options.steps;
// @ts-ignore

// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-empty-function
// @ts-ignore
		this.onEnterHandler = options.enterHandler || ((): void => {});
// @ts-ignore

// @ts-ignore
		// eslint-disable-next-line @typescript-eslint/no-empty-function
// @ts-ignore
		this.onLeaveHandler = options.leaveHandler || ((): void => {});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public async enterHandler(context: IStepContext & T): Promise<void> {
// @ts-ignore
		context.scene.step = new StepSceneContext({
// @ts-ignore
			context,
// @ts-ignore

// @ts-ignore
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
			// @ts-ignore
// @ts-ignore
			steps: this.steps
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		await this.onEnterHandler(context);
// @ts-ignore

// @ts-ignore
		if (context.scene.lastAction !== LastAction.LEAVE) {
// @ts-ignore
			await context.scene.step.reenter();
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	public leaveHandler(context: IStepContext & T): Promise<unknown> {
// @ts-ignore
		return Promise.resolve(this.onLeaveHandler(context));
// @ts-ignore
	}
// @ts-ignore
}
