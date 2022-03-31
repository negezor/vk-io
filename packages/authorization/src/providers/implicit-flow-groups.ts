// @ts-ignore
import createDebug from 'debug';
// @ts-ignore

// @ts-ignore
import { URL, URLSearchParams } from 'url';
// @ts-ignore

// @ts-ignore
import { ImplicitFlow, IImplicitFlowOptions } from './implicit-flow';
// @ts-ignore

// @ts-ignore
import { Response } from '../fetch-cookie';
// @ts-ignore
import { AuthorizationError } from '../errors';
// @ts-ignore
import { getGroupPermissionsByName, getAllGroupPermissions } from '../helpers';
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
export interface IImplicitFlowGroupsOptions extends IImplicitFlowOptions {
// @ts-ignore
	groupIds: number[];
// @ts-ignore
}
// @ts-ignore

// @ts-ignore
export class ImplicitFlowGroups extends ImplicitFlow {
// @ts-ignore
	groupIds: number[];
// @ts-ignore

// @ts-ignore
	/**
// @ts-ignore
	 * Constructor
// @ts-ignore
	 */
// @ts-ignore
	constructor(options: IImplicitFlowGroupsOptions) {
// @ts-ignore
		super(options);
// @ts-ignore

// @ts-ignore
		let { groupIds } = options;
// @ts-ignore

// @ts-ignore
		if (!Array.isArray(groupIds)) {
// @ts-ignore
			groupIds = [groupIds];
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		this.groupIds = groupIds.map((rawGroupId) => {
// @ts-ignore
			const groupId = Number(rawGroupId);
// @ts-ignore

// @ts-ignore
			return Math.abs(groupId);
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore

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
			scope = getAllGroupPermissions();
// @ts-ignore
		} else if (typeof scope !== 'number') {
// @ts-ignore
			scope = getGroupPermissionsByName(scope);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		debug('auth scope %s', scope);
// @ts-ignore

// @ts-ignore
		const params = new URLSearchParams({
// @ts-ignore
			group_ids: this.groupIds.join(','),
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
		groups: {
// @ts-ignore
			groupId: number;
// @ts-ignore
			token: string;
// @ts-ignore
			expires: number;
// @ts-ignore
		}[];
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
		let expires: string | number | undefined = params.get('expires_in') || undefined;
// @ts-ignore

// @ts-ignore
		if (expires !== undefined) {
// @ts-ignore
			expires = Number(expires);
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		const groups: {
// @ts-ignore
			groupId: number;
// @ts-ignore
			token: string;
// @ts-ignore
			expires: number;
// @ts-ignore
		}[] = [];
// @ts-ignore

// @ts-ignore
		for (const [name, value] of params) {
// @ts-ignore
			if (!name.startsWith('access_token_')) {
// @ts-ignore
				continue;
// @ts-ignore
			}
// @ts-ignore

// @ts-ignore
			/* Example group access_token_XXXXX */
// @ts-ignore
			const { 2: groupId } = name.split('_');
// @ts-ignore

// @ts-ignore
			groups.push({
// @ts-ignore
				groupId: Number(groupId),
// @ts-ignore
				token: value,
// @ts-ignore
				expires: expires as number
// @ts-ignore
			});
// @ts-ignore
		}
// @ts-ignore

// @ts-ignore
		return { groups };
// @ts-ignore
	}
// @ts-ignore
}
