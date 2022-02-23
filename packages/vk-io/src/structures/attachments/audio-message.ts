import { Attachment, AttachmentFactoryOptions } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

export interface IAudioMessageAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	duration?: number;
	waveform?: number[];
	link_ogg?: string;
	link_mp3?: string;
	locale?: string;
	transcript?: string;
	transcript_state?: 'done' | string;
}

export type AudioMessageAttachmentOptions =
	AttachmentFactoryOptions<IAudioMessageAttachmentPayload>;

export class AudioMessageAttachment
	extends Attachment<IAudioMessageAttachmentPayload, AttachmentType.AUDIO_MESSAGE | 'audio_message'> {
	/**
	 * Constructor
	 */
	public constructor(options: AudioMessageAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.AUDIO_MESSAGE
		});

		this.$filled = this.payload.duration !== undefined;
	}

	/**
	 * Load attachment payload
	 */
	public async loadAttachmentPayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const [document] = await this.api.docs.getById({
			docs: `${this.ownerId}_${this.id}`
		});

		this.payload = document as unknown as IAudioMessageAttachmentPayload;

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
	 * Returns the locale of the audio message
	 */
	public get locale(): string | undefined {
		return this.payload.locale;
	}

	/**
	 * Returns the transcript of the audio message
	 */
	public get transcript(): string | undefined {
		return this.payload.transcript;
	}

	/**
	 * Returns the transcript of the audio message
	 */
	public get transcriptState(): 'done' | string | undefined {
		return this.payload.transcript_state;
	}

	/**
	 * Returns the transcript of the audio message
	 */
	public get isTranscriptDone(): boolean {
		return this.payload.transcript_state === 'done';
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
		return pickProperties(this, [
			'duration',
			'oggUrl',
			'mp3Url',
			'url',
			'locale',
			'transcript',
			'isTranscriptDone'
		]);
	}
}
