import { assert, expect } from 'chai';

import VK from '../vk';

const { NODE_ENV = 'development', TOKEN = null } = process.env;

const vk = new VK({ token: TOKEN });

describe('Snippets', () => {
	const { snippets } = vk;

	describe('resolveResource', () => {
		it('should parse equivalent user', async function resolveUserResource() {
			this.timeout(1000 * 60);

			const resources = [
				1,
				'1',
				'id1',
				'durov',
				'*durov',
				'@durov',
				'vk.com/id1',
				'vk.com/durov',
				'm.vk.com/id1',
				'm.vk.com/durov',
				'https://vk.com/id1',
				'https://vk.com/durov',
				'https://m.vk.com/id1',
				'https://m.vk.com/durov'
			];

			const payloads = await Promise.all(resources.map(resource => (
				snippets.resolveResource(resource)
			)));

			const result = Array(payloads.length).fill({
				id: 1,
				type: 'user'
			});

			expect(payloads).to.deep.equal(result);
		});

		it('should parse equivalent attachment', async function resolveAttachmentPhoto() {
			this.timeout(1000 * 5);

			const resources = [
				'photo1_456264771',
				'https://vk.com/photo1_456264771',
				'https://m.vk.com/photo1_456264771',
				'https://vk.com/durov?z=photo1_456264771',
				'https://m.vk.com/durov?z=photo1_456264771%2Falbum1_0%2Frev',
				'https://m.vk.com/photo1_456264771?list=album1_0&z=photo1_456264771%2Falbum1_0'
			];

			const payloads = await Promise.all(resources.map(resource => (
				snippets.resolveResource(resource)
			)));

			const result = Array(payloads.length).fill({
				id: 456264771,
				owner: 1,
				type: 'photo'
			});

			expect(payloads).to.deep.equal(result);
		});

		it('should parse equivalent owner resource', async () => {
			const resources = [
				-1,
				'club1',
				'apiclub',
				'app1',
				'albums1',
				'album1_0',
				'https://vk.com/id1?w=wall1_32279',
				'https://vk.com/club1?w=wall-1_49296'
			];

			const payloads = await Promise.all(resources.map(resource => (
				snippets.resolveResource(resource)
			)));

			const result = [
				{
					id: 1,
					type: 'group'
				},
				{
					id: 1,
					type: 'group'
				},
				{
					id: 1,
					type: 'group'
				},
				{
					id: 1,
					type: 'application'
				},
				{
					id: 1, // User ID
					type: 'albums'
				},
				{
					id: 0,
					owner: 1,
					type: 'album'
				},
				{
					id: 32279,
					owner: 1,
					type: 'wall'
				},
				{
					id: 49296,
					owner: -1,
					type: 'wall'
				}
			];

			expect(payloads).to.deep.equal(result);
		});

		it('Soon', () => {});
	});
});
