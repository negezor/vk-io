// @ts-ignore
import { Attachment, AttachmentFactoryOptions } from './attachment';
// @ts-ignore

// @ts-ignore
import { IPhotoAttachmentPayload } from './photo';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { AttachmentType, kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IDocumentAttachmentPayload {
// @ts-ignore
	id: number;
// @ts-ignore
	owner_id: number;
// @ts-ignore
	access_key?: string;
// @ts-ignore

// @ts-ignore
	title?: string;
// @ts-ignore
	size?: number;
// @ts-ignore
	ext?: string;
// @ts-ignore
	url?: string;
// @ts-ignore
	date?: number;
// @ts-ignore
	type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	preview?: {
// @ts-ignore
		photo?: IPhotoAttachmentPayload['sizes'];
// @ts-ignore
		graffiti?: {
// @ts-ignore
			src: string;
// @ts-ignore
			width: number;
// @ts-ignore
			height: number;
// @ts-ignore
		};
// @ts-ignore
		audio_message?: {
// @ts-ignore
			duration: number;
// @ts-ignore
			waveform: number[];
// @ts-ignore
			link_ogg: string;
// @ts-ignore
			link_mp3: string;
// @ts-ignore
		};
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DocumentAttachmentOptions =
// @ts-ignore
	AttachmentFactoryOptions<IDocumentAttachmentPayload>;
// @ts-ignore

// @ts-ignore
export class DocumentAttachment
// @ts-ignore
	extends Attachment<IDocumentAttachmentPayload, AttachmentType.DOCUMENT | 'doc'> {
// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	public constructor(options: DocumentAttachmentOptions) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: AttachmentType.DOCUMENT
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		this.$filled = this.payload.ext !== undefined && this.payload.date !== undefined;
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
		this.payload = document as IDocumentAttachmentPayload;
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a text
// @ts-ignore
	 */
// @ts-ignore
	public get isText(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.typeId === 1;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a archive
// @ts-ignore
	 */
// @ts-ignore
	public get isArchive(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.typeId === 2;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a gif file
// @ts-ignore
	 */
// @ts-ignore
	public get isGif(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.typeId === 3;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a image
// @ts-ignore
	 */
// @ts-ignore
	public get isImage(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.typeId === 4;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a graffiti
// @ts-ignore
	 */
// @ts-ignore
	public get isGraffiti(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.hasPreviewProperty('graffiti');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a audio
// @ts-ignore
	 */
// @ts-ignore
	public get isAudio(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.typeId === 5;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a voice
// @ts-ignore
	 */
// @ts-ignore
	public get isVoice(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.hasPreviewProperty('audio_message');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a video
// @ts-ignore
	 */
// @ts-ignore
	public get isVideo(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.typeId === 6;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the document is a book
// @ts-ignore
	 */
// @ts-ignore
	public get isBook(): boolean | undefined {
// @ts-ignore
		if (!this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.typeId === 7;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the document title
// @ts-ignore
	 */
// @ts-ignore
	public get title(): string | undefined {
// @ts-ignore
		return this.payload.title;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this document was created
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number | undefined {
// @ts-ignore
		return this.payload.date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the type identifier
// @ts-ignore
	 *
// @ts-ignore
	 * **1** - text documents
// @ts-ignore
	 *
// @ts-ignore
	 * **2** - archives
// @ts-ignore
	 *
// @ts-ignore
	 * **3** - gif
// @ts-ignore
	 *
// @ts-ignore
	 * **4** - images
// @ts-ignore
	 *
// @ts-ignore
	 * **5** - audio
// @ts-ignore
	 *
// @ts-ignore
	 * **6** - video
// @ts-ignore
	 *
// @ts-ignore
	 * **7** - e-books
// @ts-ignore
	 *
// @ts-ignore
	 * **8** - unknown
// @ts-ignore
	 */
// @ts-ignore
	public get typeId(): IDocumentAttachmentPayload['type'] | undefined {
// @ts-ignore
		return this.payload.type;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the size in bytes
// @ts-ignore
	 */
// @ts-ignore
	public get size(): number | undefined {
// @ts-ignore
		return this.payload.size;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the extension
// @ts-ignore
	 */
// @ts-ignore
	public get extension(): string | undefined {
// @ts-ignore
		return this.payload.ext;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the URL of the document
// @ts-ignore
	 */
// @ts-ignore
	public get url(): string | undefined {
// @ts-ignore
		return this.payload.url;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the info to preview
// @ts-ignore
	 */
// @ts-ignore
	public get preview(): IDocumentAttachmentPayload['preview'] | undefined {
// @ts-ignore
		return this.payload.preview;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for a property in preview
// @ts-ignore
	 */
// @ts-ignore
	public hasPreviewProperty(name: 'photo' | 'graffiti' | 'audio_message'): boolean {
// @ts-ignore
		return this.preview?.[name] !== undefined;
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
			'title',
// @ts-ignore
			'typeId',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'extension',
// @ts-ignore
			'url'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
