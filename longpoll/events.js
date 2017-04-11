'use strict';

const { Message, actions } = require('./messages');
const { parseFlags } = require('./helpers');

const similarEvents = {
	flags: (event) => ({
		id: +event[1],
		peer: +event[3],
		flags: parseFlags(event[2])
	}),

	read: (event) => ({
		id: +event[2],
		peer: +event[1]
	}),

	group: (event) => ({
		peer: +event[1],
		flags: parseFlags(+event[2], true)
	})
};

/**
 * Список платформ авторизации
 */
const authPlatform = {
	1: 'mobile',
	2: 'iphone',
	3: 'ipad',
	4: 'android',
	5: 'wphone',
	6: 'windows',
	7: 'standalone'
};

/**
 * Структура событий longpoll
 *
 * @type {Object}
 */
module.exports = {
	1: {
		name: 'message.flag.replace',
		action: similarEvents.flags
	},
	2: {
		name: 'message.flag.set',
		action: similarEvents.flags
	},
	3: {
		name: 'message.flag.remove',
		action: similarEvents.flags
	},
	4: {
		name: 'message',
		action: function (message) {
			if ('source_act' in message[7]) {
				const act = message[7].source_act;

				if (act in actions) {
					return actions[act](this.vk, message);
				}

				return null;
			}

			if (this.listenerCount('message') === 0) {
				return null;
			}

			return new Message(this.vk, message);
		}
	},
	6: {
		name: 'message.read.inbox',
		action: similarEvents.read
	},
	7: {
		name: 'message.read.outbox',
		action: similarEvents.read
	},
	8: {
		name: 'user.online',
		action: (event) => ({
			user: -event[1],
			platform: authPlatform[event[2]] || null
		})
	},
	9: {
		name: 'user.offline',
		action: (event) => ({
			user: -event[1],
			exit: -event[2] === 0
		})
	},
	10: {
		name: 'group.flag.remove',
		action: similarEvents.group
	},
	11: {
		name: 'group.flag.replace',
		action: similarEvents.group
	},
	12: {
		name: 'group.flag.set',
		action: similarEvents.group
	},
	51: {
		name: 'chat.action',
		action: (event) => ({
			chat: +event[1],
			self: +event[2] === 1
		})
	},
	61: {
		name: 'typing.user',
		action: (event) => ({
			user: +event[1]
		})
	},
	62: {
		name: 'typing.chat',
		action: (event) => ({
			user: +event[1],
			chat: +event[2]
		})
	},
	80: {
		name: 'unread.count',
		action: (event) => ({
			count: +event[1]
		})
	}
};
