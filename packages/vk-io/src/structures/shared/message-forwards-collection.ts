import MessageForward from './message-forward';
import { Attachment, ExternalAttachment } from '../attachments';

const getForwards = (rootForwards: MessageForward[]): MessageForward[] => {
	const forwards = [];

	for (const forward of rootForwards) {
		forwards.push(
			forward,
			...getForwards(forward.forwards)
		);
	}

	return forwards;
};

const kFlatten = Symbol('flatten');

export default class MessageForwardsCollection extends Array {
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

	/**
	 * Checks for the presence of attachments
	 */
	public hasAttachments(type: string | null = null): boolean {
		return this.flatten.some(forward => (
			forward.hasAttachments(type)
		));
	}

	/**
	 * Returns the attachments
	 */
	public getAttachments(type: string | null = null): (Attachment | ExternalAttachment)[] {
		const attachments = this.flatten.map(forward => (
			forward.getAttachments(type)
		));

		// @ts-ignore
		return [].concat(...attachments);
	}
}
