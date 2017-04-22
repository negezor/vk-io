'use strict';

const Promise = require('bluebird');
const debug = require('debug')('vk-io:api');

const ApiError = require('../errors/api');
const RequestError = require('../errors/request');
const ExecuteError = require('../errors/execute');

const methods = require('./methods');
const { API_VERSION, API_URI } = require('../util/constants');
const {
	getRandomId,
	getMethodApi,
	getChainCode,
	resolvePromisesTask
} = require('../util/helpers');

/**
 * Вызов методов API и ограничитель запросов
 *
 * @public
 */
class Api {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;

		this._launched = false;
		this._timeout = null;
		this._queue = [];

		for (const method of methods) {
			const [group, name] = method.split('.');

			if (!(group in this)) {
				this[group] = {};
			}

			this[group][name] = (params) => (
				this._enqueue(method, params)
			);
		}

		/**
		 * Метод VK API messages.send
		 * Добавление свойства random_id для уникальности сообщений
		 *
		 * @param {Object} params
		 *
		 * @return {Promise}
		 */
		this.messages.send = (params = {}) => {
			if (!('random_id' in params)) {
				params.random_id = getRandomId();
			}

			return this._enqueue('messages.send', params);
		};

		/**
		 * Метод API execute
		 *
		 * @param {Object} params
		 *
		 * @return {Promise}
		 */
		this.execute = (params) => (
			this._enqueue('execute', params)
		);
	}

	/**
	 * Позволяет вызвать RAW метод
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	call (method, params) {
		return this._enqueue(method, params);
	}

	/**
	 * Проверяет является ли методом
	 *
	 * @param {string} method
	 *
	 * @return {boolean}
	 */
	isMethod (method) {
		return methods.includes(method);
	}

	/**
	 * Добавляет метод в очередь
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	_enqueue (method, params = {}) {
		return new Promise((resolve, reject) => {
			this._queue.push({
				method,
				params,
				resolve,
				reject
			});

			this._worker();
		});
	}

	/**
	 * Добавляет в начало очереди задачу
	 *
	 * @param {Object} task
	 */
	_requeue (task) {
		this._queue.unshift(task);

		this._worker();
	}

	/**
	 * Запускает очередь
	 */
	_worker () {
		if (this._launched) {
			return;
		}

		this._launched = true;

		const interval = Math.round(1133 / this.vk.options.limit);

		const worker = () => {
			if (this._queue.length === 0) {
				clearTimeout(this._timeout);

				this._launched = false;

				return;
			}

			if (this.vk.options.call !== 'execute' || this._queue[0].method === 'execute') {
				this._call(this._queue.shift());
			} else {
				const tasks = [];
				const code = [];

				const maxCalls = this.vk.options.callCount;

				for (let i = 0; i < this._queue.length; ++i) {
					if (this._queue[i].method === 'execute') {
						continue;
					}

					const [task] = this._queue.splice(i, 1);

					tasks.push(task);
					code.push(getMethodApi(task.method, task.params));

					if (tasks.length >= maxCalls) {
						break;
					}

					--i;
				}

				(new Promise((resolve, reject) => {
					this._call({
						method: 'execute',
						params: {
							code: getChainCode(code)
						},
						resolve,
						reject
					});
				}))
				.then((response) => {
					resolvePromisesTask(tasks, response);

					return null;
				})
				.catch((error) => {
					for (const task of tasks) {
						task.reject(error);
					}
				});
			}

			this._timeout = setTimeout(worker, interval);
		};

		worker();
	}

	/**
	 * Вызывает метод VK API
	 *
	 * @param {Object} task
	 */
	_call (task) {
		const { token, timeout, lang } = this.vk.options;

		const startTime = Date.now();

		this.vk.request({
			uri: API_URI + task.method,
			timeout: timeout,
			form: task.params,
			qs: {
				access_token: token,
				lang: lang || '',
				v: API_VERSION
			}
		})
		.then((response) => {
			if ('error' in response) {
				return this._error(task, response.error);
			}

			const time = (Date.now() - startTime).toLocaleString();

			debug(`Request ${task.method} took ${time}ms of time`);

			if ('captcha' in task) {
				task.captcha.resolve();
			}

			/* Для execute нужно вернуть полный запрос */
			if (task.method === 'execute') {
				if ('execute_errors' in response) {
					response.errors = response.execute_errors.map((error) => (
						new ExecuteError(error)
					));

					delete response.execute_errors;
				} else {
					response.errors = [];
				}

				return task.resolve(response);
			}

			task.resolve(('response' in response) ? response.response : response);
		})
		.catch((error) => {
			const { restartError, restartCount, restartWait } = this.vk.options;

			if (restartError && checkAttemptsTask(task, restartCount)) {
				++task.attempts;

				return setTimeout(() => {
					debug(`Request ${task.method} restarted ${task.attempts} times`);

					this._requeue(task);
				}, restartWait);
			}

			error = new RequestError(error);

			if ('captcha' in task) {
				task.captcha.reject(error);
			}

			task.reject(error);
		});
	}

	/**
	 * Обработка ВК API ошибок
	 *
	 * @param {Object} task
	 * @param {Object} error
	 */
	_error (task, error) {
		error = new ApiError(error);

		const { code } = error;

		if (code === 6) {
			return this._requeue(task);
		}

		if ('captcha' in task) {
			task.captcha.reject(error);
		}

		if (code === 14 && this.vk._captchaHandler === null || code !== 14) {
			return task.reject(error);
		}

		this.vk._captchaHandler(error.captchaImg, error.captchaSid, (key) => (
			new Promise((resolve, reject) => {
				task.params.captcha_sid = error.captchaSid;
				task.params.captcha_key = key;

				task.captcha = {
					resolve,
					reject
				};

				this._requeue(task);
			})
		));
	}
}

module.exports = Api;

/**
 * Проверяет можно ли перезапустить задачу
 *
 * @param {Object} task
 * @param {number} attempts
 *
 * @return {boolean}
 */
function checkAttemptsTask(task, attempts) {
	if (!('attempts' in task)) {
		task.attempts = 0;
	}

	return task.attempts < attempts;
}
