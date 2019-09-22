import MessageForward from './message-forward';
import { Attachment } from '../attachments';

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
	/**
	 * Returns a flat copy of forwards
	 */
	get flatten(): MessageForward[] {
		if (!this[kFlatten]) {
			this[kFlatten] = getForwards(this);
		}

		return this[kFlatten];
	}

	/**
	 * Checks for the presence of attachments
	 */
	hasAttachments(type: string = null): boolean {
		return this.flatten.some(forward => (
			forward.hasAttachments(type)
		));
	}

	/**
	 * Returns the attachments
	 */
	getAttachments(type: string = null): Attachment[] {
		const attachments = this.flatten.map(forward => (
			forward.getAttachments(type)
		));

		return [].concat(...attachments);
	}
}
