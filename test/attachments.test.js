import {
	Attachment,

	WallAttachment,
	PhotoAttachment,
	AudioAttachment,
	VideoAttachment,
	MarketAttachment,
	DocumentAttachment,
	MarketAlbumAttachment
} from '..';

describe('Attachments', () => {
	it('the main class must be equivalent to a string', () => {
		const attachment = new Attachment('photo', 1234, 5678);

		expect(String(attachment)).toBe('photo1234_5678');
	});

	it('the main class must be equivalent to a string with access_key', () => {
		const attachment = new Attachment('photo', 1234, 5678, 'ACCESS_KEY');

		expect(String(attachment)).toBe('photo1234_5678_ACCESS_KEY');
	});

	describe('should equivalent to attaching to a string', () => {
		it('wall', () => {
			const attachment = new WallAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('wall1234_4567');
		});

		it('photo', () => {
			const attachment = new PhotoAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('photo1234_4567');
		});

		it('audio', () => {
			const attachment = new AudioAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('audio1234_4567');
		});

		it('video', () => {
			const attachment = new VideoAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('video1234_4567');
		});

		it('market', () => {
			const attachment = new MarketAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('market1234_4567');
		});

		it('document', () => {
			const attachment = new DocumentAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('doc1234_4567');
		});

		it('market album', () => {
			const attachment = new MarketAlbumAttachment({
				id: 4567,
				owner_id: 1234
			});

			expect(String(attachment)).toBe('market_album1234_4567');
		});
	});
});
