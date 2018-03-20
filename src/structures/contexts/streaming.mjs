import Context from './context';

import { platforms } from '../../utils/constants';
import { transformAttachments } from '../attachments/helpers';

export default class StreamingContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 */
	constructor(vk, payload) {
		super(vk);

		this.payload = payload;

		const { action, event_type: type } = payload;

		this.attachments = transformAttachments(payload.attachments, vk);

		this.type = 'publication';
		this.subTypes = [
			`publication_${type}`,
			`${action}_publication`,
			`${action}_publication_${type}`
		];
	}

	/**
	 * Checks is new object
	 *
	 * @return {boolean}
	 */
	isNew() {
		return this.payload.action === 'new';
	}

	/**
	 * Checks is update object
	 *
	 * @return {boolean}
	 */
	isUpdate() {
		return this.payload.action === 'update';
	}

	/**
	 * Checks is delete object
	 *
	 * @return {boolean}
	 */
	isDelete() {
		return this.payload.action === 'delete';
	}

	/**
	 * Checks is restore object
	 *
	 * @return {boolean}
	 */
	isRestore() {
		return this.payload.action === 'restore';
	}

	/**
	 * Checks is post event
	 *
	 * @return {boolean}
	 */
	isPost() {
		return this.payload.event_type === 'post';
	}

	/**
	 * Checks is share event
	 *
	 * @return {boolean}
	 */
	isShare() {
		return this.payload.event_type === 'share';
	}

	/**
	 * Checks is comment event
	 *
	 * @return {boolean}
	 */
	isComment() {
		return this.payload.event_type === 'comment';
	}

	/**
	 * Checks for the presence of attachments
	 *
	 * @param {?string} type
	 *
	 * @return {boolean}
	 */
	hasAttachments(type = null) {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.getType() === type
		));
	}

	/**
	 * Returns the event URL
	 *
	 * @return {string}
	 */
	getUrl() {
		return this.payload.event_url;
	}

	/**
	 * Returns the creation time
	 *
	 * @return {number}
	 */
	getDate() {
		return this.payload.creation_time;
	}

	/**
	 * Returns the text of the post
	 *
	 * @return {string}
	 */
	getText() {
		return this.payload.text;
	}

	/**
	 * Returns the attachments
	 *
	 * @param {?string} type
	 *
	 * @return {Array}
	 */
	getAttachments(type = null) {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.getType() === type
		));
	}

	/**
	 * Returns the text of the shared post
	 *
	 * @return {?string}
	 */
	getSharedText() {
		return this.payload.shared_post_text || null;
	}

	/**
	 * Returns the creation time from original post
	 *
	 * @return {?number}
	 */
	getSharedDate() {
		return this.payload.shared_post_creation_time || null;
	}

	/**
	 * Returns the action type
	 *
	 * @return {string}
	 */
	getActionType() {
		return this.payload.action;
	}

	/**
	 * Returns the creation time from
	 *
	 * @return {number}
	 */
	getActionDate() {
		return this.payload.action_time;
	}

	/**
	 * Returns the geo location
	 *
	 * @return {Object}
	 */
	getGeo() {
		return this.payload.geo;
	}

	/**
	 * Returns the rule tags
	 *
	 * @return {Array}
	 */
	getTags() {
		return this.payload.tags;
	}

	/**
	 * Returns the identifier signer user
	 *
	 * @return {number}
	 */
	getSignerId() {
		return this.payload.signer_id;
	}

	/**
	 * Returns the information of author
	 *
	 * @return {Object}
	 */
	getAuthor() {
		return this.payload.author;
	}

	/**
	 * Returns the identifier author
	 *
	 * @return {number}
	 */
	getAuthorId() {
		return this.payload.author.id;
	}

	/**
	 * Returns the author url
	 *
	 * @return {string}
	 */
	getAuthorUrl() {
		return this.payload.author.author_url;
	}

	/**
	 * Returns the identifier of the author of the original post
	 *
	 * @return {?number}
	 */
	getSharedAuthorId() {
		return this.payload.author.shared_post_author_id || null;
	}

	/**
	 * Returns the author url of the original post
	 *
	 * @return {?string}
	 */
	getSharedAuthorUrl() {
		return this.payload.author.shared_post_author_url || null;
	}

	/**
	 * Returns the author platform
	 *
	 * @return {?string}
	 */
	getAuthorPlatform() {
		return platforms.get(this.payload.author.platform);
	}
}
