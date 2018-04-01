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
	 * @param {Object} options
	 */
	constructor(vk, payload, { updateType, groupId }) {
		super(vk);

		this.payload = payload;

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
			attachment.getType() === type
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
			attachment.getType() === type
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

	/**
	 * Removes the attachment
	 *
	 * @return {Promise}
	 */
	deleteAttachment() {
		if (this.isPhoto()) {
			const [photo] = this.getAttachments('photo');

			return this.vk.api.photos.delete({
				owner_id: photo.getOwnerId(),
				photo_id: photo.getId()
			});
		}

		if (this.isVideo()) {
			const [video] = this.getAttachments('video');

			return this.vk.api.video.delete({
				owner_id: video.getOwnerId(),
				video_id: video.getId()
			});
		}

		if (this.isAudio()) {
			const [audio] = this.getAttachments('audio');

			return this.vk.api.audio.delete({
				owner_id: audio.getOwnerId(),
				audio_id: audio.getId()
			});
		}

		return Promise.reject(new Error('Unsupported event for deleting attachment'));
	}
}
