import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export interface IMessageEventShowSnackbar {
	type: 'show_snackbar';
	text: string;
}

export interface IMessageEventOpenLink {
	type: 'open_link';
	link: string;
}

export interface IMessageEventOpenApp {
	type: 'open_app';
	app_id: number;
	owner_id?: number;
	hash: string;
}

export type MessageEventAction =
IMessageEventShowSnackbar
| IMessageEventOpenLink
| IMessageEventOpenApp;

export type MessageEventContextType = 'message_event';

export type MessageEventContextSubType = 'message_event';

export interface IMessageEventContextPayload {
	user_id: number;
	conversation_message_id: number;
	peer_id: number;
	event_id: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	payload: any;
}

export type MessageEventContextOptions<S> =
	ContextFactoryOptions<IMessageEventContextPayload, S>;

export class MessageEventContext<S = ContextDefaultState>
	extends Context<
	IMessageEventContextPayload,
	S,
	MessageEventContextType,
	MessageEventContextSubType
	> {
	public constructor(options: MessageEventContextOptions<S>) {
		super({
			...options,

			type: 'message_event',
			subTypes: [
				options.updateType as MessageEventContextSubType
			]
		});
	}

	/**
	 * Returns the identifier user
	 */
	public get userId(): number {
		return this.payload.user_id;
	}

	/**
	 * Returns the conversation message id
	 */
	public get conversationMessageId(): number {
		return this.payload.conversation_message_id;
	}

	/**
	 * Returns the destination identifier
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns a random string. Active for a minute, after a minute becomes invalid
	 */
	public get eventId(): string {
		return this.payload.event_id;
	}

	/**
	 * Returns the event payload
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public get eventPayload(): any {
		return this.payload.payload;
	}

	/**
	 * Dispatches an event with an action that will occur when the callback button is pressed
	 */
	public answer(eventData: MessageEventAction): Promise<1> {
		return this.api.messages.sendMessageEventAnswer({
			event_id: this.eventId,
			peer_id: this.peerId,
			user_id: this.userId,
			event_data: JSON.stringify(eventData)
		});
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'userId',
			'conversationMessageId',
			'peerId',
			'eventId',
			'eventPayload'
		]);
	}
}
