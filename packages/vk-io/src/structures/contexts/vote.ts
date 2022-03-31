// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type VoteContextType = 'vote';
// @ts-ignore

// @ts-ignore
export type VoteContextSubType = 'poll_vote_new';
// @ts-ignore

// @ts-ignore
export interface IVoteContextPayload {
// @ts-ignore
	poll_id: number;
// @ts-ignore
	user_id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	option_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type VoteContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IVoteContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class VoteContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IVoteContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	VoteContextType,
// @ts-ignore
	VoteContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: VoteContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'vote',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as VoteContextSubType
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
	 * Returns the identifier poll
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.payload.poll_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier user
// @ts-ignore
	 */
// @ts-ignore
	public get userId(): number {
// @ts-ignore
		return this.payload.user_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier owner
// @ts-ignore
	 */
// @ts-ignore
	public get ownerId(): number {
// @ts-ignore
		return this.payload.owner_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier option
// @ts-ignore
	 */
// @ts-ignore
	public get optionId(): number {
// @ts-ignore
		return this.payload.option_id;
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
			'id',
// @ts-ignore
			'userId',
// @ts-ignore
			'ownerId',
// @ts-ignore
			'optionId'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
