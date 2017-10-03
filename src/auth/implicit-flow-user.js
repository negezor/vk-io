import createDebug from 'debug';
import { load as cheerioLoad } from 'cheerio';

import { writeFileSync } from 'fs';
import { URL, URLSearchParams } from 'url';

import ImplicitFlow from './implicit-flow';
import { AuthError, authErrors } from '../errors';
import { API_VERSION, CALLBACK_BLANK } from '../util/constants';
import {
	parseFormField,
	getAllUsersPermissions,
	getUsersPermissionsByName
} from './helpers';

const debug = createDebug('vk-io:auth:implicit-flow-user');

const { AUTHORIZATION_FAILED } = authErrors;

export default class ImplicitFlowUser extends ImplicitFlow {
	/**
	 * Returns permission page
	 *
	 * @return {Response}
	 */
	getPermissionsPage() {
		const { app } = this.vk.options;
		let { scope } = this.vk.options;

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
			client_id: app,
			revoke: 1,
			scope
		});

		const url = new URL(`https://oauth.vk.com/authorize?${params}`);

		return this.fetch(url, {
			method: 'GET'
		});
	}

	async run() {
		const { $ } = await super.run();

		debug('auth with login & pass complete');

		let response;
		if ($('form').length !== 0) {
			const { action } = parseFormField($);

			debug('url grant access', action);

			response = await this.fetch(action, {
				method: 'POST'
			});
		} else {
			const script = $('script[type="text/javascript"][language="javascript"]').text();
			const locations = script.match(/location\.href\s+=\s+"([^"]+)"/i);

			if (locations === null) {
				throw new AuthError({
					message: 'Could not log in',
					code: AUTHORIZATION_FAILED
				});
			}

			const url = locations[1].replace('&cancel=1', '');

			debug('url grant access', url);

			response = await this.fetch(url, {
				method: 'POST'
			});
		}

		const { hash } = new URL(response.url);
		const params = new URLSearchParams(hash.substring(1));

		if (params.has('error')) {
			throw new AuthError({
				message: `Failed passed grant access: ${params.get('error_description') || 'Unknown error'}`,
				code: AUTHORIZATION_FAILED
			});
		}

		return {
			email: params.get('email'),
			user: Number(params.get('user_id')),

			token: params.get('access_token'),
			expires: Number(params.get('expires_in'))
		};
	}
}
