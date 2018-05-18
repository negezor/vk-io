import Context from './context';

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
			eventId === 13
				? 'delete_messages'
				: 'restore_messages'
		];
	}

	/**
	 * Checks that messages have been deleted
	 *
	 * @return {boolean}
	 */
	isRemoved() {
		return this.subTypes.includes('delete_messages');
	}

	/**
	 * Checks that messages have been restored
	 *
	 * @return {boolean}
	 */
	isRecovery() {
		return this.subTypes.includes('restore_messages');
	}

	/**
	 * Returns the identifier of the message
	 *
	 * @return {string}
	 */
	getId() {
		return this.payload.id;
	}

	/**
	 * Returns the peer ID
	 *
	 * @return {number}
	 */
	getPeerId() {
		return this.payload.peer_id;
	}
}
