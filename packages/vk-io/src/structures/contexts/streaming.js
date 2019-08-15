import Context from './context';

import { copyParams } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';
import { platforms, inspectCustomData } from '../../utils/constants';

export default class StreamingContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		const { action, event_type: type } = options.payload;

		super({
			...options,

			type: 'publication',
			subTypes: [
				`publication_${type}`,
				`${action}_publication`,
				`${action}_publication_${type}`
			]
		});

		this.attachments = transformAttachments(this.payload.attachments, this.vk);
	}

	/**
	 * Checks is new object
	 *
	 * @return {boolean}
	 */
	get isNew() {
		return this.actionType === 'new';
	}

	/**
	 * Checks is update object
	 *
	 * @return {boolean}
	 */
	get isUpdate() {
		return this.actionType === 'update';
	}

	/**
	 * Checks is delete object
	 *
	 * @return {boolean}
	 */
	get isDelete() {
		return this.actionType === 'delete';
	}

	/**
	 * Checks is restore object
	 *
	 * @return {boolean}
	 */
	get isRestore() {
		return this.actionType === 'restore';
	}

	/**
	 * Checks is post event
	 *
	 * @return {boolean}
	 */
	get isPost() {
		return this.eventType === 'post';
	}

	/**
	 * Checks is share event
	 *
	 * @return {boolean}
	 */
	get isShare() {
		return this.eventType === 'share';
	}

	/**
	 * Checks is comment event
	 *
	 * @return {boolean}
	 */
	get isComment() {
		return this.eventType === 'comment';
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
			attachment.type === type
		));
	}

	/**
	 * Returns the event URL
	 *
	 * @return {string}
	 */
	get url() {
		return this.payload.event_url;
	}

	/**
	 * Returns the creation time
	 *
	 * @return {number}
	 */
	get createdAt() {
		return this.payload.creation_time;
	}

	/**
	 * Returns the text of the post
	 *
	 * @return {?string}
	 */
	get text() {
		return this.payload.text || null;
	}

	/**
	 * Returns the text of the shared post
	 *
	 * @return {?string}
	 */
	get sharedText() {
		return this.payload.shared_post_text || null;
	}

	/**
	 * Returns the creation time from original post
	 *
	 * @return {?number}
	 */
	get sharedAt() {
		return this.payload.shared_post_creation_time || null;
	}

	/**
	 * Returns the action type
	 *
	 * @return {string}
	 */
	get actionType() {
		return this.payload.action;
	}

	/**
	 * Returns the event type
	 *
	 * @return {string}
	 */
	get eventType() {
		return this.payload.event_type;
	}

	/**
	 * Returns the creation time from
	 *
	 * @return {number}
	 */
	get actionAt() {
		return this.payload.action_time;
	}

	/**
	 * Returns the geo location
	 *
	 * @return {Object}
	 */
	get geo() {
		return this.payload.geo;
	}

	/**
	 * Returns the rule tags
	 *
	 * @return {string[]}
	 */
	get tags() {
		return this.payload.tags;
	}

	/**
	 * Returns the identifier signer user
	 *
	 * @return {number}
	 */
	get signerId() {
		return this.payload.signer_id;
	}

	/**
	 * Returns the information of author
	 *
	 * @return {Object}
	 */
	get author() {
		return this.payload.author;
	}

	/**
	 * Returns the identifier author
	 *
	 * @return {number}
	 */
	get authorId() {
		return this.payload.author.id;
	}

	/**
	 * Returns the author url
	 *
	 * @return {string}
	 */
	get authorUrl() {
		return this.payload.author.author_url;
	}

	/**
	 * Returns the identifier of the author of the original post
	 *
	 * @return {?number}
	 */
	get sharedAuthorId() {
		return this.payload.author.shared_post_author_id || null;
	}

	/**
	 * Returns the author url of the original post
	 *
	 * @return {?string}
	 */
	get sharedAuthorUrl() {
		return this.payload.author.shared_post_author_url || null;
	}

	/**
	 * Returns the author platform
	 *
	 * @return {?string}
	 */
	get authorPlatform() {
		return platforms.get(this.payload.author.platform);
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
			attachment.type === type
		));
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		const properties = [
			'url',
			'created',
			'text',
			'sharedText',
			'sharedAt',
			'actionType',
			'eventType',
			'actionAt',
			'geo',
			'tags',
			'signerId',
			'author',
			'authorId',
			'authorUrl',
			'sharedAuthorId',
			'sharedAuthorUrl',
			'authorPlatform',
			'isNew',
			'isUpdate',
			'isDelete',
			'isRestore',
			'isPost',
			'isShare',
			'isComment'
		];

		const filtredEmptyProperties = properties.filter(property => (
			this[property] !== null
		));

		return copyParams(this, filtredEmptyProperties);
	}
}
