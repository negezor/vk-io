// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { Attachmentable } from '../shared/attachmentable';
// @ts-ignore
import { PhotoAttachment, IPhotoAttachmentPayload } from '../attachments';
// @ts-ignore

// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore
import { pickProperties, applyMixins } from '../../utils/helpers';
// @ts-ignore

// @ts-ignore
export type GroupUpdateContextType = 'group_update';
// @ts-ignore

// @ts-ignore
export type GroupUpdateContextSubType =
// @ts-ignore
'group_change_photo'
// @ts-ignore
| 'group_officers_edit'
// @ts-ignore
| 'group_change_settings';
// @ts-ignore

// @ts-ignore
export interface IGroupUpdateContextPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore
	admin_id: number;
// @ts-ignore
	level_old?: number;
// @ts-ignore
	level_new?: number;
// @ts-ignore
	changes?: Record<string, { old_value: string; new_value: string }>;
// @ts-ignore
	photo?: IPhotoAttachmentPayload;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type GroupUpdateContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IGroupUpdateContextPayload, S>;
// @ts-ignore

// @ts-ignore
class GroupUpdateContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IGroupUpdateContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	GroupUpdateContextType,
// @ts-ignore
	GroupUpdateContextSubType> {
// @ts-ignore
	public constructor(options: GroupUpdateContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'group_update',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as GroupUpdateContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.attachments = options.updateType === 'group_change_photo'
// @ts-ignore
			? [new PhotoAttachment({
// @ts-ignore
				api: this.api,
// @ts-ignore
				payload: this.payload.photo!
// @ts-ignore
			})]
// @ts-ignore
			: [];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is change photo
// @ts-ignore
	 */
// @ts-ignore
	public get isChangePhoto(): boolean {
// @ts-ignore
		return this.subTypes.includes('group_change_photo');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is change officers
// @ts-ignore
	 */
// @ts-ignore
	public get isChangeOfficers(): boolean {
// @ts-ignore
		return this.subTypes.includes('group_officers_edit');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is change settings
// @ts-ignore
	 */
// @ts-ignore
	public get isChangeSettings(): boolean {
// @ts-ignore
		return this.subTypes.includes('group_change_settings');
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
	public get adminId(): number | undefined {
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
	 * Returns the old level permission
// @ts-ignore
	 */
// @ts-ignore
	public get oldLevel(): number | undefined {
// @ts-ignore
		return this.payload.level_old;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the new level permission
// @ts-ignore
	 */
// @ts-ignore
	public get newLevel(): number | undefined {
// @ts-ignore
		return this.payload.level_new;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the changes settings
// @ts-ignore
	 */
// @ts-ignore
	public get changes(): Record<string, { old_value: string; new_value: string }> | undefined {
// @ts-ignore
		return this.payload.changes;
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
			'oldLevel',
// @ts-ignore
			'newLevel',
// @ts-ignore
			'changes',
// @ts-ignore
			'attachments'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface GroupUpdateContext extends Attachmentable {}
// @ts-ignore
applyMixins(GroupUpdateContext, [Attachmentable]);
// @ts-ignore

// @ts-ignore
export { GroupUpdateContext };
