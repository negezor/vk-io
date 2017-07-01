'use strict';

import { Agent } from 'https';

/**
 * VK API version
 *
 * @type {string}
 */
export const API_VERSION = '5.65';

/**
 * Default options
 *
 * @type {Object}
 */
export const defaultOptions = {
	agent: new Agent({
		keepAlive: true,
		keepAliveMsecs: 10000
	}),

	token: null
};
