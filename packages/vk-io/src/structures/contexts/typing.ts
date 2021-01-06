import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties, getPeerType } from '../../utils/helpers';
import {
	PEER_CHAT_ID_OFFSET,

	UpdateSource,
	kSerializeData
} from '../../utils/constants';

const transformPolling = (
	{ 1: toId, 2: fromIds }: [number, number, number[]],
	updateType: number | string
): ITypingContextPayload => ({
	from_id: fromIds[0],
	to_id: toId,

	state: updateType === 64
		? 'audiomessage'
		: 'typing'
});

export type TypingContextType = 'typing';

export type TypingContextSubType =
'typing_user'
| 'typing_group'
| 'message_typing_state';

export interface ITypingContextPayload {
	from_id: number;
	to_id: number;
	state: string;
}

export type TypingContextOptions<S> =
	ContextFactoryOptions<ITypingContextPayload, S>;

export class TypingContext<S = ContextDefaultState>
	extends Context<
	ITypingContextPayload,
	S,
	TypingContextType,
	TypingContextSubType
	> {
	public constructor(options: TypingContextOptions<S>) {
		super({
			...options,

			type: 'typing',
			subTypes: [
				'message_typing_state',
				`typing_${getPeerType(options.payload.from_id)}` as TypingContextSubType
			],

			payload: options.source === UpdateSource.POLLING
				? transformPolling(
					(options.payload as unknown) as [number, number, number[]],
					options.updateType
				)
				: options.payload
		});
	}

	/**
	 * Checks is typing
	 */
	public get isTyping(): boolean {
		return this.payload.state === 'typing';
	}

	/**
	 * Checks is record audio message
	 */
	public get isAudioMessage(): boolean {
		return this.payload.state === 'audiomessage';
	}

	/**
	 * Checks that the message is typed in the dm
	 */
	public get isUser(): boolean {
		return this.subTypes.includes('typing_user');
	}

	/**
	 * Checks that the message is typed in the chat
	 */
	public get isGroup(): boolean {
		return this.subTypes.includes('typing_group');
	}

	/**
	 * Checks that the message is typed in the chat
	 */
	public get isChat(): boolean {
		return this.chatId !== undefined;
	}

	/**
	 * Returns the identifier sender
	 */
	public get fromId(): number {
		return this.payload.from_id;
	}

	/**
	 * Returns the identifier destination
	 */
	public get toId(): number {
		return this.payload.to_id;
	}

	/**
	 * Returns the identifier chat
	 */
	public get chatId(): number | undefined {
		const chatId = this.toId - PEER_CHAT_ID_OFFSET;

		return chatId > 0
			? chatId
			: undefined;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'fromId',
			'toId',
			'chatId',
			'isUser',
			'isGroup',
			'isChat',
			'isTyping',
			'isAudioMessage'
		]);
	}
}
