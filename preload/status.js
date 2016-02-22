'use strict';

/* Текущий статус модуля */
exports.status = {
	/* Кол-во ошибок за инициализацию */
	error: 0,
	/* Кол-во выполненых методов vk */
	execute: 0,
	/* Кол-во отправленных сообщений */
	send: 0,
	/* Кол-во полученных сообщений longpoll */
	accepted: 0,
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