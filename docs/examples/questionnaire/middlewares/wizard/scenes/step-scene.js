const { StepContext } = require('../contexts');

module.exports = class StepScene {
	constructor(id, options) {
		this.id = id;
		this.steps = options.steps;

		this.onLeave = options.onLeave;
	}

	enterHandler(context) {
		context.step = new StepContext({
			context,

			steps: this.steps
		});

		return context.step.reenter();
	}

	leaveHandler(context, payload) {
		return this.onLeave(context, payload);
	}
};
