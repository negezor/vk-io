import Context from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

export default class VoteContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		super({
			...options,

			type: 'vote',
			subTypes: [
				'pull_vote'
			]
		});
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

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'id',
			'userId',
			'ownerId',
			'optionId'
		]);
	}
}
