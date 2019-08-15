import Context from './context';

import { WallAttachment } from '../attachments';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes = {
	wall_post_new: 'new_wall_post',
	wall_repost: 'new_wall_repost'
};

export default class WallPostContext extends Context {
	/**
	 * constructor
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		super({
			...options,

			type: 'wall_post',
			subTypes: [
				subTypes[options.updateType]
			]
		});

		this.wall = new WallAttachment(this.payload, this.vk);
	}

	/**
	 * Checks is repost
	 *
	 * @return {boolean}
	 */
	get isRepost() {
		return this.subTypes.includes('new_wall_repost');
	}

	/**
	 * Removes a record from the wall
	 *
	 * @return {Promise}
	 */
	deletePost() {
		const { wall } = this;

		return this.vk.api.wall.delete({
			post_id: wall.id,
			owner_id: wall.ownerId
		});
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'wall',
			'isRepost'
		]);
	}
}
