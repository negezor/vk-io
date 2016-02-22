'use strict';

/**
 * Добавляет метод в очередь ожидания
 * @param   {string}  method  название метода
 * @param   {object}  params  параметры вызова
 * @param   {boolean} unshift добавить в начало очереди
 * @returns {object}  promise
 */
exports._api = function(method,params,unshift){
	/* Возвращаем promise */
	return new this.promise((resolve,reject) => {
		/* Получаем алиас заданий */
		var tasks = this.status.tasks;

		/* Добавляем в очередь */
		tasks.queue[unshift?'unshift':'push']([
			/* Названия метода */
			method,
			/* Параметры вызова */
			params,
			/* Then */
			resolve,
			/* Catch */
			reject
		]);

		/* Если работник выключен */
		if (!tasks.launched) {
			/* Запускаем работника */
			this._apiWorker();
		}
	});
};

/**
 * Перезапускает метод добавляя в очередь
 * @param {string}   method  название метода
 * @param {object}   params  параметры вызова
 * @param {function} resolve возвращает данные
 * @param {function} reject  возвращает ошибку
 */
exports._apiRestart = function(method,params,resolve,reject){
	/* Ставим вновь в очередь */
	this._api(method,params,true)
	.then(resolve)
	.catch(reject);
};

/**
 * Выполняет метод vk api
 * @param {string}   method  название метода
 * @param {object}   params  параметры вызова
 * @param {function} resolve возвращает данные
 * @param {function} reject  возвращает ошибку
 */
exports._apiExecute = function(method,params,resolve,reject){
	/* Ставим параметры */
	params = params || {};

	/* Алиас настроек */
	var set = this.settings;

	/* Устанавливаем токен */
	params.access_token = set.token;
	/* Устанавливаем версию vk api */
	params.v = set.version;

	/* Производим запросс */
	this.request({
		/* URL вызова */
		uri: 'https://api.vk.com/method/'+method,
		/* Метод отправки */
		method: 'POST',
		/* Парсирить json */
		json: true,
		/* Время ожидания */
		timeout: 6000,
		/* Параметры запроса */
		qs: params
	})
	.then((body) => {
		/* Проверяем ответ на наличие ошибки */
		if (body.error) {
			/* Увеличиваем счётчик ошибок */
			++this.status.error;

			/* Отправляем ошибку на обработку */
			return this.error(body.error,arguments);
		}

		/* Увеличиваем счётчик выполненых методов */
		++this.status.execute;

		/* Возвращаем данные */
		resolve(body.response || body);
	})
	.catch((error) => {
		/* Увеличиваем счётчик ошибок */
		++this.status.error;

		/* Если сервер не ответил */
		if (error.name === 'RequestError' || error.name === 'StatusCodeError') {
			console.log('Server doesn\'t respond');
		} else {
			return console.error('Неизвестная ошибка api execute >',error);
		}

		/* Перезапускаем запросс метода */
		this._apiRestart.apply(this,arguments);
	});
};