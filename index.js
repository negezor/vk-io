'use strict';

var
/* File Stream */
fs = require('fs'),
/* Utility */
util = require('util'),
/* Основа модуля */
io = function(){
	/* Текущий статус модуля */
	this.status = {
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

	/* Добавляет методы в основу */
	var method = (name,methods) => {
		/* Алиас метода */
		this[name] = {};

		/* Проходимся по списку методов */
		methods.forEach((item) => {
			var
			/* Путь метода */
			path = item.path.split('.'),
			/* Последний элемент */
			end = path.length-1,
			/* Алиас */
			self = this[name];

			/* Проходимся по пути метода */
			path.forEach((key,i) => {
				/* Если последний элемент */
				if (end === i) {
					return self[key] = item.handler.bind(this);
				}

				/* Установка ссылки на элемент */
				self = self[key] = self[key] || {};
			});

			/* Ставим алиас */
			self = this[name];
		});
	};

	/* Ставим свой обработчик сообщений */
	this.api.messages.send = (params) => {
		/* Для сборки массива */
		if (params.attachment && Array.isArray(params.attachment)) {
			params.attachment = params.attachment.join(',');
		}

		/* Возврашаем promise */
		return new this.promise((resolve,reject) => {
			this._api('messages.send',params)
			.then((id) => {
				/* Добавляем id в список игнорируемых */
				this.status.longpoll.skip.push(id);
				/* Увеличиваем кол-во сообщений */
				++this.status.message;

				/* Возвращаем id */
				resolve(id);
			})
			.catch(reject);
		});
	};

	/* Добавляем управления потоками */
	method('stream',this._streamHandlers);
	method('upload',this._uploadHandlers);
};

/* Наследуем EventEmitter */
util.inherits(io,require('events').EventEmitter);

/* Папки с прототипами модуля */
['preload','include','extesions']
/* Наследование прототипов */
.forEach(function(dir){
	var
	/* Путь до папки */
	dir = __dirname+'/'+dir+'/',
	/* Считывание файлов директории */
	files = fs.readdirSync(dir),
	/* Кеш длины массива */
	length = files.length,
	/* Regex проверки что файл js расширения */
	regex = /.*\.js/,
	/* Остальные переменные */
	file,i;

	/* Проходимся по списку файлов */
	for (i = 0; i < length; ++i) {
		/* Текущий элемент */
		file = files[i];

		/* Проверка что файл js */
		if (regex.test(file)) {
			/* Наследуем */
			util._extend(io.prototype,require(dir+file));
		}
	}
});

/* Экспорт модуля */
module.exports = io;