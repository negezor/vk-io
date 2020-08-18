import { Context, ContextFactoryOptions, ContextDefaultState } from './context';

import { pickProperties } from '../../utils/helpers';
import { kSerializeData } from '../../utils/constants';

export type DialogMessagesContextType = 'dialog_messages';

export type DialogMessagesContextSubType =
'dialog_messages_delete'
| 'dialog_messages_restore';

const subTypes: Record<number, DialogMessagesContextSubType> = {
	13: 'dialog_messages_delete',
	14: 'dialog_messages_restore'
};
export interface IDialogMessagesContextPayload {
	local_id: number;
	peer_id: number;
}

export type DialogMessagesContextOptions<S> =
	ContextFactoryOptions<number[], S>;

export class DialogMessagesContext<S = ContextDefaultState>
	extends Context<
	IDialogMessagesContextPayload,
	S,
	DialogMessagesContextType,
	DialogMessagesContextSubType
	> {
	public constructor(options: DialogMessagesContextOptions<S>) {
		const [eventId, peerId, localId] = options.payload;

		super({
			...options,

			type: 'dialog_messages',
			subTypes: [
				subTypes[eventId]
			],

			payload: {
				peer_id: peerId,
				local_id: localId
			}
		});
	}

	/**
	 * Checks if messages are delete
	 */
	public get isDelete(): boolean {
		return this.subTypes.includes('dialog_messages_delete');
	}

	/**
	 * Checks if messages are restore
	 */
	public get isRestore(): boolean {
		return this.subTypes.includes('dialog_messages_restore');
	}

	/**
	 * Returns the peer identifier
	 */
	public get peerId(): number {
		return this.payload.peer_id;
	}

	/**
	 * Returns the identifier of the local message
	 */
	public get localId(): number {
		return this.payload.local_id;
	}

	/**
	 * Returns the custom data
	 */
	public [kSerializeData](): object {
		return pickProperties(this, [
			'peerId',
			'localId',
			'isDelete',
			'isRestore'
		]);
	}
}
