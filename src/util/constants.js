'use strict';

import { version } from '../../package';

/**
 * VK API version
 *
 * @type {string}
 */
export const API_VERSION = '5.67';

/**
 * Default options
 *
 * @type {Object}
 *
 * @property [token]            Access token
 * @property [lang]             The return data language
 *
 * @property [apiMode]          Query mode
 *
 * @property [apiLimit]         Requests per second
 * @property [apiTimeout]       Wait time for one request
 * @property [apiExecuteCount]  Number of requests per execute
 */
export const defaultOptions = {
	token: null,
	lang: null,

	apiMode: 'sequential',

	apiLimit: 3,
	apiTimeout: 3e3,
	apiHeaders: {
		'User-Agent': `vk-io/${version} (+https://github.com/negezor/vk-io)`
	},
	apiExecuteCount: 25
};
