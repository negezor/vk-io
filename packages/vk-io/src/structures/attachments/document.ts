import VK from '../../vk';

import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { AttachmentType, inspectCustomData } from '../../utils/constants';

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
	preview?: object;
}

export default class DocumentAttachment extends Attachment<IDocumentAttachmentPayload> {
	/**
	 * Constructor
	 */
	public constructor(payload: IDocumentAttachmentPayload, vk?: VK) {
		super(DOCUMENT, payload.owner_id, payload.id, payload.access_key);

		// @ts-ignore
		this.vk = vk;
		this.payload = payload;

		this.$filled = 'ext' in payload && 'date' in payload;
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

		// @ts-ignore
		this.payload = document;

		if (this.payload.access_key) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks if the document is a text
	 */
	public get isText(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 1;
	}

	/**
	 * Checks if the document is a archive
	 */
	public get isArchive(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 2;
	}

	/**
	 * Checks if the document is a gif file
	 */
	public get isGif(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 3;
	}

	/**
	 * Checks if the document is a image
	 */
	public get isImage(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 4;
	}

	/**
	 * Checks if the document is a graffiti
	 */
	public get isGraffiti(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.hasPreviewProperty('graffiti');
	}

	/**
	 * Checks if the document is a audio
	 */
	public get isAudio(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 5;
	}

	/**
	 * Checks if the document is a voice
	 */
	public get isVoice(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.hasPreviewProperty('audio_msg');
	}

	/**
	 * Checks if the document is a video
	 */
	public get isVideo(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 6;
	}

	/**
	 * Checks if the document is a book
	 */
	public get isBook(): boolean | null {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 7;
	}

	/**
	 * Returns the document title
	 */
	public get title(): string | null {
		return this.payload.title || null;
	}

	/**
	 * Returns the date when this document was created
	 */
	public get createdAt(): number | null {
		return this.payload.date || null;
	}

	/**
	 * Returns the type identifier (1~8)
	 */
	public get typeId(): number | null {
		return this.payload.type || null;
	}

	/**
	 * Returns the type name
	 */
	public get typeName(): string | null {
		if (!this.$filled) {
			return null;
		}

		return documentTypes.get(this.typeId!)!;
	}

	/**
	 * Returns the size in bytes
	 */
	public get size(): number | null {
		if (!this.$filled) {
			return null;
		}

		return this.payload.size!;
	}

	/**
	 * Returns the extension
	 */
	public get extension(): string | null {
		return this.payload.ext || null;
	}

	/**
	 * Returns the URL of the document
	 */
	public get url(): string | null {
		return this.payload.url || null;
	}

	/**
	 * Returns the info to preview
	 */
	public get preview(): object | null {
		return this.payload.preview || null;
	}

	/**
	 * Checks for a property in preview
	 */
	public hasPreviewProperty(name: string): boolean {
		const { preview } = this;

		if (preview === null) {
			return false;
		}

		return name in preview;
	}

	/**
	 * Returns the custom data
	 */
	// @ts-ignore
	public [inspectCustomData](): object | null {
		return copyParams(this, [
			'title',
			'typeId',
			'typeName',
			'createdAt',
			'extension',
			'url'
		]);
	}
}
