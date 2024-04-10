import type { AttachmentTypeString } from '../../utils/constants';
import { applyMixins } from '../../utils/helpers';
import type { Attachment, ExternalAttachment } from '../attachments';
import type { ContextDefaultState } from '../contexts/context';
/* eslint-disable max-classes-per-file */
import type { MessageContext } from '../contexts/message';
import type { Attachmentable } from './attachmentable';

const getForwards = <S = ContextDefaultState>(rootForwards: MessageContext<S>[]): MessageContext<S>[] => {
    const forwards: MessageContext<S>[] = [];

    for (const forward of rootForwards) {
        forwards.push(forward, ...getForwards<S>(forward.forwards));
    }

    return forwards;
};

const kFlatten = Symbol('flatten');

class MessageForwardsCollection<S = ContextDefaultState> extends Array<MessageContext<S>> {
    protected [kFlatten]?: MessageContext<S>[];

    /**
     * Returns a flat copy of forwards
     */
    public get flatten(): MessageContext<S>[] {
        if (!this[kFlatten]) {
            this[kFlatten] = getForwards(this);
        }

        return this[kFlatten];
    }
}

interface MessageForwardsCollection extends Attachmentable {}
applyMixins(MessageForwardsCollection, [
    class CustomAttachmentable {
        public flatten!: MessageContext[];

        public hasAttachments(type?: AttachmentTypeString): boolean {
            return this.flatten.some(forward => forward.hasAttachments(type));
        }

        public getAttachments(type?: AttachmentTypeString): (Attachment | ExternalAttachment)[] {
            const attachments = this.flatten.map(forward =>
                // @ts-expect-error too annoying for overload types
                forward.getAttachments(type),
            );

            return ([] as (Attachment | ExternalAttachment)[]).concat(...attachments);
        }
    },
]);

export { MessageForwardsCollection };
