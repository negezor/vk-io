// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties, getPeerType } from '../../utils/helpers';
// @ts-ignore
import {
// @ts-ignore
	PEER_CHAT_ID_OFFSET,
// @ts-ignore

// @ts-ignore
	UpdateSource,
// @ts-ignore
	kSerializeData
// @ts-ignore
} from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export enum TypingState {
// @ts-ignore
	TYPING = 'typing',
// @ts-ignore
	AUDIO_MESSAGE = 'audiomessage',
// @ts-ignore
	PHOTO_MESSAGE = 'photo',
// @ts-ignore
	VIDEO_MESSAGE = 'video',
// @ts-ignore
	FILE_MESSAGE = 'file'
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export interface ITypingContextPayload {
// @ts-ignore
	from_id: number;
// @ts-ignore
	to_id: number;
// @ts-ignore
	state: string;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
const stateTypesEnum: Record<number, TypingState> = {
// @ts-ignore
	63: TypingState.TYPING,
// @ts-ignore
	64: TypingState.AUDIO_MESSAGE,
// @ts-ignore
	65: TypingState.PHOTO_MESSAGE,
// @ts-ignore
	66: TypingState.VIDEO_MESSAGE,
// @ts-ignore
	67: TypingState.FILE_MESSAGE
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const transformPolling = (
// @ts-ignore
	{ 1: toId, 2: fromIds }: [number, number, number[]],
// @ts-ignore
	updateType: number | string
// @ts-ignore
): ITypingContextPayload => ({
// @ts-ignore
	from_id: fromIds[0],
// @ts-ignore
	to_id: toId,
// @ts-ignore
	state: typeof updateType === 'string'
// @ts-ignore
		? updateType
// @ts-ignore
		: stateTypesEnum[updateType]
// @ts-ignore
});
// @ts-ignore

// @ts-ignore
export type TypingContextType = 'typing';
// @ts-ignore

// @ts-ignore
export type TypingContextSubType =
// @ts-ignore
'typing_user'
// @ts-ignore
| 'typing_group'
// @ts-ignore
| 'message_typing_state';
// @ts-ignore

// @ts-ignore
export type TypingContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<ITypingContextPayload, S>;
// @ts-ignore

// @ts-ignore
export class TypingContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	ITypingContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	TypingContextType,
// @ts-ignore
	TypingContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: TypingContextOptions<S>) {
// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'typing',
// @ts-ignore
			subTypes: [
// @ts-ignore
				'message_typing_state',
// @ts-ignore
				`typing_${getPeerType(options.payload.from_id)}` as TypingContextSubType
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			payload: options.source === UpdateSource.POLLING
// @ts-ignore
				? transformPolling(
// @ts-ignore
					(options.payload as unknown) as [number, number, number[]],
// @ts-ignore
					options.updateType
// @ts-ignore
				)
// @ts-ignore
				: options.payload
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is typing
// @ts-ignore
	 */
// @ts-ignore
	public get isTyping(): boolean {
// @ts-ignore
		return this.payload.state === TypingState.TYPING;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is record audio message
// @ts-ignore
	 */
// @ts-ignore
	public get isAudioMessage(): boolean {
// @ts-ignore
		return this.payload.state === TypingState.AUDIO_MESSAGE;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is upload photo message
// @ts-ignore
	 */
// @ts-ignore
	public get isPhotoMessage(): boolean {
// @ts-ignore
		return this.payload.state === TypingState.PHOTO_MESSAGE;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is upload video message
// @ts-ignore
	 */
// @ts-ignore
	public get isVideoMessage(): boolean {
// @ts-ignore
		return this.payload.state === TypingState.VIDEO_MESSAGE;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks is upload file message
// @ts-ignore
	 */
// @ts-ignore
	public get isFileMessage(): boolean {
// @ts-ignore
		return this.payload.state === TypingState.FILE_MESSAGE;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the message is typed in the dm
// @ts-ignore
	 */
// @ts-ignore
	public get isUser(): boolean {
// @ts-ignore
		return this.subTypes.includes('typing_user');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the message is typed in the chat
// @ts-ignore
	 */
// @ts-ignore
	public get isGroup(): boolean {
// @ts-ignore
		return this.subTypes.includes('typing_group');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks that the message is typed in the chat
// @ts-ignore
	 */
// @ts-ignore
	public get isChat(): boolean {
// @ts-ignore
		return this.chatId !== undefined;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier sender
// @ts-ignore
	 */
// @ts-ignore
	public get fromId(): number {
// @ts-ignore
		return this.payload.from_id;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the identifier destination
// @ts-ignore
	 */
// @ts-ignore
	public get toId(): number {
// @ts-ignore
		return this.payload.to_id;
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
		const chatId = this.toId - PEER_CHAT_ID_OFFSET;
// @ts-ignore

// @ts-ignore
		return chatId > 0
// @ts-ignore
			? chatId
// @ts-ignore
			: undefined;
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
			'fromId',
// @ts-ignore
			'toId',
// @ts-ignore
			'chatId',
// @ts-ignore
			'isUser',
// @ts-ignore
			'isGroup',
// @ts-ignore
			'isChat',
// @ts-ignore
			'isTyping',
// @ts-ignore
			'isAudioMessage',
// @ts-ignore
			'isPhotoMessage',
// @ts-ignore
			'isVideoMessage',
// @ts-ignore
			'isFileMessage'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
