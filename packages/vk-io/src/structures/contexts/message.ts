/* eslint-disable max-classes-per-file */
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { Params } from '../../api';
import { VKError } from '../../errors';

import { transformMessage } from './helpers/transform-message';
import { MessageForwardsCollection, Attachmentable, IAllAttachmentable } from '../shared';

import { Attachment, ExternalAttachment, transformAttachments } from '../attachments';

import {
	unescapeHTML,
	pickProperties,
	getPeerType,
	applyMixins,
	getRandomId
} from '../../utils/helpers';
import {
	UpdateSource,
	MessageSource,
	PEER_CHAT_ID_OFFSET,
	AttachmentType,
	kSerializeData,
	AttachmentTypeString
} from '../../utils/constants';
import { AllowArray } from '../../types';
import { KeyboardBuilder } from '../keyboard';
import { IUploadSourceMedia } from '../../upload';

export type MessageContextType = 'message';

export type MessageContextPayloadEventType =
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
'message_new'
| 'message_edit'
| 'message_reply'
| MessageContextPayloadEventType;

const subTypesEnum: Record<string | number, MessageContextSubType> = {
	4: 'message_new',
	5: 'message_edit',
	18: 'message_edit'
};

const kForwards = Symbol('forwards');
const kReplyMessage = Symbol('replyMessage');
const kMessagePayload = Symbol('messagePayload');

const kAttachments = Symbol('attachments');

export interface IMessageContextSendOptions extends Params.MessagesSendParams {
	attachment?: AllowArray<Attachment | string>;
	keyboard?: KeyboardBuilder | string;
}

