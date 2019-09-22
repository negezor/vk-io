import Context, { IContextOptions } from './context';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

export interface IVoteContextPayload {
	poll_id: number;
	user_id: number;
	owner_id: number;
	option_id: number;
}

export type VoteContextOptions<S> =
	Omit<IContextOptions<IVoteContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class VoteContext<S = Record<string, any>>
	extends Context<IVoteContextPayload, S> {
	public constructor(options: VoteContextOptions<S>) {
		super({
			...options,

			type: 'vote',
			subTypes: [
				'pull_vote'
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
	public [inspectCustomData](): object {
		return copyParams(this, [
			'id',
			'userId',
			'ownerId',
			'optionId'
		]);
	}
}
