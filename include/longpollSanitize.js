'use strict';

/**
 * Флаги сообщения
 */
exports.flag = {
	UNREAD: 1,
	OUTBOX: 2,
	REPLIED: 4,
	IMPORTANT: 8,
	CHAT: 16,
	FRIENDS: 32,
	SPAM: 64,
	DELЕTЕD: 128,
	FIXED: 256,
	MEDIA: 512
};

var longpollUtil = {
	/* Флаги сообщения */
	flags: (event,resolve) => {
		resolve({
			id: event[0],
			flags: event[1]
		});
	},
	/* Прочитанное сообщение */
	read: (event,resolve) => {
		resolve({
			peer: event[0],
			local: event[1]
		});
	},
	/* Флаги чата */
	chat: (event,resolve) => {
		resolve({
			peer: event[0],
			flags: event[1]
		});
	},
	/* Онлайн пользователя */
	online: (event,resolve) => {
		resolve({
			user: event[0],
			flags: event[1]
		});
	}
};

/**
 * Проверяет что пересылаемое сообщение
 */
exports._longpollHasFwd = /fwd([0-9]+)_([0-9]+)/;

exports._textBrReplace = /<br>/g;

/* Список event-ов */
exports._longpollEvents = {
	/* Удаление сообщения с указанным local_id */
	0: {
		name:'message.delete',
		action: (event,resolve) => {
			resolve({
				id: event[0],
				local: event[1]
			});
		}
	},
	/* Замена флагов сообщения (FLAGS:=$flags) */
	1: {
		name: 'message.flags.replace',
		action: longpollUtil.flags
	},
	/* Установка флагов сообщения (FLAGS|=$mask) */
	2: {
		name: 'message.flags.set',
		action: longpollUtil.flags
	},
	/* Cброс флагов сообщения (FLAGS&=~$mask) */
	3: {
		name: 'message.flags.reset',
		action: longpollUtil.flags
	},
	/* Получение нового сообщения */
	4: {
		name: 'message',
		action: function(event,resolve){
			var message = {
				id: event[0]
			};

			this._longpollSkipId(message.id)
			.then(() => {
				/* Флаги сообщения */
				message.flags = event[1];
				/* Индетификатор сообщения */
				message.peer = event[2];
				/* Ставим id пользователя */
				message.user = message.peer;
				/* Дата сообщения */
				message.date = event[3];

				/* Название беседы */
				message.title = this.entities.decode(event[4]);
				/* Текст сообщения */
				message.text = this.entities.decode(event[5]).replace(this._textBrReplace,'\n');
				/* Прикрепления */
				message.attach = {};

				var attachments = event[6];

				let chat = 2e9;

				if (message.peer > chat) {
					message.isChat = true;
					message.chat = message.peer - chat;

					message.user = parseInt(attachments.from);
					delete attachments.from;
				} else {
					message.isChat = false;
					message.chat = null;
					message.title = null;
				}

				/* Игнорировать ли себя */
				if (this.settings.ignoreMe && this.settings.id === message.user) {
					return;
				}

				/**
				 * Отправка сообщения
				 *
				 * @param mixed   text
				 * @param object  params
				 *
				 * @return object
				 */
				message.send = (text,params) => {
					if (typeof text === 'object' || text instanceof Object) {
						params = text;
					} else {
						params = params || {};

						params.message = text;
					}

					params.peer_id = message.peer;

					if ('fwd' in params) {
						if (params.fwd === true) {
							params.forward_messages = message.id;
						}

						delete params.fwd;
					}

					return this.api.messages.send(params);
				};

				/* Действия чата */
				if (message.isChat === true && 'source_act' in attachments) {
					var name = 'unknown';

					switch (attachments.source_act) {
						/* Переименованние чата */
						case 'chat_title_update':
							message.title = this.entities.decode(attachments.source_text);
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

					resolve([message,'chat.'+name]);
				}

				/* Стикер */
				if ('attach1_product_id' in attachments) {
					message.attach.sticker = {
						id: parseInt(attachments.attach1),
						product: parseInt(attachments.attach1_product_id)
					};

					return resolve(message);
				}

				/* Карта */
				if ('geo' in attachments) {
					message.attach.geo = {
						id: attachments.geo,
						provider: parseInt(attachments.geo_provider)
					};
				}

				message.isEmoji = (('emoji' in attachments)?parseInt(attachments['emoji']):0) === 1;

				(new this.promise((attach) => {
					var i = 1,key;

					this.async.whilst(
						() => {
							key = 'attach'+i;

							return key in attachments;
						},
						(next) => {
							var type = attachments['attach'+i+'_type'];
							var peer = attachments[key].split('_');

							message.attach[type] = message.attach[type] || [];

							message.attach[type].push({
								id: parseInt(peer[1]),
								owner: parseInt(peer[0]),
								get: type+attachments[key]
							});

							++i;

							next();
						},
						attach
					);
				}))
				.then(() => {
					return new this.promise((attach) => {
						if (!attachments.fwd) {
							return attach();
						}

						message.attach.fwd = [];

						this.async.forEach(Object.keys(attachments),(key,next) => {
							if (!this._longpollHasFwd.test(key)) {
								return next();
							}

							var fwd = key.match(this._longpollHasFwd);
							var id = parseInt(fwd[2]);

							message.attach.fwd.push({
								id: id,
								user: parseInt(fwd[1]),
								text: message.attach[key],
								get: () => {
									return this.api.messages.getById({
										message_ids: id
									})
									.then(body => body.items[0]);
								}
							});

							next();
						},attach);
					});
				})
				.then(() => {
					resolve(message);
				});

				++this.status.inbox;
			})
			.catch(() => {});
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
		action: longpollUtil.online
	},
	/* Друг $user_id стал оффлайн */
	9: {
		name: 'user.offline',
		action: longpollUtil.online
	},
	/* Сброс флагов фильтрации по папкам для чата/собеседника с $peer_id */
	10: {
		name: 'chat.flags.reset',
		action: longpollUtil.chat
	},
	/* Замена флагов фильтрации по папкам для чата/собеседника с $peer_id. */
	11: {
		name: 'chat.flags.replace',
		action: longpollUtil.chat
	},
	/* Установка флагов фильтрации по папкам для чата/собеседника с $peer_id */
	12: {
		name: 'chat.flags.set',
		action: longpollUtil.chat
	},
	/* Замена флагов всех сообщений с заданным peer_id (применяется только к сообщениям, у которых на текущий момент не установлены флаги 128 (deleted) и 64 (spam)) */
	13: {
		name: 'message.replace.flags',
		action: longpollUtil.chat
	},
	/* Установка флагов всех сообщений с заданным peer_id (FLAGS|=$mask) (применяется только к сообщениям, у которых на текущий момент не установлены флаги 128 (deleted) и 64 (spam)) */
	14: {
		name: 'message.set.flags',
		action: longpollUtil.chat
	},
	/* Сброс флагов всех сообщений с заданным peer_id (FLAGS&=~$mask) (применяется только к сообщениям, у которых на текущий момент не установлены флаги 128 (deleted) и 64 (spam)) */
	15: {
		name: 'message.reset.flags',
		action: longpollUtil.chat
	},
	/* Один из параметров (состав, тема) беседы $chat_id были изменены. $self - были ли изменения вызваны самим пользователем */
	51: {
		name: 'chat.action',
		action: (event,resolve) => {
			resolve({
				chat: parseInt(event[0]),
				self: parseInt(event[1]) === 1
			});
		}
	},
	/* Пользователь $user_id начал набирать текст в диалоге. событие должно приходить раз в ~5 секунд при постоянном наборе текста */
	61: {
		name: 'user.active.message',
		action: (event,resolve) => {
			resolve({
				user: parseInt(event[0]),
				flags: parseInt(event[1])
			});
		}
	},
	/* Пользователь $user_id начал набирать текст в беседе $chat_id. */
	62: {
			name: 'user.active.chat',
		action: (event,resolve) => {
			resolve({
				user: parseInt(event[0]),
				chat: parseInt(event[1])
			});
		}
	},
	/* Пользователь $user_id совершил звонок имеющий идентификатор $call_id. */
	70: {
		name: 'user.call',
		action: (event,resolve) => {
			resolve({
				user: parseInt(event[0]),
				call: parseInt(event[1])
			});
		}
	},
	/* Новый счетчик непрочитанных в левом меню стал равен $count. */
	80: {
		name: 'message.count',
		action: (event,resolve) => {
			resolve({
				count: parseInt(event[0]),
			});
		}
	},
	/* Сейчас оно используется только при отправке исходящего сообщения на e-mail. */
	101: {
		name: 'email.send',
		action: (event,resolve) => {
			resolve(event);
		}
	},
	/* Изменились настройки оповещений, где peerId — $peer_id чата/собеседника, sound — 1 || 0, включены/выключены звуковые оповещения, disabled_until — выключение оповещений на необходимый срок (-1: навсегда, 0: включены, other: timestamp, когда нужно включить) */
	114: {
		name: 'notify.set',
		action: (event,resolve) => {
			resolve({
				peer: parseInt(event[0]),
				sound: parseInt(event[1]) === 1,
				until: parseInt(event[2])
			});
		}
	}
};

/**
 * Пропускает сообщения с id
 *
 * @param {number} id сообщение
 *
 * @return object
 */
exports._longpollSkipId = function(id){
	return new this.promise((resolve,reject) => {
		var skip = this.status.longpoll.skip;

		this.async.forEach(skip,(item,next) => {
			if (item === id) {
				skip.splice(skip.indexOf(item),1);

				return reject();
			}

			next();
		},resolve);
	});
};

/**
 * Обрабатывает данные longpoll
 *
 * @param {array} updates список изменений
 */
exports._longpollSanitize = function(updates){
	this.async.forEach(updates,(event,next) => {
		var id = parseInt(event.shift());

		if (this._longpollEvents[id]) {
			var handler = this._longpollEvents[id];

			(new this.promise((resolve) => {
				handler.action.call(this,event,resolve);
			}))
			.then((data) => {
				if (Array.isArray(data)) {
					var custom = data[1];
					data = data[0];
				}

				this.emit('longpoll.'+(custom || handler.name),data);
			});
		} else {
			console.log('Error, неизвестный event:',id,event);
		}

		next();
	});
};
