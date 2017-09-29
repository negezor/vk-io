'use strict';

import Context from './context';

export default class ReadMessagesContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}    vk
	 * @param {Array} update
	 */
	constructor (vk, [eventId, peer, id]) {
		super(vk);

		this.payload = {
			peer_id: peer,
			id
		};

		this.type = 'read_messages';
		this.subTypes = [
			eventId === 6
				? 'read_inbox_messages'
				: 'read_oubox_messages'
		];
	}

	/**
	 * Checks that inbox messages are read
	 *
	 * @return {boolean}
	 */
	isInbox () {
		return this.subTypes.includes('read_inbox_messages');
	}

	/**
	 * Checks that outbox messages are read
	 *
	 * @return {boolean}
	 */
	isOutbox () {
		return this.subTypes.includes('read_oubox_messages');
	}

	/**
	 * Returns the ID before the message read
	 *
	 * @return {number}
	 */
	getId () {
		return this.payload.id;
	}

	/**
	 * Returns the peer ID
	 *
	 * @return {number}
	 */
	getPeerId () {
		return this.payload.peer_id;
	}
}
