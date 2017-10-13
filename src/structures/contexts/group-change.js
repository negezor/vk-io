import Context from './context';

import { PhotoAttachment } from '../attachments';

export default class GroupChangeContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 */
	constructor(vk, { type, object: update }) {
		super(vk);

		this.payload = update;

		const isChangePhoto = type === 'group_change_photo';

		this.attachments = isChangePhoto
			? [new PhotoAttachment(this.vk, update.photo)]
			: [];

		this.type = 'group_change';
		this.subTypes = [
			// eslint-disable-next-line no-nested-ternary
			type === 'group_change_settings'
				? 'group_change_settings'
				: isChangePhoto
					? 'group_change_photo'
					: 'group_change_officers'
		];
	}

	/**
	 * Checks is change photo
	 *
	 * @return {boolean}
	 */
	isChangePhoto() {
		return this.subTypes.includes('group_change_photo');
	}

	/**
	 * Checks is change officers
	 *
	 * @return {boolean}
	 */
	isChangeOfficers() {
		return this.subTypes.includes('group_change_officers');
	}

	/**
	 * Checks is change settings
	 *
	 * @return {boolean}
	 */
	isChangeSettings() {
		return this.subTypes.includes('group_change_settings');
	}

	/**
	 * Returns the identifier admin
	 *
	 * @return {?number}
	 */
	getAdminId() {
		return this.payload.admin_id;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {number}
	 */
	getUserId() {
		return this.payload.user_id;
	}

	/**
	 * Returns the old level permission
	 *
	 * @return {?number}
	 */
	getOldLevel() {
		return this.payload.level_old || null;
	}

	/**
	 * Returns the new level permission
	 *
	 * @return {?number}
	 */
	getNewLevel() {
		return this.payload.level_new || null;
	}

	/**
	 * Returns the changes settings
	 *
	 * @return {?Object}
	 */
	getChanges() {
		return this.payload.changes || null;
	}
}
