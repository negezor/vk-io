import { Context, type ContextDefaultState, type ContextFactoryOptions } from './context';

import { kSerializeData } from '../../utils/constants';

import { pickProperties } from '../../utils/helpers';

export type VKAppPayloadContextType = 'vk_app_event';

export type VKAppPayloadContextSubType = 'app_payload';

export interface IVKAppPayloadPayload {
    user_id: number;
    app_id: number;
    payload: string;
    group_id: number;
}

export type VKAppPayloadContextOptions<S> = ContextFactoryOptions<IVKAppPayloadPayload, S>;

export class VKAppPayloadContext<S = ContextDefaultState, P extends Record<string, any> = object> extends Context<
    IVKAppPayloadPayload,
    S,
    VKAppPayloadContextType,
    VKAppPayloadContextSubType
> {
    public constructor(options: VKAppPayloadContextOptions<S>) {
        super({
            ...options,

            type: 'vk_app_event',
            subTypes: [options.updateType as VKAppPayloadContextSubType],
        });
    }

    /**
     * Returns the identifier of the user whose action the event was sent to in the application
     */
    public get userId(): number {
        return this.payload.user_id;
    }

    /**
     * Returns the identifier of the application from which the event was sent
     */
    public get appId(): number {
        return this.payload.app_id;
    }

    /**
     * Returns the identifier of the community to which the notification was sent
     */
    public get groupId(): number {
        return this.payload.group_id;
    }

    /**
     * Returns the transferred useful data
     */
    public get eventPayload(): P {
        return JSON.parse(this.payload.payload);
    }

    /**
     * Returns the custom data
     */
    public [kSerializeData](): object {
        return pickProperties(this, ['userId', 'appId', 'groupId', 'eventPayload']);
    }
}
