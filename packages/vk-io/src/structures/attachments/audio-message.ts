import { VK } from '../../vk';

import { Attachment } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

const { AUDIO_MESSAGE } = AttachmentType;

export interface IAudioMessageAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	duration?: number;
	waveform?: number[];
	link_ogg?: string;
	link_mp3?: string;
}

export class AudioMessageAttachment extends Attachment<IAudioMessageAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IAudioMessageAttachmentPayload, vk?: VK) {
		super(AUDIO_MESSAGE, payload.owner_id, payload.id, payload.access_key);

		// @ts-expect-error
		this.vk = vk;
		this.payload = payload;

		this.$filled = payload.duration !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const [document] = await this.vk.api.docs.getById({
			docs: `${this.ownerId}_${this.id}`
		});

		// @ts-expect-error
		this.payload = document;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Returns the duration of the audio message
	 */
	public get duration(): number | undefined {
		return this.payload.duration;
	}

	/**
	 * Returns the waveform of the audio message
	 */
	public get waveform(): number[] | undefined {
		return this.payload.waveform;
	}

	/**
	 * Returns the ogg URL of the audio message
	 */
	public get oggUrl(): string | undefined {
		return this.payload.link_ogg;
	}

	/**
	 * Returns the mp3 URL of the audio message
	 */
	public get mp3Url(): string | undefined {
		return this.payload.link_mp3;
	}

	/**
	 * Returns the URL of the audio message
	 */
	public get url(): string | undefined {
		return this.mp3Url || this.oggUrl;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		const payload = pickProperties(this, [
			'duration',
			'waveform',
			'oggUrl',
			'mp3Url',
			'url'
		]);

		if (this.waveform !== undefined) {
			// @ts-expect-error
			payload.waveform = `[...${this.waveform.length} elements]`;
		}

		return payload;
	}
}
