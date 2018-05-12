import Context from './context';

import transformMessage from '../../updates/transform-message';

import { unescapeHTML } from '../../updates/helpers';
import { transformAttachments } from '../attachments/helpers';
import { CHAT_PEER, updatesSources } from '../../utils/constants';

const attachmentsTypes = [
	'doc',
	'gift',
	'link',
	'wall',
	'photo',
	'video',
	'audio',
	'market',
	'sticker',
	'wall_reply',
	'market_album'
];

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

		this.payload = payload;

		let peerId;
		let peerType;

		if ('chat_id' in payload) {
			peerId = payload.chat_id + CHAT_PEER;
			peerType = 'chat';
		} else {
			peerId = payload.user_id;

			if (peerId < 0) {
				peerType = 'group';
			} else {
				peerType = 'dm';
			}
		}

		this.from = {
			id: peerId,
			type: peerType
		};

		this.text = this.payload.body
			? unescapeHTML(this.payload.body)
			: null;

		this.attachments = transformAttachments(payload.attachments, vk);

		const subTypes = attachmentsTypes.filter(type => (
			this.attachments.some(attachment => (
				attachment.getType() === type
			))
		));

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
		}

		if (this.hasText()) {
			subTypes.push('text');
		}

		if ('action' in this.payload) {
			subTypes.push(this.payload.action);
		}

		this.type = 'message';
		this.subTypes = subTypes;

		this.$groupId = groupId;

		this.filled = isWebhook;
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
	 * Checks is a DM
	 *
	 * @return {boolean}
	 */
	isDM() {
		return this.from.type === 'dm';
	}

	/**
	 * Checks is a chat
	 *
	 * @return {boolean}
	 */
	isChat() {
		return this.from.type === 'chat';
	}

	/**
	 * Checks is a group
	 *
	 * @return {boolean}
	 */
	isGroup() {
		return this.from.type === 'group';
	}

	/**
	 * Check is special event
	 *
	 * @return {boolean}
	 */
	isEvent() {
		return this.isChat() && Boolean(this.payload.action);
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
	 * @return {boolean}
	 */
	isDeleted() {
		return Boolean(this.payload.deleted);
	}

	/**
	 * Checks whether the message is read
	 *
	 * @return {boolean}
	 */
	isRead() {
		return Boolean(this.payload.read_state);
	}

	/**
	 * Checks that the message is important
	 *
	 * @return {boolean}
	 */
	isImportant() {
		return Boolean(this.payload.important);
	}

	/**
	 * Returns the identifier message
	 *
	 * @return {number}
	 */
	getId() {
		return this.payload.id;
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
	 * Returns the sender identifier
	 *
	 * @return {number}
	 */
	getSenderId() {
		return this.payload.from_id || this.getUserId() || null;
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

		return this.payload.chat_id;
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
	 * Returns the event id
	 *
	 * @type {Object}
	 */
	getEventId() {
		const { action_mid: id } = this.payload;

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
	getEventType() {
		return this.payload.action || null;
	}

	/**
	 * Returns the event name
	 *
	 * @return {?string}
	 */
	getEventText() {
		return this.payload.action_text || null;
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

		params.peer_id = this.from.id;

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

		params.forward_messages = this.payload.id;

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
			peer_id: this.getPeerId(),

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
			peer_id: this.getPeerId(),

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
			peer_id: this.getPeerId(),

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
			peer_id: this.from.id,
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
			this.payload.important = options.important;
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
			message_id: this.payload.id
		});

		if (this.isDeleted() && isRestored) {
			this.payload.deleted = 0;
		}

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
