import Context, { IContextOptions } from './context';

import { WallAttachment } from '../attachments';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes: Record<string, string> = {
	wall_post_new: 'new_wall_post',
	wall_repost: 'new_wall_repost'
};

export interface IWallPostContextPayload {
	id: number;
}

export type WallPostContextOptions<S> =
	Omit<IContextOptions<IWallPostContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class WallPostContext<S = Record<string, any>>
	extends Context<IWallPostContextPayload, S> {
	public wall: WallAttachment;

	public constructor(options: WallPostContextOptions<S>) {
		super({
			...options,

			type: 'wall_post',
			subTypes: [
				subTypes[options.updateType]
			]
		});

		// @ts-ignore
		this.wall = new WallAttachment(this.payload, this.vk);
	}

	/**
	 * Checks is repost
	 */
	public get isRepost(): boolean {
		return this.subTypes.includes('new_wall_repost');
	}

	/**
	 * Removes a record from the wall
	 */
	public deletePost(): Promise<number> {
		const { wall } = this;

		// @ts-ignore
		return this.vk.api.wall.delete({
			post_id: wall.id,
			owner_id: wall.ownerId
		});
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'wall',
			'isRepost'
		]);
	}
}
