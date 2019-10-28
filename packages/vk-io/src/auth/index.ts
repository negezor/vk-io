import { inspect } from 'util';
import { createHash } from 'crypto';

import VK from '../vk';
import DirectAuth from './direct';
import ImplicitFlowUser from './implicit-flow-user';
import ImplicitFlowGroups from './implicit-flow-groups';

const openAPIParams = [
	'expire',
	'secret',
	'mid',
	'sid',
	'sig'
];

export default class Auth {
	protected vk: VK;

	/**
	 * Constructor
	 */
	public constructor(vk: VK) {
		this.vk = vk;
	}

	/**
	 * Returns custom tag
	 */
	public get [Symbol.toStringTag](): string {
		return this.constructor.name;
	}

	/**
	 * Standalone authorization with login & password
	 */
	public implicitFlowUser(options = {}): ImplicitFlowUser {
		return new ImplicitFlowUser(this.vk, options);
	}

	/**
	 * Standalone authorization with login & password for group
	 */
	public implicitFlowGroups(groups: number[], options = {}): ImplicitFlowGroups {
		// @ts-ignore
		return new ImplicitFlowGroups(this.vk, { ...options, groups });
	}

	/**
	 * Direct authorization with login & login in user application
	 */
	public direct(): DirectAuth {
		const { appId, appSecret } = this.vk.options;

		// @ts-ignore
		return new DirectAuth(this.vk, { appId, appSecret });
	}

	/**
	 * Direct authorization with login & login in android application
	 */
	public androidApp(): DirectAuth {
		return new DirectAuth(this.vk, {
			appId: 2274003,
			appSecret: 'hHbZxrka2uZ6jB1inYsH'
		});
	}

	/**
	 * Direct authorization with login & login in windows application
	 */
	public windowsApp(): DirectAuth {
		return new DirectAuth(this.vk, {
			appId: 3697615,
			appSecret: 'AlVXZFMUqyrnABp8ncuU'
		});
	}

	/**
	 * Direct authorization with login & login in windows phone application
	 */
	public windowsPhoneApp(): DirectAuth {
		return new DirectAuth(this.vk, {
			appId: 3502557,
			appSecret: 'PEObAuQi6KloPM4T30DV'
		});
	}

	/**
	 * Direct authorization with login & login in iphone application
	 */
	public iphoneApp(): DirectAuth {
		return new DirectAuth(this.vk, {
			appId: 3140623,
			appSecret: 'VeWdmVclDCtn6ihuP1nt'
		});
	}

	/**
	 * Direct authorization with login & login in ipad application
	 */
	public ipadApp(): DirectAuth {
		return new DirectAuth(this.vk, {
			appId: 3682744,
			appSecret: 'mY6CDUswIVdJLCD3j15n'
		});
	}

	/**
	 * Direct authorization with login & login in VK Me application
	 */
	public vkMeApp(): DirectAuth {
		return new DirectAuth(this.vk, {
			appId: 6146827,
			appSecret: 'qVxWRF1CwHERuIrKBnqe'
		});
	}

	/**
	 * Verifies that the user is authorized through the Open API
	 */
	public async userAuthorizedThroughOpenAPI(
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		params: Record<string, any>
	): Promise<{ authorized: boolean }> {
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

		const isNotExpire = params.expire > (Date.now() / 1000);
		const authorized = params.sig === sign && isNotExpire;

		return { authorized };
	}

	/**
	 * Custom inspect object
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public [inspect.custom](depth: number, options: Record<string, any>): string {
		const { name } = this.constructor;

		return `${options.stylize(name, 'special')} {}`;
	}
}
