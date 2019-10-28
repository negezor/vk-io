import Context, { IContextOptions } from './context';

import { VKError } from '../../errors';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

/**
 * Causes of blocking
 */
const reasonNames = new Map([
	[0, 'other'],
	[1, 'spam'],
	[2, 'members_insult'],
	[3, 'obscene_expressions'],
	[4, 'messages_off_topic']
]);

const subTypes: Record<string, string> = {
	user_block: 'block_group_user',
	user_unblock: 'unblock_group_user'
};

export interface IGroupUserContextPayload {
	admin_id: number;
	user_id: number;
	comment: string;
	reason: number;
	unblock_date?: number;
	by_end_date?: number;
}

export type GroupUserContextOptions<S> =
	Omit<IContextOptions<IGroupUserContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class GroupUserContext<S = Record<string, any>>
	extends Context<IGroupUserContextPayload, S> {
	public constructor(options: GroupUserContextOptions<S>) {
		super({
			...options,

			type: 'group_user',
			subTypes: [
				subTypes[options.updateType]
			]
		});
	}

	/**
	 * Checks is join user
	 */
	public get isBlocked(): boolean {
		return this.subTypes.includes('block_group_user');
	}

	/**
	 * Checks is leave user
	 */
	public get isUnblocked(): boolean {
		return this.subTypes.includes('unblock_group_user');
	}

	/**
	 * Checks that the block has expired
	 */
	public get isExpired(): boolean | null {
		if (this.isBlocked) {
			return null;
		}

		return Boolean(this.payload.by_end_date);
	}

	/**
	 * Returns the identifier admin
	 */
	public get adminId(): number {
		return this.payload.admin_id;
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the reason for the ban
	 */
	public get reasonId(): number | null {
		return this.payload.reason || null;
	}

	/**
	 * Returns the reason name for the ban
	 */
	public get reasonName(): string | null {
		// @ts-ignore
		return reasonNames.get(this.reasonId);
	}

	/**
	 * Returns the unblock date or null if permanent
	 */
	public get unblockAt(): number | null {
		return this.payload.unblock_date || null;
	}

	/**
	 * Returns the administrator comment to block
	 */
	public get comment(): string | null {
		return this.payload.comment || null;
	}

	/**
	 * Adds a user to the community blacklist
	 */
	ban(params: object): Promise<number> {
		if (this.isBlocked) {
			return Promise.reject(new VKError({
				message: 'User is blocked',
				code: 'ALREADY_BANNED'
			}));
		}

		// @ts-ignore
		return this.vk.api.groups.ban({
			...params,

			group_id: this.$groupId!,
			user_id: this.userId
		});
	}

	/**
	 * Adds a user to the community blacklist
	 */
	unban(): Promise<number> {
		if (this.isUnblocked) {
			return Promise.reject(new VKError({
				message: 'User is not blocked',
				code: 'ALREADY_UNBANNED'
			}));
		}

		// @ts-ignore
		return this.vk.api.groups.unban({
			group_id: this.$groupId!,
			user_id: this.userId
		});
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'adminId',
			'userId',
			'reasonId',
			'reasonName',
			'comment',
			'isExpired',
			'isBlocked',
			'isUnblocked'
		]);
	}
}
