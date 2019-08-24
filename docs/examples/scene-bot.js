const { VK } = require('vk-io');

const { SessionManager } = require('@vk-io/session');
const { SceneManager, StepScene } = require('@vk-io/scenes');

const vk = new VK({
	token: process.env.TOKEN
});

const sessionManager = new SessionManager();
const sceneManager = new SceneManager();

sceneManager.addScene(new StepScene('signup', [
	(context) => {
		if (context.scene.step.firstTime || !context.text) {
			return context.send('What\'s your name?');
		}

		context.scene.state.firstName = context.text;

		return context.scene.step.next();
	},
	(context) => {
		if (context.scene.step.firstTime || !context.text) {
			return context.send('How old are you?');
		}

		context.scene.state.age = Number(context.text);

		return context.scene.step.next();
	},
	async (context) => {
		const { firstName, age } = context.scene.state;

		await context.send(`👤 ${firstName} ${age} ages`);

		await context.scene.leave();
	}
]));

vk.updates.on('message', sessionManager.middleware);
vk.updates.on('message', sceneManager.middleware);
vk.updates.on('message', sceneManager.middlewareIntercept);

vk.updates.hear('/signup', async (context) => {
	await context.scene.enter('signup');
});

vk.updates.start().catch(console.error);
