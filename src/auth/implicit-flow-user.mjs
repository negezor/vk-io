import createDebug from 'debug';

import nodeUrl from 'url';

import ImplicitFlow from './implicit-flow';
import { AuthError, authErrors } from '../errors';
import { API_VERSION, CALLBACK_BLANK } from '../utils/constants';
import {
	getAllUsersPermissions,
	getUsersPermissionsByName
} from './helpers';

const { URL, URLSearchParams } = nodeUrl;

const debug = createDebug('vk-io:auth:implicit-flow-user');

const { AUTHORIZATION_FAILED } = authErrors;

export default class ImplicitFlowUser extends ImplicitFlow {
	/**
	 * Returns permission page
	 *
	 * @return {Promise<Response>}
	 */
	getPermissionsPage() {
		const { appId } = this;
		let { scope } = this;

		if (scope === 'all' || scope === null) {
			scope = getAllUsersPermissions();
		} else if (typeof scope !== 'number') {
			scope = getUsersPermissionsByName(scope);
		}

		debug('auth scope %s', scope);

		const params = new URLSearchParams({
			redirect_uri: CALLBACK_BLANK,
			response_type: 'token',
			display: 'page',
			v: API_VERSION,
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
	 *
	 * @return {Promise<Object>}
	 */
	async run() {
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

			token: params.get('access_token'),
			expires: expires !== null
				? Number(expires)
				: null
		};
	}
}
