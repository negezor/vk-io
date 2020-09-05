const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
	token: process.env.TOKEN
});

const hearManager = new HearManager();

// Some users "database"
const users = new Map([]);

vk.updates.on('message_new', (context, next) => {
	let user = users.get(context.senderId);

	if (!user) {
		user = {
			displayName: `User ${context.senderId}`
		};

		users.set(context.senderId, user);
	}

	// Add user to context
	context.user = user;

	// We add a method with the answer through the appeal
	context.answer = (text, params) => (
		context.send(`${context.user.displayName}, ${text}`, params)
	);

	return next();
});

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear(/hello/i, async (context) => {
	await context.answer('hello!'); // Will send "User 1234, hello!"
});

hearManager.hear(/set username (.+)/i, async (context) => {
	const [, displayName] = context.$match;

	// Set new display name
	context.user.displayName = displayName;

	await context.answer('display name changed.');
});

vk.updates.start().catch(console.error);
