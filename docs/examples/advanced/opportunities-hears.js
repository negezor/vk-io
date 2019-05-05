const { VK } = require('vk-io');

const vk = new VK({
	token: process.env.TOKEN
});

// Strict string compare
vk.updates.hear('/stirct-string', async (context) => {
	await context.send('You written /stirct-string');
});

// Regex match
vk.updates.hear(/^\/text (.+)/i, (context) => {
	context.send(`You written ${context.$match[1]}`);
});

// Callback validation
vk.updates.hear(
	value => (
		value && value.includes('cat')
	),
	async (context) => {
		await context.send('Who say cat?!');
	}
);

// Callback validation with context
vk.updates.hear(
	(value, context) => {
		const messagePayload = context.messagePayload || {};

		return messagePayload.command === 'start';
	},
	async (context) => {
		await context.send('Start button pressed');
	}
);

vk.updates.setHearFallbackHandler(async (context) => {
	await context.send('Action not found, write /help');
});

vk.updates.start().catch(console.error);
