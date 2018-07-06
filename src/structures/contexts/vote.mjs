import Context from './context';

export default class VoteContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 * @param {Object} options
	 */
	constructor(vk, payload, { groupId }) {
		super(vk);

		this.payload = payload;
		this.$groupId = groupId;

		this.type = 'vote';
		this.subTypes = ['pull_vote'];
	}

	/**
	 * Returns the identifier poll
	 *
	 * @return {number}
	 */
	get id() {
		return this.payload.poll_id;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {number}
	 */
	get userId() {
		return this.payload.user_id;
	}

	/**
	 * Returns the identifier owner
	 *
	 * @return {number}
	 */
	get ownerId() {
		return this.payload.owner_id;
	}

	/**
	 * Returns the identifier option
	 *
	 * @return {number}
	 */
	get optionId() {
		return this.payload.option_id;
	}
}
