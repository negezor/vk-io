'use strict';

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
		this._levels = {
			log: true,
			info: true,
			warn: true,
			error: true,
			debug: true
		};

		/**
		 * Выводит данные в консоль
		 *
		 * @param {string} type
		 * @param {string} name
		 * @param {Array}  args
		 */
		this._output = (type,name,args) => {
			if (!this._levels[type]) {
				return;
			}

			args.unshift(formatColor(type,`${type} vk:${name}`));

			console.log.apply(console,args);
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
		Object.assign(this._levels,levels);

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
	 * Уровень log
	 *
	 * @param {string} name
	 */
	log (name, ...args) {
		this._output('log',name,args);
	}

	/**
	 * Уровень info
	 *
	 * @param {string} name
	 */
	info (name, ...args) {
		this._output('info',name,args);
	}

	/**
	 * Уровень error
	 *
	 * @param {string} name
	 */
	error (name, ...args) {
		this._output('error',name,args);
	}

	/**
	 * Уровень warn
	 *
	 * @param {string} name
	 */
	warn (name, ...args) {
		this._output('warn',name,args);
	}

	/**
	 * Уровень debug
	 *
	 * @param {string} name
	 */
	debug (name, ...args) {
		this._output('debug',name,args);
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
function formatColor (type,text) {
	if (type in colors) {
		return colors[type]+text+'\x1b[0m';
	}

	return text;
}

module.exports = Logger;
