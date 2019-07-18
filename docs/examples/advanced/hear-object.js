const { VK } = require('vk-io');

const vk = new VK({
	token: process.env.TOKEN
});

// Basic object
vk.updates.hear(
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
vk.updates.hear(
	{
		text: 'test',
		senderId: [1, 2, id => id === 3]
	},
	async (context) => {
		await context.send('The text of the message "test" and sent the allowed user ids');
	}
);

// RegExp
vk.updates.hear(
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
vk.updates.hear(
	{
		'session.action': 'test'
	},
	async (context) => {
		await context.send('Nested property "context.session.action" with value "test"');
	}
);
