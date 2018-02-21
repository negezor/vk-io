import Context from './context';

import { CHAT_PEER } from '../../util/constants';

export default class TypingContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}    vk
	 * @param {Array} update
	 */
	constructor(vk, [eventId, user, extra]) {
		super(vk);

		const isChat = eventId === 62;

		this.payload = {
			user_id: user,
			chat_id: isChat
				? extra
				: null,
			peer_id: isChat
				? extra + CHAT_PEER
				: user

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
