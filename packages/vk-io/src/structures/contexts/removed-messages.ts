import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

export type RemovedMessagesContextType = 'removed_messages';

export type RemovedMessagesContextSubType =
'delete_messages'
| 'restore_messages';

const subTypes: Record<number, RemovedMessagesContextSubType> = {
	13: 'delete_messages',
	14: 'restore_messages'
};
export interface IRemovedMessagesContextPayload {
	id: number;
	peer_id: number;
}

export type RemovedMessagesContextOptions<S> =
	ContextFactoryOptions<number[], S>;

export class RemovedMessagesContext<S = ContextDefaultState>
	extends Context<
	IRemovedMessagesContextPayload,
	S,
	RemovedMessagesContextType,
	RemovedMessagesContextSubType
	> {
	public constructor(options: RemovedMessagesContextOptions<S>) {
		const [eventId, peerId, id] = options.payload;

		super({
			...options,

			type: 'removed_messages',
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
	 * Checks that messages have been deleted
	 */
	public get isRemoved(): boolean {
		return this.subTypes.includes('delete_messages');
	}

	/**
	 * Checks that messages have been restored
	 */
	public get isRecovery(): boolean {
		return this.subTypes.includes('restore_messages');
	}

	/**
	 * Returns the identifier of the message
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
		return pickProperties(this, [
			'id',
			'peerId',
			'isRemoved',
			'isRecovery'
		]);
	}
}
