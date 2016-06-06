'use strict';

var longpollUtil = {
	/* Флаги сообщения */
	flags: function(event,resolve){
		/* Вызываем resolve */
		resolve({
			id: event[0],
			local: event[1]
		});
	},
	/* Прочитанное сообщение */
	read: function(event,resolve){
		resolve({
			peer: event[0],
			local: event[1]
		});
	},
	/* Флаги чата */
	chat: function(event,resolve){
		resolve({
			peer: event[0],
			flags: event[1]
		});
	},
	/* Онлайн пользователя */
	online: function(event,resolve){
		resolve({
			user: event[0],
			flags: event[1]
		});
	}
};

/* Список event-ов */
exports._longpollEvents = {
	/* Удаление сообщения с указанным local_id */
	0: {
		name:'message.delete',
		action: longpollUtil.flags
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
			/* Объект на вывод */
			var message = {
				/* Id сообщения */
				id: event[0]
			};

			/* Проверка что сообщение не игнорируется */
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
				message.text = this.entities.decode(event[5]);
				/* Прикрепления */
				message.attach = event[6];

				/* Число среза для чата */
				var chat = 2000000000;

				/* Является ли сообщение из чата */
				if (message.peer > chat) {
					/* Указываем что чат */
					message.isChat = true;
					/* Указываем id чата */
					message.chat = message.peer - chat;

					/* Ставим id пользователя */
					message.user = parseInt(message.attach.from);
					/* Удаляем прикрепления */
					delete message.attach.from;
				} else {
					/* Указываем что не чат */
					message.isChat = false;
					/* Указываем что нету чата */
					message.chat = null;
					/* Убераем title */
					message.title = null;
				}

				/* Если пользователь написал себе */
				if (this.settings.id == message.user) {
					return;
				}

				/* Создаём новый promise */
				(new this.promise((attach) => {
					/* Проходимся по списку прикреплений */
					for (var i = 1; i <= 10; ++i) {
						/* Проверяем если есть прикрепление */
						if (message.attach['attach'+i]) {
							/* Тип добавление */
							var type = message.attach['attach'+i+'_type'];
							/* Разделяем данные */
							var split = message.attach['attach'+i].split('_');

							/* Выбераем прикрепления */
							message.attach[type] = message.attach[type] || [];

							/* Добавляем вложение */
							message.attach[type].push({
								/* Id прикрепления */
								id: parseInt(split[1]),
								/* Id стенки/пользователя/ */
								owner: split[0].toString(),
								/* Для быстрого прикрепления */
								get: type+message.attach['attach'+i]
							});

							/* Удаляем attach */
							delete message.attach['attach'+i];
							delete message.attach['attach'+i+'_type'];
						} else {
							/* Ломаем цикл */
							break;
						}
					}

					attach();
				}))
				.then(() => {
					/* Отправляет сообщение в чат/лс */
					message.send = (text,params) => {
						if (typeof text === 'object' || text instanceof Object) {
							/* Ставим параметры */
							params = text;
						} else {
							/* Если параметры в первом аргументе */
							params = params || {};

							/* Ставим сообщение */
							params.message = text;
						}


						/* Идентификатор назначения */
						params.peer_id = message.peer;

						/* Сокращение прикрплений */
						if (params.attach) {
							/* Ставим на другой ключ */
							params.attachment = params.attach;
							/* Удаляем параметр */
							delete params.attach;
						}

						/* Нужно ли переслать сообщение */
						if (params.fwd && params.fwd === true) {
							/* Ставим id сообщения */
							params.forward_messages = message.id;
							/* Удаляем параметр */
							return params.fwd;
						}

						return this.api.messages.send(params);
					};

					/* Есть ли действия чата */
					if (message.isChat === true && message.attach.source_act) {
						/* Выбераем действие чата */
						switch (message.attach.source_act) {
							/* Переименованние чата */
							case 'chat_title_update':
								/* Id пользователя */
								var id = this.settings.id;

								/* Если пользователь сам изменил */
								if (id && id === message.user) {
									return;
								}

								/* Изменяем title */
								message.title = this.entities.decode(message.attach.source_text);
								/* Переименовывает чат */
								message.rename = (name) => {
									return this.api.messages.editChat({
										chat_id: message.chat,
										title: name
									});
								};
	
								/* Название event-а */
								var name = 'chat.rename';
								break;
							/* Приглашения пользователя в чат */
							case 'chat_invite_user':
								/* Id приглашенного */
								message.invite = message.attach.source_mid;
								/* Позволяет кикнуть пользователя */
								message.kick = (id) => {
									return this.api.messages.removeChatUser({
										chat_id: message.chat,
										user_id: id || message.kick
									});
								};
	
								/* Название event-а */
								var name = 'chat.invite';
								break;
							/* Кик пользователя с чата */
							case 'chat_kick_user':
								/* Id кикнутого */
								message.kick = message.attach.source_mid;
								/* Возвращаем пользователя в чат */
								message.invite = (id) => {
									return this.api.messages.addChatUser({
										chat_id: message.chat,
										user_id: id || message.kick
									});
								};
	
								/* Название event-а */
								var name = 'chat.kick';
								break;
							/* Установка изображения чата */
							case 'chat_photo_update':
								/* Ставим фотографию */
								message.photo = message.attach.photo[0];
								/* Удляем прикрепление */
								delete message.attach.photo;

								/* Удаляет фотографию беседы */
								message.remove = () => {
									return this.api.messages.deleteChatPhoto({
										chat_id: message.chat
									});
								};

								/* Название event-а */
								var name = 'chat.photo.update';
								break;
							/* Удаление изображения чата */
							case 'chat_photo_remove':
								/* Название event-а */
								var name = 'chat.photo.delete';
								break;
						}

						/* Удаляем прикрепления */
						delete message.attach.source_text;
						delete message.attach.source_mid;
						delete message.attach.source_act;

						/* Вызываем другие события */
						resolve([message,name]);
					} else {
						/* Возвращаем данные */
						resolve(message);
					}

					/* Увеличиваем счётчик принятых */
					++this.status.inbox;

					/* Срез сообщений */
					var skip = this.status.longpoll.skip;

					/* Срезаем id которые устарели если есть */
					skip.splice(skip.indexOf(message.id),1);
				});
			})
			.catch(() => {
				/* TODO: Добавить действия для пропуска сообщения */
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
		action: function(event,resolve){
			resolve({
				chat: parseInt(event[0]),
				self: parseInt(event[1]) === 1
			});
		}
	},
	/* Пользователь $user_id начал набирать текст в диалоге. событие должно приходить раз в ~5 секунд при постоянном наборе текста */
	61: {
		name: 'user.active.message',
		action: function(event,resolve){
			resolve({
				user: parseInt(event[0]),
				flags: parseInt(event[1])
			});
		}
	},
	/* Пользователь $user_id начал набирать текст в беседе $chat_id. */
	62: {
		name: 'user.active.chat',
		action: function(event,resolve){
			resolve({
				user: parseInt(event[0]),
				chat: parseInt(event[1])
			});
		}
	},
	/* Пользователь $user_id совершил звонок имеющий идентификатор $call_id. */
	70: {
		name: 'user.call',
		action: function(event,resolve){
			resolve({
				user: parseInt(event[0]),
				call: parseInt(event[1])
			});
		}
	},
	/* Новый счетчик непрочитанных в левом меню стал равен $count. */
	80: {
		name: 'message.count',
		action: function(event,resolve){
			resolve({
				count: parseInt(event[0]),
			});
		}
	},
	/* Сейчас оно используется только при отправке исходящего сообщения на e-mail. */
	101: {
		name: 'email.send',
		action: function(event,resolve){
			resolve(event);
		}
	},
	/* Изменились настройки оповещений, где peerId — $peer_id чата/собеседника, sound — 1 || 0, включены/выключены звуковые оповещения, disabled_until — выключение оповещений на необходимый срок (-1: навсегда, 0: включены, other: timestamp, когда нужно включить) */
	114: {
		name: 'notify.set',
		action: function(event,resolve){
			resolve({
				peer: parseInt(event[0]),
				sound: parseInt(event[1]) === 1,
				until: parseInt(event[2]),
			});
		}
	}
};

