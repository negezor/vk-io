// @ts-ignore
import { Params } from '../../api';
// @ts-ignore

// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type DialogFlagsContextType = 'dialog_flags';
// @ts-ignore

// @ts-ignore
export type DialogFlagsContextSubType =
// @ts-ignore
'dialog_flags_replace'
// @ts-ignore
| 'dialog_flags_add'
// @ts-ignore
| 'dialog_flags_delete';
// @ts-ignore

// @ts-ignore
const subTypes: Record<string, DialogFlagsContextSubType> = {
// @ts-ignore
	10: 'dialog_flags_delete',
// @ts-ignore
	11: 'dialog_flags_replace',
// @ts-ignore
	12: 'dialog_flags_add'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
/* eslint-disable no-bitwise */
// @ts-ignore
enum DialogFlag {
// @ts-ignore
	IMPORTANT = 1 << 0,
// @ts-ignore
	UNANSWERED = 1 << 1
// @ts-ignore
}
// @ts-ignore
/* eslint-enable no-bitwise */
// @ts-ignore

// @ts-ignore
export interface IDialogFlagsContextPayload {
// @ts-ignore
	peer_id: number;
// @ts-ignore
	flags: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DialogFlagsContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<number[], S>;
// @ts-ignore

// @ts-ignore
export class DialogFlagsContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IDialogFlagsContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	DialogFlagsContextType,
// @ts-ignore
	DialogFlagsContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: DialogFlagsContextOptions<S>) {
// @ts-ignore
		const [eventId, peerId, flags] = options.payload;
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'dialog_flags',
// @ts-ignore
			subTypes: [
// @ts-ignore
				subTypes[eventId]
// @ts-ignore
			],
// @ts-ignore

// @ts-ignore
			payload: {
// @ts-ignore
				peer_id: peerId,
// @ts-ignore
				flags
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if dialogue is important
// @ts-ignore
	 */
// @ts-ignore
	public get isImportant(): boolean {
// @ts-ignore
		return this.hasFlag(DialogFlag.IMPORTANT);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if the dialog is unanswered
// @ts-ignore
	 */
// @ts-ignore
	public get isUnanswered(): boolean {
// @ts-ignore
		return this.hasFlag(DialogFlag.UNANSWERED);
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
	 * Returns the values of the flags
// @ts-ignore
	 */
// @ts-ignore
	public get flags(): number {
// @ts-ignore
		return this.payload.flags;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Marks the conversation as answered or unchecked
// @ts-ignore
	 */
// @ts-ignore
	public markAsAnsweredConversation(
// @ts-ignore
		params: Params.MessagesMarkAsAnsweredConversationParams
// @ts-ignore
	): Promise<number> {
// @ts-ignore
		return this.api.messages.markAsAnsweredConversation({
// @ts-ignore
			...params,
// @ts-ignore

// @ts-ignore
			peer_id: this.peerId
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Marks the conversation as important or removes the mark
// @ts-ignore
	 */
// @ts-ignore
	public markAsImportantConversation(
// @ts-ignore
		params: Params.MessagesMarkAsImportantConversationParams
// @ts-ignore
	): Promise<number> {
// @ts-ignore
		return this.api.messages.markAsImportantConversation({
// @ts-ignore
			...params,
// @ts-ignore

// @ts-ignore
			peer_id: this.peerId
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	protected hasFlag(flag: DialogFlag): boolean {
// @ts-ignore
		// eslint-disable-next-line no-bitwise
// @ts-ignore
		return Boolean(this.flags & flag);
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
			'peerId',
// @ts-ignore
			'flags',
// @ts-ignore
			'isImportant',
// @ts-ignore
			'isUnanswered'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
