'use strict';

const util = require('util');
const async = require('async');
const entities = require('entities').decodeHTML;

const Promise = require('bluebird');

/**
 * Срез для получения ID чата
 */
const SHEAR_CHAT = 2e9;

/**
 * Заменяет тег <br> на \n
 */
const brReplace = /<br>/g;

/**
 * Основа сообщений longpoll
 */
class BaseMessage {
	/**
	 * Конструктор
	 *
	 * @param object vk
	 * @param array message
	 */
	constructor (vk,message) {
		this.vk = vk;

		this.id = message[1];

		this.date = message[4];
		this.peer = message[3];
	}

	/**
	 * Отправляет сообщение
	 *
	 * @param mixed  text
	 * @param object params
	 */
	send (text,params = {}) {
		if (typeof text === 'object') {
			params = text;
		} else {
			params.message = text;
		}

		params.peer_id = this.peer;

		return this.vk.api.messages.send(params);
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		return {
			id: this.id,
			date: this.date,
			peer: this.peer
		};
	}
}

/**
 * Класс сообщения
 */
class Message extends BaseMessage {
	/**
	 * Конструктор
	 *
	 * @param object vk
	 * @param array message
	 */
	constructor (vk,message) {
		super(vk,message);

		this.chat = null;

		let attachments = message[7];

		if (this.peer > SHEAR_CHAT) {
			this.user = parseInt(attachments.from);
			this.title = entities(message[5]);

			this.chat = this.peer - SHEAR_CHAT;

			this.from = 'chat';
		} else if (this.peer < 0) {
			this.user = null;
			this.title = null;

			this.admin = parseInt(attachments.from_admin);

			this.from = 'group';
		} else {
			this.user = this.peer;
			this.title = null;

			this.from = 'dialog';
		}

		if (message[6].length !== 0) {
			this.text = entities(message[6]).replace(brReplace,'\n');
		} else {
			this.text = null;
		}

		this.flags = parseFlags(message[2],this.isGroup);
		this.attachments = parseAttachments(attachments);

		this.hasEmoji = 'emoji' in attachments;

		if ('geo' in attachments) {
			this.attachments.geo = {
				id: attachments.geo,
				provider: parseInt(attachments.geo_provider)
			};
		}

		this._fwd = attachments.fwd || null;
	}

	/**
	 * Проверяет наличие флага
	 *
	 * @param string name
	 *
	 * @return boolean
	 */
	hasFlag (name) {
		return this.flags.indexOf(name) > -1;
	}

	/**
	 * Проверяет наличие прикриплений
	 *
	 * @return boolean
	 */
	hasAttachments () {
		return Object.keys(this.attachments).length > 0;
	}

	/**
	 * Проверяет наличие прикрипления
	 *
	 * @param string name
	 *
	 * @return boolean
	 */
	hasAttachment (name) {
		return name in this.attachments;
	}

	/**
	 * Проверяет наличие пересылаемых сообщений
	 *
	 * @return boolean
	 */
	hasFwd () {
		return this._fwd !== null;
	}

	/**
	 * Проверяет сообщение в личке
	 *
	 * @return boolean
	 */
	isDialog () {
		return this.from === 'dialog';
	}

	/**
	 * Проверяет сообщение в чате
	 *
	 * @return boolean
	 */
	isChat () {
		return this.from === 'chat';
	}

	/**
	 * Проверяет сообщение в сообществе
	 *
	 * @return boolean
	 */
	isGroup () {
		return this.from === 'group';
	}

