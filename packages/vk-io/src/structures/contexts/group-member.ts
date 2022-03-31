// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type GroupMemberContextType = 'group_member';
// @ts-ignore

// @ts-ignore
export type GroupMemberContextSubType =
// @ts-ignore
'group_leave'
// @ts-ignore
| 'group_join';
// @ts-ignore

// @ts-ignore
export interface IGroupMemberContextPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore
	self?: number;
// @ts-ignore
	join_type?: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupMemberContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IGroupMemberContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class GroupMemberContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IGroupMemberContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	GroupMemberContextType,
// @ts-ignore
	GroupMemberContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: GroupMemberContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'group_member',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as GroupMemberContextSubType
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
	public get isJoin(): boolean {
// @ts-ignore
		return this.subTypes.includes('group_join');
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
	public get isLeave(): boolean {
// @ts-ignore
		return this.subTypes.includes('group_leave');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is self leave user
// @ts-ignore
	 */
// @ts-ignore
	public get isSelfLeave(): boolean | undefined {
// @ts-ignore
		if (this.isJoin) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return Boolean(this.payload.self);
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
	 * Returns the join type
// @ts-ignore
	 */
// @ts-ignore
	public get joinType(): string | undefined {
// @ts-ignore
		if (this.isLeave) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.payload.join_type!;
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
			'userId',
// @ts-ignore
			'joinType',
// @ts-ignore
			'isJoin',
// @ts-ignore
			'isLeave',
// @ts-ignore
			'isSelfLeave'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