export interface IMessageContextPayload {
	message: {
		id: number;
		conversation_message_id: number;
		out: number;
		peer_id: number;
		from_id: number;
		text?: string;
		date: number;
		update_time?: number;
		random_id: number;
		ref?: string;
		ref_source?: string;
		attachments: object[];
		important: boolean;
		geo?: {
			type: 'point';
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
		reply_message?: IMessageContextPayload['message'];
		fwd_messages?: IMessageContextPayload['message'][];
		action?: {
			type: MessageContextPayloadEventType;
			member_id?: number;
			text?: string;
			email?: string;
			photo?: {
				photo_50: string;
				photo_100: string;
				photo_200: string;
			};
		};
		admin_author_id?: number;
		is_cropped?: boolean;
		members_count?: number;
		was_listened?: boolean;
		pinned_at?: number;
		message_tag?: string;
		is_expired?: boolean;
	};
	client_info: {
		button_actions: (
			'text'
			| 'vkpay'
			| 'open_app'
			| 'location'
			| 'open_link'
			| 'callback'
		)[];
		keyboard: boolean;
		inline_keyboard: boolean;
		carousel: boolean;
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

	protected [kForwards]: MessageForwardsCollection;

	protected [kReplyMessage]: MessageContext | undefined;

	protected [kAttachments]: (Attachment | ExternalAttachment)[];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected [kMessagePayload]: any | undefined;

	public constructor(options: MessageContextOptions<S>) {
		super({
			...options,

			type: 'message',
			subTypes: []
		});

		if (options.source === UpdateSource.POLLING) {
			this.$filled = false;

			this.applyPayload(
				transformMessage((options.payload as unknown) as Parameters<typeof transformMessage>[0])
			);
		} else {
			this.$filled = true;

			this.applyPayload(options.payload);
		}

		this.subTypes = [
			this.eventType
			|| subTypesEnum[options.updateType]
			|| options.updateType as MessageContextSubType
		];
	}

	/**
	 * Load message payload
	 */
	async loadMessagePayload({ force = false } = {}): Promise<void> {
		if (this.$filled && !force) {
			return;
		}

		const { items } = this.id !== 0
			? await this.api.messages.getById({
				message_ids: this.id
			})
			: await this.api.messages.getByConversationMessageId({
				peer_id: this.peerId,
				conversation_message_ids: this.conversationMessageId!
			});

		const [message] = items;

		this.applyPayload(message as IMessageContextPayload['message']);

		this.$filled = true;
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
	public get chatId(): number | undefined {
		if (!this.isChat) {
			return undefined;
		}

		return this.peerId - PEER_CHAT_ID_OFFSET;
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
	 * Returns the date when this message was updated
	 */
	public get updatedAt(): number | undefined {
		return this.message.update_time;
	}

	/**
	 * Returns geo
	 */
	public get geo(): IMessageContextPayload['message']['geo'] | undefined {
		if (!this.hasGeo || !this.$filled) {
			return undefined;
		}

		return this.message.geo;
	}

	/**
	 * Returns the sender (admin community) identifier, only for community messages
	 */
	public get adminAuthorId(): IMessageContextPayload['message']['admin_author_id'] | undefined {
		return this.message.admin_author_id;
	}

	/**
	 * Checks whether the message is cropped for bot
	 */
	public get isCropped(): IMessageContextPayload['message']['is_cropped'] | undefined {
		return this.message.is_cropped;
	}

	/**
	 * Returns the members count
	 */
	public get membersCount(): IMessageContextPayload['message']['members_count'] | undefined {
		return this.message.members_count;
	}

	/**
	 * Checks whether the attached audio message has already been listened by you
	 */
	public get wasListened(): IMessageContextPayload['message']['was_listened'] | undefined {
		return this.message.was_listened;
	}

	/**
	 * Returns the date when this message was pinned
	 */
	public get pinnedAt(): IMessageContextPayload['message']['pinned_at'] | undefined {
		return this.message.pinned_at;
	}

	/**
	 * Returns the string for matching user Notify and VK
	 */
	public get messageTag(): IMessageContextPayload['message']['message_tag'] | undefined {
		return this.message.message_tag;
	}

	/**
	 * Checks whether the message is expired
	 */
	public get isExpired(): IMessageContextPayload['message']['is_expired'] | undefined {
		return this.message.is_expired;
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
		return this[kMessagePayload];
	}

	/**
	 * Returns the forwards
	 */
	public get forwards(): MessageForwardsCollection {
		return this[kForwards];
	}

	/**
	 * Returns the reply message
	 */
	public get replyMessage(): MessageContext | undefined {
		return this[kReplyMessage];
	}

	/**
	 * Returns the attachments
	 */
	public get attachments(): (Attachment | ExternalAttachment)[] {
		return this[kAttachments];
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
	editMessage(params: IMessageContextSendOptions): Promise<number> {
		const target = this.id !== 0
			? { message_id: this.id }
			: { conversation_message_id: this.conversationMessageId };

		return this.api.messages.edit({
			attachment: String(
				this.attachments.filter(attachment => (
					attachment.canBeAttached
				))
			),
			message: this.text!,
			keep_forward_messages: 1,
			keep_snippets: 1,

			...params,

			...target,

			peer_id: this.peerId
		} as Params.MessagesEditParams);
	}

	/**
	 * Sends a message to the current dialog
	 */
	async send(
		text: string | IMessageContextSendOptions,
		params?: IMessageContextSendOptions
	): Promise<MessageContext> {
		const randomId = getRandomId();

		const options = {
			random_id: randomId,

			...(
				typeof text !== 'object'
					? {
						message: text,

						...params
					}
					: text
			)
		} as IMessageContextSendOptions;

		if (this.$groupId !== undefined) {
			options.peer_ids = this.peerId;
		} else {
			options.peer_id = this.peerId;
		}

		const rawDestination = await this.api.messages.send(options);

		const { message } = this;

		const destination = typeof rawDestination !== 'number'
			? rawDestination[0] as {
				peer_id : number;
				message_id: number;
				conversation_message_id: number;
				error: number;
			}
			: {
				peer_id: message.peer_id,
				message_id: rawDestination,
				conversation_message_id: 0
			};

		const messageContext = new MessageContext({
			api: this.api,
			upload: this.upload,
			source: UpdateSource.WEBHOOK,
			groupId: this.$groupId,
			updateType: 'message_new',
			state: this.state,
			payload: {
				client_info: this.clientInfo,
				message: {
					id: destination.message_id,
					conversation_message_id: destination.conversation_message_id,

					// TODO: This must be the bot identifier
					from_id: message.from_id,
					peer_id: destination.peer_id,

					out: 1,
					important: false,
					random_id: randomId,

					text: options.text,

					date: Math.floor(Date.now() / 1000),

					attachments: []
				}
			}
		});

		messageContext.$filled = false;

		return messageContext;
	}

	/**
	 * Responds to the current message
	 */
	reply(
		text: string | IMessageContextSendOptions,
		params?: IMessageContextSendOptions
	): Promise<MessageContext> {
		const forwardOptions = this.conversationMessageId
			? { conversation_message_ids: this.conversationMessageId }
			: { message_ids: this.id };

		return this.send({
			forward: JSON.stringify({
				...forwardOptions,

				peer_id: this.peerId,
				is_reply: true
			}),

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
	 * Sends a photos to the current dialog
	 */
	async sendPhotos(
		rawSources: AllowArray<IUploadSourceMedia>,
		params: IMessageContextSendOptions = {}
	): Promise<MessageContext> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

		const attachment = await Promise.all(sources.map(source => (
			this.upload.messagePhoto({
				source,

				peer_id: this.peerId
			})
		)));

		return this.send({
			...params,

			attachment
		});
	}

	/**
	 * Sends a documents to the current dialog
	 */
	async sendDocuments(
		rawSources: AllowArray<IUploadSourceMedia>,
		params: IMessageContextSendOptions = {}
	): Promise<MessageContext> {
		const sources = !Array.isArray(rawSources)
			? [rawSources]
			: rawSources;

		const attachment = await Promise.all(sources.map(source => (
			this.upload.messageDocument({
				source,

				peer_id: this.peerId
			})
		)));

		return this.send({
			...params,

			attachment
		});
	}

	/**
	 * Sends a audio message to the current dialog
	 */
	async sendAudioMessage(
		source: IUploadSourceMedia,
		params: IMessageContextSendOptions = {}
	): Promise<MessageContext> {
		const attachment = await this.upload.audioMessage({
			source,

			peer_id: this.peerId
		});

		return this.send({
			...params,

			attachment
		});
	}

	/**
	 * Changes the status of typing in the dialog
	 */
	async setActivity(): Promise<boolean> {
		const isActivited = await this.api.messages.setActivity({
			peer_id: this.peerId,
			type: 'typing'
		});

		return Boolean(isActivited);
	}

	/**
	 * Deletes the message
	 */
	async deleteMessage(options: Params.MessagesDeleteParams = {}): Promise<boolean> {
		const messageIds = await this.api.messages.delete({
			...options,

			message_ids: this.id
		});

		return Boolean(messageIds[this.id]);
	}

	/**
	 * Restores the message
	 */
	async restoreMessage(): Promise<boolean> {
		const isRestored = await this.api.messages.restore({
			message_id: this.id
		});

		return Boolean(isRestored);
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
		this.payload = !('client_info' in payload)
			? {
				message: payload as IMessageContextPayload['message'],
				client_info: {
					button_actions: [
						'text'
					],
					inline_keyboard: false,
					keyboard: true,
					carousel: false,
					lang_id: 0
				}
			}
			: payload;

		const { message } = this;

		this.text = message.text
			? unescapeHTML(message.text)
			: undefined;

		this[kAttachments] = transformAttachments(message.attachments || [], this.api);

		if (message.reply_message) {
			this[kReplyMessage] = new MessageContext({
				api: this.api,
				upload: this.upload,
				source: UpdateSource.WEBHOOK,
				groupId: this.$groupId,
				updateType: 'message_new',
				state: this.state,
				payload: {
					client_info: this.clientInfo,
					message: message.reply_message
				}
			});
		}

		this[kForwards] = new MessageForwardsCollection(...(message.fwd_messages || []).map(forward => (
			new MessageContext({
				api: this.api,
				upload: this.upload,
				source: UpdateSource.WEBHOOK,
				groupId: this.$groupId,
				updateType: 'message_new',
				state: this.state,
				payload: {
					client_info: this.clientInfo,
					message: forward
				}
			})
		)));

		if (message.payload) {
			this[kMessagePayload] = JSON.parse(message.payload);
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

		if (this.hasGeo) {
			afterAttachments.push('geo');
		}

		afterAttachments.push('isOutbox');

		if (this.referralSource || this.referralValue) {
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
			'updatedAt',
			'pinnedAt',
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
		public replyMessage?: MessageContext;

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
				// @ts-expect-error
				...this.getAttachments(type),
				// @ts-expect-error
				...((this.replyMessage?.getAttachments(type)) ?? []),
				// @ts-expect-error
				...this.forwards.getAttachments(type)
			];
		}
	}
]);

export { MessageContext };
