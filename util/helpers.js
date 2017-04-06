'use strict';

/**
 * Возвращает метод с параметрами для execute
 *
 * @param {string} method
 * @param {Object} params
 *
 * @return {string}
 */
exports.getMethodApi = (method,params = {}) => {
	return `API.${method}(${JSON.stringify(params)})`;
};

/**
 * Возвращает очередь из методов
 *
 * @param {Array} chain
 *
 * @return {string}
 */
exports.getChainCode = (chain) => {
	return `return [${chain.join(',')}];`;
};
