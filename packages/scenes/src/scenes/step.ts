import type { MessageContext } from 'vk-io';

import type { IScene } from './scene';

import { StepSceneContext } from '../contexts';
import { LastAction } from '../contexts/scene.types';
import type { IStepContext, IStepSceneOptions, StepSceneHandler } from './step.types';

export class StepScene<T = MessageContext, S extends Record<string, unknown> = Record<string, any>>
    implements IScene<S>
{
    public slug: string;

    private steps: StepSceneHandler<T, S>[];

    private onEnterHandler: NonNullable<IStepSceneOptions<T, S>['enterHandler']>;

    private onLeaveHandler: NonNullable<IStepSceneOptions<T, S>['leaveHandler']>;

    public constructor(slug: string, rawOptions: IStepSceneOptions<T, S> | StepSceneHandler<T, S>[]) {
        const options = Array.isArray(rawOptions) ? { steps: rawOptions } : rawOptions;

        this.slug = slug;

        this.steps = options.steps;
        this.onEnterHandler = options.enterHandler || ((): void => {});
        this.onLeaveHandler = options.leaveHandler || ((): void => {});
    }

    public async enterHandler(context: IStepContext<S> & T): Promise<void> {
        context.scene.step = new StepSceneContext<S>({
            context,
            // @ts-ignore
            steps: this.steps,
        });

        await this.onEnterHandler(context);

        if (context.scene.lastAction !== LastAction.LEAVE) {
            await context.scene.step.reenter();
        }
    }

    public leaveHandler(context: IStepContext<S> & T): Promise<unknown> {
        return Promise.resolve(this.onLeaveHandler(context));
    }
}
