import Context from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes = {
	6: 'read_inbox_messages',
	7: 'read_outbox_messages'
};

export default class ReadMessagesContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Array}  payload
	 * @param {Object} options
	 */
	constructor(vk, [eventId, peerId, id]) {
		super(vk);

		this.payload = {
			peer_id: peerId,
			id
		};

		this.type = 'read_messages';
		this.subTypes = [
			subTypes[eventId]
		];
	}

	/**
	 * Checks that inbox messages are read
	 *
	 * @return {boolean}
	 */
	get isInbox() {
		return this.subTypes.includes('read_inbox_messages');
	}

	/**
	 * Checks that outbox messages are read
	 *
	 * @return {boolean}
	 */
	get isOutbox() {
		return this.subTypes.includes('read_outbox_messages');
	}

	/**
	 * Returns the ID before the message read
	 *
	 * @return {number}
	 */
	get id() {
		return this.payload.id;
	}

	/**
	 * Returns the peer ID
	 *
	 * @return {number}
	 */
	get peerId() {
		return this.payload.peer_id;
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
			'isInbox',
			'isOutbox'
		]);
	}
}
