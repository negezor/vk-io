import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type MessagesReadContextType = 'messages_read';

export type MessagesReadContextSubType =
'messages_read_inbox'
| 'messages_read_outbox';

const subTypes: Record<number, MessagesReadContextSubType> = {
	6: 'messages_read_inbox',
	7: 'messages_read_outbox'
};

export interface IMessagesReadContextPayload {
	peer_id: number;
	local_id: number;
}

export type MessagesReadContextContextOptions<S> =
	ContextFactoryOptions<number[], S>;

export class MessagesReadContext<S = ContextDefaultState>
	extends Context<
	IMessagesReadContextPayload,
	S,
	MessagesReadContextType,
	MessagesReadContextSubType
	> {
	public constructor(options: MessagesReadContextContextOptions<S>) {
		const [eventId, peerId, localId] = options.payload;

		super({
			...options,

			type: 'messages_read',
			subTypes: [
				subTypes[eventId]
			],

			payload: {
				peer_id: peerId,
				local_id: localId
			}
		});
	}

	/**
	 * Checks that inbox messages are read
	 */
	public get isInbox(): boolean {
		return this.subTypes.includes('messages_read_inbox');
	}

	/**
	 * Checks that outbox messages are read
	 */
	public get isOutbox(): boolean {
		return this.subTypes.includes('messages_read_outbox');
	}

	/**
	 * Returns the peer ID
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns the identifier of the local message
	 */
	public get localId(): number {
		return this.payload.local_id;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'id',
			'peerId',
			'isInbox',
			'isOutbox'
		]);
	}
}
