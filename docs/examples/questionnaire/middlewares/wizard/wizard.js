const { WizardContext } = require('./contexts');

module.exports = class Wizard {
	constructor({
		sessionName = 'session'
	} = {}) {
		this.sessionName = sessionName;

		this.scenes = new Map();
	}

	addScene(scene) {
		if (this.scenes.has(scene.id)) {
			throw new Error('Scene already exists');
		}

		this.scenes.set(scene.id, scene);

		return this;
	}

	getMiddleware() {
		return async (context, next) => {
			const wizardContext = new WizardContext({
				context,

				scenes: this.scenes,

				sessionName: this.sessionName
			});

			context.wizard = wizardContext;

			await next();
		};
	}
};
