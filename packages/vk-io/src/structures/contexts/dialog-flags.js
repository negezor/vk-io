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
	 * @param {VK}     vk
	 * @param {Array}  payload
	 * @param {Object} options
	 */
	constructor(vk, [eventId, peerId, flags]) {
		super(vk);

		this.payload = {
			peer_id: peerId,
			flags
		};

		this.type = 'dialog_flags';
		this.subTypes = [
			subTypes[eventId]
		];
	}

	/**
	 * Checks that an important dialogue
	 *
	 * @return {boolean}
	 */
	get isImportant() {
		return Boolean(this.flags & 1);
	}

	/**
	 * Checks that the unanswered dialog
	 *
	 * @return {boolean}
	 */
	get isUnanswered() {
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
	 * Marks the dialog as answered or unchecked.
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	markAsAnsweredDialog(params) {
		return this.vk.api.messages.markAsAnsweredDialog({
			...params,

			peer_id: this.peerId
		});
	}

	/**
	 * Marks the dialog as important or removes the mark
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	markAsImportantDialog(params) {
		return this.vk.api.messages.markAsImportantDialog({
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
