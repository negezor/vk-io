// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type MessageSubscriptionContextType = 'message_subscription';
// @ts-ignore

// @ts-ignore
export type MessageSubscriptionContextSubType =
// @ts-ignore
'message_allow'
// @ts-ignore
| 'message_deny';
// @ts-ignore

// @ts-ignore
export interface IMessageSubscriptionContextPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore
	key: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessageSubscriptionContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IMessageSubscriptionContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class MessageSubscriptionContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IMessageSubscriptionContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	MessageSubscriptionContextType,
// @ts-ignore
	MessageSubscriptionContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: MessageSubscriptionContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'message_subscription',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as MessageSubscriptionContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user has subscribed to messages
// @ts-ignore
	 */
// @ts-ignore
	public get isSubscribed(): boolean {
// @ts-ignore
		return this.subTypes.includes('message_allow');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the user has unsubscribed from the messages
// @ts-ignore
	 */
// @ts-ignore
	public get isUnsubscribed(): boolean {
// @ts-ignore
		return this.subTypes.includes('message_deny');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier user
// @ts-ignore
	 */
// @ts-ignore
	public get userId(): number {
// @ts-ignore
		return this.payload.user_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the key
// @ts-ignore
	 */
// @ts-ignore
	public get key(): string | undefined {
// @ts-ignore
		return this.payload.key;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'userId',
// @ts-ignore
			'key',
// @ts-ignore
			'isSubscribed',
// @ts-ignore
			'isUnsubscribed'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
