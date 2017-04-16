'use strict';

const server = new (require('vk-io'));

server.setOptions({
	app: 1234,
	key: 'secret-key-app'
});

server.auth.server()
.then((token) => {
	server.setToken(token);

	/* TODO: Use secure.* or open methods */
})
.catch((error) => {
	console.error(error);
});
