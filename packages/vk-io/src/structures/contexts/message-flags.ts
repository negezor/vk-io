// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { MessageContext } from './message';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData, UpdateSource } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type MessageFlagsContextType = 'message_flags';
// @ts-ignore

// @ts-ignore
export type MessageFlagsContextSubType =
// @ts-ignore
'message_flags_replace'
// @ts-ignore
| 'message_flags_add'
// @ts-ignore
| 'message_flags_delete';
// @ts-ignore

// @ts-ignore
const subTypes: Record<number, MessageFlagsContextSubType> = {
// @ts-ignore
	1: 'message_flags_replace',
// @ts-ignore
	2: 'message_flags_add',
// @ts-ignore
	3: 'message_flags_delete'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/* eslint-disable no-bitwise */
// @ts-ignore
enum MessageFlag {
// @ts-ignore
	UNREAD = 1 << 0,
// @ts-ignore
	OUTBOX = 1 << 1,
// @ts-ignore
	IMPORTANT = 1 << 3,
// @ts-ignore
	FROM_WEB_CHAT = 1 << 4,
// @ts-ignore
	FRIEND_MESSAGE = 1 << 5,
// @ts-ignore
	MARK_SPAM = 1 << 6,
// @ts-ignore
	DELЕTЕD = 1 << 7,
// @ts-ignore
	AUDIO_MESSAGE_LISTENED = 1 << 12,
// @ts-ignore
	FROM_CLIENT_CHAT = 1 << 13,
// @ts-ignore
	UNMARK_SPAM = 1 << 15,
// @ts-ignore
	HIDDEN = 1 << 16,
// @ts-ignore
	DELETED_FOR_ALL = 1 << 17,
// @ts-ignore
	INBOX_FROM_CHAT = 1 << 19,
// @ts-ignore
	SILENT = 1 << 20,
// @ts-ignore
	REPLIED = 1 << 21
// @ts-ignore
}
// @ts-ignore
/* eslint-enable no-bitwise */
// @ts-ignore

// @ts-ignore
export interface IMessageFlagsContextPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	peer_id: number;
// @ts-ignore
	flags: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessageFlagsContextOptions<S> =
// @ts-ignore
ContextFactoryOptions<number[], S>;
// @ts-ignore

// @ts-ignore
export class MessageFlagsContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IMessageFlagsContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	MessageFlagsContextType,
// @ts-ignore
	MessageFlagsContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public message?: MessageContext;
// @ts-ignore

// @ts-ignore
	public constructor(options: MessageFlagsContextOptions<S>) {
// @ts-ignore
		const [eventId, id, flags, peerId] = options.payload;
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'message_flags',
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
				flags,
// @ts-ignore
				id
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		if (options.payload.length > 4) {
// @ts-ignore
			this.message = new MessageContext({
// @ts-ignore
				api: this.api,
// @ts-ignore
				upload: this.upload,
// @ts-ignore
				source: UpdateSource.POLLING,
// @ts-ignore
				updateType: 4,
// @ts-ignore
				// @ts-expect-error
// @ts-ignore
				payload: options.payload
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a message is unread
// @ts-ignore
	 */
// @ts-ignore
	public get isUnread(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.UNREAD);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a message is outbox
// @ts-ignore
	 */
// @ts-ignore
	public get isOutbox(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.OUTBOX);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a message is important
// @ts-ignore
	 */
// @ts-ignore
	public get isImportant(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.IMPORTANT);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a message was sent from a web chat
// @ts-ignore
	 */
// @ts-ignore
	public get isFromWebChat(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.FROM_WEB_CHAT);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether a message has been sent or received from a friend
// @ts-ignore
	 */
// @ts-ignore
	public get isFriendMessage(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.FRIEND_MESSAGE);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if a message is marked as spam
// @ts-ignore
	 */
// @ts-ignore
	public get isMarkSpam(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.MARK_SPAM);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if the message was deleted locally
// @ts-ignore
	 */
// @ts-ignore
	public get isDeleted(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.DELЕTЕD);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a audio message has been listened
// @ts-ignore
	 */
// @ts-ignore
	public get isAudioMessageListened(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.AUDIO_MESSAGE_LISTENED);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if a message was sent from a client
// @ts-ignore
	 */
// @ts-ignore
	public get isFromClientChat(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.FROM_CLIENT_CHAT);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if message is unmarked as spam
// @ts-ignore
	 */
// @ts-ignore
	public get isUnmarkSpam(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.UNMARK_SPAM);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if it's a welcome message from the group
// @ts-ignore
	 */
// @ts-ignore
	public get isHidden(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.HIDDEN);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check if the message was deleted for all
// @ts-ignore
	 */
// @ts-ignore
	public get isDeletedForAll(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.DELETED_FOR_ALL);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the message is inbox from chat
// @ts-ignore
	 */
// @ts-ignore
	public get isInboxFromChat(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.INBOX_FROM_CHAT);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the message is silent (without notifications)
// @ts-ignore
	 */
// @ts-ignore
	public get isSilent(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.SILENT);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks a reply has been created to the message
// @ts-ignore
	 */
// @ts-ignore
	public get isReplied(): boolean {
// @ts-ignore
		return this.hasFlag(MessageFlag.REPLIED);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the message ID
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the destination identifier
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
	 * Returns the values of the flags
// @ts-ignore
	 */
// @ts-ignore
	public get flags(): number {
// @ts-ignore
		return this.payload.flags;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	protected hasFlag(flag: MessageFlag): boolean {
// @ts-ignore
		// eslint-disable-next-line no-bitwise
// @ts-ignore
		return Boolean(this.flags & flag);
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
			'flags',
// @ts-ignore
			'message',
// @ts-ignore
			'isUnread',
// @ts-ignore
			'isOutbox',
// @ts-ignore
			'isImportant',
// @ts-ignore
			'isFromWebChat',
// @ts-ignore
			'isFriendMessage',
// @ts-ignore
			'isMarkSpam',
// @ts-ignore
			'isDeleted',
// @ts-ignore
			'isAudioMessageListened',
// @ts-ignore
			'isFromClientChat',
// @ts-ignore
			'isUnmarkSpam',
// @ts-ignore
			'isHidden',
// @ts-ignore
			'isDeletedForAll',
// @ts-ignore
			'isInboxFromChat',
// @ts-ignore
			'isSilent',
// @ts-ignore
			'isReplied'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
