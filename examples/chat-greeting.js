'use strict';

const vk = new (require('vk-io'));

vk.setToken('you bot token here');

vk.longpoll.start()
.then(() => {
	console.log('Long Poll started');
});

vk.longpoll.on('chat.invite', (action) => {
	vk.api.users.get({
		user_id: action.invite
	})
	.then(([user]) => {
		action.send(`Welcome to the chat, ${user.first_name}!`);
	});
});

vk.longpoll.on('chat.kick', (action) => {
	vk.api.users.get({
		user_id: action.kick
	})
	.then(([user]) => {
		action.send(`Bay bay, ${user.first_name} :c`);
	});
});
