import { VK } from '../../vk';

import { Attachment } from './attachment';

import { pickProperties } from '../../utils/helpers';
import { AttachmentType, kSerializeData } from '../../utils/constants';

const { DOCUMENT } = AttachmentType;

/**
 * Types of documents
 */
const documentTypes = new Map([
	[1, 'text'],
	[2, 'archive'],
	[3, 'gif'],
	[4, 'image'],
	[5, 'audio'],
	[6, 'video'],
	[7, 'book'],
	[8, 'unknown']
]);

export interface IDocumentAttachmentPayload {
	id: number;
	owner_id: number;
	access_key?: string;

	title?: string;
	size?: number;
	ext?: string;
	url?: string;
	date?: number;
	type?: number;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	preview?: Record<string, any>;
}

export class DocumentAttachment extends Attachment<IDocumentAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IDocumentAttachmentPayload, vk?: VK) {
		super(DOCUMENT, payload.owner_id, payload.id, payload.access_key);

		// @ts-expect-error
		this.vk = vk;
		this.payload = payload;

		this.$filled = payload.ext !== undefined && payload.date !== undefined;
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

		this.payload = document;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

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

		return this.hasPreviewProperty('audio_msg');
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
	 * Returns the type identifier (1~8)
	 */
	public get typeId(): number | undefined {
		return this.payload.type;
	}

	/**
	 * Returns the type name
	 */
	public get typeName(): string | undefined {
		if (!this.$filled) {
			return undefined;
		}

		return documentTypes.get(this.typeId!)!;
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
	public hasPreviewProperty(name: string): boolean {
		return this.preview?.[name] !== undefined;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'title',
			'typeId',
			'typeName',
			'createdAt',
			'extension',
			'url'
		]);
	}
}
