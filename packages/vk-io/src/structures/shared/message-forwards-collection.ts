/* eslint-disable max-classes-per-file */
import MessageForward from './message-forward';
import { Attachment, ExternalAttachment } from '../attachments';
import { AttachmentTypeString } from '../../utils/constants';
import Attachmentable from './attachmentable';
import { applyMixins } from '../../utils/helpers';

const getForwards = (rootForwards: MessageForward[]): MessageForward[] => {
	const forwards: MessageForward[] = [];

	for (const forward of rootForwards) {
		forwards.push(
			forward,
			...getForwards(forward.forwards)
		);
	}

	return forwards;
};

const kFlatten = Symbol('flatten');

class MessageForwardsCollection extends Array<MessageForward> {
	protected [kFlatten]: MessageForward[];

	/**
	 * Returns a flat copy of forwards
	 */
	public get flatten(): MessageForward[] {
		if (!this[kFlatten]) {
			this[kFlatten] = getForwards(this);
		}

		return this[kFlatten];
	}
}

// @ts-ignore
// eslint-disable-next-line
interface MessageForwardsCollection extends Attachmentable {}
applyMixins(MessageForwardsCollection, [
	class CustomAttachmentable {
		public flatten!: MessageForward[];

		public hasAttachments(type?: AttachmentTypeString): boolean {
			return this.flatten.some(forward => (
				forward.hasAttachments(type)
			));
		}

		public getAttachments(
			type?: AttachmentTypeString
		): (Attachment | ExternalAttachment)[] {
			const attachments = this.flatten.map(forward => (
				// @ts-ignore
				forward.getAttachments(type)
			));

			// @ts-ignore
			return [].concat(...attachments);
		}
	}
]);

export default MessageForwardsCollection;
