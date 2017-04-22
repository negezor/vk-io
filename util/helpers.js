'use strict';

/**
 * Возвращает метод с параметрами для execute
 *
 * @param {string} method
 * @param {Object} params
 *
 * @return {string}
 */
exports.getMethodApi = (method, params = {}) => (
	`API.${method}(${JSON.stringify(params)})`
);

/**
 * Возвращает очередь из методов
 *
 * @param {Array} chain
 *
 * @return {string}
 */
exports.getChainCode = (chain) => (
	`return [${chain.join(',')}];`
);

/**
 * Обрабатывает стак promise
 *
 * @param {Array} tasks
 * @param {Array} result
 */
function resolvePromisesTask(tasks, result) {
	let errors = 0;

	result.response.forEach((response, i) => {
		if (response !== false) {
			return tasks[i].resolve(response);
		}

		tasks[i].reject(result.errors[errors++]);
	});
}

exports.resolvePromisesTask = resolvePromisesTask;

/**
 * Возвращает рандомный ID
 *
 * @return {number}
 */
exports.getRandomId = () => (
	(Math.floor(Math.random() * 1e3) + '') + Date.now()
);
