'use strict';

/**
 * Устанавливает соединение longpoll
 *
 * @return promise
 */
exports.longpoll = function(){
	return new this.promise((resolve,reject) => {
		var lp = this._longpoll;

		if (lp.launched) {
			return resolve();
		}

		this.api.messages.getLongPollServer({
			use_ssl: 1,
			need_pts: 0
		})
		.then((data) => {
			lp.server = 'https://'+data.server;
			lp.key = data.key;

			if (!lp.ts) {
				lp.ts = data.ts;
			}

			lp.launched = true;

			this._longpollFetch();

			resolve();
		})
		.catch(reject);
	});
};

/**
 * Закрывает соединение longpoll
 *
 * @return self
 */
exports.longpollClose = function(){
	this._longpoll.launched = false;
	this._longpoll.ts = null;

	return this;
};

/**
 * Перезапуск longpoll соединения
 */
exports._longpollRestart = function(){
	this._longpoll.launched = false;

	process.nextTick(() => {
		this.longpoll();
	});
};

/**
 * Получает данные и отправляет на чистку
 */
exports._longpollFetch = function(){
	var lp = this._longpoll;

	if (!lp.launched) {
		return;
	}

	this.request({
		uri: lp.server,
		timeout: 20000,
		json: true,
		qs: {
			act: 'a_check',
			key: lp.key,
			ts: lp.ts,
			mode: 2,
			wait: 15
		}
	})
	.then((data) => {
		if ('failed' in data && data.failed !== 1) {
			lp.ts = null;

			return this._longpollRestart();
		}

		lp.ts = data.ts;

		if ('updates' in data && data.updates.length !== 0) {
			this.async.each(data.updates,this._longpollSanitize.bind(this));
		}

		if (lp.launched) {
			this._longpollFetch();
		}
	})
	.catch((error) => {
		++this.status.error;

		if (!lp.launched) {
			return;
		}

		if (this._checkConnectReject(error)) {
			return this._longpollRestart();
		}

		this._longpollFetch();
	});
};
