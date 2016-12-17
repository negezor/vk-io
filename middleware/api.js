'use strict';

/* Версия VK API */
exports.API_VERSION = '5.60';

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
	this.request({
		uri: 'https://api.vk.com/method/'+method,
		method: 'POST',
		json: true,
		timeout: this.settings.timeout * 1e3,
		proxy: this.settings.proxy,
		form: params,
		qs: {
			access_token: this.settings.token,
			v: this.API_VERSION
		}
	})
	.then((data) => {
		if ('error' in data) {
			++this.status.error;

			var error = this._apiError(data.error,Array.from(arguments));

			if ((error.code === 14 || error.code !== 6) && captcha) {
				captcha.reject(error);
			}

			return;
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

			this.logger.log('Request error',method);

			return reject(error);
		}

		this.logger.debug('Restart request',method);

		setTimeout(() => {
			this._apiRestart(Array.from(arguments));
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
	const worker = () => {
		if (tasks.queue.length !== 0) {
			this._executeMethod.apply(this,tasks.queue.shift());

			return tasks.id = setTimeout(worker,timer);
		}

		clearTimeout(tasks.id);

		tasks.launched = false;
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
