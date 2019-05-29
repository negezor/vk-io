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
	slug: string;

	private steps: StepSceneHandler<T>[];

	private onEnterHandler: IStepSceneOptions<T>['enterHandler'];

	private onLeaveHandler: IStepSceneOptions<T>['leaveHandler'];

	constructor(slug: string, rawOptions: IStepSceneOptions<T> | StepSceneHandler<T>[]) {
		const options = Array.isArray(rawOptions)
			? {
				steps: rawOptions
			}
			: rawOptions;

		this.slug = slug;

		this.steps = options.steps;

		this.onEnterHandler = options.enterHandler || (() => {});

		this.onLeaveHandler = options.leaveHandler || (() => {});
	}

	async enterHandler(context: IStepContext) {
		context.scene.step = new StepSceneContext({
			context,

			steps: this.steps
		});

		// @ts-ignore
		await this.onEnterHandler(context);

		if (context.scene.lastAction !== LastAction.LEAVE) {
			return context.scene.step.reenter();
		}
	}

	leaveHandler(context: IStepContext) {
		// @ts-ignore
		return this.onLeaveHandler(context);
	}
}
