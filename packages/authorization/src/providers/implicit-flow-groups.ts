import createDebug from 'debug';

import { AuthorizationError } from '../errors';

import type { Response } from '../fetch-cookie';
import { type IImplicitFlowOptions, ImplicitFlow } from './implicit-flow';

import { AuthErrorCode, CALLBACK_BLANK } from '../constants';

import { getAllGroupPermissions, getGroupPermissionsByName } from '../helpers';

const debug = createDebug('vk-io:authorization:implicit-flow-user');

const { AUTHORIZATION_FAILED } = AuthErrorCode;

export interface IImplicitFlowGroupsOptions extends IImplicitFlowOptions {
    groupIds: number[];
}

export class ImplicitFlowGroups extends ImplicitFlow {
    groupIds: number[];

    /**
     * Constructor
     */
    constructor(options: IImplicitFlowGroupsOptions) {
        super(options);

        let { groupIds } = options;

        if (!Array.isArray(groupIds)) {
            groupIds = [groupIds];
        }

        this.groupIds = groupIds.map(rawGroupId => {
            const groupId = Number(rawGroupId);

            return Math.abs(groupId);
        });
    }

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
            scope = getAllGroupPermissions();
        } else if (typeof scope !== 'number') {
            scope = getGroupPermissionsByName(scope);
        }

        debug('auth scope %s', scope);

        const params = new URLSearchParams({
            group_ids: this.groupIds.join(','),
            redirect_uri: CALLBACK_BLANK,
            response_type: 'token',
            display: 'page',
            v: this.options.apiVersion,
            client_id: clientId,
            scope: String(scope),
        });

        const url = new URL(`https://oauth.vk.ru/authorize?${params.toString()}`);

        return this.fetch(url, {
            method: 'GET',
        });
    }

    /**
     * Starts authorization
     */
    public async run(): Promise<{
        groups: {
            groupId: number;
            token: string;
            expires: number;
        }[];
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
                code: AUTHORIZATION_FAILED,
            });
        }

        let expires: string | number | undefined = params.get('expires_in') || undefined;

        if (expires !== undefined) {
            expires = Number(expires);
        } else {
            expires = 0;
        }

        const groups: {
            groupId: number;
            token: string;
            expires: number;
        }[] = [];

        for (const [name, value] of params) {
            if (!name.startsWith('access_token_')) {
                continue;
            }

            /* Example group access_token_XXXXX */
            const { 2: groupId } = name.split('_');

            groups.push({
                groupId: Number(groupId),
                token: value,
                expires,
            });
        }

        return { groups };
    }
}
