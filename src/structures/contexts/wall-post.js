import Context from './context';

import { WallAttachment } from '../attachments';

export default class WallPostContext extends Context {
	/**
	 * constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 */
	constructor(vk, { type, object: update }) {
		super(vk);

		this.payload = update;

		this.attachments = [new WallAttachment(update, vk)];

		this.type = 'wall_post';
		this.subTypes = [
			type === 'wall_post_new'
				? 'new_wall_post'
				: 'new_wall_repost'
		];
	}

	/**
	 * Checks is repost
	 *
	 * @return {boolean}
	 */
	isRepost() {
		return this.subTypes.includes('new_wall_repost');
	}

	/**
	 * Returns the wall attachment
	 *
	 * @return {WallAttachment}
	 */
	getWall() {
		return this.attachments[0];
	}

	/**
	 * Removes a record from the wall
	 *
	 * @return {Promise}
	 */
	deletePost() {
		const wall = this.getWall();

		return this.vk.api.wall.delete({
			post_id: wall.getId(),
			owner_id: wall.getOwnerId()
		});
	}
}
