import { Attachment, AttachmentFactoryOptions } from './attachment';

import { IPhotoAttachmentPayload } from './photo';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

export interface IDocumentAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	title?: string;
	size?: number;
	ext?: string;
	url?: string;
	date?: number;
	type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preview?: {
		photo?: IPhotoAttachmentPayload['sizes'];
		graffiti?: {
			src: string;
			width: number;
			height: number;
		};
		audio_message?: {
			duration: number;
			waveform: number[];
			link_ogg: string;
			link_mp3: string;
		};
	};
}

export type DocumentAttachmentOptions =
	AttachmentFactoryOptions<IDocumentAttachmentPayload>;

export class DocumentAttachment
	extends Attachment<IDocumentAttachmentPayload, AttachmentType.DOCUMENT | 'doc'> {
	/**
	 * Constructor
	 */
	public constructor(options: DocumentAttachmentOptions) {
		super({
			...options,

			type: AttachmentType.DOCUMENT
		});

		this.$filled = this.payload.ext !== undefined && this.payload.date !== undefined;
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

		this.payload = document as IDocumentAttachmentPayload;

		this.$filled = true;
	}

	/**
	 * Checks if the document is a text
	 */
	public get isText(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.typeId === 1;
	}

	/**
	 * Checks if the document is a archive
	 */
	public get isArchive(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.typeId === 2;
	}

	/**
	 * Checks if the document is a gif file
	 */
	public get isGif(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.typeId === 3;
	}

	/**
	 * Checks if the document is a image
	 */
	public get isImage(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.typeId === 4;
	}

	/**
	 * Checks if the document is a graffiti
	 */
	public get isGraffiti(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.hasPreviewProperty('graffiti');
	}

	/**
	 * Checks if the document is a audio
	 */
	public get isAudio(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.typeId === 5;
	}

	/**
	 * Checks if the document is a voice
	 */
	public get isVoice(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.hasPreviewProperty('audio_message');
	}

	/**
	 * Checks if the document is a video
	 */
	public get isVideo(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.typeId === 6;
	}

	/**
	 * Checks if the document is a book
	 */
	public get isBook(): boolean | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return this.typeId === 7;
	}

	/**
	 * Returns the document title
	 */
	public get title(): string | undefined {
		return this.payload.title;
	}

	/**
	 * Returns the date when this document was created
	 */
	public get createdAt(): number | undefined {
		return this.payload.date;
	}

	/**
	 * Returns the type identifier
	 *
	 * **1** - text documents
	 *
	 * **2** - archives
	 *
	 * **3** - gif
	 *
	 * **4** - images
	 *
	 * **5** - audio
	 *
	 * **6** - video
	 *
	 * **7** - e-books
	 *
	 * **8** - unknown
	 */
	public get typeId(): IDocumentAttachmentPayload['type'] | undefined {
		return this.payload.type;
	}

	/**
	 * Returns the size in bytes
	 */
	public get size(): number | undefined {
		return this.payload.size;
	}

	/**
	 * Returns the extension
	 */
	public get extension(): string | undefined {
		return this.payload.ext;
	}

	/**
	 * Returns the URL of the document
	 */
	public get url(): string | undefined {
		return this.payload.url;
	}

	/**
	 * Returns the info to preview
	 */
	public get preview(): IDocumentAttachmentPayload['preview'] | undefined {
		return this.payload.preview;
	}

	/**
	 * Checks for a property in preview
	 */
	public hasPreviewProperty(name: 'photo' | 'graffiti' | 'audio_message'): boolean {
		return this.preview?.[name] !== undefined;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'title',
			'typeId',
			'createdAt',
			'extension',
			'url'
		]);
	}
}
