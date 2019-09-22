import Context, { IContextOptions } from './context';

import { PhotoAttachment, Attachment } from '../attachments';

import { copyParams } from '../../utils/helpers';
import { inspectCustomData } from '../../utils/constants';

const subTypes = {
	group_change_photo: 'group_update_photo',
	group_update_officers: 'group_update_officers',
	group_change_settings: 'group_update_settings'
};

export interface IGroupUpdateContextPayload {
	user_id: number;
	admin_id: number;
	level_old?: number;
	level_new?: number;
	changes?: Record<string, { old_value: string; new_value: string }>;
	photo?: object;
}

export type GroupUpdateContextOptions<S> =
	Omit<IContextOptions<IGroupUpdateContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class GroupUpdateContext<S = Record<string, any>>
	extends Context<IGroupUpdateContextPayload, S> {
	public attachments: Attachment[];

	public constructor(options: GroupUpdateContextOptions<S>) {
		super({
			...options,

			type: 'group_update',
			subTypes: [
				subTypes[options.updateType]
			]
		});

		this.attachments = options.updateType === 'group_change_photo'
			// @ts-ignore
			? [new PhotoAttachment(this.payload.photo, this.vk)]
			: [];
	}

	/**
	 * Checks is change photo
	 */
	public get isChangePhoto(): boolean {
		return this.subTypes.includes('group_update_photo');
	}

	/**
	 * Checks is change officers
	 */
	public get isChangeOfficers(): boolean {
		return this.subTypes.includes('group_update_officers');
	}

	/**
	 * Checks is change settings
	 */
	public get isChangeSettings(): boolean {
		return this.subTypes.includes('group_update_settings');
	}

	/**
	 * Checks for the presence of attachments
	 */
	hasAttachments(type: string = null): boolean {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the identifier admin
	 */
	public get adminId(): number | null {
		return this.payload.admin_id || null;
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
	public get oldLevel(): number | null {
		return this.payload.level_old || null;
	}

	/**
	 * Returns the new level permission
	 */
	public get newLevel(): number | null {
		return this.payload.level_new || null;
	}

	/**
	 * Returns the changes settings
	 */
	public get changes(): Record<string, { old_value: string; new_value: string }> | null {
		return this.payload.changes || null;
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: string = null): Attachment[] {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
			'adminId',
			'userId',
			'oldLevel',
			'newLevel',
			'changes',
			'attachments'
		]);
	}
}
