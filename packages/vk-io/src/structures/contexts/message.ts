import Context, { IContextOptions } from './context';

import { VKError } from '../../errors';

import MessageReply from '../shared/message-reply';
import MessageForward from '../shared/message-forward';
import transformMessage from '../../updates/transform-message';
import MessageForwardsCollection from '../shared/message-forwards-collection';

import { transformAttachments } from '../attachments/helpers';
import { unescapeHTML, copyParams, getPeerType } from '../../utils/helpers';
import {
	updatesSources,
	messageSources,
	CHAT_PEER,
	inspectCustomData
} from '../../utils/constants';
import { Attachment } from '../attachments';

const subTypesEnum = {
	4: 'new_message',
	5: 'edit_message',
	message_new: 'new_message',
	message_edit: 'edit_message',
	message_reply: 'reply_message'
};

const kForwards = Symbol('forwards');
const kReplyMessage = Symbol('replyMessage');

const kAttachments = Symbol('attachments');

export interface IMessageContextPayload {
	id: number;
	conversation_message_id: number;
	out: number;
	peer_id: number;
	from_id: number;
	text?: string;
	date: number;
	random_id: number;
	ref?: string;
	ref_source?: string;
	attachments: object[];
	important: boolean;
	geo: object;
	payload?: string;
	fwd_messages?: object[];
	reply_message?: object;
	action?: {
		type: string;
		member_id: number;
		text?: string;
		email?: string;
		photo?: {
			photo_50: string;
			photo_100: string;
			photo_200: string;
		};
	};
}

