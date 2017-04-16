'use strict';

const Promise = require('bluebird');
const { Readable } = require('stream');
const debug = require('debug')('vk-io:collect');

const { getMethodApi } = require('../util/helpers');

/**
 * Позволяет получать коллекцию
 *
 * @public
 */
class CollectStream extends Readable {
	/**
	 * Конструктор
	 *
	 * @param {VK}     vk
	 * @param {Object} options
	 */
	constructor (vk, { params, method, limit, max }) {
		super({
			objectMode: true
		});

		this.vk = vk;

		if ('count' in params) {
			let task = params.count;

			if (max !== undefined && task > max) {
				task = max;
			}

			this._task = task;
		} else {
			this._task = max || 0;
		}

		let maxCalls = 25;

		if ('maxCalls' in params) {
			maxCalls = +params.maxCalls;
			delete params.maxCalls;

			if (maxCalls < 2) {
				debug('The minimum number of calls can be 2');

				maxCalls = 2;
			} else if (maxCalls > 25) {
				debug('The maximum number of calls can be 25');

				maxCalls = 25;
			}
		}

		params.count = limit;

		this._received = 0;
		this._skip = this._offset = +params.offset || 0;

		this._code = getExecuteCode(method, params, {
			maxCalls
		});
	}

	/**
	 * Сокращение для Promise then
	 *
	 * @param {function} handler
	 *
	 * @return {Promise}
	 */
	then (handler) {
		return this._promise().then(handler);
	}

	/**
	 * Сокращение для Promise catch
	 *
	 * @param {function} handler
	 *
	 * @return {Promise}
	 */
	catch (handler) {
		return this._promise().catch(handler);
	}

	/**
	 * Возвращает promise
	 *
	 * @return {Promise}
	 */
	_promise () {
		return new Promise((resolve, reject) => {
			const collect = [];

			this
			.on('error', reject)
			.on('end', () => resolve(collect))
			.on('data', (items) => Array.prototype.push.apply(collect, items));
		});
	}

	/**
	 * Запрашивает данные
	 */
	_read () {
		const notFirst = this._task !== 0 && this._received !== 0;

		if (notFirst && (this._task - this._skip) <= this._received) {
			return this.push(null);
		}

		this.vk.api.execute({
			code: this._code,
			task: this._task,
			offset: this._offset,
			received: this._received
		})
		.then(({ response, errors }) => {
			if (errors.length !== 0) {
				throw errors[0];
			}

			const { length } = response.items;

			if (length === 0) {
				return this.push(null);
			}

			this._offset += length;
			this._received += length;
			this._task = response.task;

			const percent = Math.round(this._received / this._task * 100);

			debug(
				'collect',
				`Collect task ${this._received}/${this._task}`,
				`[${isNaN(percent) ? 100 : percent}%]`
			);

			this.push(response.items);
		})
		.catch((error) => this.emit('error', error));
	}
}

/**
 * Убирает кавычки у параметра offset
 *
 * @type {[type]}
 */
const unespaceOffset = /\"offset\":\"(\w+)\"/g;

/**
 * Возвращает код для выполнения
 *
 * @param {string} method
 * @param {Object} params
 *
 * @return {string}
 */
function getExecuteCode(method, params, { maxCalls }) {
	params.offset = 'offset';

	return `var task = parseInt(Args.task);

	// Уже полученно данных
	var received = parseInt(Args.received);

	// Смещение
	var offset = parseInt(Args.offset);

	// Продолжать ли получать данные
	var proceed = task == 0 || received < task;

	// Остальные переменные
	var i = 0, items = [], result, length;

	while (i < ${maxCalls} && proceed) {
		result = ${getMethodApi(method, params)};

		if (task == 0 || task > result.count) {
			task = result.count;
		}

		items = items + result.items;
		offset = offset + result.items.length;
		received  = received + result.items.length;

		proceed = received < task;
		i = i + 1;
	}

	return {
		task: task,
		items: items.splice(0, task)
	};`.replace(unespaceOffset, 'offset:$1');
}

module.exports = CollectStream;
