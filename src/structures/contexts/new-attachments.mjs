import Context from './context';

import { VKError } from '../../errors';

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
	 * @param {Object} options
	 */
	constructor(vk, payload, { updateType, groupId }) {
		super(vk);

		this.payload = payload;
		this.$groupId = groupId;

		let subType;
		let attachment;

		// eslint-disable-next-line default-case
		switch (updateType) {
		case 'photo_new': {
			subType = 'new_photo_attachment';
			attachment = new PhotoAttachment(payload, vk);

			break;
		}

		case 'video_new': {
			subType = 'new_video_attachment';
			attachment = new VideoAttachment(payload, vk);

			break;
		}

		case 'audio_new': {
			subType = 'new_audio_attachment';
			attachment = new AudioAttachment(payload, vk);

			break;
		}
		}

		this.attachments = [attachment];

		this.type = 'new_attachment';
		this.subTypes = [subType];
	}

	/**
	 * Checks is attachment photo
	 *
	 * @return {boolean}
	 */
	get isPhoto() {
		return this.subTypes.includes('new_photo_attachment');
	}

	/**
	 * Checks is attachment video
	 *
	 * @return {boolean}
	 */
	get isVideo() {
		return this.subTypes.includes('new_video_attachment');
	}

	/**
	 * Checks is attachment audio
	 *
	 * @return {boolean}
	 */
	get isAudio() {
		return this.subTypes.includes('new_audio_attachment');
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
	 * Removes the attachment
	 *
	 * @return {Promise}
	 */
	deleteAttachment() {
		if (this.isPhoto) {
			const [photo] = this.getAttachments('photo');

			return this.vk.api.photos.delete({
				owner_id: photo.ownerId,
				photo_id: photo.id
			});
		}

		if (this.isVideo) {
			const [video] = this.getAttachments('video');

			return this.vk.api.video.delete({
				owner_id: video.ownerId,
				video_id: video.id
			});
		}

		if (this.isAudio) {
			const [audio] = this.getAttachments('audio');

			return this.vk.api.audio.delete({
				owner_id: audio.ownerId,
				audio_id: audio.id
			});
		}

		return Promise.reject(new VKError({
			message: 'Unsupported event for deleting attachment'
		}));
	}
}
