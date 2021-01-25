import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { WallAttachment, IWallAttachmentPayload } from '../attachments';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type WallPostContextType = 'wall_post';

export type WallPostContextSubType =
'wall_post_new'
| 'wall_repost';

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
				options.updateType as WallPostContextSubType
			]
		});

		this.wall = new WallAttachment({
			api: this.api,
			payload: this.payload
		});
	}

	/**
	 * Checks is repost
	 */
	public get isRepost(): boolean {
		return this.subTypes.includes('wall_repost');
	}

	/**
	 * Removes a record from the wall
	 */
	public deletePost(): Promise<number> {
		const { wall } = this;

		return this.api.wall.delete({
			post_id: wall.id,
			owner_id: wall.ownerId
		});
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'wall',
			'isRepost'
		]);
	}
}
