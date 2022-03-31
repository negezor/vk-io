// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { WallAttachment, IWallAttachmentPayload } from '../attachments';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type WallPostContextType = 'wall_post';
// @ts-ignore

// @ts-ignore
export type WallPostContextSubType =
// @ts-ignore
'wall_post_new'
// @ts-ignore
| 'wall_repost';
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-empty-interface
// @ts-ignore
export interface IWallPostContextPayload extends IWallAttachmentPayload {
// @ts-ignore

// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type WallPostContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IWallPostContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class WallPostContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IWallPostContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	WallPostContextType,
// @ts-ignore
	WallPostContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public wall: WallAttachment;
// @ts-ignore

// @ts-ignore
	public constructor(options: WallPostContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'wall_post',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as WallPostContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.wall = new WallAttachment({
// @ts-ignore
			api: this.api,
// @ts-ignore
			payload: this.payload
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is repost
// @ts-ignore
	 */
// @ts-ignore
	public get isRepost(): boolean {
// @ts-ignore
		return this.subTypes.includes('wall_repost');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Removes a record from the wall
// @ts-ignore
	 */
// @ts-ignore
	public deletePost(): Promise<number> {
// @ts-ignore
		const { wall } = this;
// @ts-ignore

// @ts-ignore
		return this.api.wall.delete({
// @ts-ignore
			post_id: wall.id,
// @ts-ignore
			owner_id: wall.ownerId
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'wall',
// @ts-ignore
			'isRepost'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
