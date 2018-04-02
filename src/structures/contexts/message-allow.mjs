import Context from './context';

export default class MessageAllowContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 * @param {Object} options
	 */
	constructor(vk, payload, { updateType, groupId }) {
		super(vk);

		this.payload = payload;

		this.type = 'message_subscribers';
		this.subTypes = [
			updateType === 'message_allow'
				? 'message_subscribe'
				: 'message_unsubscribe'
		];

		this.$groupId = groupId;
	}

	/**
	 * Checks that the user has subscribed to messages
	 *
	 * @return {boolean}
	 */
	isSubscribed() {
		return this.subTypes.includes('message_subscribe');
	}

	/**
	 * Checks that the user has unsubscribed from the messages
	 *
	 * @return {boolean}
	 */
	isUbsubscribed() {
		return this.subTypes.includes('message_unsubscribe');
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {number}
	 */
	getUserId() {
		return this.payload.user_id;
	}

	/**
	 * Returns the key
	 *
	 * @return {?string}
	 */
	getKey() {
		return this.payload.key || null;
	}
}
