import createDebug from 'debug';

import { URL, URLSearchParams } from 'url';

import { ImplicitFlow } from './implicit-flow';
import { AuthorizationError } from '../errors';

import { Response } from '../fetch-cookie';
import { getUserPermissionsByName, getAllUserPermissions } from '../helpers';
import { CALLBACK_BLANK, AuthErrorCode } from '../constants';

const debug = createDebug('vk-io:authorization:implicit-flow-user');

const { AUTHORIZATION_FAILED } = AuthErrorCode;

export class ImplicitFlowUser extends ImplicitFlow {
	/**
	 * Returns permission page
	 */
	protected getPermissionsPage(): Promise<Response> {
		const { clientId } = this.options;
		let { scope } = this.options;

		if (scope === undefined) {
			throw new Error('Required option "scope" not set');
		}

		if (scope === 'all') {
			scope = getAllUserPermissions();
		} else if (typeof scope !== 'number') {
			scope = getUserPermissionsByName(scope);
		}

		debug('auth scope %s', scope);

		const params = new URLSearchParams({
			redirect_uri: CALLBACK_BLANK,
			response_type: 'token',
			display: 'page',
			v: this.options.apiVersion,
			client_id: clientId,
			scope: String(scope)
		});

		const url = new URL(`https://oauth.vk.com/authorize?${params}`);

		return this.fetch(url, {
			method: 'GET'
		});
	}

	/**
	 * Starts authorization
	 */
	public async run(): Promise<{
		email: string | undefined;
		userId: number | undefined;
		token: string;
		expires: number | undefined;
	}> {
		const { response } = await super.login();

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

		const userId = params.get('user_id');
		const expires = params.get('expires_in');

		return {
			email: params.get('email') || undefined,
			userId: userId !== null
				? Number(userId)
				: undefined,

			token: params.get('access_token')!,
			expires: expires !== null
				? Number(expires)
				: undefined
		};
	}
}
