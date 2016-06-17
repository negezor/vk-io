'use strict';

/**
 * Добавляет метод в очередь ожидания
 * @param   {string}  method  название метода
 * @param   {object}  params  параметры вызова
 * @param   {boolean} unshift добавить в начало очереди
 * @returns {object}  promise
 */
exports._api = function(method,params,unshift){
	return new this.promise((resolve,reject) => {
		var tasks = this.status.tasks;

		tasks.queue[unshift?'unshift':'push']([
			method,
			params,
			resolve,
			reject
		]);

		if (!tasks.launched) {
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
	params = params || {};

	var set = this.settings;

	params.access_token = set.token;
	params.v = set.version;

	this.request({
		uri: 'https://api.vk.com/method/'+method,
		method: 'POST',
		json: true,
		timeout: 6000,
		qs: params
	})
	.then((body) => {
		if (body.error) {
			++this.status.error;

			return this.error(body.error,arguments);
		}

		++this.status.execute;

		resolve(body.response || body);
	})
	.catch((error) => {
		++this.status.error;

		if (error.code === 'ETIMEDOUT' || error.statusCode > 500) {
			console.log('Server doesn\'t respond');
		}

		this._apiRestart.apply(this,arguments);
	});
};
