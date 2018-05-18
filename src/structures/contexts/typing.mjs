import Context from './context';

import { CHAT_PEER } from '../../utils/constants';

export default class TypingContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Array}  payload
	 * @param {Object} options
	 */
	constructor(vk, [eventId, userId, extra]) {
		super(vk);

		const isChat = eventId === 62;

		this.payload = {
			user_id: userId,
			chat_id: isChat
				? extra
				: null,
			peer_id: isChat
				? extra + CHAT_PEER
				: userId

		};

		this.type = 'typing';
		this.subTypes = [
			eventId === 61
				? 'typing_dm'
				: 'typing_chat'
		];
	}

	/**
	 * Checks that the message is typed in the dm
	 *
	 * @return {boolean}
	 */
	isDM() {
		return this.subTypes.includes('typing_dm');
	}

	/**
	 * Checks that the message is typed in the chat
	 *
	 * @return {boolean}
	 */
	isChat() {
		return this.subTypes.includes('typing_chat');
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
	 * Returns the identifier chat
	 *
	 * @return {?number}
	 */
	getChatId() {
		return this.payload.chat_id;
	}
}
