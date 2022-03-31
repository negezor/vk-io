// @ts-ignore
import { Context, ContextFactoryOptions, ContextDefaultState } from './context';
// @ts-ignore

// @ts-ignore
import { pickProperties } from '../../utils/helpers';
// @ts-ignore
import { kSerializeData } from '../../utils/constants';
// @ts-ignore

// @ts-ignore
export type DialogMessagesContextType = 'dialog_messages';
// @ts-ignore

// @ts-ignore
export type DialogMessagesContextSubType =
// @ts-ignore
'dialog_messages_delete'
// @ts-ignore
| 'dialog_messages_restore';
// @ts-ignore

// @ts-ignore
const subTypes: Record<number, DialogMessagesContextSubType> = {
// @ts-ignore
	13: 'dialog_messages_delete',
// @ts-ignore
	14: 'dialog_messages_restore'
// @ts-ignore
};
// @ts-ignore
export interface IDialogMessagesContextPayload {
// @ts-ignore
	local_id: number;
// @ts-ignore
	peer_id: number;
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export type DialogMessagesContextOptions<S> =
// @ts-ignore
	ContextFactoryOptions<number[], S>;
// @ts-ignore

// @ts-ignore
export class DialogMessagesContext<S = ContextDefaultState>
// @ts-ignore
	extends Context<
// @ts-ignore
	IDialogMessagesContextPayload,
// @ts-ignore
	S,
// @ts-ignore
	DialogMessagesContextType,
// @ts-ignore
	DialogMessagesContextSubType
// @ts-ignore
	> {
// @ts-ignore
	public constructor(options: DialogMessagesContextOptions<S>) {
// @ts-ignore
		const [eventId, peerId, localId] = options.payload;
// @ts-ignore

// @ts-ignore
		super({
// @ts-ignore
			...options,
// @ts-ignore

// @ts-ignore
			type: 'dialog_messages',
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
				local_id: localId
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
	 * Checks if messages are delete
// @ts-ignore
	 */
// @ts-ignore
	public get isDelete(): boolean {
// @ts-ignore
		return this.subTypes.includes('dialog_messages_delete');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Checks if messages are restore
// @ts-ignore
	 */
// @ts-ignore
	public get isRestore(): boolean {
// @ts-ignore
		return this.subTypes.includes('dialog_messages_restore');
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns the peer identifier
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
	 * Returns the identifier of the local message
// @ts-ignore
	 */
// @ts-ignore
	public get localId(): number {
// @ts-ignore
		return this.payload.local_id;
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
			'localId',
// @ts-ignore
			'isDelete',
// @ts-ignore
			'isRestore'
// @ts-ignore
		]);
// @ts-ignore
	}
// @ts-ignore
}
