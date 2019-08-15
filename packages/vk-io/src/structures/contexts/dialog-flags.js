import Context from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes = {
	10: 'remove_dialog_flags',
	11: 'update_dialog_flags',
	12: 'set_dialog_flags'
};

export default class DialogFlagsContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		const [eventId, peerId, flags] = options.payload;

		super({
			...options,

			type: 'dialog_flags',
			subTypes: [
				subTypes[eventId]
			],

			payload: {
				peer_id: peerId,
				flags
			}
		});
	}

	/**
	 * Checks that an important dialogue
	 *
	 * @return {boolean}
	 */
	get isImportant() {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 1);
	}

	/**
	 * Checks that the unanswered dialog
	 *
	 * @return {boolean}
	 */
	get isUnanswered() {
		// eslint-disable-next-line no-bitwise
		return Boolean(this.flags & 2);
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
	 * Marks the conversation as answered or unchecked.
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	markAsAnsweredConversation(params) {
		return this.vk.api.messages.markAsAnsweredConversation({
			...params,

			peer_id: this.peerId
		});
	}

	/**
	 * Marks the conversation as important or removes the mark
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	markAsImportantConversation(params) {
		return this.vk.api.messages.markAsImportantConversation({
			...params,

			peer_id: this.peerId
		});
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'peerId',
			'flags',
			'isImportant',
			'isUnanswered'
		]);
	}
}
