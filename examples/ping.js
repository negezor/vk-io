'use strict';

const vk = new (require('vk-io'));

vk.setToken('you bot token here');

vk.longpoll.start()
.then(() => {
	console.log('Long Poll started');
});

vk.longpoll.on('message', (message) => {
	if (message.text === 'ping') {
		message.send('pong');
	}
});