	/**
	 * Возвращает пересылаемые сообщения
	 *
	 * @return Promise
	 */
	getFwd () {
		if (!this.hasFwd()) {
			return Promise.resolve([]);
		}

		if (Array.isArray(this._fwd)) {
			return Promise.resolve(this._fwd);
		}

		return parseFwd(this._fwd)
		.tap((fwd) => {
			this._fwd = fwd;
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @return object
	 */
	inspect (depth,options) {
		let print = Object.assign(super.inspect(depth,options),{
			user: this.user,
			chat: this.chat,
			title: this.title,
			text: this.text,
			from: this.from,
			hasEmoji: this.hasEmoji,
			flags: this.flags,
			attachments: this.attachments
		});

		return this.constructor.name+' '+util.inspect(print,options);
	}
}

/**
 * Базовый класс событий чата
 */
class ChatEvent extends BaseMessage {
	/**
	 * Конструктор
	 *
	 * @param object vk
	 * @param array  message
	 */
	constructor (vk,message) {
		super(vk,message);

		this.chat = this.peer - SHEAR_CHAT;
		this.user = parseInt(message[7].from);
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		return Object.assign(super.inspect(depth,options),{
			user: this.user,
			chat: this.chat
		});
	}
}

/**
 * Создание чата
 */
class ChatCreate extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param object vk
	 * @param array  message
	 */
	constructor (vk,message) {
		super(vk,message);

		this.title = entities(message[7].source_text);
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		let print = Object.assign(super.inspect(depth,options),{
			title: this.title
		});

		return this.constructor.name+' '+util.inspect(print,options);
	}
}

/**
 * Обновлено название беседы
 */
class TitleUpdate extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param array message
	 */
	constructor (vk,message) {
		super(vk,message);

		this.title = entities(message[7].source_text);
	}

	/**
	 * Обновляет название беседы
	 *
	 * @param string title
	 *
	 * @return Promise
	 */
	rename (title) {
		return this.vk.api.messages.editChat({
			chat_id: this.chat,
			title: title
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		let print = Object.assign(super.inspect(depth,options),{
			title: this.title
		});

		return this.constructor.name+' '+util.inspect(print,options);
	}
}

/**
 * Обновлена фотография беседы
 */
class PhotoUpdate extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param object vk
	 * @param array  message
	 */
	constructor (vk,message) {
		super(vk,message);

		let photo = message[7].attach1.split('_');

		this.photo = {
			id: parseInt(photo[1]),
			owner: parseInt(photo[0])
		};
	}

	/**
	 * Удаляет фотографию беседы
	 *
	 * @return Promise
	 */
	remove () {
		return this.vk.api.messages.deleteChatPhoto({
			chat_id: this.chat
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		let print = Object.assign(super.inspect(depth,options),{
			photo: this.photo
		});

		return this.constructor.name+' '+util.inspect(print,options);
	}
}

/**
 * Удаление фотографии беседы
 */
class PhotoRemove extends ChatEvent {
	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		return this.constructor.name+' '+util.inspect(
			super.inspect(depth,options),
			options
		);
	}
}

/**
 * Добавлен пользователь в беседу
 */
class InviteUser extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param object vk
	 * @param array  message
	 */
	constructor (vk,message) {
		super(vk,message);

		this.invite = parseInt(message[7].source_mid);
	}

	/**
	 * Приглашает пользователя обратко
	 *
	 * @param integer id
	 *
	 * @return Promise
	 */
	kick (id = this.invite) {
		return this.vk.api.messages.removeChatUser({
			chat_id: this.chat,
			user_id: id
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		let print = Object.assign(super.inspect(depth,options),{
			invite: this.invite
		});

		return this.constructor.name+' '+util.inspect(print,options);
	}
}

/**
 * Исключен пользователь из беседы
 */
class KickUser extends ChatEvent {
	/**
	 * Конструктор
	 *
	 * @param object vk
	 * @param array  message
	 */
	constructor (vk,message) {
		super(vk,message);

		this.kick = parseInt(message[7].source_mid);
	}

	/**
	 * Приглашает пользователя обратко
	 *
	 * @param integer id
	 *
	 * @return Promise
	 */
	invite (id = this.kick) {
		return this.vk.api.messages.addChatUser({
			chat_id: this.chat,
			user_id: id
		});
	}

	/**
	 * Возвращает свойства которые нужно вывести
	 *
	 * @param integer depth
	 * @param object  options
	 *
	 * @return object
	 */
	inspect (depth,options) {
		let print = Object.assign(super.inspect(depth,options),{
			kick: this.kick
		});

		return this.constructor.name+' '+util.inspect(print,options);
	}
}

/**
 * Обработчики событий чата
 */
const chatEvents = {
	chat_create: (vk,message) => {
		return [new ChatCreate(vk,message),'chat.'];
	},
	chat_title_update: (vk,message) => {
		return [new TitleUpdate(vk,message),'chat.rename'];
	},
	chat_photo_update: (vk,message) => {
		return [new PhotoUpdate(vk,message),'chat.photo.update'];
	},
	/* Это не стандартизировано */
	chat_photo_remove: (vk,message) => {
		return [new PhotoRemove(vk,message),'chat.photo.remove'];
	},
	chat_invite_user: (vk,message) => {
		return [new InviteUser(vk,message),'chat.invite'];
	},
	chat_kick_user: (vk,message) => {
		return [new KickUser(vk,message),'chat.kick'];
	}
};

/**
 * Общие обработчики
 */
const longpollUtil = {
	/* Флаги сообщения */
	flags: (event) => {
		return {
			id: parseInt(event[1]),
			flags: parseFlags(event[2])
		};
	},
	/* Флаги сообщества */
	group: (event) => {
		return {
			id: parseInt(event[1]),
			flags: parseFlags(event[2],true)
		};
	},
	/* Прочитанное сообщение */
	read: (event) => {
		return {
			peer: parseInt(event[1]),
			local: parseInt(event[2])
		};
	}
};

/**
 * Список платформ longpoll
 */
const longpollPlatform = {
	0: 'standalone',
	1: 'mobile',
	2: 'iphone',
	3: 'ipad',
	4: 'android',
	5: 'wphone',
	6: 'windows'
};

/**
 * Обработчики основных событий
 */
const longpollEvents = {
	/* Установка флагов сообщения (FLAGS|=$mask) */
	2: {
		name: 'message.flags.set',
		action: longpollUtil.flags
	},
	/* Cброс флагов сообщения (FLAGS&=~$mask) */
	3: {
		name: 'message.flags.remove',
		action: longpollUtil.flags
	},
	4: {
		name: 'message',
		action: function(message){
			if ('source_act' in message[7]) {
				let act = message[7].source_act;

				if (act in chatEvents) {
					return chatEvents[act](this,message);
				}

				return null;
			}

			if (this.listenerCount('message') === 0) {
				return null;
			}

			return new Message(this,message);
		}
	},
	/* Прочтение всех входящих сообщений с $peer_id вплоть до $local_id  */
	6: {
		name: 'message.read.inbox',
		action: longpollUtil.read
	},
	/* Прочтение всех исходящих сообщений с $peer_id вплоть до $local_id  */
	7: {
		name: 'message.read.outbox',
		action: longpollUtil.read
	},
	/* Друг $user_id стал онлайн */
	8: {
		name: 'user.online',
		action: (event) => {
			return {
				user: -parseInt(event[1]),
				platform: longpollPlatform[event[2]] || null
			};
		}
	},
	/* Друг $user_id стал оффлайн */
	9: {
		name: 'user.offline',
		action: (event) => {
			return {
				user: -parseInt(event[1]),
				exit: parseInt(event[2]) === 0
			};
		}
	},
	/* Сброс флагов диалога $peer_id. Соответствует операции (PEER_FLAGS &= ~$flags). Событие возвращается только для сообщений сообществ. */
	10: {
		name: 'group.flags.remove',
		action: longpollUtil.group
	},
	/* Установка флагов диалога $peer_id. Соответствует операции (PEER_FLAGS|= $flags). Событие возвращается только для сообщений сообществ. */
	12: {
		name: 'group.flags.set',
		action: longpollUtil.group
	},
	51: {
		name: 'chat.action',
		action: (event) => {
			return {
				chat: parseInt(event[1]),
				self: parseInt(event[2]) === 1
			};
		}
	},
	/* Пользователь $user_id начал набирать текст в диалоге. событие должно приходить раз в ~5 секунд при постоянном наборе текста */
	61: {
		name: 'typing.user',
		action: (event) => {
			return {
				user: parseInt(event[1])
			};
		}
	},
	/* Пользователь $user_id начал набирать текст в беседе $chat_id. */
	62: {
		name: 'typing.chat',
		action: (event) => {
			return {
				user: parseInt(event[1]),
				chat: parseInt(event[2])
			};
		}
	},
	/* Новый счетчик непрочитанных в левом меню стал равен $count. */
	80: {
		name: 'unread.count',
		action: (event) => {
			return {
				count: parseInt(event[1])
			};
		}
	},
	/* Изменились настройки оповещений, где peerId — $peer_id чата/собеседника, sound — 1 || 0, включены/выключены звуковые оповещения, disabled_until — выключение оповещений на необходимый срок (-1: навсегда, 0: включены, other: timestamp, когда нужно включить) */
	114: {
		name: 'notify.set',
		action: (event) => {
			return {
				peer: parseInt(event[1]),
				sound: parseInt(event[2]) === 1,
				until: parseInt(event[3])
			};
		}
	}
};

/**
 * Обрабатывает сообщения
 *
 * @param array event
 */
exports._longpollSanitize = function(event){
	const id = event[0];

	if (!(id in longpollEvents)) {
		return;
	}

	const name = longpollEvents[id].name;

	if (id !== 4 && this.listenerCount(name) === 0) {
		return;
	}

	try {
		const result = longpollEvents[id].action.call(this,event);

		// console.log(util.inspect(result,{
		// 	colors: true
		// }));

		// if ('hasAttachments' in result && result.hasAttachments()) {
		// 	console.log(util.inspect(result.attachments,{
		// 		colors: true
		// 	}));
		// }

		if (result === null) {
			return;
		}

		if (Array.isArray(result)) {
			return this.emit(result[1],result[0]);
		}

		this.emit(name,result);
	} catch (e) {
		console.error('Error longpoll',e);
	}
};

/**
 * Уникальные прикрипления к сообщениям
 */
const attachmentOne = {
	sticker: (raw) => {
		return {
			sticker: {
				id: parseInt(raw.attach1),
				product: parseInt(raw.attach1_product_id)
			}
		};
	},
	money_transfer: (raw) => {
		return {
			money: {
				data: raw.attach1 || null,
				currency: raw.attach1_currency,
				amount: parseInt(raw.attach1_amount)
			}
		};
	},
	gift: (raw) => {
		return {
			gift: {
				id: raw.attach1
			}
		};
	}
};

/**
 * Парсирит прикрипления
 *
 * @param object raw
 *
 * @return object
 */
function parseAttachments (raw) {
	if ('attach1' in raw && raw.attach1_type in attachmentOne) {
		return attachmentOne[raw.attach1_type](raw);
	}

	let attachments = {};

	for (let i = 1, key = 'attach1'; key in raw; ++i, key = 'attach'+i) {
		let type = raw[key+'_type'];

		if (type === 'sticker') {
			attachments.sticker = {
				id: parseInt(raw[key]),
				product: parseInt(raw[key+'_product_id'])
			};

			continue;
		}

		if (!(type in attachments)) {
			attachments[type] = [];
		}

		if (type === 'link') {
			let attachment = {
				url: raw[key+'_url'],
				title: raw[key+'_title'],
				description: raw[key+'_desc']
			};

			let photoKey = key+'_photo';

			if (photoKey in raw && raw[photoKey] !== '') {
				let photo = raw[photoKey].split('_');

				attachment.photo = {
					id: parseInt(photo[1]),
					owner: parseInt(photo[0])
				};
			} else {
				attachment.photo = null;
			}

			attachments[type].push(attachment);

			continue;
		}

		let from = raw[key].split('_');

		let attachment = {
			id: parseInt(from[1]),
			owner: parseInt(from[0])
		};

		if (type === 'doc' && key+'_kind' in raw) {
			attachment.type = raw[key+'_kind'];
		}

		attachments[type].push(attachment);
	}

	return attachments;
}

/**
 * Список флагов сообщения
 *
 * unread - сообщение не прочитано
 * outbox - исходящее сообщение
 * replied - на сообщение был создан ответ
 * important - помеченное сообщение
 * chat - сообщение отправлено через чат
 * friends - сообщение отправлено другом
 * spam - сообщение помечено как "Спам"
 * delеtеd - сообщение удалено (в корзине)
 * fixed - сообщение проверено пользователем на спам
 * media - сообщение содержит медиаконтент
 */
const dialogFlags = {
	1: 'unread',
	2: 'outbox',
	4: 'replied',
	8: 'important',
	16: 'chat',
	32: 'friends',
	64: 'spam',
	128: 'delеtеd',
	256: 'fixed',
	512: 'media'
};

/**
 * Список флагов сообщества
 *
 * important - важный диалог
 * answered - диалог с ответом от сообщества
 * ... наследование сообщений диалогов
 */
const groupFlags = Object.assign({},dialogFlags,{
	1: 'important',
	2: 'answered'
});

/**
 * Парсит флаги
 *
 * @param integer flags
 *
 * @return array
 */
function parseFlags (sum, type = false) {
	let list = type?groupFlags:dialogFlags;

	let flags = [];

	for (let i = 0, bit = 1; i < 10; ++i, bit *= 2) {
		if ((sum & bit) !== 0) {
			flags.push(list[bit]);
		}
	}

	return flags;
}

/**
 * Удаляет скобки
 */
const fwdHasBrackets = /(\(.*\))/;

/**
 * Парсирит пересылаемые сообщения
 *
 * @param string raw
 *
 * @return Promise
 */
function parseFwd (raw) {
	if (fwdHasBrackets.test(raw)) {
		raw = raw.substring(1,raw.length - 1);
	}

	return splitFwdDelimiter(raw,',')
	.then(parseFwdAttachment);
}

/**
 * Разделяет строку через разделитель
 *
 * @param string raw       Строка
 * @param string delimiter Разделитель
 *
 * @return promise
 */
function splitFwdDelimiter (raw,delimiter) {
	return new Promise((resolve) => {
		let out = [], tmp = '';

		let left = 0, right = 0;

		/**
		 * Сохраняет результат
		 */
		const keepResult = () => {
			out.push(tmp);
			tmp = '';
		};

		async.eachSeries(
			raw.split(''),
			(sign,next) => {
				switch (sign) {
					case delimiter:
						if (left === right) {
							left = right = 0;

							keepResult();

							return next();
						}
						break;
					case '(':
						++left;
						break;
					case ')':
						++right;
				}

				tmp += sign;

				next();
			},
			() => {
				keepResult();

				resolve(out);
			}
		);
	});
}

/**
 * Разбирает вложения
 *
 * @param object params
 *
 * @return promise
 */
function parseFwdAttachment (params) {
	return new Promise((resolve) => {
		let out = [];

		async.eachSeries(
			params,
			(item,next) => {
				splitFwdDelimiter(item,':')
				.then((pair) => {
					if (pair.length === 0) {
						return next();
					}

					let split = pair[0].split('_');

					let fwd = {
						id: parseInt(split[1]),
						owner: parseInt(split[0]),
						fwd: []
					};


					if (pair.length !== 2) {
						out.push(fwd);

						return next();
					}

					parseFwd(pair[1])
					.then((attach) => {
						fwd.fwd = attach;

						out.push(fwd);

						next();
					});
				});
			},
			() => {
				resolve(out);
			}
		);
	});
}
