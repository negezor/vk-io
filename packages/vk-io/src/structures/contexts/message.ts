import Context, { IContextOptions } from './context';

import { VKError } from '../../errors';

import MessageReply from '../shared/message-reply';
import MessageForward from '../shared/message-forward';
import transformMessage from '../../updates/transform-message';
import MessageForwardsCollection from '../shared/message-forwards-collection';

import {
	Attachment,
	ExternalAttachment,

	AudioAttachment,
	AudioMessageAttachment,
	DocumentAttachment,
	GiftAttachment,
	GraffitiAttachment,
	LinkAttachment,
	MarketAlbumAttachment,
	MarketAttachment,
	PhotoAttachment,
	PollAttachment,
	StickerAttachment,
	StoryAttachment,
	VideoAttachment,
	WallReplyAttachment,
	WallAttachment
} from '../attachments';
import { transformAttachments } from '../attachments/helpers';
import {
	unescapeHTML,
	copyParams,
	getPeerType,
	showDeprecatedMessage
} from '../../utils/helpers';
import {
	AttachmentType,
	UpdateSource,
	MessageSource,
	CHAT_PEER,
	inspectCustomData
} from '../../utils/constants';
import { UploadSource, UploadSourceValue } from '../../upload/upload';

const subTypesEnum: Record<string | number, string> = {
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
	message: {
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
	};
	client_info: {
		button_actions: (
			'text' | 'vkpay' | 'open_app' | 'location'
		)[];
		keyboard: boolean;
		inline_keyboard: boolean;
		lang_id: number;
	};
}

