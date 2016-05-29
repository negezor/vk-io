'use strict';

var base = new (require('base-io'));

base
.import(function(){
	/* Основные настройки */
	this.settings = {
		/* Идентификатор пользователя */
		id: null,
		/* Email/логин/телефон от аккаунта */
		email: null,
		/* Пароль от аккаунта */
		pass: null,
		/* Токен */
		token: null,
		/* Приложения для авторизации */
		app: null,
		/* Секретный ключ приложения */
		key: null,
		/* Версия vk api */
		version: '5.52',
		/* Лимит запросов в секунду */
		limit: 3
	};

	/* Текущий статус модуля */
	this.status = {
		/* Кол-во ошибок за инициализацию */
		errors: 0,
		/* Кол-во выполненых методов vk */
		execute: 0,
		/* Кол-во отправленных сообщений */
		outbox: 0,
		/* Кол-во полученных сообщений longpoll */
		inbox: 0,
		/* Задания */
		tasks: {
			/* Включен ли работник */
			launched: false,
			/* Список задач */
			queue: [],
			/* Идентификатор таймера */
			id: null
		},
		/* Статус longpoll */
		longpoll: {
			/* Статус longpoll */
			launched: false,
			/* Пропуск ID сообщений */
			skip: [],
			/* Сервер longpoll */
			server: null,
			/* Ключ авторизации */
			key: null,
			/* TimeStamp последних событий */
			ts: null,
			/* Режим работы long poll */
			mode: null
		}
	};

	/* Список методов api */
	this.api = {};
	/* Установка базовых методов vk api */
	this._apiMethodsList.forEach((method) => {
		var
		/* Путь метода */
		path = method.split('.'),
		/* Группа метода */
		group = path[0];

		/* Ставим группу */
		this.api[group] = this.api[group] || {};

		/* Ставим обработчик */
		this.api[group][path[1]] = (params) => {
			/* Возврашаем promise */
			return this._api(method,params);
		};
	});

	/* Ставим свой обработчик сообщений */
	this.api.messages.send = (params) => {
		/* Для сборки массива */
		if (params.attachment && Array.isArray(params.attachment)) {
			params.attachment = params.attachment.join(',');
		}

		/* Возврашаем promise */
		return new this.promise((resolve,reject) => {
			params = params || {};

			params.random_id = Date.now();

			this._api('messages.send',params)
			.then((id) => {
				/* Добавляем id в список игнорируемых */
				this.status.longpoll.skip.push(id);
				/* Увеличиваем кол-во сообщений */
				++this.status.outbox;

				/* Возвращаем id */
				resolve(id);
			})
			.catch(reject);
		});
	};

	/* Добавляем управления потоками */
	this._properties('stream',this._streamHandlers);
	this._properties('upload',this._uploadHandlers);
})
.emitter()
.change()
.scan([
	'preload',
	'include',
	'extesions'
]);

module.exports = base.export();
