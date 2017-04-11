'use strict';

const { METHODS_LIMIT } = require('../util/constants');

const CollectStream = require('./stream');

/**
 * Работа с потоками для получения из ВКонтакте
 *
 * @public
 */
class Collect {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		this.vk = vk;

		for (const [method, limit, max] of METHODS_LIMIT) {
			const [group, name] = method.split('.');

			if (!(group in this)) {
				this[group] = {};
			}

			this[group][name] = (params = {}) => (
				new CollectStream(this.vk, {
					method,
					params,
					limit,
					max
				})
			);
		}
	}
}

module.exports = Collect;
