import nodeUtil from 'util';
import nodeCrypto from 'crypto';

import DirectAuth from './direct';
import ImplicitFlowUser from './implicit-flow-user';
import ImplicitFlowGroups from './implicit-flow-groups';

const { inspect } = nodeUtil;
const { createHash } = nodeCrypto;

const openAPIParams = [
	'expire',
	'secret',
	'mid',
	'sid',
	'sig'
];

export default class Auth {
	/**
	 * Constructor
	 *
	 * @param {VK} vk
	 */
	constructor(vk) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 *
	 * @return {string}
	 */
	get [Symbol.toStringTag]() {
		return 'Auth';
	}

	/**
	 * Standalone authorization with login & password
	 *
	 * @return {ImplicitFlowUser}
	 */
	implicitFlowUser(options = {}) {
		return new ImplicitFlowUser(this.vk, options);
	}

	/**
	 * Standalone authorization with login & password for group
	 *
	 * @param {mixed}  groups
	 * @param {Object} options
	 *
	 * @return {ImplicitFlowGroup}
	 */
	implicitFlowGroups(groups, options = {}) {
		return new ImplicitFlowGroups(this.vk, { ...options, groups });
	}

	/**
	 * Direct authorization with login & login in user application
	 *
	 * @return {DirectAuth}
	 */
	direct() {
		const { app, key } = this.vk.options;

		return new DirectAuth(this.vk, { app, key });
	}

	/**
	 * Direct authorization with login & login in android application
	 *
	 * @return {DirectAuth}
	 */
	androidApp() {
		return new DirectAuth(this.vk, {
			app: 2274003,
			key: 'hHbZxrka2uZ6jB1inYsH'
		});
	}

	/**
	 * Direct authorization with login & login in windows application
	 *
	 * @return {DirectAuth}
	 */
	windowsApp() {
		return new DirectAuth(this.vk, {
			app: 3697615,
			key: 'AlVXZFMUqyrnABp8ncuU'
		});
	}

	/**
	 * Direct authorization with login & login in windows phone application
	 *
	 * @return {DirectAuth}
	 */
	windowsPhoneApp() {
		return new DirectAuth(this.vk, {
			app: 3502557,
			key: 'PEObAuQi6KloPM4T30DV'
		});
	}

	/**
	 * Direct authorization with login & login in iphone application
	 *
	 * @return {DirectAuth}
	 */
	iphoneApp() {
		return new DirectAuth(this.vk, {
			app: 3140623,
			key: 'VeWdmVclDCtn6ihuP1nt'
		});
	}

	/**
	 * Direct authorization with login & login in ipad application
	 *
	 * @return {DirectAuth}
	 */
	ipadApp() {
		return new DirectAuth(this.vk, {
			app: 3682744,
			key: 'mY6CDUswIVdJLCD3j15n'
		});
	}

	/**
	 * Verifies that the user is authorized through the Open API
	 *
	 * @param {Object} params
	 *
	 * @return {Promise<Object>}
	 */
	async userAuthorizedThroughOpenAPI(params) {
		const paramsKeys = Object.keys(params)
			.filter(key => openAPIParams.includes(key))
			.sort();

		let sign = '';
		for (const key of paramsKeys) {
			if (key !== 'sig') {
				sign += `${key}=${params[key]}`;
			}
		}

		sign += this.vk.options.key;
		sign = createHash('md5')
			.update(sign)
			.digest('hex');

		let authorized = false;

		const isNotExpire = params.expire > (Date.now() / 1000);

		if (params.sig === sign && isNotExpire) {
			authorized = true;
		}

		return {
			authorized
		};
	}

	/**
	 * Custom inspect object
	 *
	 * @param {?number} depth
	 * @param {Object}  options
	 *
	 * @return {string}
	 */
	[inspect.custom](depth, options) {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} {}`;
	}
}
