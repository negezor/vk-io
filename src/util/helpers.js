'use strict';

/**
 * Returns method for execute
 *
 * @param {string} method
 * @param {Object} params
 *
 * @return {string}
 */
export const getExecuteMethod = (method, params = {}) => (
	`API.${method}(${JSON.stringify(params)})`
);

/**
 * Returns chain for execute
 *
 * @param {Array} methods
 *
 * @return {string}
 */
export const getChainReturn = (methods) => (
	`return [${methods.join(',')}];`
);

/**
 * Resolve task
 *
 * @param {Array} tasks
 * @param {Array} results
 */
export const resolveExecuteTask = (tasks, result) => {
	let errors = 0;

	result.response.forEach((response, i) => {
		if (response !== false) {
			return tasks[i].resolve(response);
		}

		tasks[i].reject(result.errors[errors++]);
	});
};
