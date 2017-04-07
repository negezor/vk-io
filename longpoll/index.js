'use strict';

const Promise = require('bluebird');
const Events = require('events');

const RequestError = require('../errors/request');

const events = require('./events');
const {isRestartRequest} = require('../util/helpers');

/**
 * Работа с Longpoll
 *
 * @public
 */
class Longpoll extends Events {
	/**
	 * Конструктор
	 *
	 * @param {VK} vk
	 */
	constructor (vk) {
		super();

		this.vk = vk;

		this._launched = false;
		this._restarts = 0;
		this._server = null;
		this._key = null;
		this._ts = null;
		this._pts = 0;

		/**
		 * 2 - Прикрипления
		 * 64 - Идентификатор платформы user.online
		 *
		 * @type {number}
		 */
		this._mode = 2 + 64;

		this.on('error',(error) => {
			this.vk.logger.error('longpoll',error);
		});
	}

	/**
	 * Запущен ли longpoll
	 *
	 * @return {boolean}
	 */
	isStarted () {
		return this._launched;
	}

	/**
	 * Запускает longpoll
	 *
	 * @return {Promise}
	 */
	start () {
		if (this._launched) {
			return Promise.resolve();
		}

		this._launched = true;

		return this.vk.api.messages.getLongPollServer()
		.then(({server,key,ts}) => {
			this._server = `https://${server}`;
			this._key = key;

			if (this._ts === null) {
				this._ts = ts;
			}

			this._loop();
		})
		.catch((error) => {
			this._launched = false;

			throw error;
		});
	}

	/**
	 * Останавливает работу longpoll
	 *
	 * @return {Promise}
	 */
	stop () {
		this._ts = null;
		this._restarts = 0;
		this._launched = false;

		return Promise.resolve();
	}

	/**
	 * Перезапускает longpoll
	 *
	 * @return {Promise}
	 */
	restart () {
		this._restarts = 0;
		this._launched = false;

		return this.start();
	}

	/**
	 * Генерировать ли событие pts
	 *
	 * @param {boolean} need
	 *
	 * @return {this}
	 */
	usePts (need = true) {
		if (need && (this._mode & 32) === 0) {
			this._mode += 32;
		} else if (!need && (this._mode & 32) === 32) {
			this._mode -= 32;
		}

		return this;
	}

	/**
	 * Цикличное получение обновлений
	 */
	_loop () {
		this.vk.request({
			uri: this._server,
			timeout: 25e3,
			qs: {
				mode: this._mode,
				key: this._key,
				act: 'a_check',
				ts: this._ts,
				version: 1,
				wait: 20
			}
		})
		.then((response) => {
			this._restarts = 0;

			if ('failed' in response && response.failed !== 1) {
				response._ts = null;

				return void this.restart();
			}

			this._ts = response.ts;

			if ('pts' in response && response.pts !== this._pts) {
				this.emit('pts',{
					ts: this._ts,
					pts: this._pts = +response.pts
				});
			}

			if ('updates' in response) {
				for (const update of response.updates) {
					this._restructure(update);
				}
			}

			if (this._launched) {
				return void this._loop();
			}
		})
		.catch((error) => {
			this.emit('error',new RequestError(error));

			if (!this._launched) {
				return;
			}

			const {restartWait,restartCount} = this.vk.options;

			if (this._restarts < restartCount) {
				++this._restarts;

				return setTimeout(() => {
					this._loop();
				},restartWait);
			}

			this.restart();
		});
	}

	/**
	 * Рестрирует данные обновления
	 *
	 * @param {Array} update
	 */
	_restructure (update) {
		this.emit('raw',update);

		const id = update[0];

		if (!(id in events)) {
			return;
		}

		const {name, action} = events[id];

		if (id !== 4 && this.listenerCount(name) === 0) {
			return;
		}

		try {
		    const result = action.call(this,update);

		    if (result === null) {
		        return;
		    }

		    if (Array.isArray(result)) {
		        return this.emit(result[1], result[0]);
		    }

		    this.emit(name, result);
		} catch (error) {
			this.vk.logger.error('longpoll',error);
		}
	}
}

module.exports = Longpoll;
