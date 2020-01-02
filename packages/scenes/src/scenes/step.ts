import { MessageContext } from 'vk-io';

import IScene from './scene';

import { StepSceneContext } from '../contexts';
import { LastAction } from '../contexts/scene.types';
import { StepSceneHandler, IStepContext, IStepSceneOptions } from './step.types';

export default class StepScene<T = MessageContext> implements IScene {
	public slug: string;

	private steps: StepSceneHandler<T>[];

	private onEnterHandler: NonNullable<IStepSceneOptions<T>['enterHandler']>;

	private onLeaveHandler: NonNullable<IStepSceneOptions<T>['leaveHandler']>;

	public constructor(slug: string, rawOptions: IStepSceneOptions<T> | StepSceneHandler<T>[]) {
		const options = Array.isArray(rawOptions)
			? { steps: rawOptions }
			: rawOptions;

		this.slug = slug;

		this.steps = options.steps;

		this.onEnterHandler = options.enterHandler || ((): void => {});

		this.onLeaveHandler = options.leaveHandler || ((): void => {});
	}

	public async enterHandler(context: IStepContext & T): Promise<void> {
		context.scene.step = new StepSceneContext({
			context,

			// @ts-ignore
			steps: this.steps
		});

		await this.onEnterHandler(context);

		if (context.scene.lastAction !== LastAction.LEAVE) {
			await context.scene.step.reenter();
		}
	}

	public leaveHandler(context: IStepContext & T): Promise<void> {
		return this.onLeaveHandler(context);
	}
}
