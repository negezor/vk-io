// @ts-ignore
/* eslint-disable max-classes-per-file */
// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { Params } from '../../api';
// @ts-ignore
import { VKError } from '../../errors';
// @ts-ignore

// @ts-ignore
import { transformMessage } from './helpers/transform-message';
// @ts-ignore
import { MessageForwardsCollection, Attachmentable, IAllAttachmentable } from '../shared';
// @ts-ignore

// @ts-ignore
import { Attachment, ExternalAttachment, transformAttachments } from '../attachments';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	unescapeHTML,
// @ts-ignore
	pickProperties,
// @ts-ignore
	getPeerType,
// @ts-ignore
	applyMixins,
// @ts-ignore
	getRandomId
// @ts-ignore
} from '../../utils/helpers';
// @ts-ignore
import {
// @ts-ignore
	UpdateSource,
// @ts-ignore
	MessageSource,
// @ts-ignore
	PEER_CHAT_ID_OFFSET,
// @ts-ignore
	AttachmentType,
// @ts-ignore
	kSerializeData,
// @ts-ignore
	AttachmentTypeString
// @ts-ignore
} from '../../utils/constants';
// @ts-ignore
import { AllowArray } from '../../types';
// @ts-ignore
import { KeyboardBuilder } from '../keyboard';
// @ts-ignore
import { IUploadSourceMedia } from '../../upload';
// @ts-ignore

// @ts-ignore
export type MessageContextType = 'message';
// @ts-ignore

// @ts-ignore
export type MessageContextPayloadEventType =
// @ts-ignore
'chat_photo_update'
// @ts-ignore
| 'chat_photo_remove'
// @ts-ignore
| 'chat_create'
// @ts-ignore
| 'chat_title_update'
// @ts-ignore
| 'chat_invite_user'
// @ts-ignore
| 'chat_kick_user'
// @ts-ignore
| 'chat_pin_message'
// @ts-ignore
| 'chat_unpin_message'
// @ts-ignore
| 'chat_invite_user_by_link';
// @ts-ignore

// @ts-ignore
export type MessageContextSubType =
// @ts-ignore
'message_new'
// @ts-ignore
| 'message_edit'
// @ts-ignore
| 'message_reply'
// @ts-ignore
| MessageContextPayloadEventType;
// @ts-ignore

