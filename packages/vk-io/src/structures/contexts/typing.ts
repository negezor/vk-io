import { Context, ContextFactoryOptions } from './context';

import { pickProperties, getPeerType } from '../../utils/helpers';
import {
	CHAT_PEER,

	UpdateSource,
	inspectCustomData
} from '../../utils/constants';

const transformPolling = (
	{ 1: fromId, 2: toId }: number[],
	updateType: number
): ITypingContextPayload => ({
	from_id: fromId,
	to_id: updateType === 62
		? toId + CHAT_PEER
		: fromId,

	state: 'typing'
});

export type TypingContextType = 'typing';

export type TypingContextSubType =
'typing_user'
| 'typing_group';

export interface ITypingContextPayload {
	from_id: number;
	to_id: number;
	state: string;
}

export type TypingContextOptions<S> =
	ContextFactoryOptions<ITypingContextPayload, S>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class TypingContext<S = Record<string, any>>
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
				`typing_${getPeerType(options.payload.from_id)}` as TypingContextSubType
			],

			payload: options.source === UpdateSource.POLLING
				// @ts-ignore
				? transformPolling(options.payload as [number, number, number], options.updateType)
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
		const chatId = this.toId - CHAT_PEER;

		return chatId > 0
			? chatId
			: undefined;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
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
