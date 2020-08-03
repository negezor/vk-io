const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
	token: process.env.TOKEN
});

const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);

// Basic object
hearManager.hear(
	{
		text: 'test',
		senderType: 'user',
		isChat: true
	},
	async (context) => {
		await context.send('The text of the message "test" and sent from the user in the chat');
	}
);

// Array allow values with callback
hearManager.hear(
	{
		text: 'test',
		senderId: [1, 2, id => id === 3]
	},
	async (context) => {
		await context.send('The text of the message "test" and sent the allowed user ids');
	}
);

// RegExp
hearManager.hear(
	{
		text: /^test$/,
		senderId: [1, 2, 3, /4$/]
	},
	async (context) => {
		await context.send('The text of the message "test" and sent with the allowed user ids or ending with 4');
	}
);

// Nested properties
// context.session = { action: 'test' };
hearManager.hear(
	{
		'session.action': 'test'
	},
	async (context) => {
		await context.send('Nested property "context.session.action" with value "test"');
	}
);
