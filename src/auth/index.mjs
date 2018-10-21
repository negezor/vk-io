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
	 * @param {*}  groups
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
		const { appId, appSecret } = this.vk.options;

		return new DirectAuth(this.vk, { appId, appSecret });
	}

	/**
	 * Direct authorization with login & login in android application
	 *
	 * @return {DirectAuth}
	 */
	androidApp() {
		return new DirectAuth(this.vk, {
			appId: 2274003,
			appSecret: 'hHbZxrka2uZ6jB1inYsH'
		});
	}

	/**
	 * Direct authorization with login & login in windows application
	 *
	 * @return {DirectAuth}
	 */
	windowsApp() {
		return new DirectAuth(this.vk, {
			appId: 3697615,
			appSecret: 'AlVXZFMUqyrnABp8ncuU'
		});
	}

	/**
	 * Direct authorization with login & login in windows phone application
	 *
	 * @return {DirectAuth}
	 */
	windowsPhoneApp() {
		return new DirectAuth(this.vk, {
			appId: 3502557,
			appSecret: 'PEObAuQi6KloPM4T30DV'
		});
	}

	/**
	 * Direct authorization with login & login in iphone application
	 *
	 * @return {DirectAuth}
	 */
	iphoneApp() {
		return new DirectAuth(this.vk, {
			appId: 3140623,
			appSecret: 'VeWdmVclDCtn6ihuP1nt'
		});
	}

	/**
	 * Direct authorization with login & login in ipad application
	 *
	 * @return {DirectAuth}
	 */
	ipadApp() {
		return new DirectAuth(this.vk, {
			appId: 3682744,
			appSecret: 'mY6CDUswIVdJLCD3j15n'
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

		sign += this.vk.options.appSecret;
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
