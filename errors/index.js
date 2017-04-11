'use strict';

const { AUTH_ERRORS } = require('../util/constants');

/**
 * Служит точкой вывода классов ошибок
 *
 * @type {Object}
 */
module.exports = {
	AUTH_ERRORS,
	VKError: require('./vk'),
	ApiError: require('./api'),
	AuthError: require('./auth'),
	UploadError: require('./upload'),
	RequestError: require('./request'),
	ExecuteError: require('./execute'),
};
