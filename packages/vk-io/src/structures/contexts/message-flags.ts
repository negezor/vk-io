import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { MessageContext } from './message';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData, UpdateSource } from '../../utils/constants';

export type MessageFlagsContextType = 'message_flags';

export type MessageFlagsContextSubType =
'message_flags_replace'
| 'message_flags_add'
| 'message_flags_delete';

const subTypes: Record<number, MessageFlagsContextSubType> = {
	1: 'message_flags_replace',
	2: 'message_flags_add',
	3: 'message_flags_delete'
};

/* eslint-disable no-bitwise */
enum MessageFlag {
	UNREAD = 1 << 0,
	OUTBOX = 1 << 1,
	IMPORTANT = 1 << 3,
	FROM_WEB_CHAT = 1 << 4,
	FRIEND_MESSAGE = 1 << 5,
	MARK_SPAM = 1 << 6,
	DELЕTЕD = 1 << 7,
	AUDIO_MESSAGE_LISTENED = 1 << 12,
	FROM_CLIENT_CHAT = 1 << 13,
	UNMARK_SPAM = 1 << 15,
	HIDDEN = 1 << 16,
	DELETED_FOR_ALL = 1 << 17,
	INBOX_FROM_CHAT = 1 << 19,
	SILENT = 1 << 20,
	REPLIED = 1 << 21
}
/* eslint-enable no-bitwise */

export interface IMessageFlagsContextPayload {
	id: number;
	peer_id: number;
	flags: number;
}

export type MessageFlagsContextOptions<S> =
ContextFactoryOptions<number[], S>;

export class MessageFlagsContext<S = ContextDefaultState>
	extends Context<
	IMessageFlagsContextPayload,
	S,
	MessageFlagsContextType,
	MessageFlagsContextSubType
	> {
	public message?: MessageContext;

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

		if (options.payload.length > 4) {
			this.message = new MessageContext({
				api: this.api,
				upload: this.upload,
				source: UpdateSource.POLLING,
				updateType: 4,
				// @ts-expect-error
				payload: options.payload
			});
		}
	}

	/**
	 * Checks if a message is unread
	 */
	public get isUnread(): boolean {
		return this.hasFlag(MessageFlag.UNREAD);
	}

	/**
	 * Checks if a message is outbox
	 */
	public get isOutbox(): boolean {
		return this.hasFlag(MessageFlag.OUTBOX);
	}

	/**
	 * Checks if a message is important
	 */
	public get isImportant(): boolean {
		return this.hasFlag(MessageFlag.IMPORTANT);
	}

	/**
	 * Checks if a message was sent from a web chat
	 */
	public get isFromWebChat(): boolean {
		return this.hasFlag(MessageFlag.FROM_WEB_CHAT);
	}

	/**
	 * Checks whether a message has been sent or received from a friend
	 */
	public get isFriendMessage(): boolean {
		return this.hasFlag(MessageFlag.FRIEND_MESSAGE);
	}

	/**
	 * Check if a message is marked as spam
	 */
	public get isMarkSpam(): boolean {
		return this.hasFlag(MessageFlag.MARK_SPAM);
	}

	/**
	 * Check if the message was deleted locally
	 */
	public get isDeleted(): boolean {
		return this.hasFlag(MessageFlag.DELЕTЕD);
	}

	/**
	 * Checks if a audio message has been listened
	 */
	public get isAudioMessageListened(): boolean {
		return this.hasFlag(MessageFlag.AUDIO_MESSAGE_LISTENED);
	}

	/**
	 * Checks if a message was sent from a client
	 */
	public get isFromClientChat(): boolean {
		return this.hasFlag(MessageFlag.FROM_CLIENT_CHAT);
	}

	/**
	 * Check if message is unmarked as spam
	 */
	public get isUnmarkSpam(): boolean {
		return this.hasFlag(MessageFlag.UNMARK_SPAM);
	}

	/**
	 * Checks if it's a welcome message from the group
	 */
	public get isHidden(): boolean {
		return this.hasFlag(MessageFlag.HIDDEN);
	}

	/**
	 * Check if the message was deleted for all
	 */
	public get isDeletedForAll(): boolean {
		return this.hasFlag(MessageFlag.DELETED_FOR_ALL);
	}

	/**
	 * Checks if the message is inbox from chat
	 */
	public get isInboxFromChat(): boolean {
		return this.hasFlag(MessageFlag.INBOX_FROM_CHAT);
	}

	/**
	 * Checks if the message is silent (without notifications)
	 */
	public get isSilent(): boolean {
		return this.hasFlag(MessageFlag.SILENT);
	}

	/**
	 * Checks a reply has been created to the message
	 */
	public get isReplied(): boolean {
		return this.hasFlag(MessageFlag.REPLIED);
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

	protected hasFlag(flag: MessageFlag): boolean {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & flag);
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'id',
			'peerId',
			'flags',
			'message',
			'isUnread',
			'isOutbox',
			'isImportant',
			'isFromWebChat',
			'isFriendMessage',
			'isMarkSpam',
			'isDeleted',
			'isAudioMessageListened',
			'isFromClientChat',
			'isUnmarkSpam',
			'isHidden',
			'isDeletedForAll',
			'isInboxFromChat',
			'isSilent',
			'isReplied'
		]);
	}
}
