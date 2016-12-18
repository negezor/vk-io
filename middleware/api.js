'use strict';

/* Версия VK API */
exports.API_VERSION = '5.60';

/**
 * Добавляет метод в очередь запросов
 *
 * @param string method
 * @param object params
 *
 * @return Promise
 */
exports._api = function(method,params = {}){
	return new this.promise((resolve,reject) => {
		this._queue.push({
			method,
			params,
			resolve,
			reject
		});

		if (!this._tasks.launched) {
			this._apiWorked();
		}
	});
};

/**
 * Выполняет метод
 *
 * @param object task
 */
exports._executeMethod = function(task){
	this.request({
		uri: 'https://api.vk.com/method/'+task.method,
		timeout: this.settings.timeout * 1e3,
		proxy: this.settings.proxy,
		form: task.params,
		method: 'POST',
		json: true,
		qs: {
			access_token: this.settings.token,
			v: this.API_VERSION
		}
	})
	.then((result) => {
		if ('error' in result) {
			result = this._apiError(result.error,task);

			if ((result.error_code === 14 || result.error_code !== 6) && 'captcha' in task) {
				task.captcha.reject(result);
			}

			return;
		}

		if ('captcha' in task) {
			task.captcha.resolve();
		}

		task.resolve(('response' in result)?result.response:result);
	})
	.catch((error) => {
		if (!this._checkConnectReject(error)) {
			this.logger.debug('Restarting method request',task.method);

			return setTimeout(() => this._apiRestart(task),3e3);
		}

		error = new this.RequestError(error);

		if ('captcha' in task) {
			task.captcha.reject(error);
		}

		this.logger.error('Request method error',task.method);

		return task.reject(error);
	});
};

/**
 * Выполняет методы из очереди
 */
exports._apiWorked = function(){
	var timer = 1133/this.settings.limit;
	var tasks = this._tasks;

	tasks.launched = true;

	/**
	 * Проверяет очередь на выполнения задачи
	 */
	const worker = () => {
		if (this._queue.length === 0) {
			clearTimeout(tasks.id);

			return tasks.launched = false;
		}

		this._executeMethod(this._queue.shift());

		tasks.id = setTimeout(worker,timer);
	};

	worker();
};


/**
 * Перезапускает метод
 *
 * @param object task
 */
exports._apiRestart = function(task){
	this._queue.unshift(task);

	if (!this._tasks.launched) {
		this._apiWorked();
	}
};
