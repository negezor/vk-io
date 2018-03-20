import Attachment from './attachment';

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
		super('doc', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.filled = 'ext' in payload && 'date' in payload;
	}

	/**
	 * Load attachment payload
	 *
	 * @return {Promise}
	 */
	async loadAttachmentPayload() {
		if (this.filled) {
			return;
		}

		const [document] = await this.vk.api.docs.getById({
			docs: `${this.owner}_${this.id}`,
		});

		this.payload = document;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.filled = true;
	}

	/**
	 * Checks if the document is a text
	 *
	 * @return {?boolean}
	 */
	isText() {
		if (!this.filled) {
			return null;
		}

		return this.payload.type === 1;
	}

	/**
	 * Checks if the document is a archive
	 *
	 * @return {?boolean}
	 */
	isArchive() {
		if (!this.filled) {
			return null;
		}

		return this.payload.type === 2;
	}

	/**
	 * Checks if the document is a gif file
	 *
	 * @return {?boolean}
	 */
	isGif() {
		if (!this.filled) {
			return null;
		}

		return this.payload.type === 3;
	}

	/**
	 * Checks if the document is a image
	 *
	 * @return {?boolean}
	 */
	isImage() {
		if (!this.filled) {
			return null;
		}

		return this.payload.type === 4;
	}

	/**
	 * Checks if the document is a graffiti
	 *
	 * @return {?boolean}
	 */
	isGraffiti() {
		if (!this.filled) {
			return null;
		}

		return this.hasPreviewProperty('graffiti');
	}

	/**
	 * Checks if the document is a audio
	 *
	 * @return {?boolean}
	 */
	isAudio() {
		if (!this.filled) {
			return null;
		}

		return this.payload.type === 5;
	}

	/**
	 * Checks if the document is a voice
	 *
	 * @return {?boolean}
	 */
	isVoice() {
		if (!this.filled) {
			return null;
		}

		return this.hasPreviewProperty('audio_msg');
	}

	/**
	 * Checks if the document is a video
	 *
	 * @return {?boolean}
	 */
	isVideo() {
		if (!this.filled) {
			return null;
		}

		return this.payload.type === 6;
	}

	/**
	 * Checks if the document is a book
	 *
	 * @return {?boolean}
	 */
	isBook() {
		if (!this.filled) {
			return null;
		}

		return this.payload.type === 7;
	}

	/**
	 * Returns the document title
	 *
	 * @return {?string}
	 */
	getTitle() {
		return this.payload.title || null;
	}

	/**
	 * Returns the timestamp when this document was created
	 *
	 * @return {number}
	 */
	getTimestamp() {
		return this.payload.date || null;
	}

	/**
	 * Returns the Date object when this document was created
	 *
	 * @return {?Date}
	 */
	getDate() {
		const { date } = this.payload;

		return date
			? new Date(date)
			: null;
	}

	/**
	 * Returns the type identifier (1~8)
	 *
	 * @return {?number}
	 */
	getTypeId() {
		return this.payload.type || null;
	}

	/**
	 * Returns the type name
	 *
	 * @return {?string}
	 */
	getTypeName() {
		if (!this.filled) {
			return null;
		}

		return documentTypes.get(this.payload.type);
	}

	/**
	 * Returns the size in bytes
	 *
	 * @return {?number}
	 */
	getSize() {
		return this.payload.size || null;
	}

	/**
	 * Returns the extension
	 *
	 * @return {?string}
	 */
	getExtension() {
		return this.payload.ext || null;
	}

	/**
	 * Returns the URL of the document
	 *
	 * @return {?string}
	 */
	getUrl() {
		return this.payload.url || null;
	}

	/**
	 * Returns the info to preview
	 *
	 * @return {?Object}
	 */
	getPreview() {
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
		const preview = this.getPreview();

		if (preview === null) {
			return false;
		}

		return name in preview;
	}
}
