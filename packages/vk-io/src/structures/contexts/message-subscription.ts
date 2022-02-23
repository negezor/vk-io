import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type MessageSubscriptionContextType = 'message_subscription';

export type MessageSubscriptionContextSubType =
'message_allow'
| 'message_deny';

export interface IMessageSubscriptionContextPayload {
	user_id: number;
	key: string;
}

export type MessageSubscriptionContextOptions<S> =
	ContextFactoryOptions<IMessageSubscriptionContextPayload, S>;

export class MessageSubscriptionContext<S = ContextDefaultState>
	extends Context<
	IMessageSubscriptionContextPayload,
	S,
	MessageSubscriptionContextType,
	MessageSubscriptionContextSubType
	> {
	public constructor(options: MessageSubscriptionContextOptions<S>) {
		super({
			...options,

			type: 'message_subscription',
			subTypes: [
				options.updateType as MessageSubscriptionContextSubType
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
	public get isUnsubscribed(): boolean {
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
			'isUnsubscribed'
		]);
	}
}
