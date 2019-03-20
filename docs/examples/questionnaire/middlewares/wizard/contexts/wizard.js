module.exports = class WizardContext {
	constructor({ context, scenes, sessionName }) {
		this.context = context;
		this.scenes = scenes;

		this.sessionName = sessionName;

		this.leaved = false;

		this.updateSession();
	}

	get current() {
		const { sceneId } = this.session;

		return (sceneId && this.scenes.get(sceneId)) || null;
	}

	async enter(sceneId, options = {}) {
		const scene = this.scenes.get(sceneId);

		if (!scene) {
			throw new Error(`Scene ${sceneId} does not exist`);
		}

		const { current } = this;

		const isNotCurrent = current !== null && current.id !== scene.id;

		if (!this.leaved && isNotCurrent) {
			await this.leave({
				silent: options.silent
			});
		}

		if (this.leaved && isNotCurrent) {
			this.leaved = false;

			this.reset();
		}

		this.session.sceneId = sceneId;
		Object.assign(this.state, options.state || {});

		if (options.silent) {
			return;
		}

		await this.current.enterHandler(this.context, {});
	}

	reenter() {
		const { current } = this;

		if (!current) {
			throw new Error('No active scenes!');
		}

		return this.enter(current.id);
	}

	async leave(options = {}) {
		const { current } = this;

		if (!current) {
			return;
		}

		this.leaved = true;

		if (!options.silent) {
			await current.leaveHandler(this.context, {
				canceled: options.canceled || false
			});
		}

		if (this.leaved) {
			this.reset();
		}

		this.leaved = false;
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
