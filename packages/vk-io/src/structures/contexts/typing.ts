import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties, getPeerType } from '../../utils/helpers';
import {
	PEER_CHAT_ID_OFFSET,

	UpdateSource,
	kSerializeData
} from '../../utils/constants';

export enum TypingState {
	TYPING = 'typing',
	AUDIO_MESSAGE = 'audiomessage',
	PHOTO_MESSAGE = 'photo',
	VIDEO_MESSAGE = 'video',
	FILE_MESSAGE = 'file'
}

export interface ITypingContextPayload {
	from_id: number;
	to_id: number;
	state: string;
}

const stateTypesEnum: Record<number, TypingState> = {
	63: TypingState.TYPING,
	64: TypingState.AUDIO_MESSAGE,
	65: TypingState.PHOTO_MESSAGE,
	66: TypingState.VIDEO_MESSAGE,
	67: TypingState.FILE_MESSAGE
};

const transformPolling = (
	{ 1: toId, 2: fromIds }: [number, number, number[]],
	updateType: number | string
): ITypingContextPayload => ({
	from_id: fromIds[0],
	to_id: toId,
	state: typeof updateType === 'string'
		? updateType
		: stateTypesEnum[updateType]
});

export type TypingContextType = 'typing';

export type TypingContextSubType =
'typing_user'
| 'typing_group'
| 'message_typing_state';

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
		return this.payload.state === TypingState.TYPING;
	}

	/**
	 * Checks is record audio message
	 */
	public get isAudioMessage(): boolean {
		return this.payload.state === TypingState.AUDIO_MESSAGE;
	}

	/**
	 * Checks is upload photo message
	 */
	public get isPhotoMessage(): boolean {
		return this.payload.state === TypingState.PHOTO_MESSAGE;
	}

	/**
	 * Checks is upload video message
	 */
	public get isVideoMessage(): boolean {
		return this.payload.state === TypingState.VIDEO_MESSAGE;
	}

	/**
	 * Checks is upload file message
	 */
	public get isFileMessage(): boolean {
		return this.payload.state === TypingState.FILE_MESSAGE;
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
			'isAudioMessage',
			'isPhotoMessage',
			'isVideoMessage',
			'isFileMessage'
		]);
	}
}
