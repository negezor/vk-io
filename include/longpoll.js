'use strict';

/**
 * Устанавливает соединение longpoll
 * @param {number} mode режим соединения
 * @returns {object} promise
 */
exports.longpoll = function(mode){
	return new this.promise((resolve) => {
		if (this.status.longpoll.launched) {
			return resolve();
		}

		this.api.messages.getLongPollServer({
			use_ssl: 1,
			need_pts: 0
		})
		.then((data) => {
			var longpoll = this.status.longpoll;

			longpoll.server = 'https://'+data.server;
			longpoll.key = data.key;

			if (!longpoll.ts) {
				longpoll.ts = data.ts;
			}

			longpoll.mode = mode || longpoll.mode || 2;
			longpoll.launched = true;

			this._longpollFetch();

			resolve();
		})
		.catch((data) => {
			++this.status.error;

			this._longpollRestart();
		});
	});
};

/**
 * Перезагружает соединение longpoll
 */
exports._longpollRestart = function(){
	this.status.longpoll.launched = false;

	setImmediate(() => {
		this.longpoll();
	});
};

/**
 * Получает данные и отправляет на чистку
 */
exports._longpollFetch = function(){
	var longpoll = this.status.longpoll;

	if (!longpoll.launched) {
		return;
	}

	this.request({
		uri: longpoll.server,
		json: true,
		timeout: 20000,
		qs: {
			act: 'a_check',
			key: longpoll.key,
			ts: longpoll.ts,
			mode: longpoll.mode,
			wait: 15
		}
	})
	.then((data) => {
		if (data.failed) {
			if (data.failed === 1) {
				longpoll.ts = data.ts;
			} else {
				longpoll.ts = null;

				return this._longpollRestart();
			}
		} else if (data.updates.length !== 0) {
			longpoll.ts = data.ts;

			this._longpollSanitize(data.updates);
		}

		if (longpoll.launched) {
			this._longpollFetch();
		}
	})
	.catch((error) => {
		++this.status.error;

		var status = error.code === 'ETIMEDOUT' || error.statusCode > 500;

		if (status) {
			this._longpollRestart();
		} else {
			this._longpollFetch();
		}
	});
};
