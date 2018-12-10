import Context from './context';

import { getPeerType } from '../shared/helpers';
import { copyParams, showDeprecatedMessage } from '../../utils/helpers';
import {
	CHAT_PEER,

	updatesSources,
	inspectCustomData
} from '../../utils/constants';

const transformPolling = ({ 1: fromId, 2: toId }, updateType) => ({
	from_id: fromId,
	to_id: updateType === 62
		? toId + CHAT_PEER
		: fromId,

	state: 'typing'
});

export default class TypingContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Array}  payload
	 * @param {Object} options
	 */
	constructor(vk, payload, { source, updateType, groupId = null }) {
		super(vk);

		this.payload = source === updatesSources.POLLING
			? transformPolling(payload, updateType)
			: payload;

		this.type = 'typing';
		this.subTypes = [
			`typing_${getPeerType(this.fromId)}`
		];

		this.$groupId = groupId;
	}

	/**
	 * Checks is typing
	 *
	 * @return {boolean}
	 */
	get isTyping() {
		return this.payload.state === 'typing';
	}

	/**
	 * Checks is record audio message
	 *
	 * @return {boolean}
	 */
	get isAudioMessage() {
		return this.payload.state === 'audiomessage';
	}

	/**
	 * Checks that the message is typed in the dm
	 *
	 * @return {boolean}
	 */
	get isUser() {
		return this.subTypes.includes('typing_user');
	}

	/**
	 * Checks that the message is typed in the chat
	 *
	 * @return {boolean}
	 */
	get isGroup() {
		return this.subTypes.includes('typing_group');
	}

	/**
	 * Checks that the message is typed in the chat
	 *
	 * @return {boolean}
	 */
	get isChat() {
		return this.chatId !== null;
	}

	/**
	 * Returns the identifier sender
	 *
	 * @return {number}
	 */
	get fromId() {
		return this.payload.from_id;
	}

	/**
	 * Returns the identifier destination
	 *
	 * @return {number}
	 */
	get toId() {
		return this.payload.to_id;
	}

	/**
	 * Returns the identifier peer
	 *
	 * @return {number}
	 */
	// DEPRECATED: Remove in release version
	get peerId() {
		showDeprecatedMessage('TypingContext, use toId instead of peerId');

		return this.toId;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {number}
	 */
	// DEPRECATED: Remove in release version
	get userId() {
		showDeprecatedMessage('TypingContext, use fromId instead of userId');

		return this.fromId;
	}

	/**
	 * Returns the identifier chat
	 *
	 * @return {?number}
	 */
	get chatId() {
		const chatId = this.toId - CHAT_PEER;

		return chatId > 0
			? chatId
			: null;
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		return copyParams(this, [
			'fromId',
			'toId',
			'chatId',
			'isUser',
			'isGroup',
			'isChat',
			'isTyping',
			'isAudioMessage'
		]);
	}
}
