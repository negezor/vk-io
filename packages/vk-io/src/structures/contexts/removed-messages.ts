import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type RemovedMessagesContextType = 'removed_messages';

export type RemovedMessagesContextSubType =
'messages_delete'
| 'messages_restore';

const subTypes: Record<number, RemovedMessagesContextSubType> = {
	13: 'messages_delete',
	14: 'messages_restore'
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
		return this.subTypes.includes('messages_delete');
	}

	/**
	 * Checks that messages have been restored
	 */
	public get isRecovery(): boolean {
		return this.subTypes.includes('messages_restore');
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
	public [kSerializeData](): object {
		return pickProperties(this, [
			'id',
			'peerId',
			'isRemoved',
			'isRecovery'
		]);
	}
}
