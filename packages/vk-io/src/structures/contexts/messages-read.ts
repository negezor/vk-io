// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type MessagesReadContextType = 'messages_read';
// @ts-ignore

// @ts-ignore
export type MessagesReadContextSubType =
// @ts-ignore
'messages_read_inbox'
// @ts-ignore
| 'messages_read_outbox';
// @ts-ignore

// @ts-ignore
const subTypes: Record<number, MessagesReadContextSubType> = {
// @ts-ignore
	6: 'messages_read_inbox',
// @ts-ignore
	7: 'messages_read_outbox'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
export interface IMessagesReadContextPayload {
// @ts-ignore
	peer_id: number;
// @ts-ignore
	local_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessagesReadContextContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<number[], S>;
// @ts-ignore

// @ts-ignore
export class MessagesReadContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IMessagesReadContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	MessagesReadContextType,
// @ts-ignore
	MessagesReadContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: MessagesReadContextContextOptions<S>) {
// @ts-ignore
		const [eventId, peerId, localId] = options.payload;
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'messages_read',
// @ts-ignore
			subTypes: [
// @ts-ignore
				subTypes[eventId]
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			payload: {
// @ts-ignore
				peer_id: peerId,
// @ts-ignore
				local_id: localId
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that inbox messages are read
// @ts-ignore
	 */
// @ts-ignore
	public get isInbox(): boolean {
// @ts-ignore
		return this.subTypes.includes('messages_read_inbox');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that outbox messages are read
// @ts-ignore
	 */
// @ts-ignore
	public get isOutbox(): boolean {
// @ts-ignore
		return this.subTypes.includes('messages_read_outbox');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the peer ID
// @ts-ignore
	 */
// @ts-ignore
	public get peerId(): number {
// @ts-ignore
		return this.payload.peer_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier of the local message
// @ts-ignore
	 */
// @ts-ignore
	public get localId(): number {
// @ts-ignore
		return this.payload.local_id;
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
			'id',
// @ts-ignore
			'peerId',
// @ts-ignore
			'isInbox',
// @ts-ignore
			'isOutbox'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
