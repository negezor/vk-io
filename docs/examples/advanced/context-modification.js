const { VK } = require('vk-io');

const vk = new VK({
	token: process.env.TOKEN
});

// Some users "database"
const users = new Map([]);

vk.updates.on('message', (context, next) => {
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

vk.updates.hear(/hello/i, async (context) => {
	await context.answer('hello!'); // Will send "User 1234, hello!"
});

vk.updates.hear(/set username (.+)/i, async (context) => {
	const [, displayName] = context.$match;

	// Set new display name
	context.user.displayName = displayName;

	await context.answer('display name changed.');
});

vk.updates.start().catch(console.error);
