'use strict';

const vk = new (require('vk-io'));

vk.setToken('you group token here');

vk.setOptions({
	/* Optimize the number of requests per second  */
	call: 'execute'
});

vk.longpoll.start()
.then(() => {
	console.log('Long Poll started');
});

const regexReverse = /\/reverse (.+)/i;

vk.longpoll.on('message', (message) => {
	/* Empty message */
	if (message.text === null) {
		return;
	}

	if (message.text.startsWith('/cat')) {
		return message.sendPhoto({
			value: 'http://lorempixel.com/400/200/cats/',
			options: {
				filename: 'cat.jpg'
			}
		});
	}

	if (message.text.startsWith('/hi')) {
		return message.send('Hi!');
	}

	if (message.text.startsWith('/time')) {
		return message.send((new Date).toString());
	}

	if (message.text.startsWith('/random')) {
		return message.send(Math.random());
	}

	if (regexReverse.test(message.text)) {
		const text = message.text.match(regexReverse)[1];

		return message.send(text.split('').reverse().join(''));
	}
});
