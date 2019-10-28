import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes: Record<string, string> = {
	message_allow: 'message_subscribe',
	message_deny: 'message_unsubscribe'
};

export interface IMessageAllowContextPayload {
	user_id: number;
	key: string;
}

export type MessageAllowContextOptions<S> =
	Omit<IContextOptions<IMessageAllowContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class MessageAllowContext<S = Record<string, any>>
	extends Context<IMessageAllowContextPayload, S> {
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
	public get key(): string | null {
		return this.payload.key || null;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'userId',
			'key',
			'isSubscribed',
			'isUbsubscribed'
		]);
	}
}
