import { Context, ContextFactoryOptions } from './context';

import { pickProperties } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

export type MessageAllowContextType = 'message_subscribers';

export type MessageAllowContextSubType =
'message_subscribe'
| 'message_unsubscribe';

const subTypes: Record<string, MessageAllowContextSubType> = {
	message_allow: 'message_subscribe',
	message_deny: 'message_unsubscribe'
};

export interface IMessageAllowContextPayload {
	user_id: number;
	key: string;
}

export type MessageAllowContextOptions<S> =
	ContextFactoryOptions<IMessageAllowContextPayload, S>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class MessageAllowContext<S = Record<string, any>>
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
				subTypes[options.updateType]
			]
		});
	}

	/**
	 * Checks that the user has subscribed to messages
	 */
	public get isSubscribed(): boolean {
		return this.subTypes.includes('message_subscribe');
	}

	/**
	 * Checks that the user has unsubscribed from the messages
	 */
	public get isUbsubscribed(): boolean {
		return this.subTypes.includes('message_unsubscribe');
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
	public [inspectCustomData](): object {
		return pickProperties(this, [
			'userId',
			'key',
			'isSubscribed',
			'isUbsubscribed'
		]);
	}
}
