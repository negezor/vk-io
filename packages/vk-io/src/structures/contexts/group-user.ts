// @ts-ignore
import { Params } from '../../api';
// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { VKError } from '../../errors';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
/**
// @ts-ignore
 * Causes of blocking
// @ts-ignore
 */
// @ts-ignore
const reasonNames = new Map([
// @ts-ignore
	[0, 'other'],
// @ts-ignore
	[1, 'spam'],
// @ts-ignore
	[2, 'members_insult'],
// @ts-ignore
	[3, 'obscene_expressions'],
// @ts-ignore
	[4, 'messages_off_topic']
// @ts-ignore
]);
// @ts-ignore

// @ts-ignore
export type GroupUserContextType = 'group_user';
// @ts-ignore

// @ts-ignore
export type GroupUserContextSubType =
// @ts-ignore
'user_block'
// @ts-ignore
| 'user_unblock';
// @ts-ignore

// @ts-ignore
export interface IGroupUserContextPayload {
// @ts-ignore
	admin_id: number;
// @ts-ignore
	user_id: number;
// @ts-ignore
	comment: string;
// @ts-ignore
	reason: number;
// @ts-ignore
	unblock_date?: number;
// @ts-ignore
	by_end_date?: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupUserContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IGroupUserContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class GroupUserContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IGroupUserContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	GroupUserContextType,
// @ts-ignore
	GroupUserContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: GroupUserContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'group_user',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as GroupUserContextSubType
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
	 * Checks is join user
// @ts-ignore
	 */
// @ts-ignore
	public get isBlocked(): boolean {
// @ts-ignore
		return this.subTypes.includes('user_block');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is leave user
// @ts-ignore
	 */
// @ts-ignore
	public get isUnblocked(): boolean {
// @ts-ignore
		return this.subTypes.includes('user_unblock');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the block has expired
// @ts-ignore
	 */
// @ts-ignore
	public get isExpired(): boolean | undefined {
// @ts-ignore
		if (this.isBlocked) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.by_end_date);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier admin
// @ts-ignore
	 */
// @ts-ignore
	public get adminId(): number {
// @ts-ignore
		return this.payload.admin_id;
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
	 * Returns the reason for the ban
// @ts-ignore
	 */
// @ts-ignore
	public get reasonId(): number | undefined {
// @ts-ignore
		return this.payload.reason;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the reason name for the ban
// @ts-ignore
	 */
// @ts-ignore
	public get reasonName(): string | undefined {
// @ts-ignore
		return reasonNames.get(this.reasonId!);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the unblock date or undefined if permanent
// @ts-ignore
	 */
// @ts-ignore
	public get unblockAt(): number | undefined {
// @ts-ignore
		return this.payload.unblock_date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the administrator comment to block
// @ts-ignore
	 */
// @ts-ignore
	public get comment(): string | undefined {
// @ts-ignore
		return this.payload.comment;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds a user to the community blacklist
// @ts-ignore
	 */
// @ts-ignore
	ban(params: Partial<Params.GroupsBanParams>): Promise<number> {
// @ts-ignore
		if (this.isBlocked) {
// @ts-ignore
			return Promise.reject(new VKError({
// @ts-ignore
				message: 'User is blocked',
// @ts-ignore
				code: 'ALREADY_BANNED'
// @ts-ignore
			}));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.api.groups.ban({
// @ts-ignore
			...params,
// @ts-ignore

// @ts-ignore
			group_id: this.$groupId!,
// @ts-ignore
			user_id: this.userId
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Adds a user to the community blacklist
// @ts-ignore
	 */
// @ts-ignore
	unban(): Promise<number> {
// @ts-ignore
		if (this.isUnblocked) {
// @ts-ignore
			return Promise.reject(new VKError({
// @ts-ignore
				message: 'User is not blocked',
// @ts-ignore
				code: 'ALREADY_UNBANNED'
// @ts-ignore
			}));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.api.groups.unban({
// @ts-ignore
			group_id: this.$groupId!,
// @ts-ignore
			user_id: this.userId
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
			'adminId',
// @ts-ignore
			'userId',
// @ts-ignore
			'reasonId',
// @ts-ignore
			'reasonName',
// @ts-ignore
			'comment',
// @ts-ignore
			'isExpired',
// @ts-ignore
			'isBlocked',
// @ts-ignore
			'isUnblocked'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
