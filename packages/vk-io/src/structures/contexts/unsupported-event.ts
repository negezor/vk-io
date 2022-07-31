import { Context, ContextDefaultState, ContextFactoryOptions } from './context';

import { kSerializeData } from '../../utils/constants';
import { pickProperties } from '../../utils/helpers';

export type UnsupportedEventContextType = 'unsupported_event';
export type UnsupportedEventContextSubType = string;

type UnsupportedEventContextPayload<P> = P;

export type UnsupportedEventOptions<S, P> =
		ContextFactoryOptions<UnsupportedEventContextPayload<P>, S>;

export class UnsupportedEventContext<
	S = ContextDefaultState,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	P extends Record<string, any> = {}
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
				options.updateType as string
			],

			payload: options.payload
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
			'eventPayload'
		]);
	}
}
