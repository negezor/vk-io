import Context from './context';

import {
	PhotoAttachment,
	VideoAttachment,
	AudioAttachment
} from '../attachments';

export default class NewAttachmentsContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 */
	constructor(vk, { type, object: update }) {
		super(vk);

		this.payload = update;

		let subType;
		let attachment;

		// eslint-disable-next-line default-case
		switch (type) {
		case 'photo_new': {
			subType = 'new_photo_attachment';
			attachment = new PhotoAttachment(update, vk);

			break;
		}

		case 'video_new': {
			subType = 'new_video_attachment';
			attachment = new VideoAttachment(update, vk);

			break;
		}

		case 'audio_new': {
			subType = 'new_audio_attachment';
			attachment = new AudioAttachment(update, vk);

			break;
		}
		}

		this.attachments = [attachment];

		this.type = 'new_attachment';
		this.subTypes = [subType];
	}

	/**
	 * Checks for the presence of attachments
	 *
	 * @param {?string} type
	 *
	 * @return {boolean}
	 */
	hasAttachments(type = null) {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Returns the attachments
	 *
	 * @param {?string} type
	 *
	 * @return {Array}
	 */
	getAttachments(type = null) {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Checks is attachment photo
	 *
	 * @return {boolean}
	 */
	isPhoto() {
		return this.subTypes.includes('new_photo');
	}

	/**
	 * Checks is attachment video
	 *
	 * @return {boolean}
	 */
	isVideo() {
		return this.subTypes.includes('new_video');
	}

	/**
	 * Checks is attachment audio
	 *
	 * @return {boolean}
	 */
	isAudio() {
		return this.subTypes.includes('new_audio');
	}
}
