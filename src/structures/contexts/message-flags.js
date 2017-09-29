'use strict';

import Context from './context';

export default class MessageFlagsContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}    vk
	 * @param {Array} update
	 */
	constructor (vk, [eventId, id, flags, peer]) {
		super(vk);

		this.payload = {
			peer_id: peer,
			flags,
			id
		};

		this.type = 'message_flags';
		this.subTypes = [
			eventId === 1
				? 'message_replace_flags'
				: eventId === 2
					? 'message_set_flags'
					: 'message_removed_flags'
		];
	}

	/**
	 * Verifies that the message is not read
	 *
	 * @return {boolean}
	 */
	isUnread () {
		return Boolean(this.payload.flags & 1);
	}

	/**
	 * Checks that the outgoing message
	 *
	 * @return {boolean}
	 */
	isOutbox () {
		return Boolean(this.payload.flags & 2);
	}

	/**
	 * Verifies that a reply has been created to the message
	 *
	 * @return {boolean}
	 */
	isReplied () {
		return Boolean(this.payload.flags & 4);
	}

	/**
	 * Verifies that the marked message
	 *
	 * @return {boolean}
	 */
	isImportant () {
		return Boolean(this.payload.flags & 8);
	}

	/**
	 * Verifies that the message was sent via chat
	 *
	 * @return {boolean}
	 */
	isChat () {
		return Boolean(this.payload.flags & 16);
	}

	/**
	 * Verifies that the message was sent by a friend
	 *
	 * @return {boolean}
	 */
	isFriends () {
		return Boolean(this.payload.flags & 32);
	}

	/**
	 * Verifies that the message is marked as "Spam"
	 *
	 * @return {boolean}
	 */
	isSpam () {
		return Boolean(this.payload.flags & 64);
	}

	/**
	 * Verifies that the message has been deleted (in the Recycle Bin)
	 *
	 * @return {boolean}
	 */
	isDeleted () {
		return Boolean(this.payload.flags & 128);
	}

	/**
	 * Verifies that the message was verified by the user for spam
	 *
	 * @return {boolean}
	 */
	isFixed () {
		return Boolean(this.payload.flags & 256);
	}

	/**
	 * Verifies that the message contains media content
	 *
	 * @return {boolean}
	 */
	isMedia () {
		return Boolean(this.payload.flags & 512);
	}

	/**
	 * Checks that a welcome message from the community
	 *
	 * @return {boolean}
	 */
	isHidden () {
		return Boolean(this.payload.flags & 65536);
	}

	/**
	 * Returns the message ID
	 *
	 * @return {number}
	 */
	getId () {
		return this.payload.id;
	}

	/**
	 * Returns the destination identifier
	 *
	 * @return {number}
	 */
	getPeerId () {
		return this.payload.peer_id;
	}

	/**
	 * Returns the values of the flags
	 *
	 * @return {number}
	 */
	getFlags () {
		return this.payload.flags;
	}
}
