import Attachment from './attachment';

export default class VideoAttachment extends Attachment {
	/**
	 * Constructor
	 *
	 * @param {Object} payload
	 * @param {VK}     vk
	 */
	constructor(payload, vk) {
		super('video', payload.owner_id, payload.id, payload.access_key);

		this.vk = vk;
		this.payload = payload;

		// this.filled = 'duration' in payload && 'date' in payload;
		this.filled = 'date' in payload;
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

		const { items } = await this.vk.api.video.get({
			videos: `${this.owner}_${this.id}`,
			extended: 0
		});

		const [video] = items;

		this.payload = video;

		if ('access_key' in this.payload) {
			this.accessKey = this.payload.access_key;
		}

		this.filled = true;
	}

	/**
	 * Checks whether the video is repeatable
	 *
	 * @return {?boolean}
	 */
	isRepeat() {
		return this.checkBooleanInProperty('repeat');
	}

	/**
	 * Checks that the user can add a video to himself
	 *
	 * @return {?boolean}
	 */
	isCanAdd() {
		return this.checkBooleanInProperty('can_add');
	}

	/**
	 * Checks if the user can edit the video
	 *
	 * @return {?boolean}
	 */
	isCanEdit() {
		return this.checkBooleanInProperty('can_edit');
	}

	/**
	 * Checks whether the video is being processed
	 *
	 * @return {?boolean}
	 */
	isProcessing() {
		return this.checkBooleanInProperty('processing');
	}

	/**
	 * Checks whether the video is a broadcast
	 *
	 * @return {?boolean}
	 */
	isBroadcast() {
		return this.checkBooleanInProperty('live');
	}

	/**
	 * Checks whether the video is a broadcast
	 *
	 * @return {?boolean}
	 */
	isUpcoming() {
		return this.checkBooleanInProperty('upcoming');
	}

	/**
	 * Returns the title
	 *
	 * @return {?string}
	 */
	getTitle() {
		return this.payload.title || null;
	}

	/**
	 * Returns the description
	 *
	 * @return {?string}
	 */
	getDescription() {
		return this.payload.description || null;
	}

	/**
	 * Returns the duration
	 *
	 * @return {?string}
	 */
	getDuration() {
		return this.payload.duration || null;
	}

	/**
	 * Returns the video upload date (timestamp)
	 *
	 * @return {?number}
	 */
	getDate() {
		return this.payload.date || null;
	}

	/**
	 * Returns the video adding date (timestamp)
	 *
	 * @return {?number}
	 */
	getAddingDate() {
		return this.payload.adding_date || null;
	}

	/**
	 * Returns the count views
	 *
	 * @return {?number}
	 */
	getViewsCount() {
		return this.payload.views || null;
	}

	/**
	 * Returns the count comments
	 *
	 * @return {?number}
	 */
	getCommentsCount() {
		return this.payload.comments || null;
	}

	/**
	 * Returns the video height
	 *
	 * @return {?number}
	 */
	getHeight() {
		return this.payload.height || null;
	}

	/**
	 * Returns the video width
	 *
	 * @return {?number}
	 */
	getWidth() {
		return this.payload.width || null;
	}

	/**
	 * Returns the URL of the page with the player
	 *
	 * @return {?string}
	 */
	getPlayer() {
		return this.payload.player || null;
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
