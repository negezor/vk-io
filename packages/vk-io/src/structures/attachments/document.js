import Attachment from './attachment';

import { copyParams } from '../../utils/helpers';
import { attachmentTypes, inspectCustomData } from '../../utils/constants';

const { DOCUMENT } = attachmentTypes;

/**
 * Types of documents
 *
 * @type {Map}
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

export default class DocumentAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(DOCUMENT, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'ext' in payload && 'date' in payload;
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
			docs: `${this.ownerId}_${this.id}`,
		});

		this.payload = document;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks if the document is a text
	 *
	 * @return {?boolean}
	 */
	get isText() {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 1;
	}

	/**
	 * Checks if the document is a archive
	 *
	 * @return {?boolean}
	 */
	get isArchive() {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 2;
	}

	/**
	 * Checks if the document is a gif file
	 *
	 * @return {?boolean}
	 */
	get isGif() {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 3;
	}

	/**
	 * Checks if the document is a image
	 *
	 * @return {?boolean}
	 */
	get isImage() {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 4;
	}

	/**
	 * Checks if the document is a graffiti
	 *
	 * @return {?boolean}
	 */
	get isGraffiti() {
		if (!this.$filled) {
			return null;
		}

		return this.hasPreviewProperty('graffiti');
	}

	/**
	 * Checks if the document is a audio
	 *
	 * @return {?boolean}
	 */
	get isAudio() {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 5;
	}

	/**
	 * Checks if the document is a voice
	 *
	 * @return {?boolean}
	 */
	get isVoice() {
		if (!this.$filled) {
			return null;
		}

		return this.hasPreviewProperty('audio_msg');
	}

	/**
	 * Checks if the document is a video
	 *
	 * @return {?boolean}
	 */
	get isVideo() {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 6;
	}

	/**
	 * Checks if the document is a book
	 *
	 * @return {?boolean}
	 */
	get isBook() {
		if (!this.$filled) {
			return null;
		}

		return this.typeId === 7;
	}

	/**
	 * Returns the document title
	 *
	 * @return {?string}
	 */
	get title() {
		return this.payload.title || null;
	}

	/**
	 * Returns the date when this document was created
	 *
	 * @return {?number}
	 */
	get createdAt() {
		return this.payload.date || null;
	}

	/**
	 * Returns the type identifier (1~8)
	 *
	 * @return {?number}
	 */
	get typeId() {
		return this.payload.type || null;
	}

	/**
	 * Returns the type name
	 *
	 * @return {?string}
	 */
	get typeName() {
		if (!this.$filled) {
			return null;
		}

		return documentTypes.get(this.typeId);
	}

	/**
	 * Returns the size in bytes
	 *
	 * @return {?number}
	 */
	get size() {
		if (!this.$filled) {
			return null;
		}

		return this.payload.size;
	}

	/**
	 * Returns the extension
	 *
	 * @return {?string}
	 */
	get extension() {
		return this.payload.ext || null;
	}

	/**
	 * Returns the URL of the document
	 *
	 * @return {?string}
	 */
	get url() {
		return this.payload.url || null;
	}

	/**
	 * Returns the info to preview
	 *
	 * @return {?Object}
	 */
	get preview() {
		return this.payload.preview || null;
	}

	/**
	 * Checks for a property in preview
	 *
	 * @param {string} name
	 *
	 * @return {boolean}
	 */
	hasPreviewProperty(name) {
		const { preview } = this;

		if (preview === null) {
			return false;
		}

		return name in preview;
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
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
