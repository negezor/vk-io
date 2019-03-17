const { StepContext } = require('../contexts');

module.exports = class StepScene {
	constructor(id, options) {
		this.id = id;
		this.steps = options.steps;

		this.onLeave = options.onLeave;
	}

	async enterHandler(context) {
		context.step = new StepContext({
			wizard: context.wizard,
			steps: this.steps
		});

		const { current } = context.step;

		if (!current) {
			await context.wizard.leave();
		}

		await current(context);
	}

	leaveHandler(context) {
		return this.onLeave(context);
	}
};
