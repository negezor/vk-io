import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type LikeContextType = 'like';

export type LikeContextSubType = 'like_add' | 'like_remove';

export interface ILikeContextPayload {
	liker_id: number;

	object_id: number;
	object_owner_id: number;
	object_type: 'video' | 'photo' | 'comment' | 'note' | 'topic_comment' | 'photo_comment' | 'video_comment' | 'market' | 'market_comment';

	post_id: number;
	thread_reply_id: number;
}

export type LikeContextOptions<S> =
	ContextFactoryOptions<ILikeContextPayload, S>;

export class LikeContext<S = ContextDefaultState>
	extends Context<
	ILikeContextPayload,
	S,
	LikeContextType,
	LikeContextSubType
	> {
	public constructor(options: LikeContextOptions<S>) {
		super({
			...options,

			type: 'like',
			subTypes: [
				options.updateType as LikeContextSubType
			]
		});
	}

	/**
	 * Returns the id of the user who interacts with the like
	 */
	public get likerId(): number {
		return this.payload.liker_id;
	}

	/**
	 * Returns the material id
	 */
	public get objectId(): number {
		return this.payload.object_id;
	}

	/**
	 * Returns the material owner id
	 */
	public get objectOwnerId(): number {
		return this.payload.object_owner_id;
	}

	/**
	 * Returns the material type
	 */
	public get objectType(): ILikeContextPayload['object_type'] {
		return this.payload.object_type;
	}

	/**
	 * Returns the post id (returned for a comment left under the post)
	 */
	public get postId(): number {
		return this.payload.post_id;
	}

	/**
	 * Returns the parent comment / post id.
	 */
	public get threadReplyId(): number {
		return this.payload.thread_reply_id;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'likerId',
			'objectId',
			'objectOwnerId',
			'objectType',
			'postId',
			'threadReplyId'
		]);
	}
}
