'use strict';

const async = require('async');

const Promise = require('bluebird');

/**
 * Создаёт чепочку методов которые выполняются через execute
 */
class Chain {
	/**
	 * Конструктор
	 *
	 * @param VK vk
	 */
	constructor (vk) {
		this.vk = vk;

		this.executes = [];
		this._isRun = false;
	}

	/**
	 * Добавляет метод в задачу
	 *
	 * @return Promise
	 */
	append (method,params = {}) {
		if (this._isRun) {
			throw new Error('Chain завершил работу!');
		}

		return new Promise((resolve) => {
			this.executes.push({
				code: this.vk._getExecuteMethod(method,params),
				resolve
			});
		});
	}

	/**
	 * Выполняет цепочку методов
	 *
	 * @return Promise
	 */
	execute () {
		this._isRun = true;

		if (this.executes.length === 0) {
			return this.vk.promise.resolve([]);
		}

		return new Promise((resolve,reject) => {
			var queue = this.executes;

			var promises = [];

			async.whilst(
				() => {
					return queue.length !== 0;
				},
				(next) => {
					var task = queue.splice(0,25);

					promises.push(
						this._getCode(task)
						.then((code) => {
							return this.vk.api.execute({
								code
							});
						})
						.then((results) => {
							return this._resolveExecutes(task,results);
						})
					);

					next();
				},
				(error) => {
					this.vk.promise.all(promises)
					.then((results) => [].concat(...results))
					.then(resolve)
					.catch(reject);
				}
			);
		});
	}

	/**
	 * Снипеты для promise
	 *
	 * @param function fn
	 *
	 * @return Promise
	 */
	then (fn) {
		return this.execute().then(fn);
	}

	/**
	 * Снипеты для promise
	 *
	 * @param function fn
	 *
	 * @return Promise
	 */
	catch (fn) {
		return this.execute().catch(fn);
	}

	/**
	 * Возвращает код для execute
	 *
	 * @param array queue
	 *
	 * @return Promise
	 */
	_getCode (queues) {
		return new Promise((resolve) => {
			var out = [];

			async.each(
				queues,
				(queue,next) => {
					out.push(queue.code);

					next();
				},
				() => {
					resolve('return ['+out.join(',')+'];');
				}
			);
		});
	}

	/**
	 * Объеденяет массив таска и resolve
	 *
	 * @param array task
	 * @param array results
	 *
	 * @return Promise
	 */
	_resolveExecutes (task,results) {
		return new Promise((resolve) => {
			async.eachOf(
				results,
				(result,key,next) => {
					task[key].resolve(result);

					next();
				},
				() => {
					resolve(results);
				}
			);
		});
	}
}

/**
 * Создаёт цепочку
 *
 * @return Chain
 */
exports.chain = function(){
	return new Chain(this);
};

/**
 * Вызывает методы API через execute
 * Упрощённый аналог chain для одного метода
 *
 * @param string name
 * @param array  queues
 *
 * @return Promise
 */
exports.executes = function(name,queues = []){
	return new Promise((resolve,reject) => {
		const chain = this.chain();

		async.each(
			queues,
			(queue,next) => {
				chain.append(name,queue);

				next();
			},
			() => {
				chain.execute()
				.then(resolve)
				.catch(reject);
			}
		);
	});
};
