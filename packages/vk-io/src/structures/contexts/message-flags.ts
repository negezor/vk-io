import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes: Record<number, string> = {
	1: 'update_message_flags',
	2: 'set_message_flags',
	3: 'remove_message_flags'
};

export interface IMessageFlagsContextPayload {
	id: number;
	peer_id: number;
	flags: number;
}

export type MessageFlagsContextOptions<S> =
	Omit<IContextOptions<number[], S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class MessageFlagsContext<S = Record<string, any>>
	extends Context<IMessageFlagsContextPayload, S> {
	public constructor(options: MessageFlagsContextOptions<S>) {
		const [eventId, id, flags, peerId] = options.payload;

		super({
			...options,

			type: 'message_flags',
			subTypes: [
				subTypes[eventId]
			],

			payload: {
				peer_id: peerId,
				flags,
				id
			}
		});
	}

	/**
	 * Verifies that the message is not read
	 */
	public get isUnread(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 1);
	}

	/**
	 * Checks that the outgoing message
	 */
	public get isOutbox(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 2);
	}

	/**
	 * Verifies that a reply has been created to the message
	 */
	public get isReplied(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 4);
	}

	/**
	 * Verifies that the marked message
	 */
	public get isImportant(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 8);
	}

	/**
	 * Verifies that the message was sent via chat
	 */
	public get isChat(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 16);
	}

	/**
	 * Verifies that the message was sent by a friend
	 */
	public get isFriends(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 32);
	}

	/**
	 * Verifies that the message is marked as "Spam"
	 */
	public get isSpam(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 64);
	}

	/**
	 * Verifies that the message has been deleted (in the Recycle Bin)
	 */
	public get isDeleted(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 128);
	}

	/**
	 * Verifies that the message was verified by the user for spam
	 */
	public get isFixed(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 256);
	}

	/**
	 * Verifies that the message contains media content
	 */
	public get isMedia(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 512);
	}

	/**
	 * Checks that a welcome message from the community
	 */
	public get isHidden(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 65536);
	}

	/**
	 * Message deleted for all recipients
	 */
	public get isDeletedForAll(): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 131072);
	}

	/**
	 * Returns the message ID
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the destination identifier
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns the values of the flags
	 */
	public get flags(): number {
		return this.payload.flags;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'id',
			'peerId',
			'flags'
		]);
	}
}
