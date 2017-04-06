'use strict';

/**
 * Служит точкой вывода классов ошибок
 *
 * @type {Object}
 */
module.exports = {
	VKError: require('./vk'),
	ApiError: require('./api'),
	AuthError: require('./auth'),
	UploadError: require('./upload'),
	RequestError: require('./request'),
	ExecuteError: require('./execute'),
};
