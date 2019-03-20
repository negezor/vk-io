const { VK } = require('vk-io');

const vk = new VK({
	token: process.env.TOKEN
});

vk.updates.hear(/hello/i, context => (
	context.send('Hello!')
));

vk.updates.start().catch(console.error);
