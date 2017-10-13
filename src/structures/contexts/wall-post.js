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

		this.attachments = [new WallAttachment(this.vk, update)];

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
}
