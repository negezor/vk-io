import createDebug from 'debug';

import { URL, URLSearchParams } from 'url';

import ImplicitFlow from './implicit-flow';
import { AuthorizationError } from '../errors';

import { getUsersPermissionsByName } from '../helpers';
import { CALLBACK_BLANK, AuthErrorCode } from '../constants';

const debug = createDebug('vk-io:authorization:implicit-flow-user');

const { AUTHORIZATION_FAILED } = AuthErrorCode;

export default class ImplicitFlowUser extends ImplicitFlow {
	/**
	 * Returns permission page
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected getPermissionsPage(): Promise<any> {
		const { appId } = this.options;
		let { scope } = this.options;

		if (scope === 'all' || scope === undefined) {
			throw new Error('Required option authScope not set');
		} else if (typeof scope !== 'number') {
			scope = getUsersPermissionsByName(scope);
		}

		debug('auth scope %s', scope);

		// @ts-ignore
		const params = new URLSearchParams({
			redirect_uri: CALLBACK_BLANK,
			response_type: 'token',
			display: 'page',
			v: this.options.apiVersion,
			client_id: appId,
			scope
		});

		const url = new URL(`https://oauth.vk.com/authorize?${params}`);

		return this.fetch(url, {
			method: 'GET'
		});
	}

	/**
	 * Starts authorization
	 */
	// @ts-ignore
	public async run(): Promise<{
		email: string | undefined;
		user: number | undefined;
		token: string;
		expires: number | undefined;
	}> {
		const { response } = await super.run();

		let { hash } = new URL(response.url);

		if (hash.startsWith('#')) {
			hash = hash.substring(1);
		}

		const params = new URLSearchParams(hash);

		if (params.has('error')) {
			throw new AuthorizationError({
				message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
				code: AUTHORIZATION_FAILED
			});
		}

		const user = params.get('user_id');
		const expires = params.get('expires_in');

		return {
			email: params.get('email') || undefined,
			user: user !== null
				? Number(user)
				: undefined,

			token: params.get('access_token')!,
			expires: expires !== null
				? Number(expires)
				: undefined
		};
	}
}
