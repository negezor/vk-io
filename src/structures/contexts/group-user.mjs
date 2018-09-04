import Context from './context';

import { VKError } from '../../errors';

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
		this.$groupId = groupId;

		this.type = 'group_user';
		this.subTypes = [
			updateType === 'user_block'
				? 'block_group_user'
				: 'unblock_group_user'
		];
	}

	/**
	 * Checks is join user
	 *
	 * @return {boolean}
	 */
	get isBlocked() {
		return this.subTypes.includes('block_group_user');
	}

	/**
	 * Checks is leave user
	 *
	 * @return {boolean}
	 */
	get isUnblocked() {
		return this.subTypes.includes('unblock_group_user');
	}

	/**
	 * Checks that the block has expired
	 *
	 * @return {?boolean}
	 */
	get isExpired() {
		if (this.isBlocked) {
			return null;
		}

		return Boolean(this.payload.by_end_date);
	}

	/**
	 * Returns the identifier admin
	 *
	 * @return {?number}
	 */
	get adminId() {
		return this.payload.admin_id;
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
	 * Returns the reason for the ban
	 *
	 * @return {?number}
	 */
	get reasonId() {
		return this.payload.reason || null;
	}

	/**
	 * Returns the reason name for the ban
	 *
	 * @return {?string}
	 */
	get reasonName() {
		return reasonNames.get(this.reasonId);
	}

	/**
	 * Returns the administrator comment to block
	 *
	 * @return {?string}
	 */
	get comment() {
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
		if (this.isBlocked) {
			return Promise.reject(new VKError({
				message: 'User is blocked'
			}));
		}

		return this.vk.api.groups.banUser({
			...params,

			group_id: this.$groupId,
			user_id: this.userId
		});
	}

	/**
	 * Adds a user to the community blacklist
	 *
	 * @return {Promise}
	 */
	unbanUser() {
		if (this.isBlocked) {
			return Promise.reject(new VKError({
				message: 'User is not blocked'
			}));
		}

		return this.vk.api.groups.unbanUser({
			group_id: this.$groupId,
			user_id: this.userId
		});
	}
}
