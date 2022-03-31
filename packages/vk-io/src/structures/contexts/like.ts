// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type LikeContextType = 'like';
// @ts-ignore

// @ts-ignore
export type LikeContextSubType = 'like_add' | 'like_remove';
// @ts-ignore

// @ts-ignore
export interface ILikeContextPayload {
// @ts-ignore
	liker_id: number;
// @ts-ignore

// @ts-ignore
	object_id: number;
// @ts-ignore
	object_owner_id: number;
// @ts-ignore
	object_type: 'video' | 'photo' | 'comment' | 'note' | 'topic_comment' | 'photo_comment' | 'video_comment' | 'market' | 'market_comment';
// @ts-ignore

// @ts-ignore
	post_id: number;
// @ts-ignore
	thread_reply_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type LikeContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<ILikeContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class LikeContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	ILikeContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	LikeContextType,
// @ts-ignore
	LikeContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: LikeContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'like',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as LikeContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the id of the user who interacts with the like
// @ts-ignore
	 */
// @ts-ignore
	public get likerId(): number {
// @ts-ignore
		return this.payload.liker_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the material id
// @ts-ignore
	 */
// @ts-ignore
	public get objectId(): number {
// @ts-ignore
		return this.payload.object_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the material owner id
// @ts-ignore
	 */
// @ts-ignore
	public get objectOwnerId(): number {
// @ts-ignore
		return this.payload.object_owner_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the material type
// @ts-ignore
	 */
// @ts-ignore
	public get objectType(): ILikeContextPayload['object_type'] {
// @ts-ignore
		return this.payload.object_type;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the post id (returned for a comment left under the post)
// @ts-ignore
	 */
// @ts-ignore
	public get postId(): number {
// @ts-ignore
		return this.payload.post_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the parent comment / post id.
// @ts-ignore
	 */
// @ts-ignore
	public get threadReplyId(): number {
// @ts-ignore
		return this.payload.thread_reply_id;
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
			'likerId',
// @ts-ignore
			'objectId',
// @ts-ignore
			'objectOwnerId',
// @ts-ignore
			'objectType',
// @ts-ignore
			'postId',
// @ts-ignore
			'threadReplyId'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
