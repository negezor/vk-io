import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { attachmentTypes, inspectCustomData } from '../../utils/constants';

const { AUDIO_MESSAGE } = attachmentTypes;

export default class AudioMessageAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(AUDIO_MESSAGE, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'duration' in payload;
	}

	/**
	 * Load attachment payload
	 *
	 * @return {Promise}
	 */
	async loadAttachmentPayload() {
		if (this.$filled) {
			return;
		}

		const [document] = await this.vk.api.docs.getById({
			docs: `${this.ownerId}_${this.id}`
		});

		this.payload = document;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Returns the duration of the audio message
	 *
	 * @return {?number}
	 */
	get duration() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.duration;
	}

	/**
	 * Returns the waveform of the audio message
	 *
	 * @return {?number[]}
	 */
	get waveform() {
		return this.payload.waveform || null;
	}

	/**
	 * Returns the ogg URL of the audio message
	 *
	 * @return {?string}
	 */
	get oggUrl() {
		return this.payload.link_ogg || null;
	}

	/**
	 * Returns the mp3 URL of the audio message
	 *
	 * @return {?string}
	 */
	get mp3Url() {
		return this.payload.link_mp3 || null;
	}

	/**
	 * Returns the URL of the audio message
	 *
	 * @return {?string}
	 */
	get url() {
		return this.mp3Url || this.oggUrl;
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		const payload = copyParams(this, [
			'duration',
			'waveform',
			'oggUrl',
			'mp3Url',
			'url'
		]);

		payload.waveform = `[...${this.waveform.length} elements]`;

		return payload;
	}
}
