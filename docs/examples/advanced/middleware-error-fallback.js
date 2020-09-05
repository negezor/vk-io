const { VK, APIError } = require('vk-io');
const { HearManager } = require('@vk-io/hear');

const vk = new VK({
	token: process.env.TOKEN
});

const hearManager = new HearManager();

const logger = console;

// Custom catch all the errors
vk.updates.use(async (context, next) => {
	try {
		await next();
	} catch (error) {
		logger.error('An error has occurred', error);
	}
});

class MyNetworkError extends Error {}

// Custom handle the errors
vk.updates.use(async (context, next) => {
	try {
		await next();
	} catch (error) {
		// We do not respond not to messages
		if (!context.is('message')) {
			throw error;
		}

		// If there is no access in the chat (https://vk.com/dev/messages.getConversationsById)
		if (error instanceof APIError && error.code === 917) {
			await context.send('I do not have access to the chat, please give it to me.');

			return;
		}

		if (error instanceof MyNetworkError) {
			await context.send('There was a problem with the connection.');

			return;
		}

		// Will be caught in the previous middleware
		throw error;
	}
});

vk.updates.on('message_new', hearManager.middleware);

hearManager.hear(/get chat/i, async (context) => {
	if (!context.isChat) {
		return context.send('We are not in chat!');
	}

	// Throw an error if there is no access
	const { items } = await vk.api.messages.getConversationsById({
		peer_ids: context.peerId
	});

	const [conversation] = items;

	return context.send(`Chat: ${JSON.stringify(conversation, null, '　')}`);
});

hearManager.hear(/throw network error/i, async () => {
	throw new MyNetworkError();
});

vk.updates.start().catch(console.error);
