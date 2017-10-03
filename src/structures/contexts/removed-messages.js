import Context from './context';

export default class RemovedMessagesContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Arrray} update
	 */
	constructor(vk, [eventId, peer, id]) {
		super(vk);

		this.payload = {
			peer_id: peer,
			id
		};

		this.type = 'removed_messages';
		this.subTypes = [
			eventId === 13
				? 'removed_messages'
				: 'recovery_messages'
		];
	}

	/**
	 * Checks that messages have been deleted
	 *
	 * @return {boolean}
	 */
	isRemoved() {
		return this.subTypes.includes('removed_messages');
	}

	/**
	 * Checks that messages have been restored
	 *
	 * @return {boolean}
	 */
	isRecovery() {
		return this.subTypes.includes('recovery_messages');
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
