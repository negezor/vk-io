import Attachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

const { POLL } = attachmentTypes;

export default class PollAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(POLL, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'answers' in payload;
	}

	/**
	 * Load attachment payload
	 *
	 * @return {Promise}
	 */
	async loadAttachmentPayload() {
		if (this.$filled) {
			return;
		}

		const [poll] = await this.vk.api.polls.getById({
			poll_id: this.id,
			owner_id: this.ownerId
		});

		this.payload = poll;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks whether the poll is anonymous
	 *
	 * @return {?boolean}
	 */
	get isAnonymous() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.anonymous;
	}

	/**
	 * Checks whether the poll allows multiple choice of answers
	 *
	 * @return {?boolean}
	 */
	get isMultiple() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.multiple;
	}

	/**
	 * Checks whether the poll is complete
	 *
	 * @return {?boolean}
	 */
	get isClosed() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.closed;
	}

	/**
	 * Check whether questions are attached to the discussion
	 *
	 * @return {?boolean}
	 */
	get isBoard() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.is_board;
	}

	/**
	 * Check if can edit the poll
	 *
	 * @return {?boolean}
	 */
	get isCanEdit() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.can_edit;
	}

	/**
	 * Check if can vote in the survey
	 *
	 * @return {?boolean}
	 */
	get isCanVote() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.can_vote;
	}

	/**
	 * Check if can complain about the poll
	 *
	 * @return {?boolean}
	 */
	get isCanReport() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.can_report;
	}

	/**
	 * Check if can share a survey
	 *
	 * @return {?boolean}
	 */
	get isCanShare() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.can_share;
	}

	/**
	 * Returns the ID of the poll author
	 *
	 * @return {?number}
	 */
	get authorId() {
		return this.payload.author_id || null;
	}

	/**
	 * Returns the identifiers of 3 friends who voted in the poll
	 *
	 * @return {?Object[]}
	 */
	get friends() {
		return this.payload.friends || null;
	}

	/**
	 * Returns the date when this poll was created
	 *
	 * @return {?number}
	 */
	get created() {
		return this.payload.created || null;
	}

	/**
	 * Returns the question text
	 *
	 * @return {?string}
	 */
	get question() {
		return this.payload.question || null;
	}

	/**
	 * Returns the number of votes
	 *
	 * @return {?number}
	 */
	get votes() {
		return this.payload.votes || null;
	}

	/**
	 * Returns the information about the options for the answer
	 *
	 * @return {?Object[]}
	 */
	get answers() {
		return this.payload.answers || null;
	}

	/**
	 * Returns a photo - the poll snippet background
	 *
	 * @return {?Object}
	 */
	get photo() {
		return this.payload.photo || null;
	}

	/**
	 * Returns the poll snippet background
	 *
	 * @return {?Object}
	 */
	get background() {
		return this.payload.background || null;
	}
}
