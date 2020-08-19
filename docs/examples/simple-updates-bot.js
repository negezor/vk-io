const { VK } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
	token: process.env.TOKEN
});

const hearManager = new HearManager();

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear('/start', async (context) => {
	await context.send(`
		My commands list

		/cat - Cat photo
		/purr - Cat purring
		/time - The current date
		/reverse - Reverse text
	`);
});

hearManager.hear('/cat', async (context) => {
	await Promise.all([
		context.send('Wait for the uploads awesome 😻'),

		context.sendPhotos({
			value: 'https://loremflickr.com/400/300/'
		})
	]);
});

hearManager.hear(['/time', '/date'], async (context) => {
	await context.send(String(new Date()));
});

hearManager.hear(/^\/reverse (.+)/i, async (context) => {
	await context.send(
		context.$match[1].split('').reverse().join('')
	);
});

const catsPurring = [
	'http://ronsen.org/purrfectsounds/purrs/trip.mp3',
	'http://ronsen.org/purrfectsounds/purrs/maja.mp3',
	'http://ronsen.org/purrfectsounds/purrs/chicken.mp3'
];

hearManager.hear('/purr', async (context) => {
	const link = catsPurring[Math.floor(Math.random() * catsPurring.length)];

	await Promise.all([
		context.send('Wait for the uploads purring 😻'),

		context.sendAudioMessage({
			value: link
		})
	]);
});

vk.updates.start().catch(console.error);
