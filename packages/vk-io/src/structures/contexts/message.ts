/* eslint-disable max-classes-per-file */
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { VKError } from '../../errors';

import { MessageReply, IMessageReplyPayload } from '../shared/message-reply';
import { MessageForward, IMessageForwardPayload } from '../shared/message-forward';
import { transformMessage } from '../../updates/transform-message';
import { MessageForwardsCollection } from '../shared/message-forwards-collection';

import { Attachment, ExternalAttachment } from '../attachments';
import { Attachmentable, IAllAttachmentable } from '../shared/attachmentable';

import { transformAttachments } from '../attachments/helpers';
import {
	unescapeHTML,
	pickProperties,
	getPeerType,
	applyMixins,
	getRandomId,
	useLazyLoad
} from '../../utils/helpers';
import {
	UpdateSource,
	MessageSource,
	CHAT_PEER,
	AttachmentType,
	kSerializeData,
	AttachmentTypeString
} from '../../utils/constants';
import { AllowArray } from '../../types';
import { UploadSource, UploadSourceValue } from '../../upload/upload';
import { MessagesSendParams } from '../../../lib/api/schemas/params';

export type MessageContextType = 'message';

type MessageContextPayloadEventType =
'chat_photo_update'
| 'chat_photo_remove'
| 'chat_create'
| 'chat_title_update'
| 'chat_invite_user'
| 'chat_kick_user'
| 'chat_pin_message'
| 'chat_unpin_message'
| 'chat_invite_user_by_link';

export type MessageContextSubType =
'new_message'
| 'edit_message'
| 'reply_message'
| MessageContextPayloadEventType;

const subTypesEnum: Record<string | number, MessageContextSubType> = {
	4: 'new_message',
	5: 'edit_message',
	message_new: 'new_message',
	message_edit: 'edit_message',
	message_reply: 'reply_message'
};

const kForwards = Symbol('forwards');
const kReplyMessage = Symbol('replyMessage');
const kMessagePayload = Symbol('messagePayload');

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
		geo?: {
			type: "point";
			coordinates: {
				latitude: number;
				longitude: number;
			};
			place?: {
				id: number;
				title?: string;
				latitude?: number;
				longitude?: number;
				created?: number;
				icon?: string;
				country: number;
				city: string;

				type?: number;
				group_id?: number;
				group_photo?: string;
				checkins?: number;
				updated?: number;
				address?: number;
			};
		};
		payload?: string;
		reply_message?: IMessageReplyPayload;
		fwd_messages?: IMessageForwardPayload[];
		action?: {
			type: MessageContextPayloadEventType;
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
		button_actions: ("text" | "vkpay" | "open_app" | "location" | "open_link")[];
		carousel: boolean;
		keyboard: boolean;
		inline_keyboard: boolean;
		lang_id: number;
	};
}

export type MessageContextOptions<S> =
	ContextFactoryOptions<IMessageContextPayload, S>;

