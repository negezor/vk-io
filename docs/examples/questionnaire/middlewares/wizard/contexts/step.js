module.exports = class StepContext {
	constructor({
		wizard,
		steps
	}) {
		this.wizard = wizard;
		this.steps = steps;
	}

	get state() {
		return this.wizard.state;
	}

	get stepId() {
		const { stepId = 0 } = this.wizard.session;

		if (!this.steps[stepId]) {
			return null;
		}

		return stepId;
	}

	set stepId(stepId) {
		this.wizard.session.stepId = stepId;
	}

	get current() {
		return this.steps[this.stepId] || null;
	}

	next() {
		this.stepId = this.stepId + 1;
	}

	previous() {
		this.stepId = this.stepId - 1;
	}
};
