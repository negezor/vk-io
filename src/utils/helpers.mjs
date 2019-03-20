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

const lt = /&lt;/g;
const qt = /&gt;/g;
const br = /<br>/g;
const amp = /&amp;/g;
const quot = /&quot;/g;

/**
 * Decodes HTML entities
 *
 * @param {string} text
 *
 * @return {string}
 */
export const unescapeHTML = text => (
	text
		.replace(lt, '<')
		.replace(qt, '>')
		.replace(br, '\n')
		.replace(amp, '&')
		.replace(quot, '"')
);

/**
 * Copies object params to new object
 *
 * @param {Object} params
 * @param {Array}  properties
 *
 * @return {Object}
 */
export const copyParams = (params, properties) => {
	const copies = {};

	for (const property of properties) {
		copies[property] = params[property];
	}

	return copies;
};

/**
 * Displays deprecated message
 *
 * @param {string} message
 */
export const showDeprecatedMessage = (message) => {
	// eslint-disable-next-line no-console
	console.log(' \u001b[31mDeprecated:\u001b[39m', message);
};
