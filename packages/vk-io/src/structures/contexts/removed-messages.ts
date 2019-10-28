import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes: Record<number, string> = {
	13: 'delete_messages',
	14: 'restore_messages'
};
export interface IRemovedMessagesContextPayload {
	id: number;
	peer_id: number;
}

export type RemovedMessagesContextOptions<S> =
	Omit<IContextOptions<number[], S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class RemovedMessagesContext<S = Record<string, any>>
	extends Context<IRemovedMessagesContextPayload, S> {
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
		return copyParams(this, [
			'id',
			'peerId',
			'isRemoved',
			'isRecovery'
		]);
	}
}
