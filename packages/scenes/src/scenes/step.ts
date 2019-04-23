import { MessageContext } from 'vk-io';

import IScene from './scene';

import { StepSceneContext } from '../contexts';
import { StepSceneHandler, IStepContext } from './step.types';

interface IStepSceneOptions<T> {
	steps: StepSceneHandler<T>[];
	leaveHandler?: StepSceneHandler<T>;
}

export default class StepScene<T = MessageContext> implements IScene {
	slug: string;

	private steps: StepSceneHandler<T>[];

	private onLeaveHandler: IStepSceneOptions<T>['leaveHandler']

	constructor(slug: string, rawOptions: IStepSceneOptions<T> | StepSceneHandler<T>[]) {
		const options = Array.isArray(rawOptions)
			? {
				steps: rawOptions
			}
			: rawOptions;

		this.slug = slug;

		this.steps = options.steps;

		this.onLeaveHandler = options.leaveHandler || (() => {});
	}

	enterHandler(context: IStepContext) {
		context.scene.step = new StepSceneContext({
			context,

			steps: this.steps
		});

		return context.scene.step.reenter();
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	leaveHandler(context: IStepContext) {
		// @ts-ignore
		return this.onLeaveHandler(context);
	}
}
