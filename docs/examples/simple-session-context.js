const { VK } = require('vk-io');

const vk = new VK({
	token: process.env.TOKEN
});

const memoryStorage = new Map();

// Simple session middleware
vk.updates.on('message', async (context, next) => {
	const { peerId } = context;

	const session = memoryStorage.has(peerId)
		? memoryStorage.get(peerId)
		: {};

	context.session = session;

	await next();

	memoryStorage.set(peerId, session);
});

// Simple counter in the session
vk.updates.on('message', async (context, next) => {
	const { session } = context;

	if (!('counter' in session)) {
		session.counter = 0;
	}

	session.counter += 1;

	await next();
});

vk.updates.hear('/counter', async (context) => {
	const { session } = context;

	await context.send(`You turned to the bot (${session.counter}) times`);
});

vk.updates.start().catch(console.error);
