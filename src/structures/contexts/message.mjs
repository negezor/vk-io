import Context from './context';

import { VKError } from '../../errors';

import MessageReply from '../shared/message-reply';
import MessageForward from '../shared/message-forward';
import transformMessage from '../../updates/transform-message';
import MessageForwardsCollection from '../shared/message-forwards-collection';

import { getPeerType } from '../shared/helpers';
import { transformAttachments } from '../attachments/helpers';
import { uniqueKeys, unescapeHTML, copyParams } from '../../utils/helpers';
import {
	updatesSources,
	messageSources,
	CHAT_PEER,
	inspectCustomData
} from '../../utils/constants';

const subTypesEnum = {
	4: 'new_message',
	5: 'edit_message',
	message_new: 'new_message',
	message_edit: 'edit_message'
};

const kForwards = Symbol('forwards');
const kReplyMessage = Symbol('replyMessage');

const kAttachments = Symbol('attachments');

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

		if (source === updatesSources.POLLING) {
			payload = transformMessage(payload);

			this.$filled = false;
		} else {
			this.$filled = true;
		}

		this.$groupId = groupId;

		this.applyPayload(payload);

		const { peer_id: peerId, from_id: fromId } = payload;

		this.$from = {
			id: peerId,
			type: getPeerType(peerId)
		};
		this.$sender = {
			id: fromId,
			type: getPeerType(fromId)
		};

		const subTypes = uniqueKeys(payload.attachments.map(attachment => attachment.type));

		const { eventType } = this;

		subTypes.push(
			!eventType
				? subTypesEnum[updateType]
				: eventType
		);

		if (this.hasText) {
			subTypes.push('text');
		}

		this.type = 'message';
		this.subTypes = subTypes;
	}

	/**
	 * Load message payload
	 *
	 * @return {Promise}
	 */
	async loadMessagePayload() {
		if (this.$filled) {
			return;
		}

		const { items } = this.id !== 0
			? await this.vk.api.messages.getById({
				message_ids: this.id
			})
			: await this.vk.api.messages.getByConversationMessageId({
				peer_id: this.peerId,
				conversation_message_ids: this.conversationMessageId
			});

		const [message] = items;

		this[kForwards] = null;
		this[kReplyMessage] = null;
		this[kAttachments] = null;

		this.applyPayload(message);

		this.$filled = true;
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
	 * Checks if there is text
	 *
	 * @return {boolean}
	 */
	get hasText() {
		return this.text !== null;
	}

	/**
	 * Checks for reply message
	 *
	 * @return {boolean}
	 */
	get hasReplyMessage() {
		return this.replyMessage !== null;
	}

	/**
	 * Checks for forwarded messages
	 *
	 * @return {boolean}
	 */
	get hasForwards() {
		return this.forwards.length > 0;
	}

	/**
	 * Checks for hast message payload
	 *
	 * @return {boolean}
	 */
	get hasMessagePayload() {
		return Boolean(this.payload.payload);
	}

	/**
	 * Checks if there is text
	 *
	 * @return {boolean}
	 */
	get hasGeo() {
		return Boolean(this.payload.geo);
	}

	/**
	 * Checks is a chat
	 *
	 * @return {boolean}
	 */
	get isChat() {
		return this.peerType === messageSources.CHAT;
	}

	/**
	 * Check is a user
	 *
	 * @return {boolean}
	 */
	get isUser() {
		return this.senderType === messageSources.USER;
	}

	/**
	 * Checks is a group
	 *
	 * @return {boolean}
	 */
	get isGroup() {
		return this.senderType === messageSources.GROUP;
	}

	/**
	 * Checks is from the user
	 *
	 * @return {boolean}
	 */
	get isFromUser() {
		return this.peerType === messageSources.USER;
	}

	/**
	 * Checks is from the group
	 *
	 * @return {boolean}
	 */
	get isFromGroup() {
		return this.peerType === messageSources.GROUP;
	}

	/**
	 * Check is special event
	 *
	 * @return {boolean}
	 */
	get isEvent() {
		return this.eventType !== null;
	}

	/**
	 * Checks whether the message is outbox
	 *
	 * @return {boolean}
	 */
	get isOutbox() {
		return Boolean(this.payload.out);
	}

	/**
	 * Checks whether the message is inbox
	 *
	 * @return {boolean}
	 */
	get isInbox() {
		return !this.isOutbox;
	}

	/**
	 * Checks that the message is important
	 *
	 * @return {boolean}
	 */
	get isImportant() {
		return this.payload.important;
	}

	/**
	 * Returns the identifier message
	 *
	 * @return {number}
	 */
	get id() {
		return this.payload.id;
	}

	/**
	 * Returns the conversation message id
	 *
	 * @return {?number}
	 */
	get conversationMessageId() {
		return this.payload.conversation_message_id || null;
	}

	/**
	 * Returns the destination identifier
	 *
	 * @return {number}
	 */
	get peerId() {
		return this.$from.id;
	}

	/**
	 * Returns the peer type
	 *
	 * @return {string}
	 */
	get peerType() {
		return this.$from.type;
	}

	/**
	 * Returns the sender identifier
	 *
	 * @return {number}
	 */
	get senderId() {
		return this.$sender.id;
	}

	/**
	 * Returns the sender type
	 *
	 * @return {string}
	 */
	get senderType() {
		return this.$sender.type;
	}

	/**
	 * Returns the identifier chat
	 *
	 * @return {?number}
	 */
	get chatId() {
		if (!this.isChat) {
			return null;
		}

		return this.peerId - CHAT_PEER;
	}

	/**
	 * Returns the date when this message was created
	 *
	 * @return {number}
	 */
	get createdAt() {
		return this.payload.date;
	}

	/**
	 * Returns geo
	 *
	 * @return {?Object}
	 */
	get geo() {
		if (!this.hasGeo) {
			return null;
		}

		if (!this.$filled) {
			throw new VKError({
				message: 'The message payload is not fully loaded'
			});
		}

		return this.payload.geo;
	}

	/**
	 * Returns the event name
	 *
	 * @return {?string}
	 */
	get eventType() {
		return (
			this.payload.action
			&& this.payload.action.type
		) || null;
	}

	/**
	 * Returns the event member id
	 *
	 * @return {?number}
	 */
	get eventMemberId() {
		return (
			this.payload.action
			&& this.payload.action.member_id
		) || null;
	}

	/**
	 * Returns the event name
	 *
	 * @return {?string}
	 */
	get eventText() {
		return (
			this.payload.action
			&& this.payload.action.text
		) || null;
	}

	/**
	 * Returns the event email
	 *
	 * @return {?string}
	 */
	get eventEmail() {
		return (
			this.payload.action
			&& this.payload.action.email
		) || null;
	}

	/**
	 * Returns the message payload
	 *
	 * @return {?*}
	 */
	get messagePayload() {
		const { payload = null } = this.payload;

		if (payload === null) {
			return null;
		}

		return JSON.parse(payload);
	}

	/**
	 * Returns the forwards
	 */
	get forwards() {
		if (!this[kForwards]) {
			this[kForwards] = this.payload.fwd_messages
				? new MessageForwardsCollection(...this.payload.fwd_messages.map(forward => (
					new MessageForward(forward, this.vk)
				)))
				: new MessageForwardsCollection();
		}

		return this[kForwards];
	}

	/**
	 * Returns the reply message
	 */
	get replyMessage() {
		if (!this[kReplyMessage]) {
			this[kReplyMessage] = this.payload.reply_message
				? new MessageReply(this.payload.reply_message, this.vk)
				: null;
		}

		return this[kReplyMessage];
	}

	/**
	 * Returns the attachments
	 */
	get attachments() {
		if (!this[kAttachments]) {
			this[kAttachments] = transformAttachments(this.payload.attachments, this.vk);
		}

		return this[kAttachments];
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
	 * Gets a link to invite the user to a conversation
	 *
	 * @param {Object} params
	 *
	 * @type {Promise<Object>}
	 */
	getInviteLink(params = {}) {
		return this.vk.api.messages.getInviteLink({
			...params,

			peer_id: this.peerId
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

			peer_id: this.peerId,
			message_id: this.id
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
		const response = await this.editMessage({ message });

		this.text = message;

		return response;
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

		params.peer_id = this.peerId;

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

		params.reply_to = this.id;

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
	 * @param {*[]} sources
	 * @param {Object}  params
	 *
	 * @return {Promise}
	 */
	async sendPhoto(sources, params = {}) {
		if (!Array.isArray(sources)) {
			sources = [sources];
		}

		const attachment = await Promise.all(sources.map(source => (
			this.vk.upload.messagePhoto({
				peer_id: this.senderId,

				source
			})
		)));

		const response = await this.send({
			...params,

			attachment
		});

		return response;
	}

	/**
	 * Sends a document to the current dialog
	 *
	 * @param {*[]} sources
	 * @param {Object}  params
	 *
	 * @return {Promise}
	 */
	async sendDocument(sources, params = {}) {
		if (!Array.isArray(sources)) {
			sources = [sources];
		}

		const attachment = await Promise.all(sources.map(source => (
			this.vk.upload.messageDocument({
				peer_id: this.senderId,

				source
			})
		)));

		const response = await this.send({
			...params,

			attachment
		});

		return response;
	}

	/**
	 * Sends a audio message to the current dialog
	 *
	 * @param {*}  sourxe
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	async sendAudioMessage(source, params = {}) {
		const attachment = await this.vk.upload.audioMessage({
			peer_id: this.senderId,

			source
		});

		const response = await this.send({
			...params,

			attachment
		});

		return response;
	}

	/**
	 * Changes the status of typing in the dialog
	 *
	 * @return {Promise<boolean>}
	 */
	async setActivity() {
		const isActivited = await this.vk.api.messages.setActivity({
			peer_id: this.peerId,
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
		ids = [this.id],
		options = { important: Number(!this.isImportant) }
	) {
		const messageIds = await this.vk.api.messages.markAsImportant({
			...options,

			message_ids: ids.join(',')
		});

		if (messageIds.includes(this.id)) {
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
	async deleteMessage(ids = [this.id], options = { spam: 0 }) {
		const messageIds = await this.vk.api.messages.delete({
			...options,

			message_ids: ids.join(',')
		});

		return messageIds;
	}

	/**
	 * Restores the message
	 *
	 * @return {Promise<boolean>}
	 */
	async restoreMessage() {
		const isRestored = await this.vk.api.messages.restore({
			message_id: this.id
		});

		return Boolean(isRestored);
	}

	/**
	 * Checks that in a chat
	 */
	assertIsChat() {
		if (!this.isChat) {
			throw new VKError({
				message: 'This method is only available in chat'
			});
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
			chat_id: this.chatId,
			title
		});

		return Boolean(isRenamed);
	}

	/**
	 * Sets a new image for the chat
	 *
	 * @param {*}  source
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	async newChatPhoto(source, params = {}) {
		this.assertIsChat();

		const response = await this.vk.upload.chatPhoto({
			...params,

			chat_id: this.chatId,
			source
		});

		return response;
	}

	/**
	 * Remove the chat photo
	 *
	 * @return {Promise<boolean>}
	 */
	async deleteChatPhoto() {
		this.assertIsChat();

		return this.vk.api.messages.deleteChatPhoto({
			chat_id: this.chatId
		});
	}

	/**
	 * Invites a new user
	 *
	 * @param {number} id
	 *
	 * @return {Promise<boolean>}
	 */
	async inviteUser(id = this.eventMemberId) {
		this.assertIsChat();

		const isInvited = await this.vk.api.messages.removeChatUser({
			chat_id: this.chatId,
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
	async kickUser(id = this.eventMemberId) {
		this.assertIsChat();

		const isKicked = await this.vk.api.messages.removeChatUser({
			chat_id: this.chatId,
			member_id: id
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
			peer_id: this.peerId,
			message_id: this.id
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
			peer_id: this.peerId,
			message_id: this.id
		});

		return Boolean(isUnpinned);
	}

	/**
	 * Applies the payload
	 *
	 * @param {Object} payload
	 */
	applyPayload(payload) {
		this.payload = payload;

		this.text = payload.text
			? unescapeHTML(payload.text)
			: null;
	}

	/**
	 * Returns the custom data
	 *
	 * @type {Object}
	 */
	[inspectCustomData]() {
		const beforeAttachments = [];

		if (this.isEvent) {
			beforeAttachments.push(
				'eventType',
				'eventMemberId',
				'eventText',
				'eventEmail'
			);
		}

		if (this.hasReplyMessage) {
			beforeAttachments.push('replyMessage');
		}

		const afterAttachments = [];

		if (this.hasMessagePayload) {
			afterAttachments.push('messagePayload');
		}

		afterAttachments.push('isOutbox');

		if (this.$match) {
			afterAttachments.push('$match');
		}

		return copyParams(this, [
			'id',
			'conversationMessageId',
			'peerId',
			'peerType',
			'senderId',
			'senderType',
			'createdAt',
			'text',
			...beforeAttachments,
			'forwards',
			'attachments',
			...afterAttachments
		]);
	}
}
