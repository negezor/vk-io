import Attachment from './attachment';

import { attachmentTypes } from '../../utils/constants';

const { VIDEO } = attachmentTypes;

export default class VideoAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super(VIDEO, payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		this.$filled = 'date' in payload;
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

		const { items } = await this.vk.api.video.get({
			videos: `${this.ownerId}_${this.id}`,
			extended: 0
		});

		const [video] = items;

		this.payload = video;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.$filled = true;
	}

	/**
	 * Checks whether the video is repeatable
	 *
	 * @return {?boolean}
	 */
	get isRepeat() {
		return this.checkBooleanInProperty('repeat');
	}

	/**
	 * Checks that the user can add a video to himself
	 *
	 * @return {?boolean}
	 */
	get isCanAdd() {
		return this.checkBooleanInProperty('can_add');
	}

	/**
	 * Checks if the user can edit the video
	 *
	 * @return {?boolean}
	 */
	get isCanEdit() {
		return this.checkBooleanInProperty('can_edit');
	}

	/**
	 * Checks whether the video is being processed
	 *
	 * @return {?boolean}
	 */
	get isProcessing() {
		return this.checkBooleanInProperty('processing');
	}

	/**
	 * Checks whether the video is a broadcast
	 *
	 * @return {?boolean}
	 */
	get isBroadcast() {
		return this.checkBooleanInProperty('live');
	}

	/**
	 * Checks whether the video is a broadcast
	 *
	 * @return {?boolean}
	 */
	get isUpcoming() {
		return this.checkBooleanInProperty('upcoming');
	}

	/**
	 * Returns the title
	 *
	 * @return {?string}
	 */
	get title() {
		return this.payload.title || null;
	}

	/**
	 * Returns the description
	 *
	 * @return {?string}
	 */
	get description() {
		return this.payload.description || null;
	}

	/**
	 * Returns the duration
	 *
	 * @return {?number}
	 */
	get duration() {
		return this.payload.duration || null;
	}

	/**
	 * Returns the date when this video was created
	 *
	 * @return {?number}
	 */
	get createdAt() {
		return this.payload.date || null;
	}

	/**
	 * Returns the date when this video was added
	 *
	 * @return {?Date}
	 */
	get addedAt() {
		return this.payload.adding_date || null;
	}

	/**
	 * Returns the count views
	 *
	 * @return {?number}
	 */
	get viewsCount() {
		return this.payload.views || null;
	}

	/**
	 * Returns the count comments
	 *
	 * @return {?number}
	 */
	get commentsCount() {
		return this.payload.comments || null;
	}

	/**
	 * Returns the URL of the page with the player
	 *
	 * @return {?string}
	 */
	get player() {
		return this.payload.player || null;
	}


	/**
	 * Returns the name of the platform (for video recordings added from external sites)
	 *
	 * @return {?string}
	 */
	get platformName() {
		return this.payload.platform || null;
	}

	/**
	 * Checks for a boolean value in the property
	 *
	 * @param {string} name
	 *
	 * @return {?boolean}
	 */
	checkBooleanInProperty(name) {
		const property = this.payload[name];

		if (typeof property !== 'number') {
			return null;
		}

		return property === 1;
	}
}
