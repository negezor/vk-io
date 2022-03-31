// @ts-ignore
import {
// @ts-ignore
	VK,
// @ts-ignore
	Attachment,
// @ts-ignore

// @ts-ignore
	WallAttachment,
// @ts-ignore
	PhotoAttachment,
// @ts-ignore
	AudioAttachment,
// @ts-ignore
	StoryAttachment,
// @ts-ignore
	VideoAttachment,
// @ts-ignore
	MarketAttachment,
// @ts-ignore
	DocumentAttachment,
// @ts-ignore
	MarketAlbumAttachment
// @ts-ignore
} from '..';
// @ts-ignore

// @ts-ignore
const vk = new VK({
// @ts-ignore
	token: process.env.TOKEN!
// @ts-ignore
});
// @ts-ignore

// @ts-ignore
describe('Attachments', (): void => {
// @ts-ignore
	it('the main class must be equivalent to a string', (): void => {
// @ts-ignore
		const attachment = new Attachment({
// @ts-ignore
			api: vk.api,
// @ts-ignore
			type: 'photo',
// @ts-ignore
			payload: {
// @ts-ignore
				id: 5678,
// @ts-ignore
				owner_id: 1234
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		expect(String(attachment)).toBe('photo1234_5678');
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	it('the main class must be equivalent to a string with access_key', (): void => {
// @ts-ignore
		const attachment = new Attachment({
// @ts-ignore
			api: vk.api,
// @ts-ignore
			type: 'photo',
// @ts-ignore
			payload: {
// @ts-ignore
				id: 5678,
// @ts-ignore
				owner_id: 1234,
// @ts-ignore
				access_key: 'ACCESS_KEY'
// @ts-ignore
			}
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		expect(String(attachment)).toBe('photo1234_5678_ACCESS_KEY');
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	describe('the #fromString() should be correct working', (): void => {
// @ts-ignore
		it('should be throw an exception if wrong', (): void => {
// @ts-ignore
			expect((): Attachment => Attachment.fromString('ascbas_baasd', vk.api)).toThrow();
// @ts-ignore
			expect((): Attachment => Attachment.fromString('12345/@%$%', vk.api)).toThrow();
// @ts-ignore
			expect((): Attachment => Attachment.fromString('Incorrect', vk.api)).toThrow();
// @ts-ignore
			expect((): Attachment => Attachment.fromString('1234_', vk.api)).toThrow();
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('should be correct parse', (): void => {
// @ts-ignore
			expect(Attachment.fromString('photo1234_5678', vk.api)).toMatchObject({
// @ts-ignore
				type: 'photo',
// @ts-ignore
				ownerId: 1234,
// @ts-ignore
				id: 5678,
// @ts-ignore
				accessKey: undefined
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(Attachment.fromString('photo1234_5678_ACCESS_KEY', vk.api)).toMatchObject({
// @ts-ignore
				type: 'photo',
// @ts-ignore
				ownerId: 1234,
// @ts-ignore
				id: 5678,
// @ts-ignore
				accessKey: 'ACCESS_KEY'
// @ts-ignore
			});
// @ts-ignore
		});
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	describe('the #equals() should be correct working', (): void => {
// @ts-ignore
		it('should be throw an exception if wrong', (): void => {
// @ts-ignore
			const attachment = new Attachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				type: 'photo',
// @ts-ignore
				payload: {
// @ts-ignore
					id: 5678,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect((): boolean => attachment.equals('ascbas_baasd')).toThrow();
// @ts-ignore
			expect((): boolean => attachment.equals('inccorect')).toThrow();
// @ts-ignore
			expect((): boolean => attachment.equals('1234_')).toThrow();
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('should be return false', (): void => {
// @ts-ignore
			const attachment = new Attachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				type: 'photo',
// @ts-ignore
				payload: {
// @ts-ignore
					id: 5678,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(attachment.equals('photo1234_1234')).toBe(false);
// @ts-ignore

// @ts-ignore
			expect(attachment.equals(
// @ts-ignore
				new Attachment({
// @ts-ignore
					api: vk.api,
// @ts-ignore
					type: 'photo',
// @ts-ignore
					payload: {
// @ts-ignore
						id: 1234,
// @ts-ignore
						owner_id: 1234
// @ts-ignore
					}
// @ts-ignore
				})
// @ts-ignore
			)).toBe(false);
// @ts-ignore

// @ts-ignore
			expect(attachment.equals(
// @ts-ignore
				new Attachment({
// @ts-ignore
					api: vk.api,
// @ts-ignore
					type: 'photo',
// @ts-ignore
					payload: {
// @ts-ignore
						id: 1234,
// @ts-ignore
						owner_id: 1234,
// @ts-ignore
						access_key: 'ACCESS_KEY'
// @ts-ignore
					}
// @ts-ignore
				})
// @ts-ignore
			)).toBe(false);
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('should be return true', (): void => {
// @ts-ignore
			const attachment = new Attachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				type: 'photo',
// @ts-ignore
				payload: {
// @ts-ignore
					id: 5678,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(attachment.equals('photo1234_5678')).toBe(true);
// @ts-ignore

// @ts-ignore
			expect(attachment.equals(
// @ts-ignore
				new Attachment({
// @ts-ignore
					api: vk.api,
// @ts-ignore
					type: 'photo',
// @ts-ignore
					payload: {
// @ts-ignore
						id: 5678,
// @ts-ignore
						owner_id: 1234
// @ts-ignore
					}
// @ts-ignore
				})
// @ts-ignore
			)).toBe(true);
// @ts-ignore

// @ts-ignore
			expect(attachment.equals(
// @ts-ignore
				new Attachment({
// @ts-ignore
					api: vk.api,
// @ts-ignore
					type: 'photo',
// @ts-ignore
					payload: {
// @ts-ignore
						id: 5678,
// @ts-ignore
						owner_id: 1234,
// @ts-ignore
						access_key: 'ACCESS_KEY'
// @ts-ignore
					}
// @ts-ignore
				})
// @ts-ignore
			)).toBe(true);
// @ts-ignore
		});
// @ts-ignore
	});
// @ts-ignore

// @ts-ignore
	describe('should equivalent to attaching to a string', (): void => {
// @ts-ignore
		it('wall', (): void => {
// @ts-ignore
			const attachment = new WallAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('wall1234_4567');
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('photo', (): void => {
// @ts-ignore
			const attachment = new PhotoAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('photo1234_4567');
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('audio', (): void => {
// @ts-ignore
			const attachment = new AudioAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('audio1234_4567');
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('story', (): void => {
// @ts-ignore
			const attachment = new StoryAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('story1234_4567');
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('video', (): void => {
// @ts-ignore
			const attachment = new VideoAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('video1234_4567');
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('market', (): void => {
// @ts-ignore
			const attachment = new MarketAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('market1234_4567');
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('document', (): void => {
// @ts-ignore
			const attachment = new DocumentAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('doc1234_4567');
// @ts-ignore
		});
// @ts-ignore

// @ts-ignore
		it('market album', (): void => {
// @ts-ignore
			const attachment = new MarketAlbumAttachment({
// @ts-ignore
				api: vk.api,
// @ts-ignore
				payload: {
// @ts-ignore
					id: 4567,
// @ts-ignore
					owner_id: 1234
// @ts-ignore
				}
// @ts-ignore
			});
// @ts-ignore

// @ts-ignore
			expect(String(attachment)).toBe('market_album1234_4567');
// @ts-ignore
		});
// @ts-ignore
	});
// @ts-ignore
});
