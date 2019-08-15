import Context from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes = {
	group_leave: 'leave_group_member',
	group_join: 'join_group_member'
};

export default class GroupMemberContext extends Context {
	/**
	 * Constructro
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		super({
			...options,

			type: 'group_member',
			subTypes: [
				subTypes[options.updateType]
			]
		});
	}

	/**
	 * Checks is join user
	 *
	 * @return {boolean}
	 */
	get isJoin() {
		return this.subTypes.includes('join_group_member');
	}

	/**
	 * Checks is leave user
	 *
	 * @return {boolean}
	 */
	get isLeave() {
		return this.subTypes.includes('leave_group_member');
	}

	/**
	 * Checks is self leave user
	 *
	 * @return {?boolean}
	 */
	get isSelfLeave() {
		if (this.isJoin) {
			return null;
		}

		return Boolean(this.payload.self);
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
	 * Returns the join type
	 *
	 * @return {?string}
	 */
	get joinType() {
		if (this.isLeave) {
			return null;
		}

		return this.payload.join_type;
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'userId',
			'joinType',
			'isJoin',
			'isLeave',
			'isSelfLeave'
		]);
	}
}
