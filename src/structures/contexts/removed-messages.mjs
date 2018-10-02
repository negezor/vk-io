import Context from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes = {
	13: 'delete_messages',
	14: 'restore_messages'
};

export default class RemovedMessagesContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Arrray} payload
	 * @param {Object} options
	 */
	constructor(vk, [eventId, peerId, id]) {
		super(vk);

		this.payload = {
			peer_id: peerId,
			id
		};

		this.type = 'removed_messages';
		this.subTypes = [
			subTypes[eventId]
		];
	}

	/**
	 * Checks that messages have been deleted
	 *
	 * @return {boolean}
	 */
	get isRemoved() {
		return this.subTypes.includes('delete_messages');
	}

	/**
	 * Checks that messages have been restored
	 *
	 * @return {boolean}
	 */
	get isRecovery() {
		return this.subTypes.includes('restore_messages');
	}

	/**
	 * Returns the identifier of the message
	 *
	 * @return {string}
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
			'isRemoved',
			'isRecovery'
		]);
	}
}
