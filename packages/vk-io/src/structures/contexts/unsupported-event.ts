import { Context, type ContextDefaultState, type ContextFactoryOptions } from './context';

import { kSerializeData } from '../../utils/constants';
import { pickProperties } from '../../utils/helpers';

export type UnsupportedEventContextType = 'unsupported_event';
type UnsupportedEventContextSubType = string;

type UnsupportedEventContextPayload<P> = P;

export type UnsupportedEventOptions<S, P> =
        ContextFactoryOptions<UnsupportedEventContextPayload<P>, S>;

export class UnsupportedEventContext<
    S = ContextDefaultState,
    P extends Record<string, any> = object
>
    extends Context<
    P,
    S,
    UnsupportedEventContextType,
    UnsupportedEventContextSubType
    > {
    constructor(options: UnsupportedEventOptions<S, P>) {
        super({
            ...options,

            type: 'unsupported_event',
            subTypes: [
                options.updateType as string,
            ],

            payload: options.payload,
        });
    }

    /**
    * Event payload
    */
    public get eventPayload(): P {
        return this.payload;
    }

    /**
     * Returns the custom data
     */
    public [kSerializeData](): object {
        return pickProperties(this, [
            'eventPayload',
        ]);
    }
}
