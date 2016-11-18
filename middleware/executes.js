'use strict';

/**
 * Генерирует код для вызова
 *
 * @param string name
 * @param array  params
 *
 * @return Promise
 */
exports._executesGenarateCodes = function(name,queue){
	return new this.promise((resolve) => {
		var out = [];

		this.async.each(
			queue,
			(params,nextQueue) => {
				var options = [];

				this.async.eachOf(
					params,
					(param,key,nextParam) => {
						options.push(key+':'+(
							(typeof param === 'number')?param:'"'+param+'"')
						);

						nextParam();
					},
					(error) => {
						if (error) {
							return this.logger.error(error);
						}

						out.push(
							'API.'+name+'({'+options.join(',')+'})'
						);

						nextQueue();
					}
				);
			},
			(error) => {
				if (error) {
					return this.logger.error(error);
				}

				resolve('return ['+out.join(',')+'];');
			}
		);

	});
};

/**
 * Вызывает методы API через execute
 *
 * @param string name
 * @param array  queue
 *
 * @return Promise
 */
exports.executes = function(name,queue = []){
	return new this.promise((resolve,reject) => {
		if (queue.length === 0) {
			return reject(new Error('Empty queue!'));
		}

		var promises = [];

		this.async.whilst(
			() => {
				return queue.length !== 0;
			},
			(next) => {
				promises.push(
					this._executesGenarateCodes(name,queue.splice(0,25))
					.then((code) => {
						return this.api.execute({
							code: code
						});
					})
				);

				next();
			},
			(error) => {
				if (error) {
					return this.logger.error(error);
				}

				this.promise.all(promises)
				.then((results) => {
					var out = [];

					this.async.each(
						results,
						(items,next) => {
							out = out.concat(items);

							next();
						},
						() => {
							resolve(out);
						}
					);
				})
				.catch(reject);
			}
		)
	});
};
