import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type MessageEventContextType = 'message_event';

export type MessageEventContextSubType = 'message_event';

export interface IMessageEventContextPayload {
	user_id: number;
	conversation_message_id: number;
	peer_id: number;
	event_id: string;
	payload: string;
}

export type MessageEventContextOptions<S> =
	ContextFactoryOptions<IMessageEventContextPayload, S>;

export class MessageEventContext<S = ContextDefaultState>
	extends Context<
	IMessageEventContextPayload,
	S,
	MessageEventContextType,
	MessageEventContextSubType
	> {
	public constructor(options: MessageEventContextOptions<S>) {
		super({
			...options,

			type: 'message_event',
			subTypes: [
				options.updateType as MessageEventContextSubType
			]
		});
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the conversation message id
	 */
	public get conversationMessageId(): number {
		return this.payload.conversation_message_id;
	}

	/**
	 * Returns the destination identifier
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns a random string. Active for a minute, after a minute becomes invalid
	 */
	public get eventId(): string {
		return this.payload.event_id;
	}

	/**
	 * Returns the event payload
	 */
	public get eventPayload(): string {
		return this.payload.payload;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'userId',
			'conversationMessageId',
			'peerId',
			'eventId',
			'eventPayload'
		]);
	}
}
