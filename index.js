'use strict';

var base = new (require('base-io'));

base.import(class VkIo {
	/**
	 * Конструктор
	 */
	constructor () {
		/* Основные настройки */
		this.settings = {
			/* Идентификатор пользователя */
			id: null,
			/* Email/логин от аккаунта */
			login: null,
			/* Номер телефона */
			phone: null,
			/* Пароль от аккаунта */
			pass: null,
			/* Токен */
			token: null,
			/* Приложение */
			app: null,
			/* Секретный ключ приложения */
			key: null,
			/* Список разрешений */
			scope: null,
			/* Лимит запросов в секунду */
			limit: 3,
			/* Игнорировать ли самого себя */
			ignoreMe: true
		};

		/* Статистика модуля */
		this.status = {
			/* Кол-во исходящих сообщений */
			outbox: 0,
			/* Кол-во входящих */
			inbox: 0,
			/* Кол-во ошибок */
			error: 0,
			/* Кол-во выполненых методов */
			done: 0
		};

		/* Очередь методов */
		this.tasks = {
			/* Запущена ли выполнение очереди */
			launched: false,
			/* Методы в очереди */
			queue: [],
			/* Идентификатор таймера */
			id: null
		};

		this._longpoll = {
			/* Запущен ли longpoll */
			launched: false,
			/* Пропуск ID сообщений */
			skip: [],
			/* Сервер longpoll */
			server: null,
			/* Ключ авторизации */
			key: null,
			/* TimeStamp последних событий */
			ts: null
		};

		/* Обработчик капчи */
		this._captchaHandler = null;

		/* Установка методов VK API */
		this.api = {};
		this._apiMethods.forEach((method) => {
			var
			path = method.split('.'),
			group = path[0];

			this.api[group] = this.api[group] || {};

			this.api[group][path[1]] = (params) => {
				return this._api(method,params);
			};
		});

		/**
		 * Отправка сообщения
		 *
		 * @param object params Параметры
		 *
		 * @return promise
		 */
		this.api.messages.send = (params) => {
			params = params || {};

			params.random_id = Date.now();

			if ('attach' in params) {
				params.attachment = params.attach;
				delete params.attach;
			}

			if ('attachment' in params && Array.isArray(params.attachment)) {
				params.attachment = params.attachment.join(',');
			}

			return this._api('messages.send',params)
			.then((id) => {
				this._longpoll.skip.push(id);

				++this.status.outbox;

				return id;
			});
		};

		/**
		 * Метод execute
		 *
		 * @param object params
		 *
		 * @return promise
		 */
		this.api.execute = (params) => {
			return this._api('execute',params);
		};

		/* Цепочки методов */
		this._properties('stream',this._streamHandlers);
		this._properties('upload',this._uploadHandlers);
	}

	/**
	 * Устанавливает настройки модуля
	 *
	 * @param object setting
	 *
	 * @return self
	 */
	setting (setting) {
		this.settings = Object.assign(this.settings,setting);

		return this;
	}

	/**
	 * Устанавливает токен
	 *
	 * @param string token
	 *
	 * @return this
	 */
	setToken (token) {
		this.settings.token = token;

		return this;
	}

	/**
	 * Устанавливает обработчик капчи
	 *
	 * @param function handler Обработчик
	 *
	 * @return this
	 */
	setCaptchaHandler (handler) {
	 	this._captchaHandler = handler;

		return this;
	 };

	/**
	 * Метод execute сохраненный приложением
	 *
	 * @param string method Название метода
	 * @param object params Список параметров
	 *
	 * @return this
	 */
	execute (name,params) {
		return this._api('execute.'+name,params);
	}

	/**
	 * Проверяет является ли ошибка ApiError
	 *
	 * @param mixed error
	 *
	 * @return boolean
	 */
	isApiError (error) {
		return error instanceof this.ApiError;
	}

	/**
	 * Проверяет является ли ошибка RequestError
	 *
	 * @param mixed error
	 *
	 * @return boolean
	 */
	isRequestError (error) {
		return error instanceof this.RequestError;
	}

	/**
	 * Проверяет является ли ошибка AuthError
	 *
	 * @param mixed error
	 *
	 * @return boolean
	 */
	isAuthError (error) {
		return error instanceof this.AuthError;
	}

	/**
	 * Проверяет является ли ошибка API
	 *
	 * @param mixed error
	 *
	 * @return boolean
	 */
	isError (error) {
		return this.isApiError(error) || this.isRequestError(error) || this.isAuthError(error);
	}

	/**
	 * Проверяет является ли метод
	 *
	 * @param string method
	 *
	 * @return boolean
	 */
	isMethod (method) {
		return this._apiMethods.indexOf(method) > -1;
	}

	/**
	 * Возвращает кол-во заданий в очереди
	 *
	 * @return integer
	 */
	getQueue () {
		return this.tasks.queue.length;
	}

	/**
	 * Возвращает токен
	 *
	 * @return mixed
	 */
	getToken () {
		return this.settings.token;
	}
});

base
.root(__dirname)
.emitter()
.change()
.scan([
	'primary',
	'middleware'
]);

module.exports = base.export();
