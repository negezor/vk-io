import { MessageContext } from 'vk-io';

import { IScene } from './scene';

import { StepSceneContext } from '../contexts';
import { LastAction } from '../contexts/scene.types';
import { StepSceneHandler, IStepContext, IStepSceneOptions } from './step.types';

export class StepScene<
    T = MessageContext,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    S extends Record<string, unknown> = Record<string, any>
> implements IScene<S> {
    public slug: string;

    private steps: StepSceneHandler<T, S>[];

    private onEnterHandler: NonNullable<IStepSceneOptions<T, S>['enterHandler']>;

    private onLeaveHandler: NonNullable<IStepSceneOptions<T, S>['leaveHandler']>;

    public constructor(slug: string, rawOptions: IStepSceneOptions<T, S> | StepSceneHandler<T, S>[]) {
        const options = Array.isArray(rawOptions)
            ? { steps: rawOptions }
            : rawOptions;

        this.slug = slug;

        this.steps = options.steps;

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onEnterHandler = options.enterHandler || ((): void => {});

        // eslint-disable-next-line @typescript-eslint/no-empty-function
        this.onLeaveHandler = options.leaveHandler || ((): void => {});
    }

    public async enterHandler(context: IStepContext<S> & T): Promise<void> {
        context.scene.step = new StepSceneContext<S>({
            context,

            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
