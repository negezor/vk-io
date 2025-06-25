import { Context, type ContextDefaultState, type ContextFactoryOptions } from './context';

import { type IMessageContextSendOptions, MessageContext } from './message';

import { UpdateSource, kSerializeData } from '../../utils/constants';
import { getRandomId, pickProperties } from '../../utils/helpers';

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

export type MessageEventAction = IMessageEventShowSnackbar | IMessageEventOpenLink | IMessageEventOpenApp;

export type MessageEventContextType = 'message_event';

export type MessageEventContextSubType = 'message_event';

export interface IMessageEventContextPayload {
    user_id: number;
    conversation_message_id: number;
    peer_id: number;
    event_id: string;
    payload: any;
}

export type MessageEventContextOptions<S> = ContextFactoryOptions<IMessageEventContextPayload, S>;

export class MessageEventContext<S = ContextDefaultState> extends Context<
    IMessageEventContextPayload,
    S,
    MessageEventContextType,
    MessageEventContextSubType
> {
    public constructor(options: MessageEventContextOptions<S>) {
        super({
            ...options,

            type: 'message_event',
            subTypes: [options.updateType as MessageEventContextSubType],
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
            event_data: JSON.stringify(eventData),
        });
    }

    /**
     * Show snackbar for user
     */
    public answerSnackbar(text: string): Promise<1> {
        return this.answer({
            type: "show_snackbar",
            text
        })
    }

    /**
     * Sends a message to the current dialog
     */
    async send(
        text: string | IMessageContextSendOptions,
        params?: IMessageContextSendOptions,
    ): Promise<MessageContext<S>> {
        const randomId = getRandomId();

        const options = {
            random_id: randomId,

            ...(typeof text !== 'object'
                ? {
                      message: text,

                      ...params,
                  }
                : text),
        } as IMessageContextSendOptions;

        if (this.$groupId !== undefined) {
            options.peer_ids = this.peerId;
        } else {
            options.peer_id = this.peerId;
        }

        const rawDestination = await this.api.messages.send(options);

        const destination =
            typeof rawDestination !== 'number'
                ? (rawDestination[0] as {
                      peer_id: number;
                      message_id: number;
                      conversation_message_id: number;
                      error: number;
                  })
                : {
                      peer_id: this.peer_id,
                      message_id: rawDestination,
                      conversation_message_id: 0,
                  };

        const messageContext = new MessageContext<S>({
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

                    from_id: this.$groupId as unknown as number,
                    peer_id: destination.peer_id,

                    out: 1,
                    important: false,
                    random_id: randomId,

                    text: options.text,

                    date: Math.floor(Date.now() / 1000),

                    attachments: [],
                },
            },
        });

        // @ts-expect-error private method
        messageContext.$filled = false;

        return messageContext;
    }

    /**
     * Returns the custom data
     */
    public [kSerializeData](): object {
        return pickProperties(this, ['userId', 'conversationMessageId', 'peerId', 'eventId', 'eventPayload']);
    }
}
