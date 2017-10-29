import Context from './context';

export default class MessageAllowContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 *
	 * @return {[type]}
	 */
	constructor(vk, { type, object: update }) {
		super(vk);

		this.payload = update;

		this.type = 'message_subscribers';
		this.subTypes = [
			type === 'message_allow'
				? 'message_subscribe'
				: 'message_unsubscribe'
		];
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
