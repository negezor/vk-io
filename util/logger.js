'use strict';

const { LOGGER_LEVELS_DEFAULT } = require('./constants');

/**
 * Логгер класса ВК
 *
 * @public
 */
class Logger {
	/**
	 * Конструктор
	 *
	 * @param {Object} options
	 */
	constructor (options = {}) {
		this._levels = Object.assign({}, LOGGER_LEVELS_DEFAULT);

		this._modules = {};

		/**
		 * Выводит данные в консоль
		 *
		 * @param {string} type
		 * @param {string} name
		 * @param {Array}  args
		 */
		this._output = (type, name, args) => {
			if (!this.isLoggable(type, name)) {
				return;
			}

			args.unshift(formatColor(type, `${type} vk:${name}`));

			console.log.apply(console, args);
		};
	}

	/**
	 * Устанавливает уровень вывода
	 *
	 * @param {Object} levels
	 *
	 * @return {this}
	 */
	setLevels (levels) {
		Object.assign(this._levels, levels);

		return this;
	}

	/**
	 * Устанавливает уровни выводы модулю
	 *
	 * @param {string} name
	 * @param {Object} levels
	 *
	 * @return {this}
	 */
	setLevelsModule (name, levels) {
		if (!(name in this._modules)) {
			this._modules[name] = Object.assign({}, LOGGER_LEVELS_DEFAULT);
		}

		Object.assign(this._modules[name], levels);

		return this;
	}

	/**
	 * Устанавливает кастомный вывод
	 *
	 * @param {function} output
	 *
	 * @return {this}
	 */
	setCustomOutput (output) {
		this._output = output;

		return this;
	}

	/**
	 * Проверяет, выводится ли уровень лога
	 *
	 * @param {string} level
	 * @param {string} name
	 *
	 * @return {boolean}
	 */
	isLoggable (level, name = null) {
		if (name === null || !(name in this._modules)) {
			return this._levels[level];
		}

		return this._modules[name][level];
	}

	/**
	 * Уровень log
	 *
	 * @param {string} name
	 */
	log (name, ...args) {
		this._output('log', name, args);
	}

	/**
	 * Уровень info
	 *
	 * @param {string} name
	 */
	info (name, ...args) {
		this._output('info', name, args);
	}

	/**
	 * Уровень error
	 *
	 * @param {string} name
	 */
	error (name, ...args) {
		this._output('error', name, args);
	}

	/**
	 * Уровень warn
	 *
	 * @param {string} name
	 */
	warn (name, ...args) {
		this._output('warn', name, args);
	}

	/**
	 * Уровень debug
	 *
	 * @param {string} name
	 */
	debug (name, ...args) {
		this._output('debug', name, args);
	}
}

const colors = {
	error: '\x1b[31m',
	info: '\x1b[36m',
	warn: '\x1b[33m'
};

/**
 * Возвращает форматированный цветовой текст
 *
 * @param  {string} type
 * @param  {string} text
 *
 * @return {string}
 */
function formatColor(type, text) {
	if (type in colors) {
		return colors[type] + text + '\x1b[0m';
	}

	return text;
}

module.exports = Logger;
