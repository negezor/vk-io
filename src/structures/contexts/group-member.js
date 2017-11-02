import Context from './context';

export default class GroupMemberContext extends Context {
	/**
	 * Constructro
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 */
	constructor(vk, { type, object: update }) {
		super(vk);

		this.payload = update;

		this.type = 'group_member';
		this.subTypes = [
			type === 'group_leave'
				? 'leave_group_member'
				: 'join_group_member'
		];
	}

	/**
	 * Checks is join user
	 *
	 * @return {boolean}
	 */
	isJoin() {
		return this.subTypes.includes('join_group_member');
	}

	/**
	 * Checks is leave user
	 *
	 * @return {boolean}
	 */
	isLeave() {
		return this.subTypes.includes('leave_group_member');
	}

	/**
	 * Checks is self leave user
	 *
	 * @return {?boolean}
	 */
	isSelfLeave() {
		if (this.isJoin()) {
			return null;
		}

		return Boolean(this.payload.self);
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
	 * Returns the join type
	 *
	 * @return {?string}
	 */
	getJoinType() {
		if (this.isLeave()) {
			return null;
		}

		return this.payload.join_type;
	}
}
