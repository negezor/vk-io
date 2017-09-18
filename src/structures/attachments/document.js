'use strict';

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
	constructor (payload, vk) {
		super('doc', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this._isFilled = 'ext' in payload && 'date' in payload;
	}

	/**
	 * Returns whether the attachment is filled
	 *
	 * @return {boolean}
	 */
	isFilled () {
		return this._isFilled;
	}

	/**
	 * Get document info
	 *
	 * @return {Promise}
	 */
	async getAttachmentPayload () {
		const documents = await this.vk.api.docs.getById({
			docs: `${this.owner}_${this.id}`,
		});

		this.payload = documents[0];

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this._isFilled = true;
	}

	/**
	 * Checks if the document is a text
	 *
	 * @return {?boolean}
	 */
	isText () {
		if (!this._isFilled) {
			return null;
		}

		return this.payload.type === 1;
	}

	/**
	 * Checks if the document is a archive
	 *
	 * @return {?boolean}
	 */
	isArchive () {
		if (!this._isFilled) {
			return null;
		}

		return this.payload.type === 2;
	}

	/**
	 * Checks if the document is a gif
	 *
	 * @return {?boolean}
	 */
	isGif () {
		if (!this._isFilled) {
			return null;
		}

		return this.payload.type === 3;
	}

	/**
	 * Checks if the document is a image
	 *
	 * @return {?boolean}
	 */
	isImage () {
		if (!this._isFilled) {
			return null;
		}

		return this.payload.type === 4;
	}

	/**
	 * Checks if the document is a graffiti
	 *
	 * @return {?boolean}
	 */
	isGraffiti () {
		if (!this._isFilled) {
			return null;
		}

		return this._hasPreviewProperty('graffiti');
	}

	/**
	 * Checks if the document is a audio
	 *
	 * @return {?boolean}
	 */
	isAudio () {
		if (!this._isFilled) {
			return null;
		}

		return this.payload.type === 5;
	}

	/**
	 * Checks if the document is a voice
	 *
	 * @return {?boolean}
	 */
	isVoice () {
		if (!this._isFilled) {
			return null;
		}

		return this._hasPreviewProperty('audio_msg');
	}

	/**
	 * Checks if the document is a video
	 *
	 * @return {?boolean}
	 */
	isVideo () {
		if (!this._isFilled) {
			return null;
		}

		return this.payload.type === 6;
	}

	/**
	 * Checks if the document is a video
	 *
	 * @return {?boolean}
	 */
	isBook () {
		if (!this._isFilled) {
			return null;
		}

		return this.payload.type === 7;
	}

	/**
	 * Returns the document title
	 *
	 * @return {?string}
	 */
	getTitle () {
		return this.payload.title || null;
	}

	/**
	 * Returns document upload date (timestamp)
	 *
	 * @return {?number}
	 */
	getDate () {
		return this.payload.date || null;
	}

	/**
	 * Returns the type identifier (1~8)
	 *
	 * @return {?number}
	 */
	getTypeId () {
		return this.payload.type || null;
	}

	/**
	 * Returns the type name
	 *
	 * @return {?string}
	 */
	getTypeName () {
		if (!this._isFilled) {
			return null;
		}

		return documentTypes.get(this.payload.type);
	}

	/**
	 * Returns the size
	 *
	 * @return {?number}
	 */
	getSize () {
		return this.payload.size || null;
	}

	/**
	 * Returns the extension
	 *
	 * @return {?string}
	 */
	getExtension () {
		return this.payload.ext || null;
	}

	/**
	 * Returns the URL of the document
	 *
	 * @return {?string}
	 */
	getUrl () {
		return this.payload.url || null;
	}

	/**
	 * Returns the info to preview
	 *
	 * @return {?Object}
	 */
	getPreview () {
		return this.payload.preview || null;
	}

	/**
	 * Checks for a property in preview
	 *
	 * @param {string} name
	 *
	 * @return {boolean}
	 */
	_hasPreviewProperty (name) {
		const preview = this.getPreview();

		if (preview === null) {
			return false;
		}

		return name in preview;
	}
}
