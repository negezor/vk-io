'use strict';

/* Срез чат с peer */
exports.SHEAR_CHAT = 2e9;

/* Заменя br */
const brReplace = /<br>/g;

/* Удаляет скобки */
const fwdHasBrackets = /(\(.*\))/;

/**
 * Список флагов longpoll
 */
const longpollFlags = {
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
 * Список платформа longpoll
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

const nullFunction = () => {};

/**
 * Получить флаги сообщения
 *
 * @param integer sum
 *
 * @return promise
 */
exports._longpollParseFlags = function(sum){
	return new this.promise((resolve) => {
		var flags = [], bit = 1, i = 0;

		sum = parseInt(sum);

		this.async.whilst(
			() => {
				return i < 10;
			},
			(next) => {
				if (sum & bit && bit in longpollFlags) {
					flags.push(longpollFlags[bit]);
				}

				bit *= 2;
				++i;

				next();
			},
			() => {
				resolve(flags);
			}
		);
	});
};

/**
 * Обрабатывает данные longpoll
 *
 * @param object   event Событие
 * @param function next  Переход к следущему событию
 */
exports._longpollSanitize = function(event,next){
	if (!(event[0] in this._longpollEvents)) {
		return next();
	}

	var {name,action} = this._longpollEvents[event[0]];

	var result = action.call(this,event);

	if (typeof result === 'object' && 'then' in result) {
		next();

		return result.then((response) => {
			if (!Array.isArray(response)) {
				return this.emit(name,response);
			}

			this.emit(response[1],response[0]);
		})
		.catch(nullFunction);
	}

	this.emit(name,result);

	next();
};

/**
 * Пропускает сообщение
 *
 * @param integer id Идентификатор сообщения
 *
 * @return promise
 */
exports._longpollSkipMessage = function(id){
	return new this.promise((resolve,reject) => {
		var skip = this._longpoll.skip;

		if (!this.settings.ignoreMe || skip.length === 0) {
			return resolve();
		}

		this.async.eachOf(
			skip,
			(item,key,next) => {
				if (item === id) {
					skip.splice(key,1);

					reject();
				}

				next();
			},
			resolve
		)
	});
};

/**
 * Парсирит прикрепления
 *
 * @param object message     Объект сообщения
 * @param object attachments Прикрепления
 *
 * @return promise
 */
exports._longpollParseAttach = function(message,attachments){
	return new this.promise((resolve) => {
		var i = 1,key,type,peer,push;

		this.async.whilst(
			() => {
				key = 'attach'+i;

				return key in attachments;
			},
			(next) => {
				type = attachments[key+'_type'];

				message.attach[type] = message.attach[type] || [];

				++i;

				if (type === 'link') {
					push = {
						url: attachments[key+'_url'],
						title: attachments[key+'_title'],
						description: attachments[key+'_desc'],
						photo: (attachments[key+'_photo'] || '').split(','),
					};

					message.attach[type].push(push);

					return next();
				}

				peer = attachments[key].split('_');

				push = {
					id: parseInt(peer[1]),
					owner: parseInt(peer[0]),
					get: type+attachments[key]
				};

				if (type === 'doc' && key+'_kind' in attachments) {
					push.type = attachments[key+'_kind'];
				}

				message.attach[type].push(push);

				next();
			},
			resolve
		);
	});
};

/**
 * Разделяет строку через разделитель
 *
 * @param string raw       Строка
 * @param string delimiter Разделитель
 *
 * @return promise
 */
exports._fwdSplitDelimiter = function(raw,delimiter){
	return new this.promise((resolve) => {
		var out = [];
		var tmp = '';
		var left = 0, right = 0;

		/**
		 * Сохраняет результат
		 */
		var keepResult = () => {
			out.push(tmp);
			tmp = '';
		};

		this.async.each(
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
};

/**
 * Разбирает вложения
 *
 * @param object params
 *
 * @return promise
 */
exports._parseFwdAttachment = function(params){
	return new this.promise((resolve) => {
		var out = [];

		this.async.each(
			params,
			(item,next) => {
				this._fwdSplitDelimiter(item,':')
				.then((pair) => {
					if (pair.length === 0) {
						return next();
					}

					var split = pair[0].split('_');

					var fwd = {
						id: split[1],
						owner: split[0],
						fwd: []
					};


					if (pair.length !== 2) {
						out.push(fwd);

						return next();
					}

					this._longpollParseFwd(pair[1])
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
};

/**
 * Получает структуру и парсирит
 *
 * @param string raw
 *
 * @return promise
 */
exports._longpollParseFwd = function(raw){
	if (fwdHasBrackets.test(raw)) {
		raw = raw.substring(1,raw.length - 1);
	}

	return this._fwdSplitDelimiter(raw,',')
	.then((params) => {
		return this._parseFwdAttachment(params);
	});
};

/**
 * Повторяющиеся функции
 */
var longpollUtil = {
	/* Флаги сообщения */
	flags: function(event){
		return this._longpollParseFlags(event[2])
		.then((flags) => {
			return {
				id: parseInt(event[1]),
				flags
			};
		});
	},
	/* Флаги сообщества */
	group: function(event){
		return this._longpollParseFlags(event[2])
		.then((flags) => {
			return {
				peer: parseInt(event[1]),
				flags
			};
		});
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
 * Новое сообщение
 *
 * @param object   message Объект сообщения
 * @param array    event   Список событий
 */
var receivedMessage = function(message,event){
	/* Timestamp сообщения */
	message.date = event[4];
	/* Идентификатор сообщения и пользователя */
	message.user = message.peer = parseInt(event[3]);
	/* Текст сообщения */
	message.text = this.entities(event[6]).replace(brReplace,'\n');

	/* Прикрипления */
	var attachments = event[7];

	if (message.peer > this.SHEAR_CHAT) {
		message.isChat = true;
		message.title = this.entities(event[5]);
		message.chat = message.peer - this.SHEAR_CHAT;

		message.user = parseInt(attachments.from);
	}

	/* Игнорировать ли себя */
	if (this.settings.ignoreMe && this.settings.id === message.user) {
		return;
	}

	if (message.text.length === 0) {
		message.text = null;
	}

	/**
	 * Отправка сообщения
	 *
	 * @param mixed   text
	 * @param object  params
	 *
	 * @return object
	 */
	message.send = (text,params = {}) => {
		if (typeof text === 'object') {
			params = text;
		} else {
			params.message = text;
		}

		params.peer_id = message.peer;

		if ('fwd' in params && params.fwd === true) {
			params.forward_messages = message.id;
		}

		delete params.fwd;

		return this.api.messages.send(params);
	};

	if ('attach1_type' in attachments) {
		/* Стикер */
		if (attachments.attach1_type === 'sticker') {
			message.sticker = {
				id: parseInt(attachments.attach1),
				product: parseInt(attachments.attach1_product_id)
			};

			return [message,'message.sticker'];
		}

		/* Перевод денег */
		if (attachments.attach1_type === 'money_transfer') {
			message.money = {
				data: attachments.attach1 || null,
				currency: attachments.attach1_currency,
				amount: parseInt(attachments.attach1_amount)
			};

			return [message,'message.money'];
		}

		/* Стикер */
		if (attachments.attach1_type === 'gift') {
			return [message,'message.gift'];
		}
	}

	/* Действия чата */
	if (message.isChat === true && 'source_act' in attachments) {
		var name = 'unknown';

		switch (attachments.source_act) {
			/* Переименованние чата */
			case 'chat_title_update':
				message.title = this.entities(attachments.source_text);
				message.rename = (title) => {
					return this.api.messages.editChat({
						chat_id: message.chat,
						title: title
					});
				};

				name = 'rename';
				break;
			/* Приглашения пользователя в чат */
			case 'chat_invite_user':
				message.invite = parseInt(attachments.source_mid);
				message.kick = (id) => {
					return this.api.messages.removeChatUser({
						chat_id: message.chat,
						user_id: id || message.invite
					});
				};

				name = 'invite';
				break;
			/* Кик пользователя с чата */
			case 'chat_kick_user':
				message.kick = parseInt(attachments.source_mid);
				message.invite = (id) => {
					return this.api.messages.addChatUser({
						chat_id: message.chat,
						user_id: id || message.kick
					});
				};

				name = 'kick';
				break;
			/* Установка изображения чата */
			case 'chat_photo_update':
				var peer = attachments.attach1.split('_');

				message.photo = {
					id: parseInt(peer[1]),
					owner: parseInt(peer[0]),
					get: 'photo'+attachments.attach1
				};

				message.remove = () => {
					return this.api.messages.deleteChatPhoto({
						chat_id: message.chat
					});
				};

				name = 'photo.update';
				break;
			/* Удаление изображения чата */
			case 'chat_photo_remove':
				name = 'photo.remove';

				break;
			/* Создание чата */
			case 'chat_create':
				message.title = attachments.source_text;

				name = 'create';
		}

		return [message,'chat.'+name];
	}

	/* Карта */
	if ('geo' in attachments) {
		message.attach.geo = {
			id: attachments.geo,
			provider: parseInt(attachments.geo_provider)
		};
	}

	message.hasEmoji = (('emoji' in attachments)?parseInt(attachments.emoji):0) === 1;

	return this._longpollParseAttach(message,attachments)
	.then(() => {
		if (!('fwd' in attachments)) {
			return [];
		}

		return this._longpollParseFwd(attachments.fwd);
	})
	.then((fwd) => {
		message.fwd = fwd;

		this._longpollSkipMessage(message.id);

		return message;
	});
};

/**
 * Список всех event-ов
 */
exports._longpollEvents = {
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
		action: function(event){
			/* Объект сообщения */
			var message = {
				/* ID сообщения */
				id: parseInt(event[1]),
				/* Флаги сообщения */
				flags: null,
				/* Прикрепления */
				attach: {},
				/* Название беседы */
				title: null,
				/* ID чата */
				chat: null,
				/* Отправлено ли в чате */
				isChat: false,
				/* Присутсвуют ли emoji */
				hasEmoji: false,
				/* Текст сообщения */
				text: null
			};

			return this._longpollSkipMessage(message.id)
			.then(() => {
				return this._longpollParseFlags(event[2]);
			})
			.then((flags) => {
				message.flags = flags;

				return receivedMessage.call(this,message,event);
			});
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
			return parseInt(event[1]);
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
			return parseInt(event[1]);
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