class MessageContext<S = ContextDefaultState>
	extends Context<
	IMessageContextPayload,
	S,
	MessageContextType,
	MessageContextSubType
	> {
	public $match!: RegExpMatchArray;

	public text?: string;

	protected $filled: boolean;

	protected [kForwards]: () => MessageForwardsCollection;

	protected [kReplyMessage]: () => MessageReply | undefined;

	protected [kAttachments]: () => (Attachment | ExternalAttachment)[];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected [kMessagePayload]: () => any | undefined;

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

		this.applyPayload(payload);

		this.subTypes = [
			this.eventType || subTypesEnum[options.updateType]
		];
	}

	/**
	 * Loads message payload
	 */
	async loadMessagePayload({ force = false } = {}): Promise<void> {
		if (this.$filled && !force) {
			return;
		}

		const { items } = this.id !== 0
			? await this.vk.api.messages.getById({
				message_ids: this.id
			})
			: await this.vk.api.messages.getByConversationMessageId({
				peer_id: this.peerId,
				conversation_message_ids: this.conversationMessageId!
			});

		const [message] = items;

		this.applyPayload(message as IMessageContextPayload['message']);

		this.$filled = true;
	}

	/**
	 * Checks if message has text
	 */
	public get hasText(): boolean {
		return Boolean(this.text);
	}

	/**
	 * Checks for reply message
	 */
	public get hasReplyMessage(): boolean {
		return this.replyMessage !== undefined;
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
	 * Checks if message has attached geolocation
	 */
	public get hasGeo(): boolean {
		return Boolean(this.message.geo);
	}

	/**
	 * Checks is message from chat
	 */
	public get isChat(): boolean {
		return this.peerType === MessageSource.CHAT;
	}

	/**
	 * Check sender is a user
	 */
	public get isUser(): boolean {
		return this.senderType === MessageSource.USER;
	}

	/**
	 * Checks sender is a group
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
	 * Checks a message has arrived in direct messages
	 */
	public get isDM(): boolean {
		return this.isFromUser || this.isFromGroup;
	}

	/**
	 * Check is special event
	 */
	public get isEvent(): boolean {
		return this.eventType !== undefined;
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
	public get conversationMessageId(): number | undefined {
		return this.message.conversation_message_id;
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
	public get peerType(): MessageSource {
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
	public get senderType(): MessageSource {
		return getPeerType(this.message.from_id);
	}

	/**
	 * Returns the identifier chat
	 */
	public get chatId(): number | undefined {
		if (!this.isChat) {
			return undefined;
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
	public get geo(): IMessageContextPayload['message']['geo'] | undefined {
		if (!this.hasGeo) {
			return undefined;
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
	public get eventType(): MessageContextPayloadEventType | undefined {
		return this.message.action?.type;
	}

	/**
	 * Returns the event member id
	 */
	public get eventMemberId(): number | undefined {
		return this.message.action?.member_id;
	}

	/**
	 * Returns the event name
	 */
	public get eventText(): string | undefined {
		return this.message.action?.text;
	}

	/**
	 * Returns the event email
	 */
	public get eventEmail(): string | undefined {
		return this.message.action?.email;
	}

	/**
	 * Returns the message payload
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get messagePayload(): any | undefined {
		return this[kMessagePayload]();
	}

	/**
	 * Returns the forwards
	 */
	public get forwards(): MessageForwardsCollection {
		return this[kForwards]();
	}

	/**
	 * Returns the reply message
	 */
	public get replyMessage(): MessageReply | undefined {
		return this[kReplyMessage]();
	}

	/**
	 * Returns the attachments
	 */
	public get attachments(): (Attachment | ExternalAttachment)[] {
		return this[kAttachments]();
	}

	/**
	 * Returns the capabilities of the client the user is using.
	 */
	public get clientInfo(): IMessageContextPayload['client_info'] {
		return this.payload.client_info;
	}

	/**
	 * Edits a message
	 */
	editMessage(params: object): Promise<number> {
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
	send(text: string | MessagesSendParams, params: MessagesSendParams = {}): Promise<number> {
		return this.vk.api.messages.send({
			peer_id: this.peerId,
			// @ts-ignore
			random_id: getRandomId(),

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
	reply(text: string | MessagesSendParams, params?: MessagesSendParams): Promise<number> {
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
		rawSources: AllowArray<UploadSource>,
		params: MessagesSendParams = {}
	): Promise<number> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

		const photos = await Promise.all(sources.map(source => (
			this.vk.upload.messagePhoto({
				source,

				peer_id: this.peerId
			})
		)));

		const response = await this.send({
			...params,

			attachment: photos.join(',')
		});

		return response;
	}

	/**
	 * Sends a documents to the current dialog
	 */
	async sendDocuments(
		rawSources: AllowArray<UploadSource>,
		params: object = {}
	): Promise<number> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

		const docs = await Promise.all(sources.map(source => (
			this.vk.upload.messageDocument({
				source,

				peer_id: this.peerId
			})
		)));

		const response = await this.send({
			...params,

			attachment: docs.join(',')
		});

		return response;
	}

	/**
	 * Sends a audio message to the current dialog
	 */
	async sendAudioMessage(
		source: UploadSource,
		params: object = {}
	): Promise<number> {
		const audioMessage = await this.vk.upload.audioMessage({
			source,

			peer_id: this.peerId
		});

		const response = await this.send({
			...params,

			attachment: String(audioMessage)
		});

		return response;
	}

	/**
	 * Changes the status of typing in the dialog
	 */
	async setActivity(): Promise<boolean> {
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

		await this.vk.api.messages.deleteChatPhoto({
			chat_id: this.chatId!
		});

		return true;
	}

	/**
	 * Invites a new user
	 */
	public async inviteUser(id: number = this.eventMemberId!): Promise<boolean> {
		this.assertIsChat();

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
	private applyPayload(
		payload: IMessageContextPayload
		| IMessageContextPayload['message']
	): void {
		// Polyfill for all events except new_message
		if (!('client_info' in payload)) {
			// eslint-disable-next-line no-param-reassign
			payload = {
				message: payload as IMessageContextPayload['message'],
				client_info: {
					button_actions: [
						'text'
					],
          inline_keyboard: false,
          carousel: false,
					keyboard: true,
					lang_id: 0,
				}
			};
		}

		this.payload = payload;

		const { text } = payload.message;

		this.text = text
			? unescapeHTML(text)
			: undefined;

		this[kReplyMessage] = useLazyLoad(() => {
			const { reply_message: replyMessage } = this.message;

			return replyMessage
				? new MessageReply(replyMessage, this.vk)
				: undefined;
		});

		this[kForwards] = useLazyLoad(() => {
			const { fwd_messages: fwdMessages } = this.message;

			return fwdMessages
				? new MessageForwardsCollection(...fwdMessages.map(forward => (
					new MessageForward({
						vk: this.vk,
						payload: forward
					})
				)))
				: new MessageForwardsCollection();
		});

		this[kAttachments] = useLazyLoad(() => (
			transformAttachments(this.message.attachments, this.vk)
		));

		this[kMessagePayload] = useLazyLoad(() => {
			const { payload: messagePayload } = this.message;

			return messagePayload
				? JSON.parse(messagePayload)
				: undefined;
		});
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
	public [kSerializeData](): object {
		const beforeAttachments: string[] = [];

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

		const afterAttachments: string[] = [];

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

		return pickProperties(this, [
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

// eslint-disable-next-line
interface MessageContext extends Attachmentable, IAllAttachmentable {}
applyMixins(MessageContext, [
	Attachmentable,
	class AllAttachmentable extends Attachmentable {
		public replyMessage?: MessageReply;

		public forwards!: MessageForwardsCollection;

		public hasAllAttachments(type: AttachmentType | AttachmentTypeString | undefined): boolean {
			return (
				this.hasAttachments(type)
				|| (this.replyMessage?.hasAttachments(type))
				|| this.forwards.hasAttachments(type)
			);
		}

		public getAllAttachments(
			type: AttachmentType | AttachmentTypeString
		): (Attachment | ExternalAttachment)[] {
			return [
				// @ts-ignore
				...this.getAttachments(type),
				// @ts-ignore
				...((this.replyMessage?.getAttachments(type)) ?? []),
				// @ts-ignore
				...this.forwards.getAttachments(type)
			];
		}
	}
]);

export { MessageContext };
