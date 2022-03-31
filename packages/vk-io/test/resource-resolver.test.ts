// @ts-ignore
// eslint-disable-next-line import/no-extraneous-dependencies
// @ts-ignore
import { jest } from '@jest/globals';
// @ts-ignore

// @ts-ignore
import {
// @ts-ignore
	IResolvedTargetResource,
// @ts-ignore
	IResolvedOwnerResource,
// @ts-ignore

// @ts-ignore
	VK,
// @ts-ignore

// @ts-ignore
	resolveResource
// @ts-ignore
} from '..';
// @ts-ignore

// @ts-ignore
const { TOKEN } = process.env;
// @ts-ignore

// @ts-ignore
const vk = new VK({ token: TOKEN! });
// @ts-ignore

// @ts-ignore
const durovUser: IResolvedTargetResource = {
// @ts-ignore
	id: 1,
// @ts-ignore
	type: 'user'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const durovPhoto: IResolvedOwnerResource = {
// @ts-ignore
	id: 456264771,
// @ts-ignore
	ownerId: 1,
// @ts-ignore
	type: 'photo'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const apiclubGroup: IResolvedTargetResource = {
// @ts-ignore
	id: 1,
// @ts-ignore
	type: 'group'
// @ts-ignore
};
// @ts-ignore

// @ts-ignore
const dataset: [string | number, IResolvedTargetResource | IResolvedOwnerResource][] = [
// @ts-ignore
	[1, durovUser],
// @ts-ignore
	['1', durovUser],
// @ts-ignore
	['id1', durovUser],
// @ts-ignore
	['durov', durovUser],
// @ts-ignore
	['vk.com/id1', durovUser],
// @ts-ignore
	['[id1|Durov]', durovUser],
// @ts-ignore
	['vk.com/durov', durovUser],
// @ts-ignore
	['m.vk.com/id1', durovUser],
// @ts-ignore
	['m.vk.com/durov', durovUser],
// @ts-ignore
	['https://vk.com/id1', durovUser],
// @ts-ignore
	['https://vk.com/durov', durovUser],
// @ts-ignore
	['https://m.vk.com/id1', durovUser],
// @ts-ignore
	['https://m.vk.com/durov', durovUser],
// @ts-ignore
	['photo1_456264771', durovPhoto],
// @ts-ignore
	['https://vk.com/photo1_456264771', durovPhoto],
// @ts-ignore
	['https://m.vk.com/photo1_456264771', durovPhoto],
// @ts-ignore
	['https://vk.com/durov?z=photo1_456264771', durovPhoto],
// @ts-ignore
	['https://m.vk.com/durov?z=photo1_456264771%2Falbum1_0%2Frev', durovPhoto],
// @ts-ignore
	['https://m.vk.com/photo1_456264771?list=album1_0&z=photo1_456264771%2Falbum1_0', durovPhoto],
// @ts-ignore
	[-1, apiclubGroup],
// @ts-ignore
	['club1', apiclubGroup],
// @ts-ignore
	['[club1|VK API]', apiclubGroup],
// @ts-ignore
	['[public1|APICLUB]', apiclubGroup],
// @ts-ignore
	['public1', apiclubGroup],
// @ts-ignore
	['apiclub', apiclubGroup],
// @ts-ignore
	['app1', {
// @ts-ignore
		id: 1,
// @ts-ignore
		type: 'application'
// @ts-ignore
	}],
// @ts-ignore
	['albums1', {
// @ts-ignore
		id: 1, // User ID
// @ts-ignore
		type: 'albums'
// @ts-ignore
	}],
// @ts-ignore
	['album1_0', {
// @ts-ignore
		id: 0,
// @ts-ignore
		ownerId: 1,
// @ts-ignore
		type: 'album'
// @ts-ignore
	}],
// @ts-ignore
	['https://vk.com/id1?w=wall1_32279', {
// @ts-ignore
		id: 32279,
// @ts-ignore
		ownerId: 1,
// @ts-ignore
		type: 'wall'
// @ts-ignore
	}],
// @ts-ignore
	['https://vk.com/club1?w=wall-1_49296', {
// @ts-ignore
		id: 49296,
// @ts-ignore
		ownerId: -1,
// @ts-ignore
		type: 'wall'
// @ts-ignore
	}]
// @ts-ignore
];
// @ts-ignore

// @ts-ignore
describe('resolveResource', (): void => {
// @ts-ignore
	if (TOKEN === undefined) {
// @ts-ignore
		it('the test is skipped because there is no token', (): void => {});
// @ts-ignore

// @ts-ignore
		return;
// @ts-ignore
	}
// @ts-ignore

// @ts-ignore
	for (const [resource, result] of dataset) {
// @ts-ignore
		it(`should resolve correctly "${resource}"`, async (): Promise<void> => {
// @ts-ignore
			jest.setTimeout(60_000);
// @ts-ignore

// @ts-ignore
			const resolvedResource = await resolveResource({
// @ts-ignore
				resource,
// @ts-ignore
				api: vk.api
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(resolvedResource).toMatchObject(result);
// @ts-ignore
		});
// @ts-ignore
	}
// @ts-ignore
});
