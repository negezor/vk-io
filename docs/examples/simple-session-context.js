const { VK } = require('vk-io');

const vk = new VK();

vk.setOptions({
	token: process.env.TOKEN,
	pollingGroupId: process.env.GROUP_ID,
	apiMode: 'parallel_selected',
	webhookPath: '/webhook/secret-path'
});

const { updates } = vk;

// Skip outbox message and handle errors
updates.use(async (context, next) => {
	if (context.type === 'message' && context.isOutbox) {
		return;
	}

	try {
		await next();
	} catch (error) {
		console.error('Error:', error);
	}
});

const memoryStorage = new Map();

// Simple session middleware
updates.on('message', async (context, next) => {
	const { peerId } = context;

	const session = memoryStorage.has(peerId)
		? memoryStorage.get(peerId)
		: {};

	context.state.session = session;

	await next();

	memoryStorage.set(peerId, session);
});

// Simple counter in the session
updates.on('message', async (context, next) => {
	const { session } = context.state;

	if (!('counter' in session)) {
		session.counter = 0;
	}

	session.counter += 1;

	await next();
});

updates.hear('/counter', async (context) => {
	const { session } = context.state;

	await context.send(`You turned to the bot (${session.counter}) times`);
});
