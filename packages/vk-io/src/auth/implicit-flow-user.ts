// @ts-ignore
import createDebug from 'debug';

import { URL, URLSearchParams } from 'url';

import ImplicitFlow from './implicit-flow';
import { AuthError, AuthErrorCode } from '../errors';
import { CALLBACK_BLANK } from '../utils/constants';
import {
	getUsersPermissionsByName
} from './helpers';

const debug = createDebug('vk-io:auth:implicit-flow-user');

const { AUTHORIZATION_FAILED } = AuthErrorCode;

export default class ImplicitFlowUser extends ImplicitFlow {
	/**
	 * Returns permission page
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected getPermissionsPage(): Promise<any> {
		const { appId } = this.options;
		let { scope } = this.options;

		if (scope === 'all' || scope === null) {
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
		email: string | null;
		user: number | null;
		token: string;
		expires: number | null;
	}> {
		const { response } = await super.run();

		let { hash } = new URL(response.url);

		if (hash.startsWith('#')) {
			hash = hash.substring(1);
		}

		const params = new URLSearchParams(hash);

		if (params.has('error')) {
			throw new AuthError({
				message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
				code: AUTHORIZATION_FAILED
			});
		}

		const user = params.get('user_id');
		const expires = params.get('expires_in');

		return {
			email: params.get('email'),
			user: user !== null
				? Number(user)
				: null,

			token: params.get('access_token')!,
			expires: expires !== null
				? Number(expires)
				: null
		};
	}
}
