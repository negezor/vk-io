import { MessageContext } from 'vk-io';

import IScene from './scene';

import { StepSceneContext } from '../contexts';
import { LastAction } from '../contexts/scene.types';
import { StepSceneHandler, IStepContext } from './step.types';

interface IStepSceneOptions<T> {
	steps: StepSceneHandler<T>[];
	enterHandler?: StepSceneHandler<T>;
	leaveHandler?: StepSceneHandler<T>;
}

export default class StepScene<T = MessageContext> implements IScene {
	public slug: string;

	private steps: StepSceneHandler<T>[];

	private onEnterHandler: IStepSceneOptions<T>['enterHandler'];

	private onLeaveHandler: IStepSceneOptions<T>['leaveHandler'];

	public constructor(slug: string, rawOptions: IStepSceneOptions<T> | StepSceneHandler<T>[]) {
		const options = Array.isArray(rawOptions)
			? { steps: rawOptions }
			: rawOptions;

		this.slug = slug;

		this.steps = options.steps;

		this.onEnterHandler = options.enterHandler || ((): void => {});

		this.onLeaveHandler = options.leaveHandler || ((): void => {});
	}

	public async enterHandler(context: IStepContext): Promise<void> {
		context.scene.step = new StepSceneContext({
			context,

			// @ts-ignore
			steps: this.steps
		});

		// @ts-ignore
		await this.onEnterHandler(context);

		if (context.scene.lastAction !== LastAction.LEAVE) {
			await context.scene.step.reenter();
		}
	}

	public leaveHandler(context: IStepContext): Promise<void> {
		// @ts-ignore
		return this.onLeaveHandler(context);
	}
}
