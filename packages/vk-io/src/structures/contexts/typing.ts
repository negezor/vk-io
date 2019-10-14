import Context, { IContextOptions } from './context';

import { copyParams, getPeerType, showDeprecatedMessage } from '../../utils/helpers';
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

export interface ITypingContextPayload {
	from_id: number;
	to_id: number;
	state: string;
}

export type TypingContextOptions<S> =
	Omit<IContextOptions<ITypingContextPayload, S>, 'type' | 'subTypes'>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default class TypingContext<S = Record<string, any>>
	extends Context<ITypingContextPayload, S> {
	public constructor(options: TypingContextOptions<S>) {
		super({
			...options,

			type: 'typing',
			subTypes: [
				// @ts-ignore
				`typing_${getPeerType(options.payload.from_id)}`
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
		return this.chatId !== null;
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
	 * @deprecated
	 */
	public get peerId(): number {
		showDeprecatedMessage('TypingContext, use toId instead of peerId');

		return this.toId;
	}

	/**
	 * @deprecated
	 */
	public get userId(): number {
		showDeprecatedMessage('TypingContext, use fromId instead of userId');

		return this.fromId;
	}

	/**
	 * Returns the identifier chat
	 */
	public get chatId(): number | null {
		const chatId = this.toId - CHAT_PEER;

		return chatId > 0
			? chatId
			: null;
	}

	/**
	 * Returns the custom data
	 */
	public [inspectCustomData](): object {
		return copyParams(this, [
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
