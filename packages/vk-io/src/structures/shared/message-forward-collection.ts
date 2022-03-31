// @ts-ignore
/* eslint-disable max-classes-per-file */
// @ts-ignore
import { MessageContext } from '../contexts/message';
// @ts-ignore
import { Attachment, ExternalAttachment } from '../attachments';
// @ts-ignore
import { AttachmentTypeString } from '../../utils/constants';
// @ts-ignore
import { Attachmentable } from './attachmentable';
// @ts-ignore
import { applyMixins } from '../../utils/helpers';
// @ts-ignore

// @ts-ignore
const getForwards = (rootForwards: MessageContext[]): MessageContext[] => {
// @ts-ignore
	const forwards: MessageContext[] = [];
// @ts-ignore

// @ts-ignore
	for (const forward of rootForwards) {
// @ts-ignore
		forwards.push(
// @ts-ignore
			forward,
// @ts-ignore
			...getForwards(forward.forwards)
// @ts-ignore
		);
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	return forwards;
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const kFlatten = Symbol('flatten');
// @ts-ignore

// @ts-ignore
class MessageForwardsCollection extends Array<MessageContext> {
// @ts-ignore
	protected [kFlatten]: MessageContext[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Returns a flat copy of forwards
// @ts-ignore
	 */
// @ts-ignore
	public get flatten(): MessageContext[] {
// @ts-ignore
		if (!this[kFlatten]) {
// @ts-ignore
			this[kFlatten] = getForwards(this);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return this[kFlatten];
// @ts-ignore
	}
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
// eslint-disable-next-line
// @ts-ignore
interface MessageForwardsCollection extends Attachmentable {}
// @ts-ignore
applyMixins(MessageForwardsCollection, [
// @ts-ignore
	class CustomAttachmentable {
// @ts-ignore
		public flatten!: MessageContext[];
// @ts-ignore

// @ts-ignore
		public hasAttachments(type?: AttachmentTypeString): boolean {
// @ts-ignore
			return this.flatten.some(forward => (
// @ts-ignore
				forward.hasAttachments(type)
// @ts-ignore
			));
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		public getAttachments(
// @ts-ignore
			type?: AttachmentTypeString
// @ts-ignore
		): (Attachment | ExternalAttachment)[] {
// @ts-ignore
			const attachments = this.flatten.map(forward => (
// @ts-ignore
				// @ts-expect-error
// @ts-ignore
				forward.getAttachments(type)
// @ts-ignore
			));
// @ts-ignore

// @ts-ignore
			return ([] as (Attachment | ExternalAttachment)[]).concat(...attachments);
// @ts-ignore
		}
// @ts-ignore
	}
// @ts-ignore
]);
// @ts-ignore

// @ts-ignore
export { MessageForwardsCollection };
