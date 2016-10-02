'use strict';

/* Версия VK API */
exports.API_VERSION = '5.57';

/**
 * Добавляет метод в очередь выполнения VK API
 *
 * @param string method  Название метода
 * @param object params  Параметры
 * @param object captcha Капча
 *
 * @return promise
 */
exports._api = function(method,params,captcha){
	return new this.promise((resolve,reject) => {
		var queue = [
			method,
			params,
			resolve,
			reject
		];

		if (captcha) {
			queue.push(captcha);
		}

		this.tasks.queue.push(queue);

		if (!this.tasks.launched) {
			this._apiWorked();
		}

		return null;
	});
};


/**
 * Выполняет метод VK API
 *
 * @param string   method  Метод API
 * @param object   params  Параметры
 * @param function resolve
 * @param function reject
 * @param object   captcha Обработчики капчи
 */
exports._executeMethod = function(method,params = {},resolve,reject,captcha){
	arguments[1] = params;

	params.access_token = this.settings.token;
	params.v = this.API_VERSION;

	this.request({
		uri: 'https://api.vk.com/method/'+method,
		method: 'POST',
		json: true,
		timeout: this.settings.timeout * 1000,
		qs: params
	})
	.then((data) => {
		if ('error' in data) {
			++this.status.error;

			var error = this._apiError(data.error,arguments);

			if (error.code !== 14 || error.code === 14 && !captcha) {
				return;
			}

			return captcha.reject();
		}

		if (captcha) {
			captcha.resolve();
		}

		++this.status.done;

		resolve(('response' in data)?data.response:data);
	})
	.catch((error) => {
		++this.status.error;

		if (this._checkConnectReject(error)) {
			error = new this.RequestError(error);

			if (captcha) {
				captcha.reject(error);
			}

			if (method === 'messages.send') {
				--this.status.messages;
			}

			this.logger.log('Request error',method);

			return reject(error);
		}

		this.logger.debug('Restart request',method);

		setTimeout(() => {
			this._apiRestart(arguments);
		},3000);
	});
};

/**
 * Выполняет методы из очереди
 */
exports._apiWorked = function(){
	var tasks = this.tasks;

	tasks.launched = true;

	var timer = 1133/this.settings.limit;

	/**
	 * Проверяет очередь на выполнения задачи
	 */
	var worker = () => {
		if (tasks.queue.length !== 0) {
			this._executeMethod.apply(this,tasks.queue.shift());

			tasks.id = setTimeout(worker,timer);
		} else {
			clearTimeout(tasks.id);

			tasks.launched = false;
		}
	};

	worker();
};

/**
 * Перезапускает метод
 *
 * @param object request Объект запроса
 */
exports._apiRestart = function(request){
	this._api(request[0],request[1],request[4] || null)
	.then(request[2])
	.catch(request[3]);
};
