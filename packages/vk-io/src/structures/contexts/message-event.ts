// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export interface IMessageEventShowSnackbar {
// @ts-ignore
	type: 'show_snackbar';
// @ts-ignore
	text: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IMessageEventOpenLink {
// @ts-ignore
	type: 'open_link';
// @ts-ignore
	link: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface IMessageEventOpenApp {
// @ts-ignore
	type: 'open_app';
// @ts-ignore
	app_id: number;
// @ts-ignore
	owner_id?: number;
// @ts-ignore
	hash: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessageEventAction =
// @ts-ignore
IMessageEventShowSnackbar
// @ts-ignore
| IMessageEventOpenLink
// @ts-ignore
| IMessageEventOpenApp;
// @ts-ignore

// @ts-ignore
export type MessageEventContextType = 'message_event';
// @ts-ignore

// @ts-ignore
export type MessageEventContextSubType = 'message_event';
// @ts-ignore

// @ts-ignore
export interface IMessageEventContextPayload {
// @ts-ignore
	user_id: number;
// @ts-ignore
	conversation_message_id: number;
// @ts-ignore
	peer_id: number;
// @ts-ignore
	event_id: string;
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	payload: any;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type MessageEventContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<IMessageEventContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class MessageEventContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IMessageEventContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	MessageEventContextType,
// @ts-ignore
	MessageEventContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: MessageEventContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'message_event',
// @ts-ignore
			subTypes: [
// @ts-ignore
				options.updateType as MessageEventContextSubType
// @ts-ignore
			]
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier user
// @ts-ignore
	 */
// @ts-ignore
	public get userId(): number {
// @ts-ignore
		return this.payload.user_id;
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
	public get conversationMessageId(): number {
// @ts-ignore
		return this.payload.conversation_message_id;
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
		return this.payload.peer_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns a random string. Active for a minute, after a minute becomes invalid
// @ts-ignore
	 */
// @ts-ignore
	public get eventId(): string {
// @ts-ignore
		return this.payload.event_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the event payload
// @ts-ignore
	 */
// @ts-ignore
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
// @ts-ignore
	public get eventPayload(): any {
// @ts-ignore
		return this.payload.payload;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Dispatches an event with an action that will occur when the callback button is pressed
// @ts-ignore
	 */
// @ts-ignore
	public answer(eventData: MessageEventAction): Promise<1> {
// @ts-ignore
		return this.api.messages.sendMessageEventAnswer({
// @ts-ignore
			event_id: this.eventId,
// @ts-ignore
			peer_id: this.peerId,
// @ts-ignore
			user_id: this.userId,
// @ts-ignore
			event_data: JSON.stringify(eventData)
// @ts-ignore
		});
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
		return pickProperties(this, [
// @ts-ignore
			'userId',
// @ts-ignore
			'conversationMessageId',
// @ts-ignore
			'peerId',
// @ts-ignore
			'eventId',
// @ts-ignore
			'eventPayload'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
