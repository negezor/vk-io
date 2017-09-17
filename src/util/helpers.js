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

/**
 * Returns random ID
 *
 * @return {number}
 */
export const getRandomId = () => (
	(Math.floor(Math.random() * 1e4) + '') + Date.now()
);

/**
 * Returns the URL of a small photo
 *
 * @param {Object} photo
 *
 * @return {string}
 */
export const getSmallPhoto = (photo) => (
	photo.photo_130 || photo.photo_75
);

/**
 * Returns the URL of a medium photo
 *
 * @param {Object} photo
 *
 * @return {string}
 */
export const getMediumPhoto = (photo) => (
	photo.photo_807 || photo.photo_604 || getSmallPhoto(photo)
);

/**
 * Returns the URL of a large photo
 *
 * @param {Object} photo
 *
 * @return {string}
 */
export const getLargePhoto = (photo) => (
	photo.photo_2560 || photo.photo_1280 || getMediumPhoto(photo)
);

/**
 * Delay N-ms
 *
 * @param {number} delayed
 *
 * @return {Promise}
 */
export const delay = (delayed) => (
	new Promise((resolve) => setTimeout(resolve, delayed))
);
