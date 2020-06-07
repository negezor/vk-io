import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type MessageAllowContextType = 'message_subscribers';

export type MessageAllowContextSubType =
'message_allow'
| 'message_deny';

export interface IMessageAllowContextPayload {
	user_id: number;
	key: string;
}

export type MessageAllowContextOptions<S> =
	ContextFactoryOptions<IMessageAllowContextPayload, S>;

export class MessageAllowContext<S = ContextDefaultState>
	extends Context<
	IMessageAllowContextPayload,
	S,
	MessageAllowContextType,
	MessageAllowContextSubType
	> {
	public constructor(options: MessageAllowContextOptions<S>) {
		super({
			...options,

			type: 'message_subscribers',
			subTypes: [
				options.updateType as MessageAllowContextSubType
			]
		});
	}

	/**
	 * Checks that the user has subscribed to messages
	 */
	public get isSubscribed(): boolean {
		return this.subTypes.includes('message_allow');
	}

	/**
	 * Checks that the user has unsubscribed from the messages
	 */
	public get isUbsubscribed(): boolean {
		return this.subTypes.includes('message_deny');
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the key
	 */
	public get key(): string | undefined {
		return this.payload.key;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'userId',
			'key',
			'isSubscribed',
			'isUbsubscribed'
		]);
	}
}
