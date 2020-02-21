import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { WallAttachment, IWallAttachmentPayload } from '../attachments';

import { pickProperties } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

export type WallPostContextType = 'wall_post';

export type WallPostContextSubType =
'new_wall_post'
| 'new_wall_repost';

const subTypes: Record<string, WallPostContextSubType> = {
	wall_post_new: 'new_wall_post',
	wall_repost: 'new_wall_repost'
};

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IWallPostContextPayload extends IWallAttachmentPayload {

}

export type WallPostContextOptions<S> =
	ContextFactoryOptions<IWallPostContextPayload, S>;

export class WallPostContext<S = ContextDefaultState>
	extends Context<
	IWallPostContextPayload,
	S,
	WallPostContextType,
	WallPostContextSubType
	> {
	public wall: WallAttachment;

	public constructor(options: WallPostContextOptions<S>) {
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
	 */
	public get isRepost(): boolean {
		return this.subTypes.includes('new_wall_repost');
	}

	/**
	 * Removes a record from the wall
	 */
	public deletePost(): Promise<number> {
		const { wall } = this;

		return this.vk.api.wall.delete({
			post_id: wall.id,
			owner_id: wall.ownerId
		});
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return pickProperties(this, [
			'wall',
			'isRepost'
		]);
	}
}
