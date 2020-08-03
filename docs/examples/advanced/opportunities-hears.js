const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
	token: process.env.TOKEN
});

const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);

// Strict string compare
hearManager.hear('/stirct-string', async (context) => {
	await context.send('You written /stirct-string');
});

// Regex match
hearManager.hear(/^\/text (.+)/i, (context) => {
	context.send(`You written ${context.$match[1]}`);
});

// Callback validation
hearManager.hear(
	value => (
		value && value.includes('cat')
	),
	async (context) => {
		await context.send('Who say cat?!');
	}
);

// Callback validation with context
hearManager.hear(
	(value, context) => {
		const messagePayload = context.messagePayload || {};

		return messagePayload.command === 'start';
	},
	async (context) => {
		await context.send('Start button pressed');
	}
);

hearManager.onFallback(async (context) => {
	await context.send('Action not found, write /help');
});

vk.updates.start().catch(console.error);
