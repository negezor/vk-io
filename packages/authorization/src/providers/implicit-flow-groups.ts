import createDebug from 'debug';

import { VK, VKError } from 'vk-io';

import { URL, URLSearchParams } from 'url';

import ImplicitFlow, { IImplicitFlowOptions } from './implicit-flow';

import { AuthorizationError } from '../errors';
import { getGroupsPermissionsByName } from '../helpers';
import { CALLBACK_BLANK, AuthErrorCode } from '../constants';

const debug = createDebug('vk-io:authorization:implicit-flow-user');

const { AUTHORIZATION_FAILED } = AuthErrorCode;

export default class ImplicitFlowGroups extends ImplicitFlow {
	groups: number[];

	/**
	 * Constructor
	 */
	constructor(vk: VK, options: IImplicitFlowOptions & { groups: number[] }) {
		super(vk, options);

		let { groups = null } = options;

		if (groups === null) {
			throw new VKError({
				message: 'Groups list must have',
				code: 'GROUPS_NOT_SET'
			});
		}

		if (!Array.isArray(groups)) {
			groups = [groups];
		}

		this.groups = groups.map((rawGroup) => {
			const group = Number(rawGroup);

			return group < 0
				? -group
				: group;
		});
	}

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
			scope = getGroupsPermissionsByName(scope);
		}

		debug('auth scope %s', scope);

		// @ts-ignore
		const params = new URLSearchParams({
			group_ids: this.groups.join(','),
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
		group: number;
		token: string;
		expires: number;
	}[]> {
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

		let expires: string | number | null = params.get('expires_in');

		if (expires !== null) {
			expires = Number(expires);
		}

		const tokens: {
			group: number;
			token: string;
			expires: number;
		}[] = [];

		for (const [name, value] of params) {
			if (!name.startsWith('access_token_')) {
				continue;
			}

			/* Example group access_token_XXXXX */
			const { 2: group } = name.split('_');

			tokens.push({
				group: Number(group),
				token: value,
				expires: expires as number
			});
		}

		// @ts-ignore
		return tokens;
	}
}
