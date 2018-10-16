const { VK } = require('vk-io');

const vk = new VK();

vk.setOptions({
	token: process.env.TOKEN,
	apiMode: 'parallel_selected',
	webhookPath: '/webhook/secret-path'
});

const { updates } = vk;

// Skip outbox message and handle errors
updates.use(async (context, next) => {
	if (context.is('message') && context.isOutbox) {
		return;
	}

	try {
		await next();
	} catch (error) {
		console.error('Error:', error);
	}
});

updates.hear('/start', async (context) => {
	await context.send(`
		My commands list

		/cat - Cat photo
		/purr - Cat purring
		/time - The current date
		/reverse - Reverse text
	`);
});

updates.hear('/cat', async (context) => {
	await Promise.all([
		context.send('Wait for the uploads awesome 😻'),

		context.sendPhoto('http://lorempixel.com/400/200/cats/')
	]);
});

updates.hear(['/time', '/date'], async (context) => {
	await context.send(String(new Date()));
});

updates.hear(/^\/reverse (.+)/i, async (context) => {
	const text = context.$match[1];

	const reversed = text.split('').reverse().join('');

	await context.send(reversed);
});

const catsPurring = [
	'http://ronsen.org/purrfectsounds/purrs/trip.mp3',
	'http://ronsen.org/purrfectsounds/purrs/maja.mp3',
	'http://ronsen.org/purrfectsounds/purrs/chicken.mp3'
];

updates.hear('/purr', async (context) => {
	const link = catsPurring[Math.floor(Math.random() * catsPurring.length)];

	await Promise.all([
		context.send('Wait for the uploads purring 😻'),

		context.sendAudioMessage(link)
	]);
});

async function run() {
	if (process.env.UPDATES === 'webhook') {
		await vk.updates.startWebhook();

		console.log('Webhook server started');
	} else {
		await vk.updates.startPolling();

		console.log('Polling started');
	}
}

run().catch(console.error);
