import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type VoteContextType = 'vote';

export type VoteContextSubType = 'poll_vote_new';

export interface IVoteContextPayload {
	poll_id: number;
	user_id: number;
	owner_id: number;
	option_id: number;
}

export type VoteContextOptions<S> =
	ContextFactoryOptions<IVoteContextPayload, S>;

export class VoteContext<S = ContextDefaultState>
	extends Context<
	IVoteContextPayload,
	S,
	VoteContextType,
	VoteContextSubType
	> {
	public constructor(options: VoteContextOptions<S>) {
		super({
			...options,

			type: 'vote',
			subTypes: [
				options.updateType as VoteContextSubType
			]
		});
	}

	/**
	 * Returns the identifier poll
	 */
	public get id(): number {
		return this.payload.poll_id;
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the identifier owner
	 */
	public get ownerId(): number {
		return this.payload.owner_id;
	}

	/**
	 * Returns the identifier option
	 */
	public get optionId(): number {
		return this.payload.option_id;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'id',
			'userId',
			'ownerId',
			'optionId'
		]);
	}
}