export type MessageContextOptions<S> =
	Omit<IContextOptions<IMessageContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class MessageContext<S = Record<string, any>>
	extends Context<IMessageContextPayload, S> {
	public $match: RegExpMatchArray;

	public text: string | null;

	protected $filled: boolean;

	public constructor(options: MessageContextOptions<S>) {
		super({
			...options,

			type: 'message',
			subTypes: []
		});

		let { payload } = options;
		if (options.source === updatesSources.POLLING) {
			// eslint-disable-next-line no-param-reassign
			// @ts-ignore
			payload = transformMessage(payload);

			this.$filled = false;
		} else {
			this.$filled = true;
		}

		this.applyPayload(payload);

		this.subTypes = [
			this.eventType || subTypesEnum[options.updateType]
		];
	}

	/**
	 * Load message payload
	 */
	async loadMessagePayload(): Promise<void> {
		if (this.$filled) {
			return;
		}

		const { items } = this.id !== 0
			// @ts-ignore
			? await this.vk.api.messages.getById({
				message_ids: this.id
			})
			// @ts-ignore
			: await this.vk.api.messages.getByConversationMessageId({
				peer_id: this.peerId,
				conversation_message_ids: this.conversationMessageId
			});

		const [message] = items;

		this[kForwards] = null;
		this[kAttachments] = null;
		this[kReplyMessage] = null;

		this.applyPayload(message);

		this.$filled = true;
	}

	/**
	 * Checks for the presence of attachments
	 */
	hasAttachments(type: string = null): boolean {
		if (type === null) {
			return this.attachments.length > 0;
		}

		return this.attachments.some(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Checks if there is text
	 */
	public get hasText(): boolean {
		return Boolean(this.text);
	}

	/**
	 * Checks for reply message
	 */
	public get hasReplyMessage(): boolean {
		return this.replyMessage !== null;
	}

	/**
	 * Checks for forwarded messages
	 */
	public get hasForwards(): boolean {
		return this.forwards.length > 0;
	}

	/**
	 * Checks for hast message payload
	 */
	public get hasMessagePayload(): boolean {
		return Boolean(this.payload.payload);
	}

	/**
	 * Checks if there is text
	 */
	public get hasGeo(): boolean {
		return Boolean(this.payload.geo);
	}

	/**
	 * Checks is a chat
	 */
	public get isChat(): boolean {
		return this.peerType === messageSources.CHAT;
	}

	/**
	 * Check is a user
	 */
	public get isUser(): boolean {
		return this.senderType === messageSources.USER;
	}

	/**
	 * Checks is a group
	 */
	public get isGroup(): boolean {
		return this.senderType === messageSources.GROUP;
	}

	/**
	 * Checks is from the user
	 */
	public get isFromUser(): boolean {
		return this.peerType === messageSources.USER;
	}

	/**
	 * Checks is from the group
	 */
	public get isFromGroup(): boolean {
		return this.peerType === messageSources.GROUP;
	}

	/**
	 * Check is special event
	 */
	public get isEvent(): boolean {
		return this.eventType !== null;
	}

	/**
	 * Checks whether the message is outbox
	 */
	public get isOutbox(): boolean {
		return Boolean(this.payload.out);
	}

	/**
	 * Checks whether the message is inbox
	 */
	public get isInbox(): boolean {
		return !this.isOutbox;
	}

	/**
	 * Checks that the message is important
	 */
	public get isImportant(): boolean {
		return this.payload.important;
	}

	/**
	 * Returns the identifier message
	 */
	public get id(): number {
		return this.payload.id;
	}

	/**
	 * Returns the conversation message id
	 */
	public get conversationMessageId(): number | null {
		return this.payload.conversation_message_id || null;
	}

	/**
	 * Returns the destination identifier
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns the peer type
	 */
	public get peerType(): string {
		return getPeerType(this.payload.peer_id);
	}

	/**
	 * Returns the sender identifier
	 */
	public get senderId(): number {
		return this.payload.from_id;
	}

	/**
	 * Returns the sender type
	 */
	public get senderType(): string {
		return getPeerType(this.payload.from_id);
	}

	/**
	 * Returns the identifier chat
	 */
	public get chatId(): number | null {
		if (!this.isChat) {
			return null;
		}

		return this.peerId - CHAT_PEER;
	}

	/**
	 * Returns the date when this message was created
	 */
	public get createdAt(): number {
		return this.payload.date;
	}

	/**
	 * Returns geo
	 *
	 * @return {?Object}
	 */
	public get geo(): object | null {
		if (!this.hasGeo) {
			return null;
		}

		if (!this.$filled) {
			throw new VKError({
				message: 'The message payload is not fully loaded',
				code: 'PAYLOAD_IS_NOT_FULL'
			});
		}

		return this.payload.geo;
	}

	/**
	 * Returns the event name
	 */
	public get eventType(): string | null {
		return (
			this.payload.action
			&& this.payload.action.type
		) || null;
	}

	/**
	 * Returns the event member id
	 */
	public get eventMemberId(): number | null {
		return (
			this.payload.action
			&& this.payload.action.member_id
		) || null;
	}

	/**
	 * Returns the event name
	 */
	public get eventText(): string | null {
		return (
			this.payload.action
			&& this.payload.action.text
		) || null;
	}

	/**
	 * Returns the event email
	 */
	public get eventEmail(): string | null {
		return (
			this.payload.action
			&& this.payload.action.email
		) || null;
	}

	/**
	 * Returns the message payload
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get messagePayload(): any | null {
		const { payload = null } = this.payload;

		if (payload === null) {
			return null;
		}

		return JSON.parse(payload);
	}

	/**
	 * Returns the forwards
	 */
	public get forwards(): MessageForwardsCollection {
		if (!this[kForwards]) {
			this[kForwards] = this.payload.fwd_messages
				? new MessageForwardsCollection(...this.payload.fwd_messages.map(forward => (
					new MessageForward({
						vk: this.vk,
						// @ts-ignore
						payload: forward
					})
				)))
				: new MessageForwardsCollection();
		}

		return this[kForwards];
	}

	/**
	 * Returns the reply message
	 */
	public get replyMessage(): MessageReply | null {
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
	public get attachments(): Attachment[] {
		if (!this[kAttachments]) {
			this[kAttachments] = transformAttachments(this.payload.attachments, this.vk);
		}

		return this[kAttachments];
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: string = null): Attachment[] {
		if (type === null) {
			return this.attachments;
		}

		return this.attachments.filter(attachment => (
			attachment.type === type
		));
	}

	/**
	 * Gets a link to invite the user to a conversation
	 */
	public getInviteLink(params: object = {}): Promise<object> {
		// @ts-ignore
		return this.vk.api.messages.getInviteLink({
			...params,

			peer_id: this.peerId
		});
	}

	/**
	 * Edits a message
	 */
	editMessage(params: object): Promise<number> {
		// @ts-ignore
		return this.vk.api.messages.edit({
			attachment: this.attachments.filter(attachment => (
				attachment.canBeAttached
			)),
			message: this.text,
			keep_forward_messages: 1,
			keep_snippets: 1,

			...params,

			peer_id: this.peerId,
			message_id: this.id
		});
	}

	/**
	 * Edits a message text
	 */
	async editMessageText(message: string): Promise<number> {
		const response = await this.editMessage({ message });

		this.text = message;

		return response;
	}

	/**
	 * Sends a message to the current dialog
	 */
	send(text: string | object, params?: object): Promise<number> {
		// @ts-ignore
		return this.vk.api.messages.send({
			peer_id: this.peerId,

			...(
				typeof text !== 'object'
					? {
						message: text,

						...params
					}
					: text
			)
		});
	}

	/**
	 * Responds to the current message
	 */
	reply(text: string | object, params?: object): Promise<number> {
		return this.send({
			reply_to: this.id,

			...(
				typeof text !== 'object'
					? {
						message: text,

						...params
					}
					: text
			)
		});
	}

	/**
	 * Sends a sticker to the current dialog
	 */
	sendSticker(id: number): Promise<number> {
		return this.send({
			sticker_id: id
		});
	}

	/**
	 * Sends a photo to the current dialog
	 *
	 * @param {*[]} sources
	 */
	async sendPhoto(rawSources, params: object = {}): Promise<number> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

		const attachment = await Promise.all(sources.map(source => (
			this.vk.upload.messagePhoto({
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
	 */
	async sendDocument(rawSources, params: object = {}): Promise<number> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

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
	 */
	async sendAudioMessage(source, params: object = {}): Promise<number> {
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
	 */
	async setActivity(): Promise<boolean> {
		// @ts-ignore
		const isActivited = await this.vk.api.messages.setActivity({
			peer_id: this.peerId,
			type: 'typing'
		});

		return Boolean(isActivited);
	}

	/**
	 * Marks messages as important or removes a mark
	 */
	async markAsImportant(
		ids = [this.id],
		options = { important: Number(!this.isImportant) }
	): Promise<number[]> {
		// @ts-ignore
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
	 */
	async deleteMessage(ids: number[] = [this.id], options = { spam: 0 }): Promise<number> {
		// @ts-ignore
		const messageIds = await this.vk.api.messages.delete({
			...options,

			message_ids: ids.join(',')
		});

		return messageIds;
	}

	/**
	 * Restores the message
	 */
	async restoreMessage(): Promise<boolean> {
		// @ts-ignore
		const isRestored = await this.vk.api.messages.restore({
			message_id: this.id
		});

		return Boolean(isRestored);
	}

	/**
	 * Rename the chat
	 */
	public async renameChat(title: string): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
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
	 */
	public async newChatPhoto(source, params: object = {}): Promise<object> {
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
	 */
	public async deleteChatPhoto(): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
		return this.vk.api.messages.deleteChatPhoto({
			chat_id: this.chatId
		});
	}

	/**
	 * Invites a new user
	 */
	public async inviteUser(id: number = this.eventMemberId): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
		const isInvited = await this.vk.api.messages.addChatUser({
			chat_id: this.chatId,
			user_id: id
		});

		return Boolean(isInvited);
	}

	/**
	 * Excludes user
	 */
	public async kickUser(id: number = this.eventMemberId): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
		const isKicked = await this.vk.api.messages.removeChatUser({
			chat_id: this.chatId,
			member_id: id
		});

		return Boolean(isKicked);
	}

	/**
	 * Pins a message
	 */
	public async pinMessage(): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
		const isPinned = await this.vk.api.messages.pin({
			peer_id: this.peerId,
			message_id: this.id
		});

		return Boolean(isPinned);
	}

	/**
	 * Unpins a message
	 */
	public async unpinMessage(): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
		const isUnpinned = await this.vk.api.messages.unpin({
			peer_id: this.peerId,
			message_id: this.id
		});

		return Boolean(isUnpinned);
	}

	/**
	 * Applies the payload
	 */
	private applyPayload(payload: IMessageContextPayload): void {
		this.payload = payload;

		this.text = payload.text
			? unescapeHTML(payload.text)
			: null;
	}

	/**
	 * Checks that in a chat
	 */
	private assertIsChat(): void {
		if (!this.isChat) {
			throw new VKError({
				message: 'This method is only available in chat',
				code: 'IS_NOT_CHAT'
			});
		}
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
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
