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
	get flatten() {
		if (!this[kFlatten]) {
			this[kFlatten] = getForwards(this);
		}

		return this[kFlatten];
	}

	hasAttachments(type) {
		return this.flatten.some(forward => (
			forward.hasAttachments(type)
		));
	}

	getAttachments(type) {
		const attachments = this.flatten.map(forward => (
			forward.getAttachments(type)
		));

		return [].concat(...attachments);
	}
}
