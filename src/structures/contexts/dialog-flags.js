import Context from './context';

export default class DialogFlagsContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}    vk
	 * @param {Array} update
	 */
	constructor(vk, [eventId, peer, flags]) {
		super(vk);

		this.payload = {
			peer_id: peer,
			flags
		};

		this.type = 'dialog_flags';
		this.subTypes = [
			// eslint-disable-next-line no-nested-ternary
			eventId === 10
				? 'remove_dialog_flags'
				: eventId === 11
					? 'update_dialog_flags'
					: 'set_dialog_flags'
		];
	}

	/**
	 * Checks that an important dialogue
	 *
	 * @return {boolean}
	 */
	isImportant() {
		return Boolean(this.payload.flags & 1);
	}

	/**
	 * Checks that the unanswered dialog
	 *
	 * @return {boolean}
	 */
	isUnanswered() {
		return Boolean(this.payload.flags & 2);
	}

	/**
	 * Returns the destination identifier
	 *
	 * @return {number}
	 */
	getPeerId() {
		return this.payload.peer_id;
	}

	/**
	 * Returns the values of the flags
	 *
	 * @return {number}
	 */
	getFlags() {
		return this.payload.flags;
	}
}
