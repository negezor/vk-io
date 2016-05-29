'use strict';

/**
 * Устанавливает соединение longpoll
 * @param {number} mode режим соединения
 * @returns {object} promise
 */
exports.longpoll = function(mode){
	/* Promise */
	return new this.promise((resolve) => {
		/* Получаем сервер для longpoll */
		this.api.messages.getLongPollServer({
			/* Использовать SSL */
			use_ssl: 1,
			/* Возвращать поле pts, необходимое для работы метода messages.getLongPollHistory */
			need_pts: 0
		})
		.then((data) => {
			/* Алиас статуса longpoll */
			var longpoll = this.status.longpoll;

			/* Устанавливаем сервер */
			longpoll.server = 'https://'+data.server;
			/* Ставим ключ сервера */
			longpoll.key = data.key;

			/* Если ts на записан */
			if (!longpoll.ts) {
				/* Ставим TimeStamp */
				longpoll.ts = data.ts;
			}

			/* Режим работы longpoll */
			longpoll.mode = mode || longpoll.mode || 2;
			/* Устанавливаем статус соединения */
			longpoll.launched = true;

			/* Начинаем запрашивать данные */
			this._longpollFetch();

			/* Устанавливаем что longpoll запущен */
			resolve();
		})
		.catch((data) => {
			/* Увеличиваем кол-во ошбок */
			++this.status.error;

			/* Пробуем переподключится */
			this._longpollRestart();
		});
	});
};

/**
 * Перезагружает соединение longpoll
 */
exports._longpollRestart = function(){
	/* Закрываем соединение */
	this.status.longpoll.launched = false;

	/* При следущем тике */
	setImmediate(() => {
		/* Открываем соединение */
		this.longpoll();
	});
};

/**
 * Получает данные и отправляет на чистку
 */
exports._longpollFetch = function(){
	/* Алиас статуса longpoll */
	var longpoll = this.status.longpoll;

	/* Если не запущен */
	if (!longpoll.launched) {
		return;
	}

	/* Отправляем запрос за получением данных */
	this.request({
		/* Сервер longpoll */
		uri: longpoll.server,
		/* Декодировать json */
		json: true,
		/* Максимальное время ожидания */
		timeout: 20000,
		/* Параметры */
		qs: {
			/* Тип действия */
			act: 'a_check',
			/* Ключ сессиии */
			key: longpoll.key,
			/* TimeStamp последнего события */
			ts: longpoll.ts,
			/* Режим работы longpoll */
			mode: longpoll.mode,
			/* Время ожидание запроса в секундах */
			wait: 15
		}
	})
	.then((data) => {
		/* Проверяем данные */
		if (data.failed) {
			if (data.failed === 1) {
				/* Ставим новый ts */
				longpoll.ts = data.ts;
			} else {
				/* Убераем значение */
				longpoll.ts = null;

				/* Перезапускаем соединение */
				return this._longpollRestart();
			}
		} else if (data.updates.length !== 0) {
			/* Обновляем TimeStamp */
			longpoll.ts = data.ts;

			/* Отправляем данные на чистку */
			this._longpollSanitize(data.updates);
		}

		/* Если longpol запущен */
		if (longpoll.launched) {
			/* Запрашиваем новые данные */
			this._longpollFetch();
		}
	})
	.catch((error) => {
		/* Увеличиваем кол-во ошбок на один */
		++this.status.error;

		/* Проверяем статус если это проблемы соединения */
		var status = if (error.code === 'ETIMEDOUT' || error.statusCode > 500) {;

		/* Выбираем действия при ошибке */
		if (status) {
			/* Перезапускаем longpoll */
			this._longpollRestart();
		} else {
			/* Пробуем получить данные снова */
			this._longpollFetch();
		}
	});
};
