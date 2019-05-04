import createDebug from 'debug';

import nodeUrl from 'url';

import ImplicitFlow from './implicit-flow';
import { VKError, AuthError, authErrors } from '../errors';
import { API_VERSION, CALLBACK_BLANK } from '../utils/constants';
import {
	getAllGroupsPermissions,
	getGroupsPermissionsByName
} from './helpers';

const { URL, URLSearchParams } = nodeUrl;

const debug = createDebug('vk-io:auth:implicit-flow-user');

const { AUTHORIZATION_FAILED } = authErrors;

export default class ImplicitFlowGroups extends ImplicitFlow {
	/**
	 * Constructor
	 *
	 * @param {VK}     vk
	 * @param {Object} options
	 */
	constructor(vk, options) {
		super(vk, options);

		let { groups = null } = options;

		if (groups === null) {
			throw new VKError({
				message: 'Groups list must have'
			});
		}

		if (!Array.isArray(groups)) {
			groups = [groups];
		}

		this.groups = groups.map((group) => {
			if (typeof group !== 'number') {
				group = Number(group);
			}

			if (group < 0) {
				group = -group;
			}

			return group;
		});
	}

	/**
	 * Returns permission page
	 *
	 * @param {Array} groups
	 *
	 * @return {Promise<Response>}
	 */
	getPermissionsPage() {
		const { appId } = this;
		let { scope } = this;

		if (scope === 'all' || scope === null) {
			scope = getAllGroupsPermissions();
		} else if (typeof scope !== 'number') {
			scope = getGroupsPermissionsByName(scope);
		}

		debug('auth scope %s', scope);

		const params = new URLSearchParams({
			group_ids: this.groups.join(','),
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
	 * @return {Promise<Array>}
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

		let expires = params.get('expires_in');

		if (expires !== null) {
			expires = Number(expires);
		}

		const tokens = [];

		for (const [name, value] of params) {
			if (!name.startsWith('access_token_')) {
				continue;
			}

			/* Example group access_token_XXXXX */
			const { 2: group } = name.split('_');

			tokens.push({
				group: Number(group),
				token: value,
				expires
			});
		}

		return tokens;
	}
}
