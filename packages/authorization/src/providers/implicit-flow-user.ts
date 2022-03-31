// @ts-ignore
import createDebug from 'debug';
// @ts-ignore

// @ts-ignore
import { URL, URLSearchParams } from 'url';
// @ts-ignore

// @ts-ignore
import { ImplicitFlow } from './implicit-flow';
// @ts-ignore
import { AuthorizationError } from '../errors';
// @ts-ignore

// @ts-ignore
import { Response } from '../fetch-cookie';
// @ts-ignore
import { getUserPermissionsByName, getAllUserPermissions } from '../helpers';
// @ts-ignore
import { CALLBACK_BLANK, AuthErrorCode } from '../constants';
// @ts-ignore

// @ts-ignore
const debug = createDebug('vk-io:authorization:implicit-flow-user');
// @ts-ignore

// @ts-ignore
const { AUTHORIZATION_FAILED } = AuthErrorCode;
// @ts-ignore

// @ts-ignore
export class ImplicitFlowUser extends ImplicitFlow {
// @ts-ignore
	/**
// @ts-ignore
	 * Returns permission page
// @ts-ignore
	 */
// @ts-ignore
	protected getPermissionsPage(): Promise<Response> {
// @ts-ignore
		const { clientId } = this.options;
// @ts-ignore
		let { scope } = this.options;
// @ts-ignore

// @ts-ignore
		if (scope === undefined) {
// @ts-ignore
			throw new Error('Required option "scope" not set');
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		if (scope === 'all') {
// @ts-ignore
			scope = getAllUserPermissions();
// @ts-ignore
		} else if (typeof scope !== 'number') {
// @ts-ignore
			scope = getUserPermissionsByName(scope);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		debug('auth scope %s', scope);
// @ts-ignore

// @ts-ignore
		const params = new URLSearchParams({
// @ts-ignore
			redirect_uri: CALLBACK_BLANK,
// @ts-ignore
			response_type: 'token',
// @ts-ignore
			display: 'page',
// @ts-ignore
			v: this.options.apiVersion,
// @ts-ignore
			client_id: clientId,
// @ts-ignore
			scope: String(scope)
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		const url = new URL(`https://oauth.vk.com/authorize?${params}`);
// @ts-ignore

// @ts-ignore
		return this.fetch(url, {
// @ts-ignore
			method: 'GET'
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Starts authorization
// @ts-ignore
	 */
// @ts-ignore
	public async run(): Promise<{
// @ts-ignore
		email: string | undefined;
// @ts-ignore
		userId: number | undefined;
// @ts-ignore
		token: string;
// @ts-ignore
		expires: number | undefined;
// @ts-ignore
	}> {
// @ts-ignore
		const { response } = await super.login();
// @ts-ignore

// @ts-ignore
		let { hash } = new URL(response.url);
// @ts-ignore

// @ts-ignore
		if (hash.startsWith('#')) {
// @ts-ignore
			hash = hash.substring(1);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const params = new URLSearchParams(hash);
// @ts-ignore

// @ts-ignore
		if (params.has('error')) {
// @ts-ignore
			throw new AuthorizationError({
// @ts-ignore
				message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
// @ts-ignore
				code: AUTHORIZATION_FAILED
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const userId = params.get('user_id');
// @ts-ignore
		const expires = params.get('expires_in');
// @ts-ignore

// @ts-ignore
		return {
// @ts-ignore
			email: params.get('email') || undefined,
// @ts-ignore
			userId: userId !== null
// @ts-ignore
				? Number(userId)
// @ts-ignore
				: undefined,
// @ts-ignore

// @ts-ignore
			token: params.get('access_token')!,
// @ts-ignore
			expires: expires !== null
// @ts-ignore
				? Number(expires)
// @ts-ignore
				: undefined
// @ts-ignore
		};
// @ts-ignore
	}
// @ts-ignore
}