// @ts-ignore
const subTypesEnum: Record<string | number, MessageContextSubType> = {
// @ts-ignore
	4: 'message_new',
// @ts-ignore
	5: 'message_edit',
// @ts-ignore
	18: 'message_edit'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const kForwards = Symbol('forwards');
// @ts-ignore
const kReplyMessage = Symbol('replyMessage');
// @ts-ignore
const kMessagePayload = Symbol('messagePayload');
// @ts-ignore

// @ts-ignore
const kAttachments = Symbol('attachments');
// @ts-ignore

// @ts-ignore
export interface IMessageContextSendOptions extends Params.MessagesSendParams {
// @ts-ignore
	attachment?: AllowArray<Attachment | string>;
// @ts-ignore
	keyboard?: KeyboardBuilder | string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IMessageContextPayload {
// @ts-ignore
	message: {
// @ts-ignore
		id: number;
// @ts-ignore
		conversation_message_id: number;
// @ts-ignore
		out: number;
// @ts-ignore
		peer_id: number;
// @ts-ignore
		from_id: number;
// @ts-ignore
		text?: string;
// @ts-ignore
		date: number;
// @ts-ignore
		update_time?: number;
// @ts-ignore
		random_id: number;
// @ts-ignore
		ref?: string;
// @ts-ignore
		ref_source?: string;
// @ts-ignore
		attachments: object[];
// @ts-ignore
		important: boolean;
// @ts-ignore
		geo?: {
// @ts-ignore
			type: 'point';
// @ts-ignore
			coordinates: {
// @ts-ignore
				latitude: number;
// @ts-ignore
				longitude: number;
// @ts-ignore
			};
// @ts-ignore
			place?: {
// @ts-ignore
				id: number;
// @ts-ignore
				title?: string;
// @ts-ignore
				latitude?: number;
// @ts-ignore
				longitude?: number;
// @ts-ignore
				created?: number;
// @ts-ignore
				icon?: string;
// @ts-ignore
				country: number;
// @ts-ignore
				city: string;
// @ts-ignore

// @ts-ignore
				type?: number;
// @ts-ignore
				group_id?: number;
// @ts-ignore
				group_photo?: string;
// @ts-ignore
				checkins?: number;
// @ts-ignore
				updated?: number;
// @ts-ignore
				address?: number;
// @ts-ignore
			};
// @ts-ignore
		};
// @ts-ignore
		payload?: string;
// @ts-ignore
		reply_message?: IMessageContextPayload['message'];
// @ts-ignore
		fwd_messages?: IMessageContextPayload['message'][];
// @ts-ignore
		action?: {
// @ts-ignore
			type: MessageContextPayloadEventType;
// @ts-ignore
			member_id?: number;
// @ts-ignore
			text?: string;
// @ts-ignore
			email?: string;
// @ts-ignore
			photo?: {
// @ts-ignore
				photo_50: string;
// @ts-ignore
				photo_100: string;
// @ts-ignore
				photo_200: string;
// @ts-ignore
			};
// @ts-ignore
		};
// @ts-ignore
		admin_author_id?: number;
// @ts-ignore
		is_cropped?: boolean;
// @ts-ignore
		members_count?: number;
// @ts-ignore
		was_listened?: boolean;
// @ts-ignore
		pinned_at?: number;
// @ts-ignore
		message_tag?: string;
// @ts-ignore
		is_expired?: boolean;
// @ts-ignore
	};
// @ts-ignore
	client_info: {
// @ts-ignore
		button_actions: (
// @ts-ignore
			'text'
// @ts-ignore
			| 'vkpay'
// @ts-ignore
			| 'open_app'
// @ts-ignore
			| 'location'
// @ts-ignore
			| 'open_link'
// @ts-ignore
			| 'callback'
// @ts-ignore
		)[];
// @ts-ignore
		keyboard: boolean;
// @ts-ignore
		inline_keyboard: boolean;
// @ts-ignore
		carousel: boolean;
// @ts-ignore
		lang_id: number;
// @ts-ignore
	};
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessageContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IMessageContextPayload, S>;
// @ts-ignore

// @ts-ignore
class MessageContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IMessageContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	MessageContextType,
// @ts-ignore
	MessageContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public $match!: RegExpMatchArray;
// @ts-ignore

// @ts-ignore
	public text?: string;
// @ts-ignore

// @ts-ignore
	protected $filled: boolean;
// @ts-ignore

// @ts-ignore
	protected [kForwards]: MessageForwardsCollection;
// @ts-ignore

// @ts-ignore
	protected [kReplyMessage]: MessageContext | undefined;
// @ts-ignore

// @ts-ignore
	protected [kAttachments]: (Attachment | ExternalAttachment)[];
// @ts-ignore

// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	protected [kMessagePayload]: any | undefined;
// @ts-ignore

// @ts-ignore
	public constructor(options: MessageContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'message',
// @ts-ignore
			subTypes: []
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		if (options.source === UpdateSource.POLLING) {
// @ts-ignore
			this.$filled = false;
// @ts-ignore

// @ts-ignore
			this.applyPayload(
// @ts-ignore
				transformMessage((options.payload as unknown) as Parameters<typeof transformMessage>[0])
// @ts-ignore
			);
// @ts-ignore
		} else {
// @ts-ignore
			this.$filled = true;
// @ts-ignore

// @ts-ignore
			this.applyPayload(options.payload);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.subTypes = [
// @ts-ignore
			this.eventType
// @ts-ignore
			|| subTypesEnum[options.updateType]
// @ts-ignore
			|| options.updateType as MessageContextSubType
// @ts-ignore
		];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Load message payload
// @ts-ignore
	 */
// @ts-ignore
	async loadMessagePayload({ force = false } = {}): Promise<void> {
// @ts-ignore
		if (this.$filled && !force) {
// @ts-ignore
			return;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const { items } = this.id !== 0
// @ts-ignore
			? await this.api.messages.getById({
// @ts-ignore
				message_ids: this.id
// @ts-ignore
			})
// @ts-ignore
			: await this.api.messages.getByConversationMessageId({
// @ts-ignore
				peer_id: this.peerId,
// @ts-ignore
				conversation_message_ids: this.conversationMessageId!
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
		const [message] = items;
// @ts-ignore

// @ts-ignore
		this.applyPayload(message as IMessageContextPayload['message']);
// @ts-ignore

// @ts-ignore
		this.$filled = true;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if there is text
// @ts-ignore
	 */
// @ts-ignore
	public get hasText(): boolean {
// @ts-ignore
		return Boolean(this.text);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for reply message
// @ts-ignore
	 */
// @ts-ignore
	public get hasReplyMessage(): boolean {
// @ts-ignore
		return this.replyMessage !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for forwarded messages
// @ts-ignore
	 */
// @ts-ignore
	public get hasForwards(): boolean {
// @ts-ignore
		return this.forwards.length > 0;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks for hast message payload
// @ts-ignore
	 */
// @ts-ignore
	public get hasMessagePayload(): boolean {
// @ts-ignore
		return Boolean(this.message.payload);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if there is text
// @ts-ignore
	 */
// @ts-ignore
	public get hasGeo(): boolean {
// @ts-ignore
		return Boolean(this.message.geo);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is a chat
// @ts-ignore
	 */
// @ts-ignore
	public get isChat(): boolean {
// @ts-ignore
		return this.peerType === MessageSource.CHAT;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check is a user
// @ts-ignore
	 */
// @ts-ignore
	public get isUser(): boolean {
// @ts-ignore
		return this.senderType === MessageSource.USER;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is a group
// @ts-ignore
	 */
// @ts-ignore
	public get isGroup(): boolean {
// @ts-ignore
		return this.senderType === MessageSource.GROUP;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is from the user
// @ts-ignore
	 */
// @ts-ignore
	public get isFromUser(): boolean {
// @ts-ignore
		return this.peerType === MessageSource.USER;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is from the group
// @ts-ignore
	 */
// @ts-ignore
	public get isFromGroup(): boolean {
// @ts-ignore
		return this.peerType === MessageSource.GROUP;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks a message has arrived in direct messages
// @ts-ignore
	 */
// @ts-ignore
	public get isDM(): boolean {
// @ts-ignore
		return this.isFromUser || this.isFromGroup;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Check is special event
// @ts-ignore
	 */
// @ts-ignore
	public get isEvent(): boolean {
// @ts-ignore
		return this.eventType !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the message is outbox
// @ts-ignore
	 */
// @ts-ignore
	public get isOutbox(): boolean {
// @ts-ignore
		return Boolean(this.message.out);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the message is inbox
// @ts-ignore
	 */
// @ts-ignore
	public get isInbox(): boolean {
// @ts-ignore
		return !this.isOutbox;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the message is important
// @ts-ignore
	 */
// @ts-ignore
	public get isImportant(): boolean {
// @ts-ignore
		return this.message.important;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier message
// @ts-ignore
	 */
// @ts-ignore
	public get id(): number {
// @ts-ignore
		return this.message.id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the conversation message id
// @ts-ignore
	 */
// @ts-ignore
	public get conversationMessageId(): number | undefined {
// @ts-ignore
		return this.message.conversation_message_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the destination identifier
// @ts-ignore
	 */
// @ts-ignore
	public get peerId(): number {
// @ts-ignore
		return this.message.peer_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the peer type
// @ts-ignore
	 */
// @ts-ignore
	public get peerType(): string {
// @ts-ignore
		return getPeerType(this.message.peer_id);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the sender identifier
// @ts-ignore
	 */
// @ts-ignore
	public get senderId(): number {
// @ts-ignore
		return this.message.from_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the sender type
// @ts-ignore
	 */
// @ts-ignore
	public get senderType(): string {
// @ts-ignore
		return getPeerType(this.message.from_id);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier chat
// @ts-ignore
	 */
// @ts-ignore
	public get chatId(): number | undefined {
// @ts-ignore
		if (!this.isChat) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.peerId - PEER_CHAT_ID_OFFSET;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the referral value
// @ts-ignore
	 */
// @ts-ignore
	public get referralValue(): string | undefined {
// @ts-ignore
		return this.message.ref;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the referral source
// @ts-ignore
	 */
// @ts-ignore
	public get referralSource(): string | undefined {
// @ts-ignore
		return this.message.ref_source;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this message was created
// @ts-ignore
	 */
// @ts-ignore
	public get createdAt(): number {
// @ts-ignore
		return this.message.date;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this message was updated
// @ts-ignore
	 */
// @ts-ignore
	public get updatedAt(): number | undefined {
// @ts-ignore
		return this.message.update_time;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns geo
// @ts-ignore
	 */
// @ts-ignore
	public get geo(): IMessageContextPayload['message']['geo'] | undefined {
// @ts-ignore
		if (!this.hasGeo || !this.$filled) {
// @ts-ignore
			return undefined;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this.message.geo;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the sender (admin community) identifier, only for community messages
// @ts-ignore
	 */
// @ts-ignore
	public get adminAuthorId(): IMessageContextPayload['message']['admin_author_id'] | undefined {
// @ts-ignore
		return this.message.admin_author_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the message is cropped for bot
// @ts-ignore
	 */
// @ts-ignore
	public get isCropped(): IMessageContextPayload['message']['is_cropped'] | undefined {
// @ts-ignore
		return this.message.is_cropped;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the members count
// @ts-ignore
	 */
// @ts-ignore
	public get membersCount(): IMessageContextPayload['message']['members_count'] | undefined {
// @ts-ignore
		return this.message.members_count;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the attached audio message has already been listened by you
// @ts-ignore
	 */
// @ts-ignore
	public get wasListened(): IMessageContextPayload['message']['was_listened'] | undefined {
// @ts-ignore
		return this.message.was_listened;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the date when this message was pinned
// @ts-ignore
	 */
// @ts-ignore
	public get pinnedAt(): IMessageContextPayload['message']['pinned_at'] | undefined {
// @ts-ignore
		return this.message.pinned_at;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the string for matching user Notify and VK
// @ts-ignore
	 */
// @ts-ignore
	public get messageTag(): IMessageContextPayload['message']['message_tag'] | undefined {
// @ts-ignore
		return this.message.message_tag;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks whether the message is expired
// @ts-ignore
	 */
// @ts-ignore
	public get isExpired(): IMessageContextPayload['message']['is_expired'] | undefined {
// @ts-ignore
		return this.message.is_expired;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the event name
// @ts-ignore
	 */
// @ts-ignore
	public get eventType(): MessageContextPayloadEventType | undefined {
// @ts-ignore
		return this.message.action?.type;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the event member id
// @ts-ignore
	 */
// @ts-ignore
	public get eventMemberId(): number | undefined {
// @ts-ignore
		return this.message.action?.member_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the event name
// @ts-ignore
	 */
// @ts-ignore
	public get eventText(): string | undefined {
// @ts-ignore
		return this.message.action?.text;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the event email
// @ts-ignore
	 */
// @ts-ignore
	public get eventEmail(): string | undefined {
// @ts-ignore
		return this.message.action?.email;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the message payload
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public get messagePayload(): any | undefined {
// @ts-ignore
		return this[kMessagePayload];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the forwards
// @ts-ignore
	 */
// @ts-ignore
	public get forwards(): MessageForwardsCollection {
// @ts-ignore
		return this[kForwards];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the reply message
// @ts-ignore
	 */
// @ts-ignore
	public get replyMessage(): MessageContext | undefined {
// @ts-ignore
		return this[kReplyMessage];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the attachments
// @ts-ignore
	 */
// @ts-ignore
	public get attachments(): (Attachment | ExternalAttachment)[] {
// @ts-ignore
		return this[kAttachments];
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the capabilities of the client the user is using.
// @ts-ignore
	 */
// @ts-ignore
	public get clientInfo(): IMessageContextPayload['client_info'] {
// @ts-ignore
		return this.payload.client_info;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Edits a message
// @ts-ignore
	 */
// @ts-ignore
	editMessage(params: IMessageContextSendOptions): Promise<number> {
// @ts-ignore
		const target = this.id !== 0
// @ts-ignore
			? { message_id: this.id }
// @ts-ignore
			: { conversation_message_id: this.conversationMessageId };
// @ts-ignore

// @ts-ignore
		return this.api.messages.edit({
// @ts-ignore
			attachment: String(
// @ts-ignore
				this.attachments.filter(attachment => (
// @ts-ignore
					attachment.canBeAttached
// @ts-ignore
				))
// @ts-ignore
			),
// @ts-ignore
			message: this.text!,
// @ts-ignore
			keep_forward_messages: 1,
// @ts-ignore
			keep_snippets: 1,
// @ts-ignore

// @ts-ignore
			...params,
// @ts-ignore

// @ts-ignore
			...target,
// @ts-ignore

// @ts-ignore
			peer_id: this.peerId
// @ts-ignore
		} as Params.MessagesEditParams);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sends a message to the current dialog
// @ts-ignore
	 */
// @ts-ignore
	async send(
// @ts-ignore
		text: string | IMessageContextSendOptions,
// @ts-ignore
		params?: IMessageContextSendOptions
// @ts-ignore
	): Promise<MessageContext> {
// @ts-ignore
		const randomId = getRandomId();
// @ts-ignore

// @ts-ignore
		const options = {
// @ts-ignore
			random_id: randomId,
// @ts-ignore

// @ts-ignore
			...(
// @ts-ignore
				typeof text !== 'object'
// @ts-ignore
					? {
// @ts-ignore
						message: text,
// @ts-ignore

// @ts-ignore
						...params
// @ts-ignore
					}
// @ts-ignore
					: text
// @ts-ignore
			)
// @ts-ignore
		} as IMessageContextSendOptions;
// @ts-ignore

// @ts-ignore
		if (this.$groupId !== undefined) {
// @ts-ignore
			options.peer_ids = this.peerId;
// @ts-ignore
		} else {
// @ts-ignore
			options.peer_id = this.peerId;
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const rawDestination = await this.api.messages.send(options);
// @ts-ignore

// @ts-ignore
		const { message } = this;
// @ts-ignore

// @ts-ignore
		const destination = typeof rawDestination !== 'number'
// @ts-ignore
			? rawDestination[0] as {
// @ts-ignore
				peer_id : number;
// @ts-ignore
				message_id: number;
// @ts-ignore
				conversation_message_id: number;
// @ts-ignore
				error: number;
// @ts-ignore
			}
// @ts-ignore
			: {
// @ts-ignore
				peer_id: message.peer_id,
// @ts-ignore
				message_id: rawDestination,
// @ts-ignore
				conversation_message_id: 0
// @ts-ignore
			};
// @ts-ignore

// @ts-ignore
		const messageContext = new MessageContext({
// @ts-ignore
			api: this.api,
// @ts-ignore
			upload: this.upload,
// @ts-ignore
			source: UpdateSource.WEBHOOK,
// @ts-ignore
			groupId: this.$groupId,
// @ts-ignore
			updateType: 'message_new',
// @ts-ignore
			state: this.state,
// @ts-ignore
			payload: {
// @ts-ignore
				client_info: this.clientInfo,
// @ts-ignore
				message: {
// @ts-ignore
					id: destination.message_id,
// @ts-ignore
					conversation_message_id: destination.conversation_message_id,
// @ts-ignore

// @ts-ignore
					// TODO: This must be the bot identifier
// @ts-ignore
					from_id: message.from_id,
// @ts-ignore
					peer_id: destination.peer_id,
// @ts-ignore

// @ts-ignore
					out: 1,
// @ts-ignore
					important: false,
// @ts-ignore
					random_id: randomId,
// @ts-ignore

// @ts-ignore
					text: options.text,
// @ts-ignore

// @ts-ignore
					date: Math.floor(Date.now() / 1000),
// @ts-ignore

// @ts-ignore
					attachments: []
// @ts-ignore
				}
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		messageContext.$filled = false;
// @ts-ignore

// @ts-ignore
		return messageContext;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Responds to the current message
// @ts-ignore
	 */
// @ts-ignore
	reply(
// @ts-ignore
		text: string | IMessageContextSendOptions,
// @ts-ignore
		params?: IMessageContextSendOptions
// @ts-ignore
	): Promise<MessageContext> {
// @ts-ignore
		const forwardOptions = this.conversationMessageId
// @ts-ignore
			? { conversation_message_ids: this.conversationMessageId }
// @ts-ignore
			: { message_ids: this.id };
// @ts-ignore

// @ts-ignore
		return this.send({
// @ts-ignore
			forward: JSON.stringify({
// @ts-ignore
				...forwardOptions,
// @ts-ignore

// @ts-ignore
				peer_id: this.peerId,
// @ts-ignore
				is_reply: true
// @ts-ignore
			}),
// @ts-ignore

// @ts-ignore
			...(
// @ts-ignore
				typeof text !== 'object'
// @ts-ignore
					? {
// @ts-ignore
						message: text,
// @ts-ignore

// @ts-ignore
						...params
// @ts-ignore
					}
// @ts-ignore
					: text
// @ts-ignore
			)
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sends a photos to the current dialog
// @ts-ignore
	 */
// @ts-ignore
	async sendPhotos(
// @ts-ignore
		rawSources: AllowArray<IUploadSourceMedia>,
// @ts-ignore
		params: IMessageContextSendOptions = {}
// @ts-ignore
	): Promise<MessageContext> {
// @ts-ignore
		const sources = !Array.isArray(rawSources)
// @ts-ignore
			? [rawSources]
// @ts-ignore
			: rawSources;
// @ts-ignore

// @ts-ignore
		const attachment = await Promise.all(sources.map(source => (
// @ts-ignore
			this.upload.messagePhoto({
// @ts-ignore
				source,
// @ts-ignore

// @ts-ignore
				peer_id: this.peerId
// @ts-ignore
			})
// @ts-ignore
		)));
// @ts-ignore

// @ts-ignore
		return this.send({
// @ts-ignore
			...params,
// @ts-ignore

// @ts-ignore
			attachment
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sends a documents to the current dialog
// @ts-ignore
	 */
// @ts-ignore
	async sendDocuments(
// @ts-ignore
		rawSources: AllowArray<IUploadSourceMedia>,
// @ts-ignore
		params: IMessageContextSendOptions = {}
// @ts-ignore
	): Promise<MessageContext> {
// @ts-ignore
		const sources = !Array.isArray(rawSources)
// @ts-ignore
			? [rawSources]
// @ts-ignore
			: rawSources;
// @ts-ignore

// @ts-ignore
		const attachment = await Promise.all(sources.map(source => (
// @ts-ignore
			this.upload.messageDocument({
// @ts-ignore
				source,
// @ts-ignore

// @ts-ignore
				peer_id: this.peerId
// @ts-ignore
			})
// @ts-ignore
		)));
// @ts-ignore

// @ts-ignore
		return this.send({
// @ts-ignore
			...params,
// @ts-ignore

// @ts-ignore
			attachment
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Sends a audio message to the current dialog
// @ts-ignore
	 */
// @ts-ignore
	async sendAudioMessage(
// @ts-ignore
		source: IUploadSourceMedia,
// @ts-ignore
		params: IMessageContextSendOptions = {}
// @ts-ignore
	): Promise<MessageContext> {
// @ts-ignore
		const attachment = await this.upload.audioMessage({
// @ts-ignore
			source,
// @ts-ignore

// @ts-ignore
			peer_id: this.peerId
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return this.send({
// @ts-ignore
			...params,
// @ts-ignore

// @ts-ignore
			attachment
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Changes the status of typing in the dialog
// @ts-ignore
	 */
// @ts-ignore
	async setActivity(): Promise<boolean> {
// @ts-ignore
		const isActivited = await this.api.messages.setActivity({
// @ts-ignore
			peer_id: this.peerId,
// @ts-ignore
			type: 'typing'
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return Boolean(isActivited);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Deletes the message
// @ts-ignore
	 */
// @ts-ignore
	async deleteMessage(options: Params.MessagesDeleteParams = {}): Promise<boolean> {
// @ts-ignore
		const messageIds = await this.api.messages.delete({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			message_ids: this.id
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return Boolean(messageIds[this.id]);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Restores the message
// @ts-ignore
	 */
// @ts-ignore
	async restoreMessage(): Promise<boolean> {
// @ts-ignore
		const isRestored = await this.api.messages.restore({
// @ts-ignore
			message_id: this.id
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		return Boolean(isRestored);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Return alias of payload.message
// @ts-ignore
	 */
// @ts-ignore
	protected get message(): IMessageContextPayload['message'] {
// @ts-ignore
		return this.payload.message;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Applies the payload
// @ts-ignore
	 */
// @ts-ignore
	private applyPayload(
// @ts-ignore
		payload: IMessageContextPayload
// @ts-ignore
		| IMessageContextPayload['message']
// @ts-ignore
	): void {
// @ts-ignore
		// Polyfill for all events except new_message
// @ts-ignore
		this.payload = !('client_info' in payload)
// @ts-ignore
			? {
// @ts-ignore
				message: payload as IMessageContextPayload['message'],
// @ts-ignore
				client_info: {
// @ts-ignore
					button_actions: [
// @ts-ignore
						'text'
// @ts-ignore
					],
// @ts-ignore
					inline_keyboard: false,
// @ts-ignore
					keyboard: true,
// @ts-ignore
					carousel: false,
// @ts-ignore
					lang_id: 0
// @ts-ignore
				}
// @ts-ignore
			}
// @ts-ignore
			: payload;
// @ts-ignore

// @ts-ignore
		const { message } = this;
// @ts-ignore

// @ts-ignore
		this.text = message.text
// @ts-ignore
			? unescapeHTML(message.text)
// @ts-ignore
			: undefined;
// @ts-ignore

// @ts-ignore
		this[kAttachments] = transformAttachments(message.attachments || [], this.api);
// @ts-ignore

// @ts-ignore
		if (message.reply_message) {
// @ts-ignore
			this[kReplyMessage] = new MessageContext({
// @ts-ignore
				api: this.api,
// @ts-ignore
				upload: this.upload,
// @ts-ignore
				source: UpdateSource.WEBHOOK,
// @ts-ignore
				groupId: this.$groupId,
// @ts-ignore
				updateType: 'message_new',
// @ts-ignore
				state: this.state,
// @ts-ignore
				payload: {
// @ts-ignore
					client_info: this.clientInfo,
// @ts-ignore
					message: message.reply_message
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this[kForwards] = new MessageForwardsCollection(...(message.fwd_messages || []).map(forward => (
// @ts-ignore
			new MessageContext({
// @ts-ignore
				api: this.api,
// @ts-ignore
				upload: this.upload,
// @ts-ignore
				source: UpdateSource.WEBHOOK,
// @ts-ignore
				groupId: this.$groupId,
// @ts-ignore
				updateType: 'message_new',
// @ts-ignore
				state: this.state,
// @ts-ignore
				payload: {
// @ts-ignore
					client_info: this.clientInfo,
// @ts-ignore
					message: forward
// @ts-ignore
				}
// @ts-ignore
			})
// @ts-ignore
		)));
// @ts-ignore

// @ts-ignore
		if (message.payload) {
// @ts-ignore
			this[kMessagePayload] = JSON.parse(message.payload);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the custom data
// @ts-ignore
	 */
// @ts-ignore
	public [kSerializeData](): object {
// @ts-ignore
		const beforeAttachments: string[] = [];
// @ts-ignore

// @ts-ignore
		if (this.isEvent) {
// @ts-ignore
			beforeAttachments.push(
// @ts-ignore
				'eventType',
// @ts-ignore
				'eventMemberId',
// @ts-ignore
				'eventText',
// @ts-ignore
				'eventEmail'
// @ts-ignore
			);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.hasReplyMessage) {
// @ts-ignore
			beforeAttachments.push('replyMessage');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const afterAttachments: string[] = [];
// @ts-ignore

// @ts-ignore
		if (this.hasMessagePayload) {
// @ts-ignore
			afterAttachments.push('messagePayload');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.hasGeo) {
// @ts-ignore
			afterAttachments.push('geo');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		afterAttachments.push('isOutbox');
// @ts-ignore

// @ts-ignore
		if (this.referralSource || this.referralValue) {
// @ts-ignore
			afterAttachments.push('referralValue', 'referralSource');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (this.$match) {
// @ts-ignore
			afterAttachments.push('$match');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return pickProperties(this, [
// @ts-ignore
			'id',
// @ts-ignore
			'conversationMessageId',
// @ts-ignore
			'peerId',
// @ts-ignore
			'peerType',
// @ts-ignore
			'senderId',
// @ts-ignore
			'senderType',
// @ts-ignore
			'createdAt',
// @ts-ignore
			'updatedAt',
// @ts-ignore
			'pinnedAt',
// @ts-ignore
			'text',
// @ts-ignore
			...beforeAttachments,
// @ts-ignore
			'forwards',
// @ts-ignore
			'attachments',
// @ts-ignore
			...afterAttachments
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface MessageContext extends Attachmentable, IAllAttachmentable {}
// @ts-ignore
applyMixins(MessageContext, [
// @ts-ignore
	Attachmentable,
// @ts-ignore
	class AllAttachmentable extends Attachmentable {
// @ts-ignore
		public replyMessage?: MessageContext;
// @ts-ignore

// @ts-ignore
		public forwards!: MessageForwardsCollection;
// @ts-ignore

// @ts-ignore
		public hasAllAttachments(type: AttachmentType | AttachmentTypeString | undefined): boolean {
// @ts-ignore
			return (
// @ts-ignore
				this.hasAttachments(type)
// @ts-ignore
				|| (this.replyMessage?.hasAttachments(type))
// @ts-ignore
				|| this.forwards.hasAttachments(type)
// @ts-ignore
			);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		public getAllAttachments(
// @ts-ignore
			type: AttachmentType | AttachmentTypeString
// @ts-ignore
		): (Attachment | ExternalAttachment)[] {
// @ts-ignore
			return [
// @ts-ignore
				// @ts-expect-error
// @ts-ignore
				...this.getAttachments(type),
// @ts-ignore
				// @ts-expect-error
// @ts-ignore
				...((this.replyMessage?.getAttachments(type)) ?? []),
// @ts-ignore
				// @ts-expect-error
// @ts-ignore
				...this.forwards.getAttachments(type)
// @ts-ignore
			];
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
]);
// @ts-ignore

// @ts-ignore
export { MessageContext };
