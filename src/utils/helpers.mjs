/**
 * Creates a key and value from the keys
 *
 * @param {string[]} keys
 *
 * @return {Object}
 */
export const keyMirror = (keys) => {
	const out = {};

	for (const key of keys) {
		out[key] = key;
	}

	return out;
};

/**
 * Returns method for execute
 *
 * @param {string} method
 * @param {Object} params
 *
 * @return {string}
 */
export const getExecuteMethod = (method, params = {}) => {
	const options = {};

	for (const [key, value] of Object.entries(params)) {
		options[key] = typeof value === 'object'
			? String(value)
			: value;
	}

	return `API.${method}(${JSON.stringify(options)})`;
};

/**
 * Returns chain for execute
 *
 * @param {Array} methods
 *
 * @return {string}
 */
export const getChainReturn = methods => (
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
			tasks[i].resolve(response);

			return;
		}

		tasks[i].reject(result.errors[errors]);

		errors += 1;
	});
};

/**
 * Returns random ID
 *
 * @return {number}
 */
export const getRandomId = () => (
	`${Math.floor(Math.random() * 1e4)}${Date.now()}`
);

/**
 * Delay N-ms
 *
 * @param {number} delayed
 *
 * @return {Promise}
 */
export const delay = delayed => (
	new Promise(resolve => setTimeout(resolve, delayed))
);
