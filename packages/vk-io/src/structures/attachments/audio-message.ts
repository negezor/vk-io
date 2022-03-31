// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IAudioMessageAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	duration?: number;
// @ts-ignore
	waveform?: number[];
// @ts-ignore
	link_ogg?: string;
// @ts-ignore
	link_mp3?: string;
// @ts-ignore
	locale?: string;
// @ts-ignore
	transcript?: string;
// @ts-ignore
	transcript_state?: 'done' | string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type AudioMessageAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IAudioMessageAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class AudioMessageAttachment
// @ts-ignore
	extends Attachment<IAudioMessageAttachmentPayload, AttachmentType.AUDIO_MESSAGE | 'audio_message'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: AudioMessageAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.AUDIO_MESSAGE
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.duration !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Load attachment payload
// @ts-ignore
	 */
// @ts-ignore
	public async loadAttachmentPayload(): Promise<void> {
// @ts-ignore
		if (this.$filled) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const [document] = await this.api.docs.getById({
// @ts-ignore
			docs: `${this.ownerId}_${this.id}`
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.payload = document as unknown as IAudioMessageAttachmentPayload;
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the duration of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get duration(): number | undefined {
// @ts-ignore
		return this.payload.duration;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the waveform of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get waveform(): number[] | undefined {
// @ts-ignore
		return this.payload.waveform;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the ogg URL of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get oggUrl(): string | undefined {
// @ts-ignore
		return this.payload.link_ogg;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the mp3 URL of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get mp3Url(): string | undefined {
// @ts-ignore
		return this.payload.link_mp3;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the locale of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get locale(): string | undefined {
// @ts-ignore
		return this.payload.locale;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the transcript of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get transcript(): string | undefined {
// @ts-ignore
		return this.payload.transcript;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the transcript of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get transcriptState(): 'done' | string | undefined {
// @ts-ignore
		return this.payload.transcript_state;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the transcript of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get isTranscriptDone(): boolean {
// @ts-ignore
		return this.payload.transcript_state === 'done';
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the URL of the audio message
// @ts-ignore
	 */
// @ts-ignore
	public get url(): string | undefined {
// @ts-ignore
		return this.mp3Url || this.oggUrl;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'duration',
// @ts-ignore
			'oggUrl',
// @ts-ignore
			'mp3Url',
// @ts-ignore
			'url',
// @ts-ignore
			'locale',
// @ts-ignore
			'transcript',
// @ts-ignore
			'isTranscriptDone'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
