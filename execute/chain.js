'use strict';

const Promise = require('bluebird');

const { getMethodApi, getChainCode, resolvePromisesTask } = require('../util/helpers');

/**
 * Создаёт цепочку методов которые выполняются через execute
 *
 * @public
 */
class Chain {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;

		this._queue = [];
		this._isRun = false;
	}

	/**
	 * Упрощённое объеденение execute
	 *
	 * @param {VK}     vk
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	static executes (vk, method, queues) {
		const promises = [];

		while (queues.length !== 0) {
			const code = getChainCode(
				queues.splice(0, 25).map((params) => getMethodApi(method, params))
			);

			promises.push(
				vk.api.execute({
					code: code
				})
				.then(({ response }) => response)
			);
		}

		return Promise.all(promises)
		.then((responses) => Array.prototype.concat.apply([], responses));
	}

	/**
	 * Добавляет метод в цепочку
	 *
	 * @param {string} method
	 * @param {Object} params
	 *
	 * @return {Promise}
	 */
	append (method, params = {}) {
		if (this._isRun) {
			throw new Error('Chain завершил работу!');
		}

		return new Promise((resolve, reject) => {
			this._queue.push({
				method: getMethodApi(method, params),
				resolve,
				reject
			});
		});
	}

	/**
	 * Выполняет цепочку методов
	 *
	 * @return {Promise}
	 */
	execute () {
		this._isRun = true;

		if (this._queue.length === 0) {
			return Promise.resolve([]);
		}

		const promises = [];
		const queues = this._queue;

		while (queues.length !== 0) {
			const tasks = queues.splice(0, 25);

			promises.push(
				this.vk.api.execute({
					code: getCode(tasks)
				})
				.then((result) => {
					resolvePromisesTask(tasks, result);

					return result.response;
				})
				.catch((error) => {
					for (const task of tasks) {
						task.reject(error);
					}

					throw error;
				})
			);
		}

		return Promise.all(promises)
		.then((responses) => Array.prototype.concat.apply([], responses));
	}

	/**
	 * Сокращение для execute -> then
	 *
	 * @param  {function} handler
	 *
	 * @return {Promise}
	 */
	then (handler) {
		return this.execute().then(handler);
	}

	/**
	 * Сокращение для execute -> catch
	 *
	 * @param {function} handler
	 *
	 * @return {Promise}
	 */
	catch (handler) {
		return this.execute().catch(handler);
	}
}

/**
 * Возвращает код из массива
 *
 * @param {Array} queues
 *
 * @return {string}
 */
function getCode(queues) {
	return getChainCode(queues.map((queue) => queue.method));
}

module.exports = Chain;
