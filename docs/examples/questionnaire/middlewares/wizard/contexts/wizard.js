module.exports = class WizardContext {
	constructor({ context, scenes, sessionName }) {
		this.context = context;
		this.scenes = scenes;

		this.sessionName = sessionName;

		this.updateSession();
	}

	get current() {
		const { sceneId } = this.session;

		return (sceneId && this.scenes.get(sceneId)) || null;
	}

	async enter(sceneId, { silent = false, state = {} } = {}) {
		const scene = this.scenes.get(sceneId);

		if (!scene) {
			throw new Error(`Scene ${sceneId} does not exist`);
		}

		const { current } = this;

		if (!silent && current !== null && current.id !== scene.id) {
			await this.leave();
		}

		this.session.sceneId = sceneId;
		Object.assign(this.state, state);

		if (silent) {
			return;
		}

		await this.current.enterHandler(this.context);
	}

	reenter() {
		const { current } = this;

		if (!current) {
			throw new Error('No active scenes!');
		}

		return this.enter(current.id);
	}

	async leave({ silent = false } = {}) {
		const { current } = this;

		if (!current) {
			return;
		}

		if (!silent) {
			await current.leaveHandler(this.context);
		}

		this.reset();
	}

	reset() {
		// eslint-disable-next-line no-underscore-dangle
		delete this.context[this.sessionName].__wizard;

		this.updateSession();
	}

	updateSession() {
		// eslint-disable-next-line no-underscore-dangle
		this.session = new Proxy(this.context[this.sessionName].__wizard || {}, {
			set: (target, prop, value) => {
				target[prop] = value;

				// eslint-disable-next-line no-underscore-dangle
				this.context[this.sessionName].__wizard = target;

				return true;
			}
		});

		this.state = new Proxy(this.session.state || {}, {
			set: (target, prop, value) => {
				target[prop] = value;

				this.session.state = target;

				return true;
			}
		});
	}
};
