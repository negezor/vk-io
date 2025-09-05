import { deepStrictEqual } from 'node:assert';
import { describe, it } from 'node:test';

import { type IResolvedOwnerResource, type IResolvedTargetResource, resolveResource, VK } from '..';

const { TOKEN } = process.env;

// biome-ignore lint/style/noNonNullAssertion: to be honest, they're just tests
const vk = new VK({ token: TOKEN! });

const durovUser: IResolvedTargetResource = {
    id: 1,
    type: 'user',
};

const durovPhoto: IResolvedOwnerResource = {
    id: 456264771,
    ownerId: 1,
    type: 'photo',
};

const apiclubGroup: IResolvedTargetResource = {
    id: 1,
    type: 'group',
};

const dataset: [string | number, IResolvedTargetResource | IResolvedOwnerResource][] = [
    [1, durovUser],
    ['1', durovUser],
    ['id1', durovUser],
    ['durov', durovUser],
    ['vk.ru/id1', durovUser],
    ['[id1|Durov]', durovUser],
    ['vk.ru/durov', durovUser],
    ['m.vk.ru/id1', durovUser],
    ['m.vk.ru/durov', durovUser],
    ['https://vk.ru/id1', durovUser],
    ['https://vk.ru/durov', durovUser],
    ['https://m.vk.ru/id1', durovUser],
    ['https://m.vk.ru/durov', durovUser],
    ['photo1_456264771', durovPhoto],
    ['https://vk.ru/photo1_456264771', durovPhoto],
    ['https://m.vk.ru/photo1_456264771', durovPhoto],
    ['https://vk.ru/durov?z=photo1_456264771', durovPhoto],
    ['https://m.vk.ru/durov?z=photo1_456264771%2Falbum1_0%2Frev', durovPhoto],
    ['https://m.vk.ru/photo1_456264771?list=album1_0&z=photo1_456264771%2Falbum1_0', durovPhoto],
    [-1, apiclubGroup],
    ['club1', apiclubGroup],
    ['[club1|VK API]', apiclubGroup],
    ['[public1|APICLUB]', apiclubGroup],
    ['public1', apiclubGroup],
    [
        'apiclub',
        {
            id: 166562603,
            type: 'group',
        },
    ],
    [
        'app1',
        {
            id: 1,
            type: 'application',
        },
    ],
    [
        'albums1',
        {
            id: 1, // User ID
            type: 'albums',
        },
    ],
    [
        'album1_0',
        {
            id: 0,
            ownerId: 1,
            type: 'album',
        },
    ],
    [
        'https://vk.ru/id1?w=wall1_32279',
        {
            id: 32279,
            ownerId: 1,
            type: 'wall',
        },
    ],
    [
        'https://vk.ru/club1?w=wall-1_49296',
        {
            id: 49296,
            ownerId: -1,
            type: 'wall',
        },
    ],
];

describe('resolveResource', (): void => {
    for (const [resource, result] of dataset) {
        it(
            `should resolve correctly "${resource}"`,
            { timeout: 60_000, skip: TOKEN === undefined ? 'not set env TOKEN=<token>' : undefined },
            async (): Promise<void> => {
                const resolvedResource = await resolveResource({
                    resource,
                    api: vk.api,
                });

                deepStrictEqual(resolvedResource, result);
            },
        );
    }
});
