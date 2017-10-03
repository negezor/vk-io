import createDebug from 'debug';

import { URL, URLSearchParams } from 'url';

import ImplicitFlow from './implicit-flow';
import { API_VERSION, CALLBACK_BLANK } from '../util/constants';
import { getAllPermissionsBitMask, getPermissionsBitMaskByName } from './helpers';

const debug = createDebug('vk-io:auth:implicit-flow-user');

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
			scope = getAllPermissionsBitMask();
		} else if (typeof scope !== 'number') {
			scope = getPermissionsBitMaskByName(scope);
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
		const response = await super.run();

		debug('auth with login & pass complete');
	}
}
