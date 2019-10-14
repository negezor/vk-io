const { VK } = require('vk-io');
const { SessionManager } = require('@vk-io/session');

const vk = new VK({
	token: process.env.TOKEN
});

const sessionManager = new SessionManager();

vk.updates.on('message', sessionManager.middleware);

vk.updates.hear('/counter', async (context) => {
	const { session } = context;

	if (session.counter === undefined) {
		session.counter = 0;
	}

	session.counter += 1;

	await context.send(`You turned to the bot (${session.counter}) times`);
});

vk.updates.start().catch(console.error);
