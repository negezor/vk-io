import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type GroupMemberContextType = 'group_member';

export type GroupMemberContextSubType =
'group_leave'
| 'group_join';

export interface IGroupMemberContextPayload {
	user_id: number;
	self?: number;
	join_type?: string;
}

export type GroupMemberContextOptions<S> =
	ContextFactoryOptions<IGroupMemberContextPayload, S>;

export class GroupMemberContext<S = ContextDefaultState>
	extends Context<
	IGroupMemberContextPayload,
	S,
	GroupMemberContextType,
	GroupMemberContextSubType
	> {
	public constructor(options: GroupMemberContextOptions<S>) {
		super({
			...options,

			type: 'group_member',
			subTypes: [
				options.updateType as GroupMemberContextSubType
			]
		});
	}

	/**
	 * Checks is join user
	 */
	public get isJoin(): boolean {
		return this.subTypes.includes('group_join');
	}

	/**
	 * Checks is leave user
	 */
	public get isLeave(): boolean {
		return this.subTypes.includes('group_leave');
	}

	/**
	 * Checks is self leave user
	 */
	public get isSelfLeave(): boolean | undefined {
		if (this.isJoin) {
			return undefined;
		}

		return Boolean(this.payload.self);
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the join type
	 */
	public get joinType(): string | undefined {
		if (this.isLeave) {
			return undefined;
		}

		return this.payload.join_type!;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'userId',
			'joinType',
			'isJoin',
			'isLeave',
			'isSelfLeave'
		]);
	}
}
