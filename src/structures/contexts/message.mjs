import nodeUtil from 'util';

import Context from './context';

import transformMessage from '../../updates/transform-message';

import { uniqueKeys } from '../../utils/helpers';
import { transformAttachments } from '../attachments/helpers';
import { updatesSources, messageSources, CHAT_PEER } from '../../utils/constants';

const lt = /&lt;/g;
const qt = /&gt;/g;
const br = /<br>/g;
const amp = /&amp;/g;
const quot = /&quot;/g;

/**
 * Decodes HTML entities
 *
 * @param {string} text
 *
 * @return {string}
 */
export const unescapeHTML = text => (
	text
		.replace(lt, '<')
		.replace(qt, '>')
		.replace(br, '\n')
		.replace(amp, '&')
		.replace(quot, '"')
);

/**
 * Returns peer id type
 *
 * @param {number} id
 *
 * @return {string}
 */
const getPeerType = (id) => {
	if (CHAT_PEER < id) {
		return messageSources.CHAT;
	}

	if (id < 0) {
		return messageSources.GROUP;
	}

	return messageSources.USER;
};

export default class MessageContext extends Context {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} payload
	 * @param {Object} options
	 */
	constructor(vk, payload, { source, updateType, groupId = null }) {
		super(vk);

		const isPolling = source === updatesSources.POLLING;
		const isWebhook = source === updatesSources.WEBHOOK;

		if (isPolling) {
			payload = transformMessage(payload);
		}

		if (!payload.action) {
			payload.action = {};
		}

		this.payload = payload;

		const { peer_id: peerId, from_id: fromId } = payload;

		this.from = {
			id: peerId,
			type: getPeerType(peerId)
		};
		this.sender = {
			id: fromId,
			type: getPeerType(fromId)
		};

		this.text = this.payload.text
			? unescapeHTML(this.payload.text)
			: null;

		this.attachments = transformAttachments(payload.attachments, vk);

		const subTypes = uniqueKeys(this.attachments.map(attachment => attachment.getType()));

		if (!this.isEvent()) {
			if (isWebhook) {
				subTypes.push((
					updateType === 'message_edit'
						? 'edit_message'
						: 'new_message'

				));
			} else if (isPolling) {
				subTypes.push((
					updateType === 5
						? 'edit_message'
						: 'new_message'
				));
			}
		} else {
			subTypes.push(this.getEventType());
		}

		if (this.hasText()) {
			subTypes.push('text');
		}

		this.type = 'message';
		this.subTypes = subTypes;

		this.$groupId = groupId;

		this.filled = isWebhook;

		this.isDM = nodeUtil.deprecate(
			() => this.isUser(),
			'context.isDM() is deprecated. Use context.isUser() instead.'
		);
		this.getUserId = nodeUtil.deprecate(
			() => this.getSenderId(),
			'context.getUserId() is deprecated. Use context.getSenderId() instead.'
		);
		this.getEventId = nodeUtil.deprecate(
			() => this.getEventMemberId(),
			'context.getEventId() is deprecated. Use context.getEventMemberId() instead.'
		);
	}

	/**
	 * Load message payload
	 *
	 * @return {Promise}
	 */
	async loadMessagePayload() {
		if (this.filled) {
			return;
		}

		const { items } = await this.vk.api.messages.getById({
			message_ids: this.getId()
		});
		const [message] = items;

		this.payload = message;

		this.attachments = transformAttachments(message.attachments, this.vk);

		this.filled = true;
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
	 * Checks if there is text
	 *
	 * @return {boolean}
	 */
	hasText() {
		return this.text !== null;
	}

	/**
	 * Checks for forwarded messages
	 *
	 * @return {boolean}
	 */
	hasForwards() {
		return 'fwd_messages' in this.payload;
	}

	/**
	 * Checks if there is text
	 *
	 * @return {boolean}
	 */
	hasGeo() {
		return Boolean(this.payload.geo);
	}

	/**
	 * Check is a user
	 *
	 * @return {boolean}
	 */
	isUser() {
		return this.from.type === messageSources.USER;
	}

	/**
	 * Checks is a chat
	 *
	 * @return {boolean}
	 */
	isChat() {
		return this.from.type === messageSources.CHAT;
	}

	/**
	 * Checks is a group
	 *
	 * @return {boolean}
	 */
	isGroup() {
		return this.from.type === messageSources.GROUP;
	}

	/**
	 * Check is special event
	 *
	 * @return {boolean}
	 */
	isEvent() {
		return this.getEventType() !== null;
	}

	/**
	 * Checks whether the message is outbox
	 *
	 * @return {boolean}
	 */
	isOutbox() {
		return Boolean(this.payload.out);
	}

	/**
	 * Checks whether the message is inbox
	 *
	 * @return {boolean}
	 */
	isInbox() {
		return !this.isOutbox();
	}

	/**
	 * Checks that the message was deleted
	 *
	 * @deprecated
	 */
	isDeleted() {
		throw new Error('context.isDeleted no longer supported');
	}

	/**
	 * Checks whether the message is read
	 *
	 * @deprecated
	 */
	isRead() {
		throw new Error('context.isRead no longer supported');
	}

	/**
	 * Checks that the message is important
	 *
	 * @return {boolean}
	 */
	isImportant() {
		return this.payload.important;
	}

	/**
	 * Returns the identifier message
	 *
	 * @return {number}
	 */
	getId() {
		const { id } = this.payload;

		return id !== 0
			? id
			: this.getConversationMessageId();
	}

	/**
	 * Returns the conversation message id
	 *
	 * @return {number}
	 */
	getConversationMessageId() {
		return this.payload.conversation_message_id;
	}

	/**
	 * Returns the destination identifier
	 *
	 * @return {number}
	 */
	getPeerId() {
		return this.from.id;
	}

	/**
	 * Returns the peer type
	 *
	 * @return {string}
	 */
	getPeerType() {
		return this.from.type;
	}

	/**
	 * Returns the sender identifier
	 *
	 * @return {number}
	 */
	getSenderId() {
		return this.sender.id;
	}

	/**
	 * Returns the sender type
	 *
	 * @return {string}
	 */
	getSenderType() {
		return this.sender.type;
	}

	/**
	 * Returns the identifier chat
	 *
	 * @return {?number}
	 */
	getChatId() {
		if (!this.isChat()) {
			return null;
		}

		return this.getPeerId() - CHAT_PEER;
	}

	/**
	 * Returns the timestamp when this message was created
	 *
	 * @return {number}
	 */
	getTimestamp() {
		return this.payload.date;
	}

	/**
	 * Returns the Date object when this message was created
	 *
	 * @return {Date}
	 */
	getDate() {
		return new Date(this.payload.date);
	}

	/**
	 * Returns the chat title
	 *
	 * @return {string}
	 */
	getTitle() {
		return this.payload.title || null;
	}

	/**
	 * Returns the text
	 *
	 * @return {?string}
	 */
	getText() {
		return this.text;
	}

	/**
	 * Returns the from
	 *
	 * @return {Object}
	 */
	getFrom() {
		return this.from;
	}

	/**
	 * Returns the sender
	 *
	 * @return {Object}
	 */
	getSender() {
		return this.sender;
	}

	/**
	 * Returns the forwards messages
	 *
	 * @return {Object[]}
	 */
	getForwards() {
		return this.payload.fwd_messages || [];
	}

	/**
	 * Returns geo
	 *
	 * @return {?Object}
	 */
	getGeo() {
		if (!this.hasGeo()) {
			return null;
		}

		if (!this.filled) {
			throw new Error('The message payload is not fully loaded');
		}

		return this.payload.geo;
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
	 * Returns the event name
	 *
	 * @return {?string}
	 */
	getEventType() {
		const { type } = this.payload.action;

		if (!type) {
			return null;
		}

		return type;
	}

	/**
	 * Returns the event member id
	 *
	 * @return {?number}
	 */
	getEventMemberId() {
		const { member_id: id } = this.payload.action;

		if (!id) {
			return null;
		}

		return Number(id);
	}

	/**
	 * Returns the event name
	 *
	 * @return {?string}
	 */
	getEventText() {
		const { text } = this.payload.action;

		if (!text) {
			return null;
		}

		return text;
	}

	/**
	 * Returns the event email
	 *
	 * @return {?string}
	 */
	getEventEmail() {
		const { email } = this.payload.action;

		if (!email) {
			return null;
		}

		return email;
	}

	/**
	 * Returns the message payload
	 *
	 * @return {?mixed}
	 */
	getMessagePayload() {
		const { payload = null } = this.payload;

		if (payload === null) {
			return null;
		}

		return JSON.parse(payload);
	}

	/**
	 * Gets a link to invite the user to a conversation
	 *
	 * @param {Object} params
	 *
	 * @type {Promise<Object>}
	 */
	getInviteLink(params = {}) {
		return this.vk.api.messages.getInviteLink({
			...params,

			peer_id: this.getPeerId()
		});
	}

	/**
	 * Edits a message
	 *
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	editMessage(params) {
		return this.vk.api.messages.edit({
			...params,

			peer_id: this.getPeerId(),
			message_id: this.getId()
		});
	}

	/**
	 * Edits a message text
	 *
	 * @param {string} message
	 *
	 * @return {Promise}
	 */
	async editMessageText(message) {
		try {
			const response = await this.editMessage({ message });

			this.text = message;

			return response;
		} catch (e) {
			throw e;
		}
	}

	/**
	 * Sends a message to the current dialog
	 *
	 * @param {string|Object} text
	 * @param {Object}        params
	 *
	 * @return {Promise}
	 */
	send(text, params = {}) {
		if (typeof text !== 'object') {
			params.message = text;
		} else {
			params = text;
		}

		params.peer_id = this.getPeerId();

		return this.vk.api.messages.send(params);
	}

	/**
	 * Responds to the current message
	 *
	 * @param {string|Object} text
	 * @param {Object}        params
	 *
	 * @return {Promise}
	 */
	reply(text, params = {}) {
		if (typeof text !== 'object') {
			params.message = text;
		} else {
			params = text;
		}

		params.forward_messages = this.getId();

		return this.send(params);
	}

	/**
	 * Sends a sticker to the current dialog
	 *
	 * @param {number} id
	 *
	 * @return {Promise}
	 */
	sendSticker(id) {
		return this.send({
			sticker_id: id
		});
	}

	/**
	 * Sends a photo to the current dialog
	 *
	 * @param {mixed}  sourxe
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	async sendPhoto(source, params = {}) {
		const attachment = await this.vk.upload.messagePhoto({
			peer_id: this.getSenderId(),

			source
		});

		return await this.send({
			...params,

			attachment
		});
	}

	/**
	 * Sends a document to the current dialog
	 *
	 * @param {mixed}  sourxe
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	async sendDocument(source, params = {}) {
		const attachment = await this.vk.upload.messageDocument({
			peer_id: this.getSenderId(),

			source
		});

		return await this.send({
			...params,

			attachment
		});
	}

	/**
	 * Sends a voice to the current dialog
	 *
	 * @param {mixed}  sourxe
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	async sendVoice(source, params = {}) {
		const attachment = await this.vk.upload.voice({
			peer_id: this.getSenderId(),

			source
		});

		return await this.send({
			...params,

			attachment
		});
	}

	/**
	 * Changes the status of typing in the dialog
	 *
	 * @return {Promise<boolean>}
	 */
	async setActivity() {
		const isActivited = await this.vk.api.messages.setActivity({
			peer_id: this.getPeerId(),
			type: 'typing'
		});

		return Boolean(isActivited);
	}

	/**
	 * Marks messages as important or removes a mark.
	 *
	 * @param {Array}  ids
	 * @param {Object} options
	 *
	 * @return {Promise<Array>}
	 */
	async markAsImportant(
		ids = [this.getId()],
		options = { important: Number(!this.isImportant()) }
	) {
		const messageIds = await this.vk.api.messages.markAsImportant({
			...options,

			message_ids: ids.join(',')
		});

		if (messageIds.includes(this.getId())) {
			this.payload.important = Boolean(options.important);
		}

		return messageIds;
	}

	/**
	 * Deletes the message
	 *
	 * @param {Array}  ids
	 * @param {Object} options
	 *
	 * @return {Promise<number[]>}
	 */
	async deleteMessage(ids = [this.getId()], options = { spam: 0 }) {
		let messageIds = await this.vk.api.messages.delete({
			...options,

			message_ids: ids.join(',')
		});

		messageIds = Object.entries(messageIds)
			.filter(([, value]) => Boolean(value))
			.map(([key]) => key);

		if (messageIds.includes(this.getId())) {
			this.payload.delete = 1;
		}

		return messageIds;
	}

	/**
	 * Restores the message
	 *
	 * @return {Promise<boolean>}
	 */
	async restoreMessage() {
		const isRestored = await this.vk.api.messages.restore({
			message_id: this.getId()
		});

		return Boolean(isRestored);
	}

	/**
	 * Allows you to join the chat by an invitation link
	 *
	 * @param {string} params
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	joinChatByInviteLink(link, params = {}) {
		return this.vk.api.messages.joinChatByInviteLink({
			...params,

			link
		});
	}

	/**
	 * Checks that in a chat
	 */
	assertIsChat() {
		if (!this.isChat()) {
			throw new Error('This method is only available in chat');
		}
	}

	/**
	 * Rename the chat
	 *
	 * @param {string} title
	 *
	 * @return {Promise<boolean>}
	 */
	async renameChat(title) {
		this.assertIsChat();

		const isRenamed = await this.vk.api.messages.editChat({
			chat_id: this.getChatId(),
			title
		});

		return Boolean(isRenamed);
	}

	/**
	 * Sets a new image for the chat
	 *
	 * @param {mixed}  source
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	async newChatPhoto(source, params = {}) {
		this.assertIsChat();

		return await this.vk.upload.chatPhoto({
			...params,

			chat_id: this.getChatId(),
			source
		});
	}

	/**
	 * Remove the chat photo
	 *
	 * @return {Promise<boolean>}
	 */
	async deleteChatPhoto() {
		this.assertIsChat();

		return this.vk.api.messages.deleteChatPhoto({
			chat_id: this.getChatId()
		});
	}

	/**
	 * Invites a new user
	 *
	 * @param {number} id
	 *
	 * @return {Promise<boolean>}
	 */
	async inviteUser(id = this.getEventId()) {
		this.assertIsChat();

		const isInvited = await this.vk.api.messages.removeChatUser({
			chat_id: this.getChatId(),
			user_id: id
		});

		return Boolean(isInvited);
	}

	/**
	 * Excludes user
	 *
	 * @param {number} id
	 *
	 * @return {Promise<boolean>}
	 */
	async kickUser(id = this.getEventId()) {
		this.assertIsChat();

		const isKicked = await this.vk.api.messages.removeChatUser({
			chat_id: this.getChatId(),
			user_id: id
		});

		return Boolean(isKicked);
	}

	/**
	 * Pins a message
	 *
	 * @return {Promise<boolean>}
	 */
	async pinMessage() {
		this.assertIsChat();

		const isPinned = await this.vk.api.messages.pin({
			peer_id: this.getPeerId(),
			message_id: this.getId()
		});

		return Boolean(isPinned);
	}

	/**
	 * Unpins a message
	 *
	 * @return {Promise<boolean>}
	 */
	async unpinMessage() {
		this.assertIsChat();

		const isUnpinned = await this.vk.api.messages.unpin({
			peer_id: this.getPeerId(),
			message_id: this.getId()
		});

		return Boolean(isUnpinned);
	}
}
