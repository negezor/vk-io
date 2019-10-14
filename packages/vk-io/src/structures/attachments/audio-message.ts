import VK from '../../vk';

import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { attachmentTypes, inspectCustomData } from '../../utils/constants';

const { AUDIO_MESSAGE } = attachmentTypes;

export interface IAudioMessageAttachmentPayload {
	id: number;
	owner_id: number;
	access_key: string;

	duration?: number;
	waveform?: number[];
	link_ogg?: string;
	link_mp3?: string;
}

export default class AudioMessageAttachment extends Attachment {
	protected vk: VK;

	protected payload: IAudioMessageAttachmentPayload;

	/**
	 * Constructor
	 */
	public constructor(payload: IAudioMessageAttachmentPayload, vk: VK) {
		super(AUDIO_MESSAGE, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'duration' in payload;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		// @ts-ignore
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
	 */
	public get duration(): number {
		if (!this.$filled) {
			return null;
		}

		return this.payload.duration;
	}

	/**
	 * Returns the waveform of the audio message
	 */
	public get waveform(): number[] {
		return this.payload.waveform || null;
	}

	/**
	 * Returns the ogg URL of the audio message
	 */
	public get oggUrl(): string | null {
		return this.payload.link_ogg || null;
	}

	/**
	 * Returns the mp3 URL of the audio message
	 */
	public get mp3Url(): string | null {
		return this.payload.link_mp3 || null;
	}

	/**
	 * Returns the URL of the audio message
	 */
	public get url(): string {
		return this.mp3Url || this.oggUrl;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		const payload = copyParams(this, [
			'duration',
			'waveform',
			'oggUrl',
			'mp3Url',
			'url'
		]);

		// @ts-ignore
		payload.waveform = `[...${this.waveform.length} elements]`;

		return payload;
	}
}
