import { CallbackService } from 'vk-io';
import { inspectable } from 'inspectable';

import { createHash } from 'crypto';

import {
	DirectAuthorization,

	ImplicitFlowGroups,
	ImplicitFlowUser,

	IDirectAuthOptions,
	IImplicitFlowOptions
} from './providers';

const openAPIProperties = [
	'expire',
	'secret',
	'mid',
	'sid'
];

export interface IAuthorizationOptions {
	callbackService: CallbackService;

	/**
	 * Application ID
	 */
	appId?: number;

	/**
	 * Secret application key
	 */
	appSecret?: string;

	/**
	 * User login (phone number or email)
	 */
	login?: string;

	/**
	 * User phone number
	 */
	phone?: string | number;

	/**
	 * User password
	 */
	password?: string;
}

export class Authorization {
	protected options: IAuthorizationOptions;

	/**
	 * Constructor
	 */
	public constructor(options: IAuthorizationOptions) {
		this.options = {
			...options
		};
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
	public implicitFlowUser(options: IImplicitFlowOptions): ImplicitFlowUser {
		return new ImplicitFlowUser({
			...this.options,

			...options
		});
	}

	/**
	 * Standalone authorization with login & password for group
	 */
	public implicitFlowGroups(groups: number[], options = {}): ImplicitFlowGroups {
		// @ts-expect-error
		return new ImplicitFlowGroups({
			...this.options,

			...options,

			groups
		});
	}

	/**
	 * Direct authorization with login & login in user application
	 */
	public direct(options: IDirectAuthOptions): DirectAuthorization {
		return new DirectAuthorization({
			...this.options,

			...options
		});
	}

	/**
	 * Direct authorization with login & login in android application
	 */
	public androidApp(options: IDirectAuthOptions): DirectAuthorization {
		return this.direct({
			...options,

			appId: 2274003,
			appSecret: 'hHbZxrka2uZ6jB1inYsH'
		});
	}

	/**
	 * Direct authorization with login & login in windows application
	 */
	public windowsApp(options: IDirectAuthOptions): DirectAuthorization {
		return this.direct({
			...options,

			appId: 3697615,
			appSecret: 'AlVXZFMUqyrnABp8ncuU'
		});
	}

	/**
	 * Direct authorization with login & login in windows phone application
	 */
	public windowsPhoneApp(options: IDirectAuthOptions): DirectAuthorization {
		return this.direct({
			...options,

			appId: 3502557,
			appSecret: 'PEObAuQi6KloPM4T30DV'
		});
	}

	/**
	 * Direct authorization with login & login in iphone application
	 */
	public iphoneApp(options: IDirectAuthOptions): DirectAuthorization {
		return this.direct({
			...options,

			appId: 3140623,
			appSecret: 'VeWdmVclDCtn6ihuP1nt'
		});
	}

	/**
	 * Direct authorization with login & login in ipad application
	 */
	public ipadApp(options: IDirectAuthOptions): DirectAuthorization {
		return this.direct({
			...options,

			appId: 3682744,
			appSecret: 'mY6CDUswIVdJLCD3j15n'
		});
	}

	/**
	 * Direct authorization with login & login in VK Me application
	 */
	public vkMeApp(options: IDirectAuthOptions): DirectAuthorization {
		return this.direct({
			...options,

			appId: 6146827,
			appSecret: 'qVxWRF1CwHERuIrKBnqe'
		});
	}

	/**
	 * Verifies that the user is authorized through the Open API
	 */
	public async userAuthorizedThroughOpenAPI(
		params: Record<'expire' | 'mid' | 'secret' | 'sid' | 'sig', string>
	): Promise<{ authorized: boolean }> {
		let sign = ([...openAPIProperties] as (keyof typeof params)[])
			.sort()
			.map(key => `${key}=${params[key]}`)
			.join('');

		sign += this.options.appSecret;
		sign = createHash('md5')
			.update(sign)
			.digest('hex');

		const expire = Number(params.expire);

		const isExpired = Number.isNaN(expire) || expire < (Date.now() / 1000);
		const authorized = params.sig === sign && !isExpired;

		return { authorized };
	}
}

inspectable(Authorization);
