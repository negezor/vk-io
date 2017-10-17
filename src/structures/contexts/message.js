import Context from './context';
import { CHAT_PEER } from '../../util/constants';
import { unescapeHTML } from '../../updates/helpers';
import { transformAttachments } from '../attachments/helpers';

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
	 */
	constructor(vk, payload) {
		super(vk);

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
				attachment.type === type
			))
		));

		if (this.text !== null) {
			subTypes.push('text');
		}

		if ('action' in this.payload) {
			subTypes.push(this.payload.action);
		}

		this.type = 'message';
		this.subTypes = subTypes;
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
	 * Checks is a DM
	 *
	 * @return {boolean}
	 */
	isDM() {
		return this.form.type === 'dm';
	}

	/**
	 * Checks is a chat
	 *
	 * @return {boolean}
	 */
	isChat() {
		return this.form.type === 'chat';
	}

	/**
	 * Checks is a group
	 *
	 * @return {boolean}
	 */
	isGroup() {
		return this.form.type === 'group';
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
	 * @return {?number}
	 */
	getId() {
		return this.payload.id;
	}

	/**
	 * Returns the identifier user
	 *
	 * @return {?number}
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
		if (!this.isChat()) {
			return null;
		}

		return this.payload.chat_id;
	}

	/**
	 * Returns the date when this message was created
	 *
	 * @return {number}
	 */
	getDate() {
		return this.payload.date;
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
		const attachment = await this.vk.upload.message({ source });

		return await this.send({
			...params,
			attachment
		});
	}

	/**
	 * Changes the status of typing in the dialog
	 *
	 * @return {Promise}
	 */
	setActivity() {
		return this.vk.api.messages.setActivity({
			peer_id: this.from.id,
			type: 'typing'
		});
	}

	/**
	 * Marks messages as important or removes a mark.
	 *
	 * @param {Array}  ids
	 * @param {Object} options
	 *
	 * @return {Promise<Array>}
	 */
	markAsImportant(ids = [this.payload.id], options = { important: 1 }) {
		return this.vk.api.messages.markAsImportant({
			...options,

			message_ids: ids.join(',')
		});
	}

	/**
	 * Deletes the message
	 *
	 * @param {Array}  ids
	 * @param {Object} options
	 *
	 * @return {Promise<boolean>}
	 */
	deleteMessage(ids = [this.payload.id], options = { spam: 0 }) {
		return this.vk.api.messages.delete({
			...options,

			message_ids: ids.join(',')
		});
	}

	/**
	 * Restores the message
	 *
	 * @return {Promise<boolean>}
	 */
	async restoreMessage() {
		const isRestore = await this.vk.api.messages.restore({
			message_id: this.payload.id
		});

		return Boolean(isRestore);
	}

	/**
	 * Rename the chat
	 *
	 * @param {string} title
	 *
	 * @return {Promise}
	 */
	renameChat(title) {
		if (!this.isChat()) {
			throw new Error('This is not a chat');
		}

		return this.vk.api.messages.editChat({
			chat_id: this.payload.chat_id,
			title
		});
	}

	/**
	 * Sets a new image for the chat
	 *
	 * @param {mixed}  source
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	newChatPhoto(source, params = {}) {
		if (!this.isChat()) {
			throw new Error('This is not a chat');
		}

		return this.vk.upload.chatPhoto({
			...params,
			source
		});
	}

	/**
	 * Remove the chat photo
	 *
	 * @return {Promise}
	 */
	removeChatPhoto() {
		if (!this.isChat()) {
			throw new Error('This is not a chat');
		}

		return this.vk.api.messages.deleteChatPhoto({
			chat_id: this.payload.chat_id
		});
	}

	/**
	 * Invites a new user
	 *
	 * @param {number} id
	 *
	 * @return {Promise}
	 */
	inviteUser(id = this.payload.action_mid) {
		return this.vk.api.messages.removeChatUser({
			chat_id: this.payload.chat_id,
			user_id: id
		});
	}

	/**
	 * Excludes user
	 *
	 * @param {number} id
	 *
	 * @return {Promise}
	 */
	kickUser(id = this.payload.action_mid) {
		return this.vk.api.messages.removeChatUser({
			chat_id: this.payload.chat_id,
			user_id: id
		});
	}
}