/**
 * Пропускает сообщения с id
 * @param {number} id сообщение
 */
exports._longpollSkipId = function(id){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Алиас пропуска */
		var skip = this.status.longpoll.skip;

		/* Проходимся по списку */
		this.async.forEach(skip,(item,next) => {
			/* Если совпадает с id */
			if (item == id) {
				/* Убераем id */
				skip.splice(skip.indexOf(item),1);

				/* Не пропускаем дальше */
				return reject();
			}

			/* Переходим на следующую итерацию */
			next();
		},resolve);
	});
};

/**
 * Обрабатывает данные longpoll
 * @param {array} updates список изменений
 */
exports._longpollSanitize = function(updates){
	/* Проходимся по списку обновлений */
	this.async.forEach(updates,(event,next) => {
		/* Id event-a */
		var id = event.shift();

		/* Проверяем существование event-а */
		if (this._longpollEvents[id]) {
			/* Ставим алиас */
			var handler = this._longpollEvents[id];

			/* Ставим promise */
			(new this.promise((resolve) => {
				/* Вызываем обработчик */
				handler.action.call(this,event,resolve);
			}))
			.then((data) => {
				/* Если массив */
				if (Array.isArray(data)) {
					var custom = data[1];
					data = data[0];
				}

				/* Вызываем событие */
				this.emit('longpoll.'+(custom || handler.name),data);
			});
		} else {
			/* Пишем о проблеме */
			console.log('Error, неизвестный event:',id,event);
		}

		/* Переходим на следующую итерацию */
		next();
	});
};
