import Context from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes = {
	1: 'update_message_flags',
	2: 'set_message_flags',
	3: 'remove_message_flags'
};

export default class MessageFlagsContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Array}  payload
	 * @param {Object} options
	 */
	constructor(vk, [eventId, id, flags, peerId]) {
		super(vk);

		this.payload = {
			peer_id: peerId,
			flags,
			id
		};

		this.type = 'message_flags';
		this.subTypes = [
			subTypes[eventId]
		];
	}

	/**
	 * Verifies that the message is not read
	 *
	 * @return {boolean}
	 */
	get isUnread() {
		return Boolean(this.flags & 1);
	}

	/**
	 * Checks that the outgoing message
	 *
	 * @return {boolean}
	 */
	get isOutbox() {
		return Boolean(this.flags & 2);
	}

	/**
	 * Verifies that a reply has been created to the message
	 *
	 * @return {boolean}
	 */
	get isReplied() {
		return Boolean(this.flags & 4);
	}

	/**
	 * Verifies that the marked message
	 *
	 * @return {boolean}
	 */
	get isImportant() {
		return Boolean(this.flags & 8);
	}

	/**
	 * Verifies that the message was sent via chat
	 *
	 * @return {boolean}
	 */
	get isChat() {
		return Boolean(this.flags & 16);
	}

	/**
	 * Verifies that the message was sent by a friend
	 *
	 * @return {boolean}
	 */
	get isFriends() {
		return Boolean(this.flags & 32);
	}

	/**
	 * Verifies that the message is marked as "Spam"
	 *
	 * @return {boolean}
	 */
	get isSpam() {
		return Boolean(this.flags & 64);
	}

	/**
	 * Verifies that the message has been deleted (in the Recycle Bin)
	 *
	 * @return {boolean}
	 */
	get isDeleted() {
		return Boolean(this.flags & 128);
	}

	/**
	 * Verifies that the message was verified by the user for spam
	 *
	 * @return {boolean}
	 */
	get isFixed() {
		return Boolean(this.flags & 256);
	}

	/**
	 * Verifies that the message contains media content
	 *
	 * @return {boolean}
	 */
	get isMedia() {
		return Boolean(this.flags & 512);
	}

	/**
	 * Checks that a welcome message from the community
	 *
	 * @return {boolean}
	 */
	get isHidden() {
		return Boolean(this.flags & 65536);
	}

	/**
	 * Message deleted for all recipients
	 *
	 * @return {boolean}
	 */
	get isDeletedForAll() {
		return Boolean(this.flags & 131072);
	}

	/**
	 * Returns the message ID
	 *
	 * @return {number}
	 */
	get id() {
		return this.payload.id;
	}

	/**
	 * Returns the destination identifier
	 *
	 * @return {number}
	 */
	get peerId() {
		return this.payload.peer_id;
	}

	/**
	 * Returns the values of the flags
	 *
	 * @return {number}
	 */
	get flags() {
		return this.payload.flags;
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'id',
			'peerId',
			'flags'
		]);
	}
}
