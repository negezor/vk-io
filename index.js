'use strict';

var base = new (require('base-io'));

base
.import(function(){
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
		limit: 3,
		/* Игнорировать ли свои действия? */
		ignoreMe: true
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

	this.api = {};
	this._apiMethodsList.forEach((method) => {
		var
		path = method.split('.'),
		group = path[0];

		this.api[group] = this.api[group] || {};

		this.api[group][path[1]] = (params) => {
			return this._api(method,params);
		};
	});

	this.api.messages.send = (params) => {
		return new this.promise((resolve,reject) => {
			params = params || {};

			if (params.attach) {
				params.attachment = params.attach;
				delete params.attach;
			}

			if (params.attachment && Array.isArray(params.attachment)) {
				params.attachment = params.attachment.join(',');
			}

			params.random_id = Date.now();

			this._api('messages.send',params)
			.then((id) => {
				this.status.longpoll.skip.push(id);
				++this.status.outbox;

				resolve(id);
			})
			.catch(reject);
		});
	};

	this.api.execute = (params) => {
		return this._api('execute',params);
	};

	/* Цепочки методов */
	this._properties('stream',this._streamHandlers);
	this._properties('upload',this._uploadHandlers);
})
.root(__dirname)
.emitter()
.change()
.scan([
	'preload',
	'include',
	'extesions'
]);

module.exports = base.export();
