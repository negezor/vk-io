import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes: Record<number, string> = {
	6: 'read_inbox_messages',
	7: 'read_outbox_messages'
};

export interface IReadMessagesContextPayload {
	id: number;
	peer_id: number;
}

export type ReadMessagesContextContextOptions<S> =
	Omit<IContextOptions<number[], S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class ReadMessagesContext<S = Record<string, any>>
	extends Context<IReadMessagesContextPayload, S> {
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
	public [inspectCustomData](): object {
		return copyParams(this, [
			'id',
			'peerId',
			'isInbox',
			'isOutbox'
		]);
	}
}
