import { Context, type ContextDefaultState, type ContextFactoryOptions } from './context';

import type { Params } from '../../api';

import { kSerializeData } from '../../utils/constants';

import { pickProperties } from '../../utils/helpers';

export type DialogFlagsContextType = 'dialog_flags';

export type DialogFlagsContextSubType = 'dialog_flags_add' | 'dialog_flags_delete';

const subTypes: Record<string, DialogFlagsContextSubType> = {
    10: 'dialog_flags_delete',
    12: 'dialog_flags_add',
};

/* eslint-disable no-bitwise */
enum DialogFlag {
    IMPORTANT = 1 << 0,
    UNANSWERED = 1 << 1,
}
/* eslint-enable no-bitwise */

export interface IDialogFlagsContextPayload {
    peer_id: number;
    flags: number;
}

export type DialogFlagsContextOptions<S> = ContextFactoryOptions<number[], S>;

export class DialogFlagsContext<S = ContextDefaultState> extends Context<
    IDialogFlagsContextPayload,
    S,
    DialogFlagsContextType,
    DialogFlagsContextSubType
> {
    public constructor(options: DialogFlagsContextOptions<S>) {
        const [eventId, peerId, flags] = options.payload;

        super({
            ...options,

            type: 'dialog_flags',
            subTypes: [subTypes[eventId]],

            payload: {
                peer_id: peerId,
                flags,
            },
        });
    }

    /**
     * Checks if dialogue is important
     */
    public get isImportant(): boolean {
        return this.hasFlag(DialogFlag.IMPORTANT);
    }

    /**
     * Checks if the dialog is unanswered
     */
    public get isUnanswered(): boolean {
        return this.hasFlag(DialogFlag.UNANSWERED);
    }

    /**
     * Returns the destination identifier
     */
    public get peerId(): number {
        return this.payload.peer_id;
    }

    /**
     * Returns the values of the flags
     */
    public get flags(): number {
        return this.payload.flags;
    }

    /**
     * Marks the conversation as answered or unchecked
     */
    public markAsAnsweredConversation(params: Params.MessagesMarkAsAnsweredConversationParams): Promise<number> {
        return this.api.messages.markAsAnsweredConversation({
            ...params,

            peer_id: this.peerId,
        });
    }

    /**
     * Marks the conversation as important or removes the mark
     */
    public markAsImportantConversation(params: Params.MessagesMarkAsImportantConversationParams): Promise<number> {
        return this.api.messages.markAsImportantConversation({
            ...params,

            peer_id: this.peerId,
        });
    }

    protected hasFlag(flag: DialogFlag): boolean {
        return Boolean(this.flags & flag);
    }

    /**
     * Returns the custom data
     */
    public [kSerializeData](): object {
        return pickProperties(this, ['peerId', 'flags', 'isImportant', 'isUnanswered']);
    }
}
