const getForwards = (rootForwards) => {
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
	 *
	 * @return {MessageForward[]}
	 */
	get flatten() {
		if (!this[kFlatten]) {
			this[kFlatten] = getForwards(this);
		}

		return this[kFlatten];
	}

	/**
	 * Checks for the presence of attachments
	 *
	 * @param {?string} type
	 *
	 * @return {boolean}
	 */
	hasAttachments(type) {
		return this.flatten.some(forward => (
			forward.hasAttachments(type)
		));
	}

	/**
	 * Returns the attachments
	 *
	 * @param {?string} type
	 *
	 * @return {Array}
	 */
	getAttachments(type) {
		const attachments = this.flatten.map(forward => (
			forward.getAttachments(type)
		));

		return [].concat(...attachments);
	}
}