export type MessageContextOptions<S> =
	Omit<IContextOptions<IMessageContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class MessageContext<S = Record<string, any>>
	extends Context<IMessageContextPayload, S> {
	public $match!: RegExpMatchArray;

	public text!: string | null;

	protected $filled: boolean;

	protected [kForwards]: MessageForwardsCollection | null;

	protected [kAttachments]: (Attachment | ExternalAttachment)[] | null;

	protected [kReplyMessage]: MessageReply | null;

	public constructor(options: MessageContextOptions<S>) {
		super({
			...options,

			type: 'message',
			subTypes: []
		});

		let { payload } = options;
		if (options.source === UpdateSource.POLLING) {
			// eslint-disable-next-line no-param-reassign
			// @ts-ignore
			payload = transformMessage(payload);

			this.$filled = false;
		} else {
			this.$filled = true;
		}

		// Polyfill for all events except new_message
		if (options.updateType !== 'message_new') {
			payload = {
				// @ts-ignore
				message: payload,
				client_info: {
					button_actions: [],
					inline_keyboard: false,
					keyboard: true,
					lang_id: 0
				}
			};
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
				conversation_message_ids: this.conversationMessageId!
			});

		const [message] = items;

		this[kForwards] = null;
		this[kAttachments] = null;
		this[kReplyMessage] = null;

		// @ts-ignore
		this.applyPayload(message);

		this.$filled = true;
	}

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type: AttachmentType | string | null = null): boolean {
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
		return Boolean(this.message.payload);
	}

	/**
	 * Checks if there is text
	 */
	public get hasGeo(): boolean {
		return Boolean(this.message.geo);
	}

	/**
	 * Checks is a chat
	 */
	public get isChat(): boolean {
		return this.peerType === MessageSource.CHAT;
	}

	/**
	 * Check is a user
	 */
	public get isUser(): boolean {
		return this.senderType === MessageSource.USER;
	}

	/**
	 * Checks is a group
	 */
	public get isGroup(): boolean {
		return this.senderType === MessageSource.GROUP;
	}

	/**
	 * Checks is from the user
	 */
	public get isFromUser(): boolean {
		return this.peerType === MessageSource.USER;
	}

	/**
	 * Checks is from the group
	 */
	public get isFromGroup(): boolean {
		return this.peerType === MessageSource.GROUP;
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
		return Boolean(this.message.out);
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
		return this.message.important;
	}

	/**
	 * Returns the identifier message
	 */
	public get id(): number {
		return this.message.id;
	}

	/**
	 * Returns the conversation message id
	 */
	public get conversationMessageId(): number | null {
		return this.message.conversation_message_id || null;
	}

	/**
	 * Returns the destination identifier
	 */
	public get peerId(): number {
		return this.message.peer_id;
	}

	/**
	 * Returns the peer type
	 */
	public get peerType(): string {
		return getPeerType(this.message.peer_id);
	}

	/**
	 * Returns the sender identifier
	 */
	public get senderId(): number {
		return this.message.from_id;
	}

	/**
	 * Returns the sender type
	 */
	public get senderType(): string {
		return getPeerType(this.message.from_id);
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
	 * Returns the referral value
	 */
	public get referralValue(): string | undefined {
		return this.message.ref;
	}

	/**
	 * Returns the referral source
	 */
	public get referralSource(): string | undefined {
		return this.message.ref_source;
	}

	/**
	 * Returns the date when this message was created
	 */
	public get createdAt(): number {
		return this.message.date;
	}

	/**
	 * Returns geo
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

		return this.message.geo;
	}

	/**
	 * Returns the event name
	 */
	public get eventType(): string | null {
		return (
			this.message.action
			&& this.message.action.type
		) || null;
	}

	/**
	 * Returns the event member id
	 */
	public get eventMemberId(): number | null {
		return (
			this.message.action
			&& this.message.action.member_id
		) || null;
	}

	/**
	 * Returns the event name
	 */
	public get eventText(): string | null {
		return (
			this.message.action
			&& this.message.action.text
		) || null;
	}

	/**
	 * Returns the event email
	 */
	public get eventEmail(): string | null {
		return (
			this.message.action
			&& this.message.action.email
		) || null;
	}

	/**
	 * Returns the message payload
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get messagePayload(): any | null {
		const { payload = null } = this.message;

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
			this[kForwards] = this.message.fwd_messages
				? new MessageForwardsCollection(...this.message.fwd_messages.map(forward => (
					new MessageForward({
						vk: this.vk,
						// @ts-ignore
						payload: forward
					})
				)))
				: new MessageForwardsCollection();
		}

		return this[kForwards]!;
	}

	/**
	 * Returns the reply message
	 */
	public get replyMessage(): MessageReply | null {
		if (!this[kReplyMessage]) {
			this[kReplyMessage] = this.message.reply_message
				? new MessageReply(this.message.reply_message, this.vk)
				: null;
		}

		return this[kReplyMessage];
	}

	/**
	 * Returns the attachments
	 */
	public get attachments(): (Attachment | ExternalAttachment)[] {
		if (!this[kAttachments]) {
			this[kAttachments] = transformAttachments(this.message.attachments, this.vk);
		}

		return this[kAttachments]!;
	}

	/**
	 * Returns the capabilities of the client the user is using.
	 */
	public get clientInfo(): IMessageContextPayload['client_info'] {
		return this.payload.client_info;
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: AttachmentType.AUDIO | 'audio'): AudioAttachment[];

	public getAttachments(type: AttachmentType.AUDIO_MESSAGE | 'audio_message'): AudioMessageAttachment[];

	public getAttachments(type: AttachmentType.GRAFFITI | 'graffiti'): GraffitiAttachment[];

	// @ts-ignore
	public getAttachments(type: AttachmentType.DOCUMENT | 'doc'): DocumentAttachment[];

	public getAttachments(type: AttachmentType.MARKET_ALBUM | 'market_album'): MarketAlbumAttachment[];

	public getAttachments(type: AttachmentType.MARKET | 'market'): MarketAttachment[];

	public getAttachments(type: AttachmentType.PHOTO | 'photo'): PhotoAttachment[];

	public getAttachments(type: AttachmentType.STORY | 'story'): StoryAttachment[];

	public getAttachments(type: AttachmentType.VIDEO | 'video'): VideoAttachment[];

	public getAttachments(type: AttachmentType.WALL | 'wall'): WallAttachment[];

	public getAttachments(type: AttachmentType.POLL | 'poll'): PollAttachment[];

	public getAttachments(type: AttachmentType.GIFT | 'gift'): GiftAttachment[];

	public getAttachments(type: AttachmentType.LINK | 'link'): LinkAttachment[];

	public getAttachments(type: AttachmentType.STICKER | 'sticker'): StickerAttachment[];

	public getAttachments(type: AttachmentType.WALL_REPLY | 'wall_reply'): WallReplyAttachment[];

	public getAttachments(type: string | null = null): (Attachment | ExternalAttachment)[] {
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
			attachment: String(
				this.attachments.filter(attachment => (
					attachment.canBeAttached
				))
			),
			message: this.text!,
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
	 * Sends a photos to the current dialog
	 */
	async sendPhotos(
		rawSources: UploadSource | UploadSource[],
		params: object = {}
	): Promise<number> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

		const peerOptions = (
			!this.isChat
				? {
					peer_id: this.peerId
				}
				: undefined
		);

		const attachment = await Promise.all(sources.map(source => (
			this.vk.upload.messagePhoto({
				source,

				...peerOptions
			})
		)));

		const response = await this.send({
			...peerOptions,
			...params,

			attachment
		});

		return response;
	}

	/**
	 * @deprecated
	 */
	async sendPhoto(
		rawSources: UploadSource | UploadSource[],
		params: object = {}
	): Promise<number> {
		showDeprecatedMessage('MessageContext, use sendPhotos instead of sendPhoto');

		return this.sendPhotos(rawSources, params);
	}

	/**
	 * Sends a documents to the current dialog
	 */
	async sendDocuments(
		rawSources: UploadSource | UploadSource[],
		params: object = {}
	): Promise<number> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

		const peerOptions = (
			!this.isChat
				? {
					peer_id: this.peerId
				}
				: undefined
		);

		const attachment = await Promise.all(sources.map(source => (
			this.vk.upload.messageDocument({
				source,

				...peerOptions
			})
		)));

		const response = await this.send({
			...peerOptions,
			...params,

			attachment
		});

		return response;
	}

	/**
	 * @deprecated
	 */
	async sendDocument(
		rawSources: UploadSource | UploadSource[],
		params: object = {}
	): Promise<number> {
		showDeprecatedMessage('MessageContext, use sendDocuments instead of sendDocument');

		return this.sendDocuments(rawSources, params);
	}

	/**
	 * Sends a audio message to the current dialog
	 */
	async sendAudioMessage(
		source: UploadSource,
		params: object = {}
	): Promise<number> {
		const peerOptions = (
			!this.isChat
				? {
					peer_id: this.peerId
				}
				: undefined
		);

		const attachment = await this.vk.upload.audioMessage({
			source,

			...peerOptions
		});

		const response = await this.send({
			...peerOptions,
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

			message_ids: ids
		});

		if (messageIds.includes(this.id)) {
			this.message.important = Boolean(options.important);
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

			message_ids: ids
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
			chat_id: this.chatId!,
			title
		});

		return Boolean(isRenamed);
	}

	/**
	 * Sets a new image for the chat
	 */
	public async newChatPhoto(source: UploadSourceValue, params: object = {}): Promise<object> {
		this.assertIsChat();

		const response = await this.vk.upload.chatPhoto({
			...params,

			chat_id: this.chatId!,
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
			chat_id: this.chatId!
		});
	}

	/**
	 * Invites a new user
	 */
	public async inviteUser(id: number = this.eventMemberId!): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
		const isInvited = await this.vk.api.messages.addChatUser({
			chat_id: this.chatId!,
			user_id: id
		});

		return Boolean(isInvited);
	}

	/**
	 * Excludes user
	 */
	public async kickUser(id: number = this.eventMemberId!): Promise<boolean> {
		this.assertIsChat();

		// @ts-ignore
		const isKicked = await this.vk.api.messages.removeChatUser({
			chat_id: this.chatId!,
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
	 * Return alias of payload.message
	 */
	protected get message(): IMessageContextPayload['message'] {
		return this.payload.message;
	}

	/**
	 * Applies the payload
	 */
	private applyPayload(payload: IMessageContextPayload): void {
		this.payload = payload;

		this.text = payload.message.text
			? unescapeHTML(payload.message.text)
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

		if (this.referralValue) {
			afterAttachments.push('referralValue', 'referralSource');
		}

		if (this.$match) {
			afterAttachments.push('$match');
		}

		// @ts-ignore
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
