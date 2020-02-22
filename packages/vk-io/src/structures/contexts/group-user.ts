import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { VKError } from '../../errors';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

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

export type GroupUserContextType = 'group_user';

export type GroupUserContextSubType =
'block_group_user'
| 'unblock_group_user';

const subTypes: Record<string, GroupUserContextSubType> = {
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
	ContextFactoryOptions<IGroupUserContextPayload, S>;

export class GroupUserContext<S = ContextDefaultState>
	extends Context<
	IGroupUserContextPayload,
	S,
	GroupUserContextType,
	GroupUserContextSubType
	> {
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
	public get isExpired(): boolean | undefined {
		if (this.isBlocked) {
			return undefined;
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
	public get reasonId(): number | undefined {
		return this.payload.reason;
	}

	/**
	 * Returns the reason name for the ban
	 */
	public get reasonName(): string | undefined {
		return reasonNames.get(this.reasonId!);
	}

	/**
	 * Returns the unblock date or undefined if permanent
	 */
	public get unblockAt(): number | undefined {
		return this.payload.unblock_date;
	}

	/**
	 * Returns the administrator comment to block
	 */
	public get comment(): string | undefined {
		return this.payload.comment;
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

		return this.vk.api.groups.unban({
			group_id: this.$groupId!,
			user_id: this.userId
		});
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
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
