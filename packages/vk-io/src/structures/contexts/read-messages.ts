import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type ReadMessagesContextType = 'read_messages';

export type ReadMessagesContextSubType =
'read_inbox_messages'
| 'read_outbox_messages';

const subTypes: Record<number, ReadMessagesContextSubType> = {
	6: 'read_inbox_messages',
	7: 'read_outbox_messages'
};

export interface IReadMessagesContextPayload {
	id: number;
	peer_id: number;
}

export type ReadMessagesContextContextOptions<S> =
	ContextFactoryOptions<number[], S>;

export class ReadMessagesContext<S = ContextDefaultState>
	extends Context<
	IReadMessagesContextPayload,
	S,
	ReadMessagesContextType,
	ReadMessagesContextSubType
	> {
	public constructor(options: ReadMessagesContextContextOptions<S>) {
		const [eventId, peerId, id] = options.payload;

		super({
			...options,

			type: 'read_messages',
			subTypes: [
				subTypes[eventId]
			],

			payload: {
				peer_id: peerId,
				id
			}
		});
	}

	/**
	 * Checks that inbox messages are read
	 */
	public get isInbox(): boolean {
		return this.subTypes.includes('read_inbox_messages');
	}

	/**
	 * Checks that outbox messages are read
	 */
	public get isOutbox(): boolean {
		return this.subTypes.includes('read_outbox_messages');
	}

	/**
	 * Returns the ID before the message read
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the peer ID
	 */
	public get peerId(): number {
		return this.payload.peer_id;
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
