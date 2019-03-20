module.exports = class StepContext {
	constructor({
		context,
		steps
	}) {
		this.context = context;
		this.steps = steps;
	}

	get stepId() {
		return this.context.wizard.session.stepId || 0;
	}

	set stepId(stepId) {
		Object.assign(this.context.wizard.session, {
			stepId,
			firstTime: true
		});
	}

	get current() {
		return this.steps[this.stepId] || null;
	}

	reenter() {
		const { current } = this;

		if (!current) {
			return this.context.wizard.leave();
		}

		const { firstTime = true } = this.context.wizard.session;

		this.context.wizard.session.firstTime = false;

		return current(this.context, {
			firstTime
		});
	}


	next({ silent = false } = {}) {
		this.stepId += 1;

		if (silent) {
			return Promise.resolve();
		}

		return this.reenter();
	}

	previous({ silent = false } = {}) {
		this.stepId -= 1;

		if (silent) {
			return Promise.resolve();
		}

		return this.reenter();
	}
};
