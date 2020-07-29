import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { Attachmentable } from '../shared/attachmentable';
import { PhotoAttachment, IPhotoAttachmentPayload } from '../attachments';

import { kSerializeData } from '../../utils/constants';
import { pickProperties, applyMixins } from '../../utils/helpers';

export type GroupUpdateContextType = 'group_update';

export type GroupUpdateContextSubType =
'group_change_photo'
| 'group_officers_edit'
| 'group_change_settings';

export interface IGroupUpdateContextPayload {
	user_id: number;
	admin_id: number;
	level_old?: number;
	level_new?: number;
	changes?: Record<string, { old_value: string; new_value: string }>;
	photo?: IPhotoAttachmentPayload;
}

export type GroupUpdateContextOptions<S> =
	ContextFactoryOptions<IGroupUpdateContextPayload, S>;

class GroupUpdateContext<S = ContextDefaultState>
	extends Context<
	IGroupUpdateContextPayload,
	S,
	GroupUpdateContextType,
	GroupUpdateContextSubType> {
	public constructor(options: GroupUpdateContextOptions<S>) {
		super({
			...options,

			type: 'group_update',
			subTypes: [
				options.updateType as GroupUpdateContextSubType
			]
		});

		this.attachments = options.updateType === 'group_change_photo'
			? [new PhotoAttachment({
				api: this.api,
				payload: this.payload.photo!
			})]
			: [];
	}

	/**
	 * Checks is change photo
	 */
	public get isChangePhoto(): boolean {
		return this.subTypes.includes('group_change_photo');
	}

	/**
	 * Checks is change officers
	 */
	public get isChangeOfficers(): boolean {
		return this.subTypes.includes('group_officers_edit');
	}

	/**
	 * Checks is change settings
	 */
	public get isChangeSettings(): boolean {
		return this.subTypes.includes('group_change_settings');
	}

	/**
	 * Returns the identifier admin
	 */
	public get adminId(): number | undefined {
		return this.payload.admin_id;
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the old level permission
	 */
	public get oldLevel(): number | undefined {
		return this.payload.level_old;
	}

	/**
	 * Returns the new level permission
	 */
	public get newLevel(): number | undefined {
		return this.payload.level_new;
	}

	/**
	 * Returns the changes settings
	 */
	public get changes(): Record<string, { old_value: string; new_value: string }> | undefined {
		return this.payload.changes;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'adminId',
			'userId',
			'oldLevel',
			'newLevel',
			'changes',
			'attachments'
		]);
	}
}

// eslint-disable-next-line
interface GroupUpdateContext extends Attachmentable {}
applyMixins(GroupUpdateContext, [Attachmentable]);

export { GroupUpdateContext };
