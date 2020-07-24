import {
	IResolvedTargetResource,
	IResolvedOwnerResource,

	VK,

	resolveResource
} from '..';

const { TOKEN } = process.env;

const vk = new VK({ token: TOKEN! });

const durovUser: IResolvedTargetResource = {
	id: 1,
	type: 'user'
};

const durovPhoto: IResolvedOwnerResource = {
	id: 456264771,
	ownerId: 1,
	type: 'photo'
};

const apiclubGroup: IResolvedTargetResource = {
	id: 1,
	type: 'group'
};

const dataset: [string | number, IResolvedTargetResource | IResolvedOwnerResource][] = [
	[1, durovUser],
	['1', durovUser],
	['id1', durovUser],
	['durov', durovUser],
	['vk.com/id1', durovUser],
	['[id1|Durov]', durovUser],
	['vk.com/durov', durovUser],
	['m.vk.com/id1', durovUser],
	['m.vk.com/durov', durovUser],
	['https://vk.com/id1', durovUser],
	['https://vk.com/durov', durovUser],
	['https://m.vk.com/id1', durovUser],
	['https://m.vk.com/durov', durovUser],
	['photo1_456264771', durovPhoto],
	['https://vk.com/photo1_456264771', durovPhoto],
	['https://m.vk.com/photo1_456264771', durovPhoto],
	['https://vk.com/durov?z=photo1_456264771', durovPhoto],
	['https://m.vk.com/durov?z=photo1_456264771%2Falbum1_0%2Frev', durovPhoto],
	['https://m.vk.com/photo1_456264771?list=album1_0&z=photo1_456264771%2Falbum1_0', durovPhoto],
	[-1, apiclubGroup],
	['club1', apiclubGroup],
	['[club1|VK API]', apiclubGroup],
	['[public1|APICLUB]', apiclubGroup],
	['public1', apiclubGroup],
	['apiclub', apiclubGroup],
	['app1', {
		id: 1,
		type: 'application'
	}],
	['albums1', {
		id: 1, // User ID
		type: 'albums'
	}],
	['album1_0', {
		id: 0,
		ownerId: 1,
		type: 'album'
	}],
	['https://vk.com/id1?w=wall1_32279', {
		id: 32279,
		ownerId: 1,
		type: 'wall'
	}],
	['https://vk.com/club1?w=wall-1_49296', {
		id: 49296,
		ownerId: -1,
		type: 'wall'
	}]
];

describe('resolveResource', (): void => {
	if (TOKEN === undefined) {
		it('the test is skipped because there is no token', (): void => {});

		return;
	}

	for (const [resource, result] of dataset) {
		it(`should resolve correctly "${resource}"`, async (): Promise<void> => {
			jest.setTimeout(60_000);

			const resolvedResource = await resolveResource({
				resource,
				api: vk.api
			});

			expect(resolvedResource).toMatchObject(result);
		});
	}
});
