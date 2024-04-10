import { Context, type ContextDefaultState, type ContextFactoryOptions } from './context';

import { kSerializeData } from '../../utils/constants';
import { pickProperties } from '../../utils/helpers';

export type DialogMessagesContextType = 'dialog_messages';

export type DialogMessagesContextSubType = 'dialog_messages_delete';

const subTypes: Record<number, DialogMessagesContextSubType> = {
    10013: 'dialog_messages_delete',
};
export interface IDialogMessagesContextPayload {
    local_id: number;
    peer_id: number;
}

export type DialogMessagesContextOptions<S> = ContextFactoryOptions<number[], S>;

export class DialogMessagesContext<S = ContextDefaultState> extends Context<
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
            subTypes: [subTypes[eventId]],

            payload: {
                peer_id: peerId,
                local_id: localId,
            },
        });
    }

    /**
     * Checks if messages are delete
     */
    public get isDelete(): boolean {
        return this.subTypes.includes('dialog_messages_delete');
    }

    /**
     * Checks if messages are restored
     * @deprecated
     */
    public readonly isRestore = false;

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
        return pickProperties(this, ['peerId', 'localId', 'isDelete', 'isRestore']);
    }
}
