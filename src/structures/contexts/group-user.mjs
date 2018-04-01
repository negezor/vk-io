import Context from './context';

/**
 * Causes of blocking
 *
 * @type {Map}
 */
const reasonNames = new Map([
	[0, 'other'],
	[1, 'spam'],
	[2, 'members_insult'],
	[3, 'obscene_expressions'],
	[4, 'messages_off_topic']
]);

export default class GroupUserContext extends Context {
	/**
	 * Constructror
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 * @param {Object} options
	 */
	constructor(vk, payload, { updateType, groupId }) {
		super(vk);

		this.payload = payload;

		this.type = 'group_user';
		this.subTypes = [
			updateType === 'user_block'
				? 'block_group_user'
				: 'unblock_group_user'
		];

		this.$groupId = groupId;
	}

	/**
	 * Checks is join user
	 *
	 * @return {boolean}
	 */
	isBlock() {
		return this.subTypes.includes('block_group_user');
	}

	/**
	 * Checks is leave user
	 *
	 * @return {boolean}
	 */
	isUnblock() {
		return this.subTypes.includes('unblock_group_user');
	}

	/**
	 * Checks that the block has expired
	 *
	 * @return {?boolean}
	 */
	isExpired() {
		if (this.isBlock()) {
			return null;
		}

		return Boolean(this.payload.by_end_date);
	}

	/**
	 * Returns the identifier admin
	 *
	 * @return {?number}
	 */
	getAdminId() {
		return this.payload.admin_id;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {number}
	 */
	getUserId() {
		return this.payload.user_id;
	}

	/**
	 * Returns the reason for the ban
	 *
	 * @return {?number}
	 */
	getReasonId() {
		return this.payload.reason || null;
	}

	/**
	 * Returns the reason name for the ban
	 *
	 * @return {?string}
	 */
	getReasonName() {
		return reasonNames.get(this.payload.reason);
	}

	/**
	 * Returns the administrator comment to block
	 *
	 * @return {?string}
	 */
	getComment() {
		return this.payload.comment || null;
	}

	/**
	 * Adds a user to the community blacklist
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	banUser(params) {
		if (this.isBlock()) {
			return Promise.reject(new Error('User is blocked'));
		}

		return this.vk.api.groups.banUser({
			...params,

			group_id: this.$groupId,
			user_id: this.payload.user_id
		});
	}

	/**
	 * Adds a user to the community blacklist
	 *
	 * @return {Promise}
	 */
	unbanUser() {
		if (this.isUnblock()) {
			return Promise.reject(new Error('User is not blocked'));
		}

		return this.vk.api.groups.unbanUser({
			group_id: this.$groupId,
			user_id: this.payload.user_id
		});
	}
}
